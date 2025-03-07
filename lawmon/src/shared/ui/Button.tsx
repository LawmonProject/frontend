import { ReactNode } from 'react';
import './Button.css';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  className = '',
  onClick,
}: ButtonProps) {
  return (
    <div className="relative inline-block">
      <button
        className={`relative rounded-full py-3 px-10 w-full hover:opacity-80 transition-all ButtonCSS ${className}`}
        onClick={onClick}
        style={{}}
      >
        {children}
      </button>
    </div>
  );
}
