interface MemeTextInputProps {
  boxCount: number;
  onTextChange: (index: number, value: string) => void;
}

const MemeTextInput: React.FC<MemeTextInputProps> = ({ boxCount, onTextChange }) => {
  return (
    <div className="mt-3 flex flex-col gap-2">
      {Array.from({ length: boxCount }, (_, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Text ${index + 1}`}
          className="p-2 border rounded"
          onChange={(e) => onTextChange(index, e.target.value)}
        />
      ))}
    </div>
  );
};

export default MemeTextInput;
