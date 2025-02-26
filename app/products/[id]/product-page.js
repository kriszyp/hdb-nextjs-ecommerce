'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  customizeProductDescription,
  listProducts,
  getPersonalizationCache,
  getUserTraits,
} from '@/app/actions';

export default function ProductPage({ id, product }) {
  if (!product) notFound();
  const [productDescReady, setProductDescReady] = useState(null);
  const [recommendationsReady, setRecommendationsReady] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [customDescription, setCustomDescription] = useState(null);
  const [traits, setTraits] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // check for custom user traits
      const traits = await getUserTraits() || [];
      setTraits(traits);

      // If there are custom user traits, get AI recommended product description
      if (Array.isArray(traits) && traits.length) {
        try {
          setProductDescReady(false);

          // Check for personalization cache
          const traitsCache = await getPersonalizationCache(traits);
          console.log('traitsCache ', traitsCache);

          // If cache doesn't exist: 
          // get AI generated customized product description
          // register cache
          const customDescription = await customizeProductDescription(traits, product.description);
          setCustomDescription(customDescription);
          setProductDescReady(true);

        } catch (err) {
          console.error('Error fetching data:', err);
        }
      }

      // Get default product recommendation
      try {
        setRecommendationsReady(false);
        const defaultRecommendation = await listProducts({
          conditions: [
            { attribute: 'category', value: product.category, comparator: 'equals' },
            { attribute: 'id', value: id, comparator: 'not_equal' }
          ],
          limit: 3
        });
        setRelatedProducts(defaultRecommendation);
        setRecommendationsReady(true);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    // Call fetchData when the component mounts
    fetchData();
  }, []);

  function renderProductDescription() {
    // No customer traits
    if (!traits || !Array.isArray(traits) || !traits.length) {
      return product.description;
    }

    // Wait for custom product description to load
    if (!customDescription && productDescReady === false) {
      return 'Description loading...';
    }
    if (customDescription && productDescReady) {
      return customDescription;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={`${product.name} - Image`}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-3xl font-bold text-primary">${product.price}</p>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground" style={{ minHeight: 100 }}>{renderProductDescription()}</p>

            <div className="flex items-center space-x-4">
              <Button size="lg" className="flex-1">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4" />
              <span>Free shipping on orders over $100</span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Key Features</h2>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Star className="mr-2 h-4 w-4 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Specifications</h2>
            <div className="space-y-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b py-2">
                  <span className="font-medium">{key}</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="mb-8 text-2xl font-bold">Related Products</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {(!recommendationsReady || !relatedProducts) ? 'Loading...' : relatedProducts.map((relatedProduct) => (
            <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
              <Card className="overflow-hidden transition-transform hover:scale-[1.02]">
                <div className="relative h-64">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-lg font-semibold">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">${relatedProduct.price}</span>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}