import { PokemonCard } from "@/services/types";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

type Props = {
  card: PokemonCard;
  onClose: () => void;
};

const CARD_BACK_URL = "https://images.pokemontcg.io/cardback.png";

const CardPreview: React.FC<Props> = ({ card, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // showFront:
  // false = showing back of card (initially card back image, later detail)
  // true = showing front (art)
  const [showFront, setShowFront] = useState(false);

  // isFlipped means the card passed the initial flip and back now shows detail
  const [isFlipped, setIsFlipped] = useState(false);

  const frontLoaded = useRef(false);

  const isHolo = card?.rarity?.toLowerCase().includes("holo");

  // When front image loaded, trigger auto flip after 1 second
  const onFrontLoad = () => {
    frontLoaded.current = true;
  };

  useEffect(() => {
    if (frontLoaded.current) {
      const timer = setTimeout(() => {
        setShowFront(true);
      }, 1000);
      const timer2 = setTimeout(() => {
        setIsFlipped(true);
      }, 2000);
      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
    }
  }, [frontLoaded.current]);

  // Drag rotation logic (unchanged)
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

  // Click toggles art <-> detail but only after initial flip
  const onCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFlipped) return;
    setShowFront((prev) => !prev);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      style={{ perspective: "1000px" }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={onCardClick}
        className="relative w-64 sm:w-96 cursor-grab select-none rounded-lg shadow-2xl"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: dragging ? "none" : "transform 0.3s ease",
          width: 250,
          height: 350,
          perspective: 1000,
        }}
      >
        {/* Flip container */}
        <div
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: showFront ? "rotateY(0deg)" : "rotateY(180deg)",
          }}
        >
          {/* Back side (card back before flip, detail after flip) */}
          <div
            className={`absolute w-full h-full rounded-lg shadow-lg ${
              isFlipped && "bg-white"
            }`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              overflowY: isFlipped ? "auto" : "hidden",
              WebkitOverflowScrolling: "touch",
              touchAction: "auto",
            }}
          >
            {!isFlipped ? (
              <Image
                src={CARD_BACK_URL}
                alt="Card back"
                width={250}
                height={350}
                className="rounded-lg"
                draggable={false}
                unoptimized
              />
            ) : (
              <div
                tabIndex={0}
                className="p-4 text-gray-900 text-sm overflow-y-auto h-full"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
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
                  {card?.weaknesses
                    ?.map((w) => `${w.type} ${w.value}`)
                    .join(", ")}
                </p>
              </div>
            )}
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
              onLoadingComplete={onFrontLoad}
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
    </div>
  );
};

export default CardPreview;
