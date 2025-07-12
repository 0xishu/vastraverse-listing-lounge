import { Search, Leaf, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-eco p-2 rounded-lg shadow-glow">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">VastraVerse</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="/" 
              className={`transition-colors ${isActive('/') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
            >
              Home
            </a>
            <a 
              href="#" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Browse
            </a>
            <a 
              href="/add-product" 
              className={`transition-colors ${isActive('/add-product') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
            >
              My Listings
            </a>
            <a 
              href="/wishlist" 
              className={`transition-colors flex items-center gap-1 ${isActive('/wishlist') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
            >
              <Heart className="h-4 w-4" />
              Wishlist
            </a>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sustainable fashion..."
                className="pl-10 bg-background border-border focus:border-primary"
              />
            </div>
          </div>

          {/* Profile/Menu */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-4 w-4" />
            </Button>
            <div className="w-8 h-8 bg-gradient-sage rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
}