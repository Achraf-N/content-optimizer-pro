import { useNavigate } from "react-router-dom";
import { BarChart3, Calculator, Zap, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const Home = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Content Optimizer",
      description: "Optimize your Instagram posts with AI-powered insights and suggestions",
      icon: Zap,
      path: "/content-optimizer",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      title: "Engagement Calculator",
      description: "Calculate and analyze your post engagement rates and metrics",
      icon: Calculator,
      path: "/engagement-calculator",
      gradient: "from-pink-600 to-red-600",
    },
    {
      title: "Account Analysis",
      description: "Deep dive into account statistics with interactive graphs and insights",
      icon: BarChart3,
      path: "/account-analysis",
      gradient: "from-red-600 to-yellow-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background gradient-hero-bg">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full instagram-gradient flex items-center justify-center">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Instagram Content Pro
                </h1>
                <p className="text-sm text-muted-foreground">
                  Professional Tools for Instagram Success
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Elevate Your Instagram Game
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Powerful analytics, optimization, and insights to grow your Instagram presence
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.path}
                className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-card-hover"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl instagram-gradient"></div>

                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {section.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {section.description}
                  </p>

                  <Button
                    onClick={() => navigate(section.path)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl transition-all duration-300 group-hover:scale-105"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 Instagram Content Pro. Elevate your social media presence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

