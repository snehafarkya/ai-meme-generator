interface MemeTextInputProps {
  onTopTextChange: (text: string) => void;
  onBottomTextChange: (text: string) => void;
}

const MemeTextInput: React.FC<MemeTextInputProps> = ({
  onTopTextChange,
  onBottomTextChange,
}) => {
  return (
    <div className="mt-3 flex md:flex-row flex-col gap-2">
      <input
        type="text"
        placeholder="Top Text"
        className="p-2 border rounded"
        onChange={(e) => onTopTextChange(e.target.value)}
      />
      <input
        type="text"
        placeholder="Bottom Text"
        className="p-2 border rounded"
        onChange={(e) => onBottomTextChange(e.target.value)}
      />
    </div>
  );
};

export default MemeTextInput;
