interface ButtonProps {
  onClick: () => void;
  label: string;
  color: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, color }) => {
  return (
    <button className={`px-5 py-2 ${color} text-white rounded`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
