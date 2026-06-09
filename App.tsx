import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import LavouCaseStudy from "@/pages/LavouCaseStudy";
import Practice from "@/pages/Practice";
import Thinking from "@/pages/Thinking";
import Artifacts from "@/pages/Artifacts";
import WorkSlug from "@/pages/WorkSlug";
import PracticeSlug from "@/pages/PracticeSlug";
import ThinkingSlug from "@/pages/ThinkingSlug";
import { Navbar } from "@/components/layout/Navbar";
import { RouteAnalytics } from "@/components/Analytics";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/work/lavou" component={LavouCaseStudy} />
        <Route path="/work/:slug" component={WorkSlug} />
        <Route path="/practice" component={Practice} />
        <Route path="/practice/:slug" component={PracticeSlug} />
        <Route path="/thinking" component={Thinking} />
        <Route path="/thinking/:slug" component={ThinkingSlug} />
        <Route path="/artifacts" component={Artifacts} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="noise-bg" />
          <Navbar />
          <RouteAnalytics />
          <main className="min-h-screen">
            <Router />
          </main>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
