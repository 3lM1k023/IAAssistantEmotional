import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// Importamos el contenido del JSON directamente
import userAnimation from "./User.json";

export const UserLogo = () => {
  return (
    <div className="w-24 h-24 mx-auto flex items-center justify-center relative z-20">
      <DotLottieReact
        data={userAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};
