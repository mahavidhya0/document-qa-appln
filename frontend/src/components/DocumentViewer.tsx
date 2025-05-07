
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Search, Book, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DocumentViewerProps {
  title: string;
  content: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ title, content }) => {
  return (
    <div className="border rounded-lg h-full flex flex-col">
      <div className="border-b p-3 flex justify-between items-center bg-gray-50">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-brand-600" />
          <h3 className="font-medium truncate">{title}</h3>
        </div>
        
        <div className="flex items-center">
          <div className="relative mr-2">
            <Search className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search in document" 
              className="pl-8 h-8 text-sm w-[200px]" 
            />
          </div>
          
          <Button variant="ghost" size="sm">
            <Book className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-grow p-4">
        <div className="prose prose-sm max-w-none">
          {content}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DocumentViewer;
