import { PokemonCard } from "@/services/types";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

type Props = {
  card: PokemonCard;
  onClose: () => void;
};

const CARD_BACK_URL = "https://images.pokemontcg.io/cardback.png"; // Replace with your actual card back image URL

const CardPreview: React.FC<Props> = ({ card, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [showDetail, setShowDetail] = useState(false);

  const [showFront, setShowFront] = useState(false); // control which side to show
  const [frontLoaded, setFrontLoaded] = useState(false);

  const isHolo = card?.rarity?.toLowerCase().includes("holo");

  // Flip timing: show back card at least 1 second before front
  useEffect(() => {
    if (frontLoaded) {
      const timer = setTimeout(() => setShowFront(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [frontLoaded]);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    let startX = 0;
    let startY = 0;

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      setDragging(true);
      startX = e.clientX;
      startY = e.clientY;
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const rotateX = Math.max(Math.min(deltaY / 5, 15), -15);
      const rotateY = Math.max(Math.min(deltaX / 5, 15), -15);
      setRotation({ x: rotateX, y: rotateY });
    };

    const onPointerUp = () => {
      setDragging(false);
      setRotation({ x: 0, y: 0 });
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    modal.addEventListener("pointerdown", onPointerDown);

    return () => {
      modal.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [dragging]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      style={{ perspective: "1000px" }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => {
          e.stopPropagation();
          setShowDetail(!showDetail);
        }}
        className="relative w-64 sm:w-96 cursor-grab select-none rounded-lg shadow-2xl"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: dragging ? "none" : "transform 0.3s ease",
          width: 250,
          height: 350,
          perspective: 1000,
        }}
      >
        {/* Container for flip */}
        <div
          className={`relative w-full h-full transition-transform duration-700 ease-in-out`}
          style={{
            transformStyle: "preserve-3d",
            transform: showFront ? "rotateY(0deg)" : "rotateY(180deg)",
          }}
        >
          {/* Back side */}
          <div
            className="absolute w-full h-full rounded-lg shadow-lg"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <Image
              src={CARD_BACK_URL}
              alt="Card back"
              width={250}
              height={350}
              className="rounded-lg"
              draggable={false}
              unoptimized
            />
          </div>

          {/* Front side */}
          <div
            className="absolute w-full h-full rounded-lg shadow-lg"
            style={{
              backfaceVisibility: "hidden",
              overflow: "hidden",
            }}
          >
            <Image
              src={card.images.large}
              alt={card.name}
              width={250}
              height={350}
              onLoadingComplete={() => setFrontLoaded(true)}
              className="rounded-lg"
              draggable={false}
              unoptimized
            />
            {isHolo && (
              <div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  mixBlendMode: "overlay",
                  background:
                    "linear-gradient(130deg, red, orange, yellow, green, cyan, blue, violet)",
                  backgroundSize: "400% 400%",
                  animation: "rainbowShift 3s ease infinite",
                  opacity: 0.3,
                }}
              />
            )}
          </div>
        </div>

        <style jsx global>{`
          @keyframes rainbowShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </div>
      {showDetail && (
        <div
          className={`flex items-center space-x-6 ml-4 bg-white rounded-lg p-6 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-shrink-0 w-80 text-gray-900 text-sm overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl font-semibold mb-4">{card.name}</h2>
            <p>
              <b>HP:</b> {card.hp}
            </p>
            <p>
              <b>Types:</b> {card?.types?.join(", ")}
            </p>
            <p>
              <b>Subtypes:</b> {card?.subtypes?.join(", ")}
            </p>
            <p>
              <b>Rarity:</b> {card.rarity}
            </p>
            <p>
              <b>Artist:</b> {card.artist}
            </p>
            <p className="mt-3">
              <b>Attacks:</b>
            </p>
            <ul className="list-disc list-inside">
              {card?.attacks?.map((atk) => (
                <li key={atk.name}>
                  <b>{atk.name}</b>: {atk.text} ({atk.damage} damage)
                </li>
              ))}
            </ul>
            <p className="mt-3">
              <b>Weaknesses:</b>{" "}
              {card?.weaknesses?.map((w) => `${w.type} ${w.value}`).join(", ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardPreview;
