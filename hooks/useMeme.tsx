import { useState, useEffect } from "react";

interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

export const useMemes = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [generatedMeme, setGeneratedMeme] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const data = await response.json();
        setMemes(data.data.memes);
        setSelectedMeme(data.data.memes[0] || null); // Default meme
      } catch (error) {
        console.error("Failed to fetch memes:", error);
      }
    };

    fetchMemes();
  }, []);

  const searchMeme = (searchTerm: string) => {
    const foundMeme = memes.find((meme) =>
      meme.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (foundMeme) {
      setSelectedMeme(foundMeme);
    } else {
      alert("Meme not found!");
    }
  };

  const generateMeme = async (topText: string, bottomText: string) => {
    if (!selectedMeme) return;
    setLoading(true);

    const url = `https://api.imgflip.com/caption_image?template_id=${selectedMeme.id}&username=Sneha8&password=123456789a!&text0=${topText}&text1=${bottomText}&max_font_size=24`;

    try {
      const response = await fetch(url, { method: "POST" });
      const data = await response.json();

      if (data.success) {
        setGeneratedMeme(data.data.url);
      } else {
        alert("Failed to generate meme.");
      }
    } catch (error) {
      console.error("Error generating meme:", error);
    } finally {
      setLoading(false);
    }
  };

  return { memes, selectedMeme, generatedMeme, searchMeme, generateMeme, loading };
};
