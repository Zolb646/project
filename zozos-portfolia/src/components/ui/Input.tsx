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
        className="w-full px-4 py-3 rounded-lg bg-white border border-control text-navy placeholder:text-muted focus:border-accent-orange-ink focus:outline-2 focus:outline-accent-orange-ink/20 focus:outline-offset-0 transition-colors duration-200"
      />
    </div>
  );
}
