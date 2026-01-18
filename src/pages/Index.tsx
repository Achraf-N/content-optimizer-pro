import { useState } from 'react';
import { Zap } from 'lucide-react';
import ContentForm from '@/components/ContentForm';
import LoadingState from '@/components/LoadingState';
import ResultCard from '@/components/ResultCard';
import SuccessMessage from '@/components/SuccessMessage';

interface FormData {
  content_type: string;
  content_length: number;
  follower_count: number;
  date_time: string;
  description: string;
  hashtags: string;
}

interface OptimizationResult {
  post_id: string;
  predicted_engagement: number;
  risk_level: 'High' | 'Medium' | 'Low';
  optimized_description: string;
  optimized_hashtags: string;
}

type ViewState = 'form' | 'loading' | 'result' | 'success';

const Index = () => {
  const [viewState, setViewState] = useState<ViewState>('form');
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [lastFormData, setLastFormData] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setLastFormData(formData);
    setViewState('loading');
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze content');
      }

      const data = await response.json();
      const optimizationData = data.webhookResponse?.data || data;
      
      setResult(optimizationData);
      setViewState('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setViewState('form');
    }
  };

  const handleAccept = () => {
    setViewState('success');
  };

  const handleReject = () => {
    setResult(null);
    setViewState('form');
  };

  const handleCreateNew = () => {
    setResult(null);
    setLastFormData(null);
    setViewState('form');
  };

  return (
    <div className="min-h-screen bg-background gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ContentOptimizer</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Social Media Optimization</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive animate-fade-in">
            <p className="font-medium">Error: {error}</p>
            <p className="text-sm mt-1 opacity-80">Please check your connection and try again.</p>
          </div>
        )}

        {/* View States */}
        {viewState === 'form' && (
          <ContentForm 
            onSubmit={handleSubmit} 
            isLoading={false} 
            initialData={lastFormData}
          />
        )}

        {viewState === 'loading' && <LoadingState />}

        {viewState === 'result' && result && (
          <ResultCard 
            result={result} 
            onAccept={handleAccept} 
            onReject={handleReject} 
          />
        )}

        {viewState === 'success' && (
          <SuccessMessage onCreateNew={handleCreateNew} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <p className="text-center text-sm text-muted-foreground">
            Optimize your social media content with AI-powered insights
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
