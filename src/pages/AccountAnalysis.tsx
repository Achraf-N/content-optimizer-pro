import { useState } from "react";
import { BarChart3, ArrowLeft, TrendingUp, Heart, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

interface InstagramPost {
  id: string;
  type: string;
  shortCode: string;
  caption: string;
  url: string;
  commentsCount: number;
  likesCount: number;
  videoViewCount?: number;
  videoPlayCount?: number;
  timestamp: string;
  ownerUsername?: string;
  ownerFullName?: string;
}

interface PostData {
  id: string;
  date: string;
  likes: number;
  comments: number;
  views: number;
  engagement: number;
  caption: string;
  type: string;
  shortCode: string;
}

const AccountAnalysis = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<{
    posts: PostData[];
    totalPosts: number;
    totalLikes: number;
    totalComments: number;
    totalViews: number;
    avgEngagement: number;
    accountUsername: string;
  } | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter an Instagram username");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisData(null);

    try {
      const cleanUsername = username.trim().replace('@', '');
      const response = await fetch(`http://localhost:3000/api/profile/posts/${cleanUsername}`);

      if (!response.ok) {
        throw new Error("Failed to fetch account data. Please check the username.");
      }

      const data: InstagramPost[] = await response.json();

      if (!data || data.length === 0) {
        throw new Error("No posts found for this account");
      }

      // Transform API data to chart format
      const posts: PostData[] = data.map((post) => {
        const likes = post.likesCount || 0;
        const comments = post.commentsCount || 0;
        const views = post.videoViewCount || post.videoPlayCount || 0;
        const totalEngagement = likes + comments;

        return {
          id: post.id,
          date: new Date(post.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          likes,
          comments,
          views,
          engagement: totalEngagement,
          caption: post.caption || 'No caption',
          type: post.type,
          shortCode: post.shortCode,
        };
      }).reverse(); // Reverse to show oldest to newest

      const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
      const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
      const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
      const avgEngagement = posts.reduce((sum, post) => sum + post.engagement, 0) / posts.length;

      setAnalysisData({
        posts,
        totalPosts: posts.length,
        totalLikes,
        totalComments,
        totalViews,
        avgEngagement: Number(avgEngagement.toFixed(2)),
        accountUsername: data[0]?.ownerUsername || cleanUsername,
      });
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching data");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background gradient-hero-bg pb-12">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
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
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-yellow-600 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Account Analysis
                </h1>
                <p className="text-sm text-muted-foreground">
                  Deep dive into Instagram account statistics
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Input Section */}
        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Enter Instagram Account
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Analyze any public Instagram account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAnalyze} className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="username" className="sr-only">
                  Instagram Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="@username"
                  required
                  className="bg-background border-input text-foreground"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
              >
                {isLoading ? "Analyzing..." : "Analyze Account"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="bg-destructive/10 border-destructive mb-8">
            <CardContent className="pt-6">
              <p className="text-destructive font-medium">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {analysisData && (
          <div className="space-y-8 animate-fade-in">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Posts</p>
                      <p className="text-3xl font-bold text-foreground">{analysisData.totalPosts}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Likes</p>
                      <p className="text-3xl font-bold text-foreground">{analysisData.totalLikes.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Comments</p>
                      <p className="text-3xl font-bold text-foreground">{analysisData.totalComments.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Engagement</p>
                      <p className="text-3xl font-bold text-foreground">{analysisData.avgEngagement.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Engagement Trend Chart */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Engagement Evolution</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Track engagement rate across recent posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analysisData.posts}>
                    <defs>
                      <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e6683c" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#e6683c" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="engagement"
                      stroke="#e6683c"
                      fillOpacity={1}
                      fill="url(#colorEngagement)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Interactions Comparison */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Post Interactions Breakdown</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Compare likes and comments across posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={analysisData.posts}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="likes" fill="#f43f5e" name="Likes" />
                    <Bar dataKey="comments" fill="#3b82f6" name="Comments" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Likes Trend Line Chart */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Likes Trend Analysis</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Monitor how your likes perform over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analysisData.posts}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="likes"
                      stroke="#f43f5e"
                      strokeWidth={3}
                      dot={{ fill: "#f43f5e", r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="comments"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: "#3b82f6", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Post Details Table */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Posts Details</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Detailed metrics for each post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-foreground font-semibold">Post</th>
                        <th className="text-left py-3 px-4 text-foreground font-semibold">Likes</th>
                        <th className="text-left py-3 px-4 text-foreground font-semibold">Comments</th>
                        <th className="text-left py-3 px-4 text-foreground font-semibold">Engagement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysisData.posts.map((post) => (
                        <tr key={post.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                          <td className="py-3 px-4 text-muted-foreground">{post.date}</td>
                          <td className="py-3 px-4 text-foreground font-medium">{post.likes.toLocaleString()}</td>
                          <td className="py-3 px-4 text-foreground font-medium">{post.comments.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-primary/20 text-primary">
                              {post.engagement.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {!analysisData && !isLoading && (
          <div className="text-center py-16">
            <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Analysis Yet
            </h3>
            <p className="text-muted-foreground">
              Enter an Instagram username above to start analyzing
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AccountAnalysis;

