
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold text-brand-700 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">Page not found</p>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Browse Questions</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
