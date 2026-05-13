import { motion } from "framer-motion";

type CatMood = "curious" | "supportive" | "happy" | "calm" | "concerned";

interface DreamCatMascotProps {
  mood: CatMood;
  size?: "small" | "medium" | "large";
  className?: string;
}

export function DreamCatMascot({
  mood,
  size = "large",
  className = "",
}: DreamCatMascotProps) {
  const dimensions = {
    small: { width: 120, height: 120 },
    medium: { width: 200, height: 200 },
    large: { width: 300, height: 300 },
  };

  const { width, height } = dimensions[size];

  const getMoodColor = () => {
    switch (mood) {
      case "curious":
        return { primary: "#8A2BE2", secondary: "#FF2E97", glow: "#8A2BE2" };
      case "supportive":
        return { primary: "#FF2E97", secondary: "#FF8C00", glow: "#FF2E97" };
      case "happy":
        return { primary: "#FF8C00", secondary: "#FFD700", glow: "#FF8C00" };
      case "concerned":
        return { primary: "#8A2BE2", secondary: "#4169E1", glow: "#8A2BE2" };
      default: // calm
        return { primary: "#4169E1", secondary: "#8A2BE2", glow: "#4169E1" };
    }
  };

  const colors = getMoodColor();

  return (
    <motion.div
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 200"
        style={{
          filter: `drop-shadow(0 0 40px ${colors.glow}80) drop-shadow(0 0 80px ${colors.glow}40)`,
        }}
      >
        <defs>
          {/* Gradient for the cat body */}
          <linearGradient
            id={`catGradient-${mood}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.9" />
            <stop offset="50%" stopColor={colors.secondary} stopOpacity="0.8" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0.9" />
          </linearGradient>

          {/* Glowing aura */}
          <radialGradient id={`auraGradient-${mood}`}>
            <stop offset="0%" stopColor={colors.glow} stopOpacity="0.3" />
            <stop
              offset="50%"
              stopColor={colors.secondary}
              stopOpacity="0.15"
            />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer glow/aura */}
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          fill={`url(#auraGradient-${mood})`}
          animate={{
            r: [85, 95, 85],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Cat sitting silhouette */}
        <g transform="translate(100, 100)">
          {/* Body */}
          <motion.path
            d="M-25,30 Q-35,20 -35,0 Q-35,-25 -20,-35 L-15,-40 Q-10,-25 0,-30 Q10,-25 15,-40 L20,-35 Q35,-25 35,0 Q35,20 25,30 Q15,35 0,35 Q-15,35 -25,30 Z"
            fill={`url(#catGradient-${mood})`}
            animate={{
              d: [
                "M-25,30 Q-35,20 -35,0 Q-35,-25 -20,-35 L-15,-40 Q-10,-25 0,-30 Q10,-25 15,-40 L20,-35 Q35,-25 35,0 Q35,20 25,30 Q15,35 0,35 Q-15,35 -25,30 Z",
                "M-25,30 Q-36,20 -36,0 Q-36,-26 -21,-36 L-16,-41 Q-11,-26 0,-31 Q11,-26 16,-41 L21,-36 Q36,-26 36,0 Q36,20 26,30 Q16,35 0,35 Q-16,35 -25,30 Z",
                "M-25,30 Q-35,20 -35,0 Q-35,-25 -20,-35 L-15,-40 Q-10,-25 0,-30 Q10,-25 15,-40 L20,-35 Q35,-25 35,0 Q35,20 25,30 Q15,35 0,35 Q-15,35 -25,30 Z",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Left ear */}
          <motion.path
            d="M-20,-35 L-15,-40 L-10,-30 Z"
            fill={`url(#catGradient-${mood})`}
            animate={{
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Right ear */}
          <motion.path
            d="M20,-35 L15,-40 L10,-30 Z"
            fill={`url(#catGradient-${mood})`}
            animate={{
              rotate: [2, -2, 2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />

          {/* Face details */}
          {/* Left eye */}
          <motion.circle
            cx="-12"
            cy="-8"
            r="3"
            fill="#FFFFFF"
            animate={{
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <circle cx="-12" cy="-8" r="1.5" fill="#0B0E14" />

          {/* Right eye */}
          <motion.circle
            cx="12"
            cy="-8"
            r="3"
            fill="#FFFFFF"
            animate={{
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <circle cx="12" cy="-8" r="1.5" fill="#0B0E14" />

          {/* Nose */}
          <path d="M0,0 L-2,2 L2,2 Z" fill="#FFFFFF" opacity="0.8" />

          {/* Whiskers */}
          <g
            opacity="0.6"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
          >
            <line x1="-25" y1="-3" x2="-35" y2="-5" />
            <line x1="-25" y1="2" x2="-35" y2="2" />
            <line x1="-25" y1="7" x2="-35" y2="9" />
            <line x1="25" y1="-3" x2="35" y2="-5" />
            <line x1="25" y1="2" x2="35" y2="2" />
            <line x1="25" y1="7" x2="35" y2="9" />
          </g>

          {/* Tail */}
          <motion.path
            d="M25,25 Q40,15 45,0 Q50,-10 48,-20"
            stroke={`url(#catGradient-${mood})`}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            animate={{
              d: [
                "M25,25 Q40,15 45,0 Q50,-10 48,-20",
                "M25,25 Q42,18 47,3 Q52,-8 50,-18",
                "M25,25 Q40,15 45,0 Q50,-10 48,-20",
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </g>

        {/* Floating sparkles around the cat */}
        <motion.circle
          cx="40"
          cy="60"
          r="2"
          fill={colors.glow}
          animate={{
            y: [-5, 5, -5],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx="160"
          cy="80"
          r="2"
          fill={colors.secondary}
          animate={{
            y: [5, -5, 5],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.circle
          cx="100"
          cy="30"
          r="1.5"
          fill={colors.primary}
          animate={{
            y: [-3, 3, -3],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </svg>
    </motion.div>
  );
}
