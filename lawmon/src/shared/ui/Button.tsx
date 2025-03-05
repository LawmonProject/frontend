import { ReactNode } from 'react';
import './Button.css'


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

      {/* 실제 버튼 */}
      <button
        className={`relative rounded-full py-3 px-10 w-full hover:opacity-80 transition-all ButtonCSS ${className}`}
        onClick={onClick}
        style={{
        //   background:
        //     'linear-gradient(90deg, rgba(136, 177, 255, 0.2) 0%, rgba(111, 102, 149, 0.2) 103.24%)',


        }}
      >


        {children}
      </button>
    </div>
  );
}
