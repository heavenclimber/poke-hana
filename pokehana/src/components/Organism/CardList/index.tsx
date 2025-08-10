import { useState } from "react";
import { CardPreview } from "@/components/Organism";
import Image from "next/image";
import { PokemonCard } from "@/services/types";

type Props = {
  cards: PokemonCard[];
};

const PokemonGallery: React.FC<Props> = ({ cards }) => {
  const [activeCard, setActiveCard] = useState<PokemonCard | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4 p-6">
        {cards?.map((card) => (
          <Image
            key={card.id}
            src={card.images.small}
            alt={card.name}
            width={200}
            height={200}
            className="cursor-pointer rounded-lg shadow-md hover:scale-105 transition-transform"
            onClick={() => setActiveCard(card)}
            draggable={false}
          />
        ))}
      </div>

      {activeCard && (
        <CardPreview card={activeCard} onClose={() => setActiveCard(null)} />
      )}
    </>
  );
};

export default PokemonGallery;
