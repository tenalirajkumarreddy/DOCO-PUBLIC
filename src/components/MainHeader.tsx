import React from 'react';
import { FileSearch, Github, ExternalLink } from 'lucide-react';
import Logo from './Logo';

const MainHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-14 flex items-center justify-between px-4 shadow-sm z-10">
      <div className="flex items-center">
        <Logo className="h-8 w-auto mr-2" />
        <h1 className="text-xl font-bold text-primary-600">DOCO</h1>
        <span className="ml-2 px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-md">
          Portfolio Demo
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search documents..."
            className="pl-10 pr-4 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64 text-sm"
          />
          <FileSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="flex items-center space-x-2">
          <a
            href="https://github.com/tenalirajkumarreddy"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            title="View on GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://portfolio.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors"
            title="View Portfolio"
          >
            <span>Portfolio</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;