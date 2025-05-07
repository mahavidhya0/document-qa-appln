
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, FileText, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Header: React.FC = () => {
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
    <header className="bg-white border-b sticky top-0 z-10">
      
    </header>
  );
};

export default Header;
