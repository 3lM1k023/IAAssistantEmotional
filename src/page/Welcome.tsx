import { User, Lock, ArrowRight } from "lucide-react";
import Spline from "@splinetool/react-spline";
import { UserLogo } from "../components/UserLogo";

interface WelcomeProps {
  onStart: () => void;
  onGoToRegister: () => void; // Prop añadida
}

export const Welcome = ({ onStart, onGoToRegister }: WelcomeProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#FDFCF0]">
      <div className="fixed inset-0 z-0 w-screen h-screen overflow-hidden">
        <Spline
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover",
          }}
          scene="https://prod.spline.design/Y3QQO8aRD8DujXTr/scene.splinecode"
        />
      </div>

      <div className="w-full max-w-md rounded-[32px] p-10 relative z-10 overflow-hidden bg-white/10 backdrop-blur-[2px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
        <div className="mb-8 relative z-10 flex flex-col items-center">
          <UserLogo />
          <h1 className="text-3xl font-bold text-black mt-2 tracking-tight text-center">
            Orbyn
          </h1>
          <p className="text-black/70 text-sm italic text-center">
            Hablar siempre ayuda...
          </p>
        </div>

        <div className="space-y-4 text-left relative z-10">
          <div className="relative">
            <User
              className="absolute left-4 top-3.5 text-[#7A9D96]"
              size={18}
            />
            <input
              type="text"
              placeholder="Usuario o Correo"
              className="w-full bg-white/80 border border-[#E8E8E8] rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-[#7A9D96] transition-colors text-slate-600"
            />
          </div>
          <div className="relative">
            <Lock
              className="absolute left-4 top-3.5 text-[#7A9D96]"
              size={18}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full bg-white/80 border border-[#E8E8E8] rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-[#7A9D96] transition-colors text-slate-600"
            />
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-[#A8E6CF] hover:bg-[#97D8C0] text-[#557B74] font-bold py-4 rounded-2xl mt-8 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 relative z-10"
        >
          Iniciar Sesión <ArrowRight size={18} />
        </button>

        {/* AQUÍ ESTÁ EL CAMBIO: onClick ahora llama a la prop */}
        <p
          onClick={onGoToRegister}
          className="mt-6 text-xs text-slate-400 uppercase tracking-widest cursor-pointer hover:text-[#7A9D96] transition-colors text-center"
        >
          ¿No tienes cuenta? Regístrate
        </p>
      </div>
    </div>
  );
};
