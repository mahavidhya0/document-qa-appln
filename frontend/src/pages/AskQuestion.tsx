
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AskQuestion: React.FC = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Question submitted",
        description: "Your question has been successfully submitted.",
      });
      // Redirect would happen here in a real app
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Ask a Question</h1>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800">Tips for asking a good question:</h3>
                <ul className="list-disc pl-5 mt-2 text-sm text-yellow-800">
                  <li>Make your question title specific and descriptive</li>
                  <li>Include details about what you've already tried</li>
                  <li>Add relevant code or error messages</li>
                  <li>Check if your question has already been asked</li>
                  <li>Use appropriate tags to categorize your question</li>
                </ul>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's your question? Be specific."
                required
              />
              <p className="text-sm text-gray-500">
                Your title should summarize the problem you're facing
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="details">Details</Label>
              <Textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Provide all the details about your question here..."
                required
                className="min-h-[250px]"
              />
              <p className="text-sm text-gray-500">
                Include all relevant information, code snippets, error messages, and what you've already tried
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., javascript, react, node.js (max 5 tags)"
              />
              <p className="text-sm text-gray-500">
                Add up to 5 tags to describe what your question is about
              </p>
            </div>
            
            <div className="flex justify-between items-center pt-4">
              <Button type="button" variant="outline">
                Preview
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Question"}
              </Button>
            </div>
          </form>
          
          <div className="mt-8 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-brand-600" />
              Related Documentation
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              These resources might help you find an answer to your question:
            </p>
            <div className="space-y-2">
              <a href="#" className="block p-2 rounded hover:bg-gray-100 text-brand-600">
                <div className="font-medium">React Documentation</div>
                <p className="text-sm text-gray-500">Official React documentation and guides</p>
              </a>
              <a href="#" className="block p-2 rounded hover:bg-gray-100 text-brand-600">
                <div className="font-medium">JavaScript MDN Docs</div>
                <p className="text-sm text-gray-500">Mozilla Developer Network JavaScript documentation</p>
              </a>
              <a href="#" className="block p-2 rounded hover:bg-gray-100 text-brand-600">
                <div className="font-medium">Community Guidelines</div>
                <p className="text-sm text-gray-500">Learn how to effectively interact with our community</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AskQuestion;
