'use client';

import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button 
      onClick={onClick} 
      className={variant}
    >
      {text}
      
      <style jsx>{`
        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          border-radius: 0.25rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s;
        }
        
        button:active {
          transform: translateY(1px);
        }
        
        .primary {
          background-color: #0070f3;
          color: white;
          border: none;
        }
        
        .primary:hover {
          background-color: #0060df;
        }
        
        .secondary {
          background-color: transparent;
          color: #0070f3;
          border: 1px solid #0070f3;
        }
        
        .secondary:hover {
          background-color: rgba(0, 112, 243, 0.05);
        }
      `}</style>
    </button>
  );
};
