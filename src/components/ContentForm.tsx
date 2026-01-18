import { useState } from 'react';
import { Send, Video, Image, FileText } from 'lucide-react';

interface FormData {
  content_type: string;
  content_length: number;
  follower_count: number;
  date_time: string;
  description: string;
  hashtags: string;
}

interface ContentFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  initialData?: FormData | null;
}

const ContentForm = ({ onSubmit, isLoading, initialData }: ContentFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialData || {
    content_type: 'video',
    content_length: 60,
    follower_count: 1000,
    date_time: new Date().toISOString().slice(0, 16),
    description: '',
    hashtags: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const contentTypeIcons = {
    video: Video,
    image: Image,
    text: FileText,
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6 transition-all hover:shadow-card-hover">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
          <Send className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Content Details</h2>
          <p className="text-sm text-muted-foreground">Enter your social media content information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Content Type */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Content Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['video', 'image', 'text'] as const).map((type) => {
              const Icon = contentTypeIcons[type];
              const isSelected = formData.content_type === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, content_type: type }))}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-primary bg-accent text-accent-foreground'
                      : 'border-border bg-secondary/50 text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-primary' : ''}`} />
                  <span className="text-sm font-medium capitalize">{type}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Content Length (seconds)
            </label>
            <input
              type="number"
              name="content_length"
              value={formData.content_length}
              onChange={handleChange}
              min={1}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Follower Count
            </label>
            <input
              type="number"
              name="follower_count"
              value={formData.follower_count}
              onChange={handleChange}
              min={0}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              required
            />
          </div>
        </div>

        {/* Date Time */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Scheduled Date & Time
          </label>
          <input
            type="datetime-local"
            name="date_time"
            value={formData.date_time}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Write your content description here..."
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
            required
          />
        </div>

        {/* Hashtags */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Hashtags
          </label>
          <input
            type="text"
            name="hashtags"
            value={formData.hashtags}
            onChange={handleChange}
            placeholder="#socialmedia #marketing #content"
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-6 rounded-lg gradient-primary text-primary-foreground font-semibold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin-slow" />
              Analyzing...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Analyze Content
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContentForm;
