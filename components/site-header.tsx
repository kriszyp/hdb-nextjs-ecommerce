'use client';

import { ShoppingBag, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent } from "./ui/dropdown-menu";
import { Input } from "./ui/input";

export function SiteHeader() {
  function search(e: React.ChangeEvent<HTMLInputElement>) {
    console.log('Algolia will search: ', e.target.value);
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Harper + Next.js Ecommerce Demo
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link href="/products" className="text-sm font-medium hover:text-primary">
            Products
          </Link>

          <DropdownMenu>

            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" onClick={() => {}}>
                <Search className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuPortal>
              <DropdownMenuContent style={{ width: 400, padding: 10 }}>
                <h3 style={{ paddingBottom: 5 }}>Search</h3>
                <div>
                  <Input type="text" onChange={search} />
                </div>
                <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                  TODO: Algolia search results here
                </div>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
          
          
          <Button size="icon" variant="ghost">
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </header>
  );
}