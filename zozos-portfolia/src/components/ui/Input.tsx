interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
}: InputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-navy mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-cream border-3 border-navy text-navy placeholder:text-muted focus:shadow-brutal focus:outline-none transition-shadow duration-200"
      />
    </div>
  );
}
