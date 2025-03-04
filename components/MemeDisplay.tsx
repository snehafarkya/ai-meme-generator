interface Meme {
  name: string;
  url: string;
}

interface MemeDisplayProps {
  meme: Meme | null;
}

const MemeDisplay: React.FC<MemeDisplayProps> = ({ meme }) => {
  return meme ? (
    <div className="mt-5 flex flex-col items-center">
      <p className="text-xl font-medium">{meme.name}</p>
      <img src={meme.url} alt={meme.name} className="w-96 h-auto rounded-lg" />
    </div>
  ) : (
    <p className="text-red-500">No meme selected.</p>
  );
};

export default MemeDisplay;
