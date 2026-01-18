import { CheckCircle, ArrowRight } from 'lucide-react';

interface SuccessMessageProps {
  onCreateNew: () => void;
}

const SuccessMessage = ({ onCreateNew }: SuccessMessageProps) => {
  return (
    <div className="bg-card rounded-lg shadow-card p-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>
        
        <h3 className="text-2xl font-semibold text-card-foreground mb-2">
          Optimization Accepted!
        </h3>
        <p className="text-muted-foreground max-w-sm mb-6">
          Your optimized content is ready for publishing. The AI-enhanced version will help maximize engagement.
        </p>

        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 py-3 px-6 rounded-lg gradient-primary text-primary-foreground font-semibold transition-all hover:opacity-90"
        >
          Optimize New Content
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
