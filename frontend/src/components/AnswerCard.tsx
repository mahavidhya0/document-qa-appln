
import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnswerCardProps {
  id: string;
  content: string;
  answeredBy: string;
  answeredAt: string;
  votes: number;
  isAccepted?: boolean;
}

const AnswerCard: React.FC<AnswerCardProps> = ({
  id,
  content,
  answeredBy,
  answeredAt,
  votes,
  isAccepted = false,
}) => {
  return (
    <div className={`answer-card ${isAccepted ? 'border-green-500 bg-green-50' : ''}`}>
      <div className="flex gap-4">
        <div className="flex flex-col items-center min-w-[40px] pt-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
            <ThumbsUp className="h-4 w-4" />
          </Button>
          <span className="font-medium text-sm">{votes}</span>
          <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
            <ThumbsDown className="h-4 w-4" />
          </Button>
          
          {isAccepted && (
            <div className="mt-2 text-green-600 text-xs font-medium">
              Accepted
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="prose prose-sm max-w-none">
            <p>{content}</p>
          </div>
          
          <div className="mt-4 text-sm text-gray-500 flex justify-between">
            <div>
              Answered by <Link to={`/users/${answeredBy}`} className="text-brand-600">{answeredBy}</Link>
            </div>
            <div>{answeredAt}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
