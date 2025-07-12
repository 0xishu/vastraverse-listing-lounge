import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ShoppingBag, RotateCcw, Leaf } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-eco p-4 rounded-2xl shadow-glow">
              <Leaf className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Welcome to VastraVerse
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your sustainable fashion community. Swap, share, and discover pre-loved clothing 
            while building a more eco-conscious wardrobe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="eco" size="lg" asChild>
              <a href="/add-product">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add Your Items
              </a>
            </Button>
            <Button variant="outline" size="lg">
              <RotateCcw className="mr-2 h-5 w-5" />
              Browse Swaps
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-sage rounded-lg mx-auto mb-4 flex items-center justify-center">
                <RotateCcw className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Smart Swapping</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Exchange clothing items with other users in your area. 
                Give your clothes a second life while discovering new styles.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-eco rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Sustainable Living</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Reduce textile waste and environmental impact by participating 
                in the circular fashion economy.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-sunset rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-6 w-6 text-accent-foreground" />
              </div>
              <CardTitle>Community Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Connect with like-minded fashion enthusiasts who care about 
                sustainability and conscious consumption.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-eco text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Sustainable Fashion Journey?</h3>
            <p className="mb-6 opacity-90">
              Join thousands of users who are already making a difference through conscious fashion choices.
            </p>
            <Button variant="secondary" size="lg">
              Get Started Today
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
