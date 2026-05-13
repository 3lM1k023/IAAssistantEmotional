import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import recordingAnimation from "./recording.json";

export const RecordingAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <DotLottieReact
        data={recordingAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};
