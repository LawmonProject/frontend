import { ReactNode } from 'react';

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
    <div className="relative inline-block rounded-full">
      <button
        className={`relative rounded-full py-3 px-10 w-full hover:opacity-80 transition-all ${className}`}
        onClick={onClick}
        style={{
          background:
            'linear-gradient(90deg, rgba(136, 177, 255, 0.2) 0%, rgba(111, 102, 149, 0.2) 103.24%)',
          border: '2px solid transparent',
          borderImageSource: 'linear-gradient(90deg, #88B1FF 0%, #6F6695 100%)',
          borderImageSlice: 1,
        }}
      >
        {children}
      </button>
    </div>
  );
}
