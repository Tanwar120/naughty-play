import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MobileMenu from "@/components/mobile-menu";
import Home from "@/pages/home";
import Casino from "@/pages/casino";
import Sports from "@/pages/sports";
import Exchange from "@/pages/exchange";
import Whitepaper from "@/pages/whitepaper";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/casino" component={Casino} />
      <Route path="/sports" component={Sports} />
      <Route path="/exchange" component={Exchange} />
      <Route path="/whitepaper" component={Whitepaper} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <MobileMenu />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
