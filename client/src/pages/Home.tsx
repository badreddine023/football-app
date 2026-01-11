import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMatches } from "@/hooks/useMatches";
import MatchCard from "@/components/MatchCard";

export default function Home() {
  const { t } = useLanguage();
  const { matches, loading } = useMatches();
  const [selectedDate, setSelectedDate] = useState("2026/01/11");

  return (
    <Layout activeRoute="/">
      <div className="max-w-4xl mx-auto p-4">
        {/* Date Selector */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <h2 className="text-lg font-medium text-gray-300">يوم الأحد</h2>
          <div className="flex items-center gap-4 bg-[#2A2A2A] rounded-lg p-1 border border-white/10">
            <button className="p-2 hover:bg-white/5 rounded-md">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 px-4 py-1 bg-[#333333] rounded-md">
              <span className="text-sm font-bold">{selectedDate}</span>
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </div>
            <button className="p-2 hover:bg-white/5 rounded-md">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 bg-[#2A2A2A] px-4 py-2 rounded-lg border border-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">حالياً (10)</span>
          </div>
        </div>

        {/* Matches List */}
        <div className="space-y-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-[#1A1A1A] animate-pulse rounded-xl border border-white/5" />
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Group by League - Simplified for now */}
              <div className="bg-[#1A1A1A] rounded-xl border border-white/10 overflow-hidden">
                <div className="p-4 bg-[#252525] flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center font-bold italic">L</div>
                    <h3 className="font-bold">الدوري الإسباني الدرجة الأولى</h3>
                  </div>
                </div>
                
                <div className="p-4 flex justify-around text-xs text-gray-400 border-b border-white/5">
                  <button className="flex items-center gap-1 hover:text-white">
                    <span>المباريات</span>
                    <CalendarIcon className="w-3 h-3" />
                  </button>
                  <button className="flex items-center gap-1 hover:text-white">
                    <span>الهدافين</span>
                    <UserIcon className="w-3 h-3" />
                  </button>
                  <button className="flex items-center gap-1 hover:text-white">
                    <span>الترتيب</span>
                    <div className="w-3 h-3 border-2 border-current rounded-sm" />
                  </button>
                </div>

                <div className="divide-y divide-white/5">
                  {matches.slice(0, 2).map((match) => (
                    <div key={match.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                      <div className="flex-1 text-right font-medium">{match.homeTeam.name}</div>
                      <div className="px-6 flex flex-col items-center">
                        <div className="text-xl font-bold tracking-widest">
                          {match.score.fullTime.home} - {match.score.fullTime.away}
                        </div>
                      </div>
                      <div className="flex-1 text-left font-medium flex items-center gap-3">
                        <img src={match.awayTeam.crest} alt="" className="w-6 h-6" />
                        {match.awayTeam.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
