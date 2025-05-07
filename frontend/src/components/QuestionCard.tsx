
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, ThumbsUp, Eye } from 'lucide-react';

interface QuestionCardProps {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  askedBy: string;
  askedAt: string;
  className?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  title,
  excerpt,
  tags,
  votes,
  answers,
  views,
  askedBy,
  askedAt,
  className = '',
}) => {
  return (
    <div className={`question-card ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center text-center space-y-2 min-w-[60px]">
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700 font-medium">{votes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">{answers}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">{views}</span>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-1">
            <Link to={`/questions/${id}`} className="text-brand-700 hover:text-brand-800">
              {title}
            </Link>
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{excerpt}</p>
          
          <div className="flex flex-wrap mb-3">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Asked by <Link to={`/users/${askedBy}`} className="text-brand-600">{askedBy}</Link></span>
            <span>{askedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
