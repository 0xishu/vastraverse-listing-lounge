import { Eye, Heart, ArrowRight } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface Listing {
  id: string;
  title: string;
  image: string;
  status: 'active' | 'swapped' | 'draft';
  views: number;
  likes: number;
  dateAdded: string;
}

const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Silk Saree - Elegant Blue',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    status: 'active',
    views: 23,
    likes: 8,
    dateAdded: '2 days ago'
  },
  {
    id: '2',
    title: 'Cotton Kurti Set',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
    status: 'swapped',
    views: 45,
    likes: 12,
    dateAdded: '1 week ago'
  },
  {
    id: '3',
    title: 'Designer Jeans',
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=300&fit=crop',
    status: 'active',
    views: 15,
    likes: 5,
    dateAdded: '3 days ago'
  },
  {
    id: '4',
    title: 'Summer Dress Draft',
    image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=300&fit=crop',
    status: 'draft',
    views: 0,
    likes: 0,
    dateAdded: '1 hour ago'
  }
];

export function PreviousListings() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-primary-foreground';
      case 'swapped': return 'bg-accent text-accent-foreground';
      case 'draft': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'swapped': return 'Swapped';
      case 'draft': return 'Draft';
      default: return status;
    }
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Previous Listings</h2>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow">
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockListings.map((listing) => (
          <div
            key={listing.id}
            className="group relative bg-background rounded-lg border border-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 ease-smooth hover:scale-105 cursor-pointer"
          >
            {/* Image */}
            <div className="aspect-square overflow-hidden">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            {/* Content */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <Badge className={`text-xs ${getStatusColor(listing.status)}`}>
                  {getStatusText(listing.status)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {listing.dateAdded}
                </span>
              </div>
              
              <h3 className="font-medium text-foreground text-sm mb-2 line-clamp-2">
                {listing.title}
              </h3>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {listing.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {listing.likes}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-eco opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </Card>
  );
}