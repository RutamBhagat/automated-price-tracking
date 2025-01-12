import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function Hero() {
  return (
    <div className="w-full bg-[#020617] py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div>
              <Badge variant="outline" className="border-[#0e8ba0] text-[#0e8ba0]">Now Live!</Badge>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-regular max-w-lg text-left text-5xl tracking-tighter md:text-7xl bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">
                Smart Price Tracking, Simplified.
              </h1>
              <p className="max-w-md text-left text-xl leading-relaxed tracking-tight text-gray-400">
                Save time and money by staying on top of price drops and stock
                updates. Our platform delivers instant alerts, helping you make
                smarter purchasing decisions, all in one seamless experience.
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button size="lg" className="gap-4 border-[#0e8ba0] text-[#0e8ba0] hover:bg-[#0e8ba0] hover:text-white" variant="outline">
                Learn More <PhoneCall className="h-4 w-4" />
              </Button>
              <Button size="lg" className="gap-4 bg-[#16c5e2] text-[#020617] hover:bg-[#0e8ba0] hover:text-white">
                Get Started Now <MoveRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="aspect-square rounded-md bg-gray-900"></div>
            <div className="row-span-2 rounded-md bg-gray-900"></div>
            <div className="aspect-square rounded-md bg-gray-900"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
