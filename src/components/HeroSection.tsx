import { useState } from "react";
import { ShapeDivider } from "./ShapeDivider";
import heroImage from "../assets/hero-image.webp";
import searchIcon from "../assets/icons/search.svg";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const properties = [
    "Campestre",
    "Jardim",
    "Jardim Bela Vista",
    "Vila Gilda",
    "VIla Bastos",
  ];

  const handleSearch = () => {
    onSearch(searchQuery);
    document.getElementById("imoveis")?.scrollIntoView({ behavior: "smooth" });
    setSuggestions([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filteredSuggestions = properties.filter((property) =>
        property.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    handleSearch();
  };

  return (
    <section>
      <div className="bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-400 via-blue-200 to-green-100 pt-24 mbl:bg-heroSection mbl:bg-cover mbl:bg-center">
        <div className="grid grid-cols-2 items-center justify-center mb-14 mbl:grid-cols-1 mbl:w-full">
          <div className="relative left-32 flex flex-col gap-6 items-start justify-center h-max p-12 py-24 bg-white border border-gray-50 rounded-md shadow-2xl md:left-12 mbl:static mbl:h-auto mbl:m-5 mbl:p-6 mbl:py-12">
            <h1 className="w-11/12 uppercase font-bold text-4xl leading-tight mbl:text-2xl mbl:font-extrabold">
              Descubra onde sua felicidade começa com o{" "}
              <span className="font-urbaneBold text-green-500 underline">
                seu imóvel
              </span>
            </h1>
            <p className="text-lg mbl:text-base">
              Somos uma incorporadora que busca melhorar a experiência de
              consumo do mercado imobiliário.
            </p>
            <div className="w-full flex flex-row items-center justify-center h-14 relative mbl:w-full">
              <input
                type="text"
                placeholder="Pesquisar imóveis por nome, bairro, cidade..."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className="border rounded-l-md px-4 w-full h-full focus:border-2 focus:border-green-500 focus:outline-none mbl:w-full"
              />
              <button
                aria-label="Pesquisar imóvel"
                className="flex flex-col items-center justify-center h-full px-6 rounded-r-md bg-green-500"
                onClick={handleSearch}
              >
                <img width={32} src={searchIcon} alt="" />
              </button>
              {suggestions.length > 0 && (
                <ul className="absolute top-full mt-1 w-96 bg-white border border-gray-300 rounded-md shadow-lg z-10 mbl:w-full">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="mbl:hidden">
            <img
              className="rounded w-screen shadow-inner"
              src={heroImage}
              alt=""
            />
          </div>
        </div>
        <ShapeDivider />
      </div>
    </section>
  );
}
