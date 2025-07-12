import { useState } from "react";
import { Save, Send, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { ImageUpload } from "@/components/ImageUpload";
import { ProductDescription } from "@/components/ProductDescription";
import { PreviousListings } from "@/components/PreviousListings";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ProductAdd() {
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<'available' | 'swap'>('available');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (images.length === 0) {
      toast({
        title: "Images Required",
        description: "Please upload at least one image of your item.",
        variant: "destructive",
      });
      return;
    }

    if (description.trim().length < 20) {
      toast({
        title: "Description Too Short",
        description: "Please provide a more detailed description (at least 20 characters).",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "✨ Listing Published!",
      description: "Your sustainable fashion item is now live on VastraVerse.",
      className: "bg-success text-primary-foreground",
    });
    
    setIsSubmitting(false);
    
    // Reset form
    setImages([]);
    setDescription("");
    setStatus('available');
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Draft Saved",
      description: "Your listing has been saved as a draft.",
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Add Your Fashion Item
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Share your sustainable fashion pieces with the VastraVerse community. 
            Every item you list helps promote conscious fashion choices.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left Section - Image Upload */}
          <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <ImageUpload onImagesChange={setImages} />
          </div>

          {/* Right Section - Product Description */}
          <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <ProductDescription
              onDescriptionChange={setDescription}
              onStatusChange={setStatus}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Button
            variant="eco"
            size="lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="group"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2"></div>
                Publishing...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Submit Listing
                <Sparkles className="h-4 w-4 ml-2 group-hover:animate-pulse" />
              </>
            )}
          </Button>
          
          <Button
            variant="draft"
            size="lg"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
          >
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
        </div>

        {/* Previous Listings Section */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <PreviousListings />
        </div>

        {/* Floating Tips */}
        <div className="fixed bottom-6 right-6 hidden xl:block">
          <div className="bg-card border border-border rounded-lg p-4 shadow-card max-w-xs animate-float">
            <div className="flex items-start gap-3">
              <div className="bg-gradient-eco p-2 rounded-full">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm mb-1">Pro Tip</h3>
                <p className="text-xs text-muted-foreground">
                  Add multiple angles and good lighting for better visibility!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}