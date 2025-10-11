import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ links = [] }) => {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
      {links.map((link, index) => {
        const isLast = index === links.length - 1;
        
        return (
          <React.Fragment key={index}>
            {link.to ? (
              <Link
                to={link.to}
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <span className={`${isLast ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                {link.label}
              </span>
            )}
            
            {!isLast && (
              <span className="text-gray-400 select-none">
                &gt;
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
