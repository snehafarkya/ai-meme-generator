import { useState, useEffect } from "react";

interface Meme {
  id: string;
  name: string;
  url: string;
  box_count: number;
}

interface APIResponse {
  success: boolean;
  data: {
    memes: Meme[];
  };
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
        const data: APIResponse = await response.json();
        setMemes(data.data.memes);
        setSelectedMeme(data.data.memes[0]); // Default meme
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

  const generateMeme = async (texts: string[]) => {
    if (!selectedMeme) return;
    setLoading(true);

    const formData = new URLSearchParams();
    formData.append("template_id", selectedMeme.id);
    formData.append("username", "Sneha8");
    formData.append("password", "123456789a!");

    texts.forEach((text, index) => {
      formData.append(`boxes[${index}][text]`, text);
    });

    try {
      const response = await fetch("https://api.imgflip.com/caption_image", {
        method: "POST",
        body: formData,
      });
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

  return { memes, selectedMeme, generatedMeme, searchMeme, generateMeme };
};
