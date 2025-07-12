import { useState } from "react";
import { FileText, ToggleLeft, ToggleRight } from "lucide-react";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ProductDescriptionProps {
  onDescriptionChange: (description: string) => void;
  onStatusChange: (status: 'available' | 'swap') => void;
}

export function ProductDescription({ onDescriptionChange, onStatusChange }: ProductDescriptionProps) {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<'available' | 'swap'>('available');
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    onDescriptionChange(value);
    
    // Simple AI-like tag suggestion based on keywords
    const tags: string[] = [];
    const keywords = {
      'kurti': ['Kurti', 'Ethnic Wear'],
      'jeans': ['Jeans', 'Denim'],
      'shirt': ['Shirt', 'Casual Wear'],
      'dress': ['Dress', 'Western Wear'],
      'saree': ['Saree', 'Traditional'],
      'small': ['Size S'],
      'medium': ['Size M'],
      'large': ['Size L'],
      'cotton': ['Cotton', 'Natural Fabric'],
      'silk': ['Silk', 'Premium'],
      'new': ['Like New'],
      'good': ['Good Condition'],
      'excellent': ['Excellent Condition']
    };

    Object.entries(keywords).forEach(([keyword, tagList]) => {
      if (value.toLowerCase().includes(keyword)) {
        tags.push(...tagList);
      }
    });

    setSuggestedTags([...new Set(tags)].slice(0, 6));
  };

  const toggleStatus = () => {
    const newStatus = status === 'available' ? 'swap' : 'available';
    setStatus(newStatus);
    onStatusChange(newStatus);
  };

  return (
    <Card className="p-6 shadow-card h-fit">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        Add Product Description
      </h2>
      
      <Textarea
        placeholder="Describe the item, its size, condition, brand, etc.
        
Example: Beautiful cotton kurti in size M, gently used. From a smoke-free home. Perfect for casual or office wear. Brand: Fabindia. The fabric is soft and breathable, ideal for summer."
        value={description}
        onChange={(e) => handleDescriptionChange(e.target.value)}
        className="min-h-[200px] resize-none focus:border-primary transition-colors"
      />

      {/* Character Count */}
      <div className="text-right mt-2">
        <span className={`text-sm ${description.length > 500 ? 'text-warning' : 'text-muted-foreground'}`}>
          {description.length}/1000 characters
        </span>
      </div>

      {/* AI-Suggested Tags */}
      {suggestedTags.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-foreground mb-2">Suggested Tags</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-eco-mint">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Status Toggle */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-foreground">Listing Status</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {status === 'available' 
                ? 'Item is available for purchase/rent' 
                : 'Item is available for swap only'
              }
            </p>
          </div>
          <Button
            variant="ghost"
            size="lg"
            onClick={toggleStatus}
            className={`
              flex items-center gap-2 transition-all duration-300 ease-bounce
              ${status === 'swap' ? 'text-success' : 'text-muted-foreground'}
            `}
          >
            {status === 'swap' ? (
              <>
                <ToggleRight className="h-8 w-8" />
                <span className="font-medium">Swap</span>
              </>
            ) : (
              <>
                <ToggleLeft className="h-8 w-8" />
                <span className="font-medium">Available</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}