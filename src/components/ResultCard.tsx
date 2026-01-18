import { Check, X, TrendingUp, AlertTriangle, Shield, Hash, FileText, Sparkles } from 'lucide-react';

interface OptimizationResult {
  post_id: string;
  predicted_engagement: number;
  risk_level: 'High' | 'Medium' | 'Low';
  optimized_description: string;
  optimized_hashtags: string;
}

interface ResultCardProps {
  result: OptimizationResult;
  onAccept: () => void;
  onReject: () => void;
}

const ResultCard = ({ result, onAccept, onReject }: ResultCardProps) => {
  const riskColors = {
    Low: {
      bg: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/30',
      icon: Shield,
    },
    Medium: {
      bg: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/30',
      icon: AlertTriangle,
    },
    High: {
      bg: 'bg-destructive/10',
      text: 'text-destructive',
      border: 'border-destructive/30',
      icon: AlertTriangle,
    },
  };

  const riskConfig = riskColors[result.risk_level];
  const RiskIcon = riskConfig.icon;

  return (
    <div className="bg-card rounded-lg shadow-card p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">AI Optimization Results</h2>
          <p className="text-sm text-muted-foreground">Post ID: {result.post_id}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Engagement Score */}
        <div className="p-4 rounded-lg bg-accent border border-accent">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Predicted Engagement</span>
          </div>
          <p className="text-3xl font-bold text-primary">
            {typeof result.predicted_engagement === 'number' 
              ? `${(result.predicted_engagement * 100).toFixed(1)}%` 
              : result.predicted_engagement}
          </p>
        </div>

        {/* Risk Level */}
        <div className={`p-4 rounded-lg border ${riskConfig.bg} ${riskConfig.border}`}>
          <div className="flex items-center gap-2 mb-2">
            <RiskIcon className={`w-5 h-5 ${riskConfig.text}`} />
            <span className="text-sm font-medium text-muted-foreground">Risk Level</span>
          </div>
          <p className={`text-3xl font-bold ${riskConfig.text}`}>
            {result.risk_level}
          </p>
        </div>
      </div>

      {/* Optimized Content */}
      <div className="space-y-4 mb-6">
        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-medium text-card-foreground">Optimized Description</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {result.optimized_description}
          </p>
        </div>

        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Hash className="w-5 h-5 text-primary" />
            <span className="font-medium text-card-foreground">Optimized Hashtags</span>
          </div>
          <p className="text-muted-foreground">
            {result.optimized_hashtags}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onAccept}
          className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-success text-success-foreground font-semibold transition-all hover:opacity-90"
        >
          <Check className="w-5 h-5" />
          Accept Optimization
        </button>
        <button
          onClick={onReject}
          className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-destructive text-destructive-foreground font-semibold transition-all hover:opacity-90"
        >
          <X className="w-5 h-5" />
          Reject Optimization
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
