import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Home,
  Gamepad2,
  Globe,
  Moon,
  Sun,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useTheme } from "../ThemeContext";
import { useLocale } from "../i18n";
import { ApiImage } from "../ApiImage";

export interface GameItem {
  path: string;
  title: string;
  titleAr: string;
  bg: string;
  renderIcon: () => React.ReactNode;
}

export const GAMES_LIST: GameItem[] = [
  {
    path: "memory",
    title: "Memory Match",
    titleAr: "لعبة الذاكرة",
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    renderIcon: () => (
      <div className="relative flex items-center justify-center gap-2 w-full h-full">
        {/* Card 1: Flipped with Heart */}
        <div
          className="w-[34%] h-[46%] bg-white rounded-md flex items-center justify-center text-xl sm:text-2xl shadow-md"
          style={{ transform: "rotate(-6deg)" }}
        >
          <span className="select-none leading-none">❤️</span>
        </div>
        {/* Card 2: Face-down purple card */}
        <div
          className="w-[34%] h-[46%] rounded-md flex items-center justify-center shadow-md relative"
          style={{
            background: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)",
            transform: "rotate(6deg)",
          }}
        >
          <div className="w-[62%] h-[62%] border-2 border-white/60 rounded-[3px]" />
        </div>
      </div>
    ),
  },
  {
    path: "tictactoe",
    title: "Tic-Tac-Toe",
    titleAr: "إكس-أو",
    bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    renderIcon: () => (
      <div className="relative flex items-center justify-center w-full h-full p-2">
        <svg width="68%" height="68%" viewBox="0 0 90 90">
          {/* Grid lines */}
          <line x1="30" y1="10" x2="30" y2="80" stroke="rgba(255,255,255,0.85)" strokeWidth="3" strokeLinecap="round" />
          <line x1="60" y1="10" x2="60" y2="80" stroke="rgba(255,255,255,0.85)" strokeWidth="3" strokeLinecap="round" />
          <line x1="10" y1="30" x2="80" y2="30" stroke="rgba(255,255,255,0.85)" strokeWidth="3" strokeLinecap="round" />
          <line x1="10" y1="60" x2="80" y2="60" stroke="rgba(255,255,255,0.85)" strokeWidth="3" strokeLinecap="round" />
          {/* X top-left */}
          <line x1="15" y1="15" x2="25" y2="25" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          <line x1="25" y1="15" x2="15" y2="25" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          {/* O center */}
          <circle cx="45" cy="45" r="10" stroke="#fff" strokeWidth="4" fill="none" />
          {/* X bottom-right */}
          <line x1="65" y1="65" x2="75" y2="75" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          <line x1="75" y1="65" x2="65" y2="75" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
    ),
  },
  {
    path: "sliding",
    title: "Sliding Puzzle",
    titleAr: "لعبة الألغاز",
    bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    renderIcon: () => (
      <div className="relative flex items-center justify-center w-full h-full p-2">
        <div className="grid gap-1 w-[64%] h-[64%]" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div
              key={num}
              className="bg-white rounded-[4px] flex items-center justify-center font-bold text-[#4facfe] shadow-sm select-none"
              style={{ fontSize: "14px", fontWeight: 800 }}
            >
              {num}
            </div>
          ))}
          <div className="rounded-[4px] bg-white/20" />
        </div>
      </div>
    ),
  },
  {
    path: "color",
    title: "Color Match",
    titleAr: "تطابق الألوان",
    bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    renderIcon: () => (
      <div className="relative flex items-center justify-center w-full h-full p-3">
        <div className="grid gap-2 w-[56%] h-[56%]" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          <div className="rounded-md sm:rounded-lg shadow-sm" style={{ backgroundColor: "#FF6B6B" }} />
          <div className="rounded-md sm:rounded-lg shadow-sm" style={{ backgroundColor: "#4ECDC4" }} />
          <div className="rounded-md sm:rounded-lg shadow-sm" style={{ backgroundColor: "#FFE66D" }} />
          <div className="rounded-md sm:rounded-lg shadow-sm" style={{ backgroundColor: "#A8E6CF" }} />
        </div>
      </div>
    ),
  },
  {
    path: "pattern",
    title: "Pattern Memory",
    titleAr: "ذاكرة الأنماط",
    bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    renderIcon: () => (
      <div className="relative flex items-center justify-center w-full h-full p-2">
        <div className="grid gap-2.5 sm:gap-3 w-[62%]" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[
            { active: true, delay: "0s" },
            { active: false, delay: "0s" },
            { active: true, delay: "0.2s" },
            { active: false, delay: "0s" },
            { active: true, delay: "0.4s" },
            { active: false, delay: "0s" },
            { active: true, delay: "0.6s" },
            { active: false, delay: "0s" },
            { active: true, delay: "0.8s" },
          ].map((dot, i) => (
            <div
              key={i}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full mx-auto"
              style={{
                backgroundColor: dot.active ? "#fff" : "rgba(255,255,255,0.25)",
                boxShadow: dot.active ? "0 0 10px rgba(255,255,255,0.8)" : "none",
                animation: dot.active ? `patternPulse 1.6s ease-in-out infinite ${dot.delay}` : "none",
              }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    path: "emoji",
    title: "Emoji Match",
    titleAr: "تطابق الرموز",
    bg: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    renderIcon: () => (
      <div className="relative flex items-center justify-center gap-1.5 w-full h-full px-2">
        {["😊", "🎮", "⭐", "🎨"].map((emoji, i) => (
          <div
            key={i}
            className="w-[22%] h-[42%] bg-white rounded-md flex items-center justify-center text-base sm:text-lg shadow-md select-none"
            style={{
              transform: i % 2 === 0 ? "rotate(-5deg)" : "rotate(5deg)",
            }}
          >
            {emoji}
          </div>
        ))}
      </div>
    ),
  },
  {
    path: "simon",
    title: "Simon Says",
    titleAr: "سيمون يقول",
    bg: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    renderIcon: () => (
      <div className="relative flex items-center justify-center w-full h-full p-2">
        <div className="grid grid-cols-2 gap-1.5 w-[62%] h-[62%]">
          <div className="rounded-tl-md sm:rounded-tl-lg shadow-sm" style={{ backgroundColor: "#ef4444" }} />
          <div className="rounded-tr-md sm:rounded-tr-lg shadow-sm" style={{ backgroundColor: "#3b82f6" }} />
          <div className="rounded-bl-md sm:rounded-bl-lg shadow-sm" style={{ backgroundColor: "#10b981" }} />
          <div className="rounded-br-md sm:rounded-br-lg shadow-sm" style={{ backgroundColor: "#f59e0b" }} />
        </div>
      </div>
    ),
  },
  {
    path: "wordsearch",
    title: "Word Search",
    titleAr: "البحث عن الكلمات",
    bg: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
    renderIcon: () => (
      <div className="relative flex items-center justify-center w-full h-full">
        <span
          className="text-white font-extrabold tracking-wider select-none drop-shadow-md"
          style={{ fontSize: "32px", fontFamily: "sans-serif" }}
        >
          ABC
        </span>
      </div>
    ),
  },
  {
    path: "reaction",
    title: "Reaction Time",
    titleAr: "سرعة الاستجابة",
    bg: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    renderIcon: () => (
      <div className="relative flex items-center justify-center w-full h-full p-2">
        <div className="w-[66%] h-[66%] rounded-full border-[3.5px] border-white flex items-center justify-center">
          <div className="w-[60%] h-[60%] bg-white rounded-full animate-pulse" />
        </div>
      </div>
    ),
  },
  {
    path: "brainmath",
    title: "Brain Math",
    titleAr: "رياضيات العقل",
    bg: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
    renderIcon: () => (
      <div className="relative flex flex-col items-center justify-center w-full h-full select-none">
        <span className="text-3xl sm:text-4xl leading-none">🧠</span>
        <span className="font-extrabold text-white text-lg sm:text-xl tracking-wide -mt-1 drop-shadow-sm">
          7 + 5
        </span>
      </div>
    ),
  },
  {
    path: "trivia",
    title: "Trivia Quiz",
    titleAr: "مسابقة المعلومات",
    bg: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
    renderIcon: () => (
      <div className="relative flex items-center justify-center w-full h-full select-none">
        <span
          className="text-4xl sm:text-5xl font-black text-red-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          style={{
            WebkitTextStroke: "1.5px #000",
          }}
        >
          ?
        </span>
      </div>
    ),
  },
  {
    path: "puzzle",
    title: "Puzzle",
    titleAr: "لعبة التركيب",
    bg: "linear-gradient(135deg, #1A56DB 0%, #06B6D4 100%)",
    renderIcon: () => (
      <div className="relative flex items-center justify-center w-full h-full p-2">
        <svg width="70%" height="70%" viewBox="0 0 100 100" fill="none">
          <defs>
            <filter id="hubPieceShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.25" />
            </filter>
          </defs>
          <path
            d="M35 35 H65 V45 A7 7 0 1 1 65 55 V65 H55 A7 7 0 1 0 45 65 H35 V35 Z"
            fill="white"
            filter="url(#hubPieceShadow)"
          />
        </svg>
      </div>
    ),
  },
  {
    path: "wordchain",
    title: "Word Chain",
    titleAr: "سلسلة الكلمات",
    bg: "linear-gradient(135deg, #065F46 0%, #047857 100%)",
    renderIcon: () => (
      <div className="relative flex items-center justify-center w-full h-full p-2">
        <svg
          width="62%"
          height="62%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </div>
    ),
  },
];

export function GamesHub() {
  const { theme, locale, setLocale, darkMode, setDarkMode } = useTheme();
  const { dir, fontFamily, isRTL } = useLocale();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Ignored if blocked by browser policy
    }
  };

  const toggleLanguage = () => {
    setLocale(locale === "ar" ? "en" : "ar");
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Hospital overlay color based on theme and dark mode
  const overlayGradient = darkMode
    ? "linear-gradient(135deg, rgba(4, 53, 67, 0.94) 0%, rgba(3, 31, 46, 0.97) 100%)"
    : "linear-gradient(135deg, rgba(0, 138, 171, 0.88) 0%, rgba(0, 107, 133, 0.92) 100%)";

  return (
    <div
      dir={dir}
      className="relative min-h-screen w-full flex flex-col select-none overflow-x-hidden overflow-y-auto"
      style={{
        fontFamily,
        backgroundColor: darkMode ? "#071c26" : "#008AAB",
      }}
    >
      <style>{`
        @keyframes patternPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>

      {/* Hospital hero photo background */}
      {theme.heroImageUrl && (
        <ApiImage
          src={theme.heroImageUrl}
          alt=""
          aria-hidden
          className="fixed inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            opacity: 0.22,
            mixBlendMode: "luminosity",
          }}
        />
      )}

      {/* Cyan/Teal Gradient Overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: overlayGradient,
        }}
      />

      {/* Top Header Bar */}
      <header className="relative z-20 shrink-0 w-full px-4 sm:px-8 md:px-12 pt-4 sm:pt-6 pb-2 sm:pb-4 flex items-center justify-between">
        {/* Left: Home button + Games badge */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Home icon button */}
          <Link
            to="/"
            title={isRTL ? "الرئيسية" : "Home"}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 text-white cursor-pointer"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <Home size={20} className="sm:w-[22px] sm:h-[22px]" />
          </Link>

          {/* Games Title Pill / Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <Gamepad2 size={22} className="sm:w-[24px] sm:h-[24px]" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-sm">
              {isRTL ? "الألعاب" : "Games"}
            </h1>
          </div>
        </div>

        {/* Right: Controls (Language, Theme, Fullscreen) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            title={isRTL ? "English" : "العربية"}
            aria-label="Toggle Language"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full sm:rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 text-white hover:bg-white/20 cursor-pointer"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <Globe size={18} className="sm:w-[20px] sm:h-[20px]" />
          </button>

          {/* Theme Mode Toggle */}
          <button
            onClick={toggleTheme}
            title={darkMode ? (isRTL ? "الوضع الفاتح" : "Light Mode") : (isRTL ? "الوضع الليلي" : "Dark Mode")}
            aria-label="Toggle Theme Mode"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full sm:rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 text-white hover:bg-white/20 cursor-pointer"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {darkMode ? <Sun size={18} className="sm:w-[20px] sm:h-[20px]" /> : <Moon size={18} className="sm:w-[20px] sm:h-[20px]" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? (isRTL ? "إنهاء ملء الشاشة" : "Exit Fullscreen") : (isRTL ? "ملء الشاشة" : "Fullscreen")}
            aria-label="Toggle Fullscreen"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full sm:rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 text-white hover:bg-white/20 cursor-pointer"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {isFullscreen ? <Minimize2 size={18} className="sm:w-[20px] sm:h-[20px]" /> : <Maximize2 size={18} className="sm:w-[20px] sm:h-[20px]" />}
          </button>
        </div>
      </header>

      {/* Main Content: Responsive Games Grid */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-10">
        <div
          className="w-full max-w-7xl mx-auto grid gap-x-4 sm:gap-x-8 md:gap-x-10 lg:gap-x-12 gap-y-6 sm:gap-y-8 md:gap-y-10 justify-center items-start"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit, minmax(clamp(100px, 14vw, 150px), 1fr))",
            maxWidth: "1380px",
          }}
        >
          {GAMES_LIST.map((game) => {
            const displayName = isRTL ? game.titleAr : game.title;
            return (
              <Link
                key={game.path}
                to={`/${game.path}`}
                tabIndex={0}
                data-nav="true"
                className="group relative flex flex-col items-center gap-2.5 sm:gap-3 transition-transform duration-200 ease-out active:scale-95 hover:-translate-y-1 focus-visible:scale-105 focus-visible:outline-none cursor-pointer"
                style={{
                  textDecoration: "none",
                }}
              >
                {/* Game Icon Card */}
                <div
                  className="relative overflow-hidden flex items-center justify-center w-[105px] h-[105px] sm:w-[125px] sm:h-[125px] md:w-[140px] md:h-[140px] rounded-2xl md:rounded-[22px] transition-all duration-300 group-hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.45)] group-focus-visible:ring-4 group-focus-visible:ring-white"
                  style={{
                    background: game.bg,
                    boxShadow:
                      "0 10px 25px -5px rgba(0,0,0,0.32), 0 6px 12px -6px rgba(0,0,0,0.25)",
                    border: "1.5px solid rgba(255,255,255,0.18)",
                  }}
                >
                  {/* Inner glossy highlight */}
                  <div
                    className="absolute inset-x-0 top-0 h-[45%] pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 100%)",
                      borderRadius: "inherit",
                    }}
                  />

                  {/* Rendered Game Icon */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {game.renderIcon()}
                  </div>
                </div>

                {/* Game Name */}
                <span
                  className="text-white font-medium text-xs sm:text-sm md:text-base text-center leading-tight drop-shadow transition-colors duration-200 group-hover:text-white group-hover:font-semibold"
                  style={{
                    maxWidth: "140px",
                    textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                  }}
                >
                  {displayName}
                </span>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
