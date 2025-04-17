
import './Input.css';

interface InputProps {
  placeholder?: string;
  height?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

export default function Input({ placeholder, value, onChange }: InputProps) {
  return <input className={'Input'} placeholder={placeholder} value={value} onChange={onChange}/>;
};
