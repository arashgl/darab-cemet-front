interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export const SecondaryButton = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`bg-[#F2582214] text-orange-600 min-w-[120px] rounded-lg py-1.5 px-3 md:px-4 text-xs md:text-sm font-medium ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
