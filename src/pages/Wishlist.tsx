import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Search, Filter, RotateCcw, Trash2, Heart as HeartIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WishlistItem {
  id: string;
  name: string;
  category: string;
  gender: string;
  size: string;
  condition: "Brand New" | "Gently Used" | "Well Worn";
  status: "Available" | "Swap Pending" | "Reserved";
  image: string;
  addedDate: string;
}

const mockWishlistItems: WishlistItem[] = [
  {
    id: "1",
    name: "Handwoven Cotton Kurta",
    category: "Ethnic",
    gender: "Men",
    size: "M",
    condition: "Gently Used",
    status: "Available",
    image: "https://images.unsplash.com/photo-1626497764746-6dc36546b17f?w=300&h=400&fit=crop",
    addedDate: "2024-01-15"
  },
  {
    id: "2",
    name: "Vintage Denim Jacket",
    category: "Western",
    gender: "Women",
    size: "L",
    condition: "Brand New",
    status: "Swap Pending",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop",
    addedDate: "2024-01-12"
  },
  {
    id: "3",
    name: "Silk Saree with Blouse",
    category: "Traditional",
    gender: "Women",
    size: "Free Size",
    condition: "Gently Used",
    status: "Available",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=400&fit=crop",
    addedDate: "2024-01-10"
  },
  {
    id: "4",
    name: "Kids Cotton Frock",
    category: "Kids",
    gender: "Girls",
    size: "4-5 Years",
    condition: "Brand New",
    status: "Available",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=400&fit=crop",
    addedDate: "2024-01-08"
  }
];

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(mockWishlistItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const { toast } = useToast();

  const filteredAndSortedItems = wishlistItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || item.category.toLowerCase() === categoryFilter;
      const matchesSize = sizeFilter === "all" || item.size === sizeFilter;
      const matchesGender = genderFilter === "all" || item.gender.toLowerCase() === genderFilter;
      const matchesCondition = conditionFilter === "all" || item.condition === conditionFilter;
      
      return matchesSearch && matchesCategory && matchesSize && matchesGender && matchesCondition;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
        case "oldest":
          return new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime();
        case "alphabetical":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  const moveToSwap = (itemId: string) => {
    const item = wishlistItems.find(item => item.id === itemId);
    if (item) {
      toast({
        title: "Moving to Swap",
        description: `"${item.name}" is being prepared for swap.`,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-success text-primary-foreground";
      case "Swap Pending":
        return "bg-warning text-foreground";
      case "Reserved":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Brand New":
        return "bg-success text-primary-foreground";
      case "Gently Used":
        return "bg-eco-sage text-foreground";
      case "Well Worn":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gradient-sage rounded-full flex items-center justify-center mb-6">
        <HeartIcon className="w-12 h-12 text-primary opacity-60" />
      </div>
      <h3 className="text-2xl font-semibold text-foreground mb-2">Your wishlist is empty</h3>
      <p className="text-muted-foreground text-center mb-6 max-w-md">
        Start browsing and save your favorite outfits to build your sustainable wardrobe!
      </p>
      <Button variant="eco" size="lg">
        Browse Items
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Heart className="h-8 w-8 text-accent fill-current" />
            My Wishlist
          </h1>
          <p className="text-muted-foreground">
            Your saved clothing items for future swaps and purchases
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your saved styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="ethnic">Ethnic</SelectItem>
                  <SelectItem value="western">Western</SelectItem>
                  <SelectItem value="traditional">Traditional</SelectItem>
                  <SelectItem value="kids">Kids</SelectItem>
                </SelectContent>
              </Select>

              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="men">Men</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                  <SelectItem value="girls">Girls</SelectItem>
                  <SelectItem value="boys">Boys</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sizeFilter} onValueChange={setSizeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="XS">XS</SelectItem>
                  <SelectItem value="S">S</SelectItem>
                  <SelectItem value="M">M</SelectItem>
                  <SelectItem value="L">L</SelectItem>
                  <SelectItem value="XL">XL</SelectItem>
                  <SelectItem value="Free Size">Free Size</SelectItem>
                  <SelectItem value="4-5 Years">4-5 Years</SelectItem>
                </SelectContent>
              </Select>

              <Select value={conditionFilter} onValueChange={setConditionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  <SelectItem value="Brand New">Brand New</SelectItem>
                  <SelectItem value="Gently Used">Gently Used</SelectItem>
                  <SelectItem value="Well Worn">Well Worn</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                  setSizeFilter("all");
                  setGenderFilter("all");
                  setConditionFilter("all");
                  setSortBy("recent");
                }}
                className="w-full"
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        {filteredAndSortedItems.length > 0 && (
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredAndSortedItems.length} of {wishlistItems.length} items
            </p>
          </div>
        )}

        {/* Wishlist Grid */}
        {filteredAndSortedItems.length === 0 ? (
          <Card>
            <CardContent className="p-0">
              <EmptyState />
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedItems.map((item) => (
              <Card key={item.id} className="group hover-scale transition-all duration-300 ease-smooth hover:shadow-card overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Heart className="h-4 w-4 text-accent fill-current" />
                  </Button>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-1">{item.name}</CardTitle>
                  <CardDescription className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      {item.gender}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {item.size}
                    </Badge>
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <Badge className={getConditionColor(item.condition)}>
                      {item.condition}
                    </Badge>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFromWishlist(item.id)}
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                  <Button
                    variant="eco"
                    size="sm"
                    onClick={() => moveToSwap(item.id)}
                    className="flex-1"
                    disabled={item.status !== "Available"}
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Swap
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}