import React, { useState } from 'react';
import Layout from '@/components/Layout';
import QuestionCard from '@/components/QuestionCard';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Search, BookText, MessageSquare, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';

const popularQuestions = [
  {
    id: '1',
    title: 'How do I implement JWT authentication in a React app?',
    excerpt: 'I have a React frontend and I need to implement JWT authentication to secure API calls to my backend. What is the best approach?',
    tags: ['react', 'authentication', 'jwt'],
    votes: 42,
    answers: 7,
    views: 1204,
    askedBy: 'johndoe',
    askedAt: '2 days ago',
  },
  {
    id: '2',
    title: 'Understanding React hooks and their lifecycle',
    excerpt: 'I\'m struggling to understand React hooks, especially useEffect, and how it relates to component lifecycle methods from class components.',
    tags: ['react', 'hooks', 'useEffect'],
    votes: 38,
    answers: 5,
    views: 982,
    askedBy: 'reactdev',
    askedAt: '4 days ago',
  },
  {
    id: '3',
    title: 'Best practices for global state management in 2023',
    excerpt: 'With so many options (Redux, Context API, Zustand, Jotai, etc.), what are the current best practices for state management in React applications?',
    tags: ['react', 'state-management', 'redux'],
    votes: 56,
    answers: 12,
    views: 2341,
    askedBy: 'codingexpert',
    askedAt: '1 week ago',
  },
];

const categories = [
  { name: 'Web Development', count: 1245, icon: <BookText className="h-5 w-5" /> },
  { name: 'Mobile Development', count: 856, icon: <BookText className="h-5 w-5" /> },
  { name: 'DevOps', count: 532, icon: <BookText className="h-5 w-5" /> },
  { name: 'Database', count: 723, icon: <BookText className="h-5 w-5" /> },
  { name: 'UI/UX Design', count: 489, icon: <BookText className="h-5 w-5" /> },
  { name: 'Artificial Intelligence', count: 675, icon: <BookText className="h-5 w-5" /> },
];

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to document-qa with the search query as a parameter
      navigate(`/document-qa?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-700 to-brand-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find answers in pdf documentation</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Search across documentation, ask questions, and learn from a community of experts
          </p>
          
          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for questions or documentation..." 
              className="w-full py-4 pl-12 pr-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/ask">Ask a Question</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" asChild>
              <Link to="/document-qa">
                <Upload className="h-5 w-5 mr-2" />
                Browse Documents
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Popular Questions */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Popular Questions</h2>
              <Button variant="outline" asChild>
                <Link to="/questions">View All</Link>
              </Button>
            </div>
            
            {popularQuestions.map(question => (
              <QuestionCard 
                key={question.id} 
                {...question}
                className="animate-fade-in"
              />
            ))}
          </div>
          
          {/* Sidebar */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Browse Categories</h3>
            <div className="grid gap-3">
              {categories.map(category => (
                <Link
                  key={category.name}
                  to={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <span>{category.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{category.count}</span>
                </Link>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Join the Community</h3>
              <div className="bg-gray-50 rounded-lg p-4 border">
                <p className="text-gray-600 mb-4">
                  Contribute your knowledge and help others by answering questions.
                </p>
                <Button className="w-full" asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-6">
              <div className="font-bold text-3xl text-brand-700 mb-2">10K+</div>
              <div className="text-gray-600">Questions</div>
            </div>
            <div className="p-6">
              <div className="font-bold text-3xl text-brand-700 mb-2">25K+</div>
              <div className="text-gray-600">Answers</div>
            </div>
            <div className="p-6">
              <div className="font-bold text-3xl text-brand-700 mb-2">5K+</div>
              <div className="text-gray-600">Documents</div>
            </div>
            <div className="p-6">
              <div className="font-bold text-3xl text-brand-700 mb-2">50K+</div>
              <div className="text-gray-600">Users</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
