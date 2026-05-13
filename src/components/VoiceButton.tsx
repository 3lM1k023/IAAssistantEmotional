import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// Importamos el nuevo JSON
import voiceAnimation from "./voice.json";

export const VoiceButton = () => {
  return (
    <button className="w-full max-w-[280px] h-24 flex items-center justify-center relative z-20 hover:scale-105 transition-transform active:scale-95">
      <DotLottieReact
        data={voiceAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </button>
  );
};
