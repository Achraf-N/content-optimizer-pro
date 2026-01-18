import { Sparkles } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="bg-card rounded-lg shadow-card p-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center animate-pulse-gentle">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin-slow" />
        </div>
        
        <h3 className="text-xl font-semibold text-card-foreground mb-2">
          Analyzing content with AI...
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Our AI is evaluating your content for optimal engagement and providing smart recommendations.
        </p>

        <div className="flex gap-1.5 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
