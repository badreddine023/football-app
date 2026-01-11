import Layout from "@/components/Layout";
import HeroBanner from "@/components/HeroBanner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Prediction {
  id: string;
  homeTeam: string;
  awayTeam: string;
  prediction: "HOME_WIN" | "DRAW" | "AWAY_WIN";
  confidence: number;
  date: string;
  competition: string;
}

export default function Predictions() {
  const predictions: Prediction[] = [
    {
      id: "1",
      homeTeam: "Manchester City",
      awayTeam: "Chelsea",
      prediction: "HOME_WIN",
      confidence: 78,
      date: "2026-01-10T15:00:00Z",
      competition: "Premier League",
    },
    {
      id: "2",
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      prediction: "DRAW",
      confidence: 65,
      date: "2026-01-11T21:00:00Z",
      competition: "La Liga",
    },
    {
      id: "3",
      homeTeam: "Bayern Munich",
      awayTeam: "Borussia Dortmund",
      prediction: "HOME_WIN",
      confidence: 72,
      date: "2026-01-12T19:30:00Z",
      competition: "Bundesliga",
    },
  ];

  const getPredictionLabel = (prediction: string) => {
    switch (prediction) {
      case "HOME_WIN":
        return "Home Win";
      case "AWAY_WIN":
        return "Away Win";
      case "DRAW":
        return "Draw";
      default:
        return prediction;
    }
  };

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case "HOME_WIN":
        return "bg-green-500/20 text-green-700 border-green-500/30";
      case "AWAY_WIN":
        return "bg-blue-500/20 text-blue-700 border-blue-500/30";
      case "DRAW":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-500/30";
    }
  };

  return (
    <Layout activeRoute="/predictions">
      <HeroBanner
        title="Match Predictions"
        subtitle="AI-powered predictions for upcoming matches with confidence scores"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-4">
          {predictions.map((pred) => (
            <Card key={pred.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                {/* Match Info */}
                <div className="flex-1 w-full">
                  <p className="text-sm text-muted-foreground mb-2">
                    {pred.competition} • {new Date(pred.date).toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-right flex-1">
                      <p className="font-semibold">{pred.homeTeam}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">vs</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{pred.awayTeam}</p>
                    </div>
                  </div>
                </div>

                {/* Prediction */}
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <Badge className={`${getPredictionColor(pred.prediction)} border`}>
                    {getPredictionLabel(pred.prediction)}
                  </Badge>
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-full sm:w-24 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${pred.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-primary">
                        {pred.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
