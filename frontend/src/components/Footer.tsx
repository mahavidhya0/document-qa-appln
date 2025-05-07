
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">DocuQuery</h3>
            <p className="text-gray-600">
              A community-driven Q&A platform for document-based knowledge sharing
            </p>
          </div>          
        </div>
        <div className="border-t mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} DocuQuery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
