// Product type definition
export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  features: string[];
  specs: { [key: string]: string };
};

// Extended product data
export const products: Product[] = [
  {
    id: 1,
    name: "Premium Leather Backpack",
    price: 129.99,
    category: "Accessories",
    description: "Handcrafted from premium full-grain leather, this backpack combines timeless style with modern functionality. Perfect for daily commutes or weekend adventures, featuring multiple compartments and padded laptop sleeve.",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=800",
    ],
    features: [
      "Premium full-grain leather",
      "Padded 15\" laptop compartment",
      "Water-resistant coating",
      "YKK zippers",
      "Multiple internal pockets",
    ],
    specs: {
      "Material": "Full-grain leather",
      "Dimensions": "18\" x 12\" x 6\"",
      "Weight": "2.2 lbs",
      "Capacity": "20L",
      "Warranty": "Lifetime",
    },
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 199.99,
    category: "Electronics",
    description: "Experience premium sound quality with these wireless headphones featuring active noise cancellation, long battery life, and comfortable over-ear design. Perfect for music lovers and professionals alike.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
    ],
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Bluetooth 5.0",
      "Touch controls",
      "Voice assistant support",
    ],
    specs: {
      "Driver Size": "40mm",
      "Battery Life": "40 hours",
      "Charging Time": "2 hours",
      "Bluetooth Range": "30ft",
      "Weight": "250g",
    },
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 299.99,
    category: "Electronics",
    description: "Stay connected and track your fitness with this advanced smartwatch. Features include heart rate monitoring, GPS tracking, and a vibrant AMOLED display. Water-resistant and perfect for active lifestyles.",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&q=80&w=800",
    ],
    features: [
      "Heart rate monitoring",
      "GPS tracking",
      "Water resistant to 50m",
      "Sleep tracking",
      "7-day battery life",
    ],
    specs: {
      "Display": "1.4\" AMOLED",
      "Battery": "7 days",
      "Water Resistance": "50m",
      "Sensors": "HR, GPS, Accelerometer",
      "Compatibility": "iOS & Android",
    },
  },
  {
    id: 4,
    name: "Designer Sunglasses",
    price: 159.99,
    category: "Accessories",
    description: "Protect your eyes in style with these premium designer sunglasses. Featuring UV protection, polarized lenses, and a timeless design that complements any outfit.",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
    ],
    features: [
      "100% UV protection",
      "Polarized lenses",
      "Scratch-resistant coating",
      "Lightweight frame",
      "Premium case included",
    ],
    specs: {
      "Frame Material": "Acetate",
      "Lens Material": "Polarized Glass",
      "UV Protection": "100%",
      "Frame Size": "Medium",
      "Weight": "28g",
    },
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 149.99,
    category: "Electronics",
    description: "Experience premium typing with this mechanical keyboard featuring Cherry MX switches, RGB backlighting, and a durable aluminum frame. Perfect for gaming and professional use.",
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800",
    ],
    features: [
      "Cherry MX switches",
      "RGB backlighting",
      "Aluminum frame",
      "N-key rollover",
      "Programmable keys",
    ],
    specs: {
      "Switch Type": "Cherry MX Brown",
      "Layout": "Full size",
      "Backlight": "RGB",
      "Connection": "USB-C",
      "Weight": "1.1kg",
    },
  },
  {
    id: 6,
    name: "Canvas Tote Bag",
    price: 49.99,
    category: "Accessories",
    description: "A versatile and eco-friendly canvas tote perfect for shopping, work, or casual outings. Features durable construction, multiple pockets, and a stylish design.",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800",
    ],
    features: [
      "100% organic cotton",
      "Reinforced handles",
      "Interior pockets",
      "Water-resistant base",
      "Machine washable",
    ],
    specs: {
      "Material": "Organic canvas",
      "Capacity": "15L",
      "Dimensions": "16\" x 14\" x 4\"",
      "Handle Drop": "9 inches",
      "Weight": "12oz",
    },
  },
];