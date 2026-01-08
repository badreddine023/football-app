import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Fixtures from "./pages/Fixtures";
import Results from "./pages/Results";
import Standings from "./pages/Standings";
import Predictions from "./pages/Predictions";

/**
 * Design Philosophy: Modern Sports Dashboard
 * - Color Scheme: Electric Blue (#0066FF) primary with dark backgrounds
 * - Typography: Poppins for headings, Inter for body text
 * - Layout: Fixed sidebar navigation with main content area
 * - Interactions: Smooth transitions and hover effects
 */

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/fixtures"} component={Fixtures} />
      <Route path={"/results"} component={Results} />
      <Route path={"/standings"} component={Standings} />
      <Route path={"/predictions"} component={Predictions} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
