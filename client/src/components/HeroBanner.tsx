import { cn } from "@/lib/utils";

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

export default function HeroBanner({
  title,
  subtitle,
  backgroundImage,
  children,
}: HeroBannerProps) {
  return (
    <div
      className={cn(
        "relative w-full py-12 md:py-20 overflow-hidden",
        backgroundImage ? "bg-cover bg-center" : "bg-gradient-to-r from-primary to-primary/80"
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(135deg, rgba(15, 15, 15, 0.7) 0%, rgba(15, 15, 15, 0.5) 100%), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-white/90 mb-6">{subtitle}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
