import { useState } from "react";
import { Calculator, ArrowLeft, Heart, MessageCircle, Share2, Bookmark, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface EngagementData {
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  followers: number;
}

interface EngagementResult {
  engagementRate: number;
  totalEngagements: number;
  likeRate: number;
  commentRate: number;
  shareRate: number;
  saveRate: number;
  quality: string;
  color: string;
}

const EngagementCalculator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EngagementData>({
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
    followers: 0,
  });
  const [result, setResult] = useState<EngagementResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Number(value) || 0,
    }));
  };

  const calculateEngagement = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.followers === 0) {
      return;
    }

    const totalEngagements = formData.likes + formData.comments + formData.shares + formData.saves;
    const engagementRate = (totalEngagements / formData.followers) * 100;
    const likeRate = (formData.likes / formData.followers) * 100;
    const commentRate = (formData.comments / formData.followers) * 100;
    const shareRate = (formData.shares / formData.followers) * 100;
    const saveRate = (formData.saves / formData.followers) * 100;

    let quality = "";
    let color = "";

    if (engagementRate >= 10) {
      quality = "Excellent";
      color = "text-green-500";
    } else if (engagementRate >= 5) {
      quality = "Very Good";
      color = "text-blue-500";
    } else if (engagementRate >= 3) {
      quality = "Good";
      color = "text-yellow-500";
    } else if (engagementRate >= 1) {
      quality = "Average";
      color = "text-orange-500";
    } else {
      quality = "Needs Improvement";
      color = "text-red-500";
    }

    setResult({
      engagementRate,
      totalEngagements,
      likeRate,
      commentRate,
      shareRate,
      saveRate,
      quality,
      color,
    });
  };

  return (
    <div className="min-h-screen bg-background gradient-hero-bg">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-secondary"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-600 to-red-600 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Engagement Calculator
                </h1>
                <p className="text-sm text-muted-foreground">
                  Calculate your post engagement metrics
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Post Interactions</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your post metrics to calculate engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={calculateEngagement} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="followers" className="text-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Followers Count
                  </Label>
                  <Input
                    id="followers"
                    name="followers"
                    type="number"
                    value={formData.followers || ""}
                    onChange={handleChange}
                    placeholder="Enter follower count"
                    required
                    min="1"
                    className="bg-background border-input text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="likes" className="text-foreground flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    Likes
                  </Label>
                  <Input
                    id="likes"
                    name="likes"
                    type="number"
                    value={formData.likes || ""}
                    onChange={handleChange}
                    placeholder="Number of likes"
                    min="0"
                    className="bg-background border-input text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments" className="text-foreground flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-blue-500" />
                    Comments
                  </Label>
                  <Input
                    id="comments"
                    name="comments"
                    type="number"
                    value={formData.comments || ""}
                    onChange={handleChange}
                    placeholder="Number of comments"
                    min="0"
                    className="bg-background border-input text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shares" className="text-foreground flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-green-500" />
                    Shares
                  </Label>
                  <Input
                    id="shares"
                    name="shares"
                    type="number"
                    value={formData.shares || ""}
                    onChange={handleChange}
                    placeholder="Number of shares"
                    min="0"
                    className="bg-background border-input text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="saves" className="text-foreground flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-yellow-500" />
                    Saves
                  </Label>
                  <Input
                    id="saves"
                    name="saves"
                    type="number"
                    value={formData.saves || ""}
                    onChange={handleChange}
                    placeholder="Number of saves"
                    min="0"
                    className="bg-background border-input text-foreground"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
                >
                  Calculate Engagement
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Engagement Results</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Your post performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-6 px-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground mb-2">Overall Engagement Rate</p>
                  <p className={`text-5xl font-bold ${result.color}`}>
                    {result.engagementRate.toFixed(2)}%
                  </p>
                  <p className={`text-lg font-semibold mt-2 ${result.color}`}>
                    {result.quality}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30">
                    <span className="text-foreground font-medium">Total Engagements</span>
                    <span className="text-foreground font-bold">{result.totalEngagements.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      Like Rate
                    </span>
                    <span className="text-foreground font-semibold">{result.likeRate.toFixed(2)}%</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-blue-500" />
                      Comment Rate
                    </span>
                    <span className="text-foreground font-semibold">{result.commentRate.toFixed(2)}%</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-green-500" />
                      Share Rate
                    </span>
                    <span className="text-foreground font-semibold">{result.shareRate.toFixed(2)}%</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-yellow-500" />
                      Save Rate
                    </span>
                    <span className="text-foreground font-semibold">{result.saveRate.toFixed(2)}%</span>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-accent/20 border border-accent">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Tip:</strong> A good engagement rate for Instagram is typically between 3-6%.
                    Rates above 6% are considered excellent!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default EngagementCalculator;

