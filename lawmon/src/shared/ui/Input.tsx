
import './Input.css';

interface InputProps {
  placeholder?: string;
  height?: string;
  error?: boolean;
}

export default function Input({ placeholder }: InputProps) {
  return <input className={'Input'} placeholder={placeholder}/>;
};
