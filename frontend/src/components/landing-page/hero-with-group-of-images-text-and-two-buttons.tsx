import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function Hero() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div>
              <Badge variant="outline">Now Live!</Badge>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-regular max-w-lg text-left text-5xl tracking-tighter md:text-7xl">
                Smart Price Tracking, Simplified.
              </h1>
              <p className="max-w-md text-left text-xl leading-relaxed tracking-tight text-muted-foreground">
                Save time and money by staying on top of price drops and stock
                updates. Our platform delivers instant alerts, helping you make
                smarter purchasing decisions, all in one seamless experience.
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button size="lg" className="gap-4" variant="outline">
                Learn More <PhoneCall className="h-4 w-4" />
              </Button>
              <Button size="lg" className="gap-4">
                Get Started Now <MoveRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="aspect-square rounded-md bg-muted"></div>
            <div className="row-span-2 rounded-md bg-muted"></div>
            <div className="aspect-square rounded-md bg-muted"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
