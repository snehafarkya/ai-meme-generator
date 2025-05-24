import { useState } from "react";
import { useMemes } from "../hooks/useMeme";
import SearchBar from "../components/SearchBar";
import MemeDisplay from "../components/MemeDisplay";
import MemeTextInput from "../components/MemeTextInput";
import Button from "../components/Button";

const Home: React.FC = () => {
  const { selectedMeme, generatedMeme, searchMeme, generateMeme } = useMemes();
  const [texts, setTexts] = useState<string[]>([]);

  const handleTextChange = (index: number, value: string) => {
    setTexts((prevTexts) => {
      const newTexts = [...prevTexts];
      newTexts[index] = value;
      return newTexts;
    });
  };
  const downloadMeme = async () => {
    if (!generatedMeme) return;

    try {
      const response = await fetch(generatedMeme);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "meme.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("Failed to download meme"+ error);
    }
  };

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-4xl text-center font-semibold drop-shadow-xl md:shadow-2xl">
        Your Favorite <span className="text-green-600 bg-amber-100 px-2">MEME</span> Generator
      </h1>

      <SearchBar onSearch={searchMeme} />

      <MemeDisplay meme={selectedMeme} />

      {selectedMeme && (
        <MemeTextInput boxCount={selectedMeme.box_count} onTextChange={handleTextChange} />
      )}

      <div className="mt-3 flex gap-3">
        <Button
          onClick={() => generateMeme(texts)}
          label="Generate Meme"
          color="bg-[#56b8b9] hover:bg-[#075354] hover:shadow-2xl cursor-pointer"
        />
        {generatedMeme && <Button onClick={downloadMeme} label="Download Meme" color="bg-red-500 cursor-pointer hover:shadow-2xl hover:bg-red-600" />}
      </div>

      {generatedMeme && <MemeDisplay meme={{ url: generatedMeme, name: "Generated Meme" }} />}
    </div>
  );
};

export default Home;
