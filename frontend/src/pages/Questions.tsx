
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import QuestionCard from '@/components/QuestionCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Search,
  Filter,
  ChevronDown,
  BookText
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const questionsData = [
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
  {
    id: '4',
    title: 'Optimizing React performance with useMemo and useCallback',
    excerpt: 'I\'m trying to improve the performance of my React application. When should I use useMemo and useCallback hooks?',
    tags: ['react', 'performance', 'optimization'],
    votes: 29,
    answers: 4,
    views: 876,
    askedBy: 'performancegeek',
    askedAt: '1 week ago',
  },
  {
    id: '5',
    title: 'Implementing infinite scroll with React Query',
    excerpt: 'What\'s the best way to implement infinite scrolling with React Query? I need to load more data when the user scrolls to the bottom.',
    tags: ['react', 'react-query', 'infinite-scroll'],
    votes: 31,
    answers: 3,
    views: 652,
    askedBy: 'scrollmaster',
    askedAt: '2 weeks ago',
  },
];

const popularTags = [
  'react', 'javascript', 'typescript', 'node.js', 'python', 
  'html', 'css', 'database', 'authentication', 'api'
];

const Questions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">All Questions</h1>
          <Button asChild>
            <Link to="/ask">Ask Question</Link>
          </Button>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="active">Most Active</SelectItem>
                <SelectItem value="votes">Most Votes</SelectItem>
                <SelectItem value="unanswered">Unanswered</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Questions Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <div className="mb-4 text-sm text-gray-500">
              Found {questionsData.length} questions
            </div>
            
            {questionsData.map((question) => (
              <QuestionCard key={question.id} {...question} />
            ))}
            
            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-brand-50">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <span>...</span>
                <Button variant="outline" size="sm">
                  10
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </nav>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="border rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/tags/${tag}`}
                    className="tag hover:bg-brand-200 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Related Documents</h3>
              <ul className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <li key={i}>
                    <Link 
                      to={`/documents/${i}`}
                      className="flex items-center gap-2 text-sm hover:text-brand-700"
                    >
                      <BookText className="h-4 w-4 text-gray-500" />
                      <span>React Authentication Guide {i}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Questions;
