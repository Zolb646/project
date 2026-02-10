interface TextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({
  label,
  name,
  placeholder,
  required,
  rows = 5,
  value,
  onChange,
}: TextareaProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-navy mb-2">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-cream border-3 border-navy text-navy placeholder:text-muted focus:shadow-brutal focus:outline-none transition-shadow duration-200 resize-none"
      />
    </div>
  );
}
