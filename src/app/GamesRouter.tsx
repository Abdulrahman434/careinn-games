import { useEffect, useState, type ComponentType } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import { RotateCw } from "lucide-react";
import { useTheme } from "./components/ThemeContext";
import { useLocale } from "./components/i18n";
import { GamesHub } from "./components/games/GamesHub";

import { MemoryGame } from "./components/games/MemoryGame";
import { TicTacToeGame } from "./components/games/TicTacToeGame";
import { SlidingPuzzleGame } from "./components/games/SlidingPuzzleGame";
import { ColorMatchGame } from "./components/games/ColorMatchGame";
import { PatternMemoryGame } from "./components/games/PatternMemoryGame";
import { EmojiMatchGame } from "./components/games/EmojiMatchGame";
import { SimonSaysGame } from "./components/games/SimonSaysGame";
import { WordSearchGame } from "./components/games/WordSearchGame";
import { ReactionTimeGame } from "./components/games/ReactionTimeGame";
import { BrainMathGame } from "./components/games/BrainMathGame";
import { TriviaQuizGame } from "./components/games/TriviaQuizGame";
import { ImageJigsawGame } from "./components/games/ImageJigsawGame";
import { WordChainGame } from "./components/games/WordChainGame";

type GameProps = { onClose: () => void; onBackToGames: () => void };

const GAMES: { path: string; Component: ComponentType<GameProps> }[] = [
  { path: "memory", Component: MemoryGame },
  { path: "tictactoe", Component: TicTacToeGame },
  { path: "sliding", Component: SlidingPuzzleGame },
  { path: "color", Component: ColorMatchGame },
  { path: "pattern", Component: PatternMemoryGame },
  { path: "emoji", Component: EmojiMatchGame },
  { path: "simon", Component: SimonSaysGame },
  { path: "wordsearch", Component: WordSearchGame },
  { path: "reaction", Component: ReactionTimeGame },
  { path: "brainmath", Component: BrainMathGame },
  { path: "trivia", Component: TriviaQuizGame },
  { path: "puzzle", Component: ImageJigsawGame },
  { path: "imagepuzzle", Component: ImageJigsawGame },
  { path: "wordchain", Component: WordChainGame },
];

function GameRoute({ Component }: { Component: ComponentType<GameProps> }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { dir, fontFamily } = useLocale();

  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
  });

  const [isForceRotated, setIsForceRotated] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  const { width, height } = dimensions;
  const isPortrait = width < height;

  // Fully adaptive virtual coordinates so the canvas ALWAYS fills 100% of the viewport.
  // No empty letterboxing, no dead white/black bars on Laptop, TV, tablet, or phone (vertical & horizontal).
  let virtualW: number;
  let virtualH: number;
  let scale: number;

  if (isForceRotated) {
    // When manually rotated on portrait mobile to play full landscape:
    // Scaled to fill the screen dimensions rotated 90 degrees
    virtualH = 1080;
    virtualW = Math.max(1440, Math.round(1080 * (height / width)));
    scale = width / 1080;
  } else if (isPortrait) {
    // Mobile / Tablet Portrait view:
    // Virtual width is set to 960px so all headers and boards fit without horizontal scroll or clipping
    virtualW = 960;
    virtualH = Math.round(960 * (height / width));
    scale = width / virtualW;
  } else {
    // Landscape view (TV, Laptop, Desktop, Tablet landscape, Mobile landscape):
    // Virtual height is 1080px, virtual width matches the viewport aspect ratio
    virtualH = 1080;
    virtualW = Math.max(1440, Math.round(1080 * (width / height)));
    scale = height / virtualH;
  }

  const goHome = () => navigate("/");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.background || "#081b24",
      }}
    >
      {/* 100% Screen-filling Adaptive Game Canvas */}
      <div
        dir={dir}
        style={{
          position: "absolute",
          width: `${virtualW}px`,
          height: `${virtualH}px`,
          transform: isForceRotated
            ? `rotate(90deg) scale(${scale})`
            : `scale(${scale})`,
          transformOrigin: "center center",
          background: theme.gradientCanvas || theme.background,
          fontFamily,
          overflow: "hidden",
        }}
      >
        <Component onClose={goHome} onBackToGames={goHome} />
      </div>

      {/* Rotation toggle available in portrait mode if user wants landscape experience on phone */}
      {isPortrait && (
        <button
          onClick={() => setIsForceRotated(!isForceRotated)}
          title="Toggle Orientation"
          aria-label="Toggle Orientation"
          className="fixed bottom-4 right-4 z-[999] flex items-center gap-1.5 px-3 py-2 rounded-full text-white cursor-pointer active:scale-95 text-xs font-semibold shadow-lg backdrop-blur-md transition-all duration-200"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
          }}
        >
          <RotateCw size={14} />
          <span>{isForceRotated ? "Portrait" : "Landscape"}</span>
        </button>
      )}
    </div>
  );
}

export default function GamesRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GamesHub />} />
        {GAMES.map(({ path, Component }) => (
          <Route
            key={path}
            path={`/${path}`}
            element={<GameRoute Component={Component} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
