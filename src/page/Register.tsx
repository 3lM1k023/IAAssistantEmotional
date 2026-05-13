import { User, Lock, Mail, UserPlus, ArrowRight } from "lucide-react";
import Spline from "@splinetool/react-spline";
import { UserLogo } from "../components/UserReg";

interface RegisterProps {
  onRegister: () => void;
  onBackToLogin: () => void;
}

export const Register = ({ onRegister, onBackToLogin }: RegisterProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#FDFCF0]">
      {/* CAPA DE FONDO: Escena de Spline */}
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

      {/* CONTENIDO FRONT: Tarjeta Ampliada para Registro */}
      <div
        className="
          w-full max-w-md
          rounded-[32px]
          p-10
          relative z-10
          overflow-hidden
          bg-white/10
          backdrop-blur-[2px]
          border border-white/20
          shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        "
      >
        {/* Reflejos internos */}
        <div className="absolute inset-0 rounded-[32px] border border-white/10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

        {/* CABECERA */}
        <div className="mb-8 relative z-10 flex flex-col items-center">
          <UserLogo />
          <h1 className="text-3xl font-bold text-black mt-2 tracking-tight text-center">
            Crea tu cuenta
          </h1>
          <p className="text-black/70 text-sm italic text-center">
            Únete a la comunidad de Orbyn
          </p>
        </div>

        {/* FORMULARIO: Nombre, Apellido, Correo y Contraseña */}
        <div className="space-y-4 text-left relative z-10">
          {/* Campo: Nombre */}
          <div className="relative">
            <User
              className="absolute left-4 top-3.5 text-[#7A9D96]"
              size={18}
            />
            <input
              type="text"
              placeholder="Nombre"
              className="w-full bg-white/80 border border-[#E8E8E8] rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-[#7A9D96] transition-colors text-slate-600"
            />
          </div>

          {/* Campo: Apellido */}
          <div className="relative">
            <UserPlus
              className="absolute left-4 top-3.5 text-[#7A9D96]"
              size={18}
            />
            <input
              type="text"
              placeholder="Apellido"
              className="w-full bg-white/80 border border-[#E8E8E8] rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-[#7A9D96] transition-colors text-slate-600"
            />
          </div>

          {/* Campo: Correo */}
          <div className="relative">
            <Mail
              className="absolute left-4 top-3.5 text-[#7A9D96]"
              size={18}
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full bg-white/80 border border-[#E8E8E8] rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-[#7A9D96] transition-colors text-slate-600"
            />
          </div>

          {/* Campo: Contraseña */}
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

        {/* BOTÓN DE ACCIÓN */}
        <button
          onClick={onRegister}
          className="w-full bg-[#A8E6CF] hover:bg-[#97D8C0] text-[#557B74] font-bold py-4 rounded-2xl mt-8 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 relative z-10"
        >
          Registrarse <ArrowRight size={18} />
        </button>

        {/* ENLACE PARA VOLVER */}
        <p
          onClick={onBackToLogin}
          className="mt-6 text-xs text-slate-400 uppercase tracking-widest cursor-pointer hover:text-[#7A9D96] transition-colors text-center"
        >
          ¿Ya tienes cuenta? Inicia Sesión
        </p>
      </div>
    </div>
  );
};
