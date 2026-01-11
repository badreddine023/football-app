import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  onDateChange?: (date: Date) => void;
  className?: string;
}

export default function DatePicker({ onDateChange, className }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date("2026-01-11"));

  const getDayName = (date: Date) => {
    const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    return days[date.getDay()];
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
    onDateChange?.(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
    onDateChange?.(newDate);
  };

  return (
    <div className={cn("w-full bg-sidebar text-sidebar-foreground px-4 py-6 space-y-4", className)}>
      {/* Day Label */}
      <div className="text-center">
        <h3 className="text-sm font-bold text-sidebar-foreground/80">يوم {getDayName(selectedDate)}</h3>
      </div>

      {/* Date Selector */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevDay}
          className="text-sidebar-foreground hover:bg-sidebar-border/50"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div className="bg-sidebar-border/50 rounded-lg px-6 py-2 min-w-[140px] text-center">
          <span className="font-bold text-sidebar-foreground">{formatDate(selectedDate)}</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNextDay}
          className="text-sidebar-foreground hover:bg-sidebar-border/50"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Match Count */}
      <div className="text-center">
        <span className="text-xs font-bold text-primary">● (10) حالياً</span>
      </div>
    </div>
  );
}
