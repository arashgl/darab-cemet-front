interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export const PrimaryButton = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`bg-orange-600 text-white rounded-md py-[2px] px-4 text-xs md:text-sm font-medium ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
