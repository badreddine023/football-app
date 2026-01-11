import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface PromoBannerProps {
  className?: string;
}

export default function PromoBanner({ className }: PromoBannerProps) {
  return (
    <div className={cn(
      "w-full bg-black rounded-lg p-6 flex flex-col items-center justify-center gap-4 my-4",
      className
    )}>
      {/* Main Title */}
      <h2 className="text-2xl font-black text-white text-center">
        تطبيق الكورة الأسهل
      </h2>

      {/* Logo and Settings */}
      <div className="flex items-center gap-2">
        <span className="text-white font-bold">جدول</span>
        <Settings className="w-5 h-5 text-white" />
      </div>

      {/* Download Button */}
      <Button
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-full"
      >
        حمل التطبيق
      </Button>
    </div>
  );
}
