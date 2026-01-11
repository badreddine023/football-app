
export type Language = 'en' | 'ar';

export interface Translations {
  home: string;
  fixtures: string;
  results: string;
  standings: string;
  predictions: string;
  todayMatches: string;
  liveNow: string;
  upcomingMatches: string;
  recentResults: string;
  refresh: string;
  noMatches: string;
  tryAgain: string;
  wantPredictions: string;
  checkPredictions: string;
  viewPredictions: string;
  leagueStandings: string;
  currentStandings: string;
  pos: string;
  team: string;
  played: string;
  won: string;
  drawn: string;
  lost: string;
  gf: string;
  ga: string;
  gd: string;
  pts: string;
  liveFootball: string;
  realTimeUpdates: string;
  appTitle: string;
  appSubtitle: string;
  yesterday: string;
  today: string;
  tomorrow: string;
  importantDates: string;
  leagues: string;
  downloadApp: string;
  easyFootballApp: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    home: "Home",
    fixtures: "Fixtures",
    results: "Results",
    standings: "Standings",
    predictions: "Predictions",
    todayMatches: "Today's Matches",
    liveNow: "Live Now",
    upcomingMatches: "Upcoming Matches",
    recentResults: "Recent Results",
    refresh: "Refresh",
    noMatches: "No matches found",
    tryAgain: "Try Again",
    wantPredictions: "Want Predictions?",
    checkPredictions: "Check out our AI-powered predictions for upcoming matches",
    viewPredictions: "View Predictions →",
    leagueStandings: "League Standings",
    currentStandings: "Current standings and statistics from major football leagues",
    pos: "Pos",
    team: "Team",
    played: "P",
    won: "W",
    drawn: "D",
    lost: "L",
    gf: "GF",
    ga: "GA",
    gd: "GD",
    pts: "Pts",
    liveFootball: "Live Football Scores & Predictions",
    realTimeUpdates: "Get real-time updates on matches, standings, and predictions from all major leagues",
    appTitle: "Jdwel",
    appSubtitle: "Standings & Matches Simply",
    yesterday: "Yesterday",
    today: "Today",
    tomorrow: "Tomorrow",
    importantDates: "Important Dates",
    leagues: "Leagues",
    downloadApp: "Download App",
    easyFootballApp: "The Easiest Football App",
  },
  ar: {
    home: "الرئيسية",
    fixtures: "المباريات",
    results: "النتائج",
    standings: "الترتيب",
    predictions: "التوقعات",
    todayMatches: "مباريات اليوم",
    liveNow: "مباشر الآن",
    upcomingMatches: "المباريات القادمة",
    recentResults: "النتائج الأخيرة",
    refresh: "تحديث",
    noMatches: "لا توجد مباريات",
    tryAgain: "حاول مرة أخرى",
    wantPredictions: "هل تريد توقعات؟",
    checkPredictions: "تحقق من توقعاتنا المدعومة بالذكاء الاصطناعي للمباريات القادمة",
    viewPredictions: "عرض التوقعات ←",
    leagueStandings: "ترتيب الدوري",
    currentStandings: "الترتيب الحالي والإحصائيات من الدوريات الكبرى",
    pos: "المركز",
    team: "الفريق",
    played: "لعب",
    won: "فوز",
    drawn: "تعادل",
    lost: "خسارة",
    gf: "له",
    ga: "عليه",
    gd: "الفارق",
    pts: "نقاط",
    liveFootball: "نتائج وتوقعات كرة القدم المباشرة",
    realTimeUpdates: "احصل على تحديثات مباشرة للمباريات والترتيب والتوقعات من جميع الدوريات الكبرى",
    appTitle: "جدول",
    appSubtitle: "الترتيب والمباريات ببساطة",
    yesterday: "أمس",
    today: "مباريات اليوم",
    tomorrow: "غداً",
    importantDates: "أهم التواريخ",
    leagues: "البطولات",
    downloadApp: "حمل التطبيق",
    easyFootballApp: "تطبيق الكورة الأسهل",
  }
};
