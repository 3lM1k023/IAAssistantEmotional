// ─────────────────────────────────────────────────────────
// src/pages/Welcome.tsx
// ─────────────────────────────────────────────────────────

import { useState } from "react";
import { User, Lock, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import Spline from "@splinetool/react-spline";
import { UserLogo } from "../components/UserLogo";
import { loginUser } from "../services/auth.service";

interface WelcomeProps {
  onStart: () => void;
  onGoToRegister: () => void;
}

export const Welcome = ({ onStart, onGoToRegister }: WelcomeProps) => {
  // ── Estado ──────────────────────────────────────────────
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // ── Lógica de Login ─────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validación local mínima
    if (!correo.trim() || !password.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setCargando(true);

    try {
      const { usuario } = await loginUser({ correo: correo.trim(), password });

      // Guardar sesión en localStorage
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Notificar al padre para navegar al chat
      onStart();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado.");
      }
    } finally {
      setCargando(false);
    }
  };

  // ── Render ──────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#FDFCF0]">
      {/* FONDO: Escena Spline */}
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

      {/* TARJETA */}
      <div className="w-full max-w-md rounded-[32px] p-10 relative z-10 overflow-hidden bg-white/10 backdrop-blur-[2px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">

        {/* CABECERA */}
        <div className="mb-8 relative z-10 flex flex-col items-center">
          <UserLogo />
          <h1 className="text-3xl font-bold text-black mt-2 tracking-tight text-center">
            Orbyn
          </h1>
          <p className="text-black/70 text-sm italic text-center">
            Hablar siempre ayuda...
          </p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleLogin} className="space-y-4 text-left relative z-10" noValidate>

          {/* Campo: Correo */}
          <div className="relative">
            <User
              className="absolute left-4 top-3.5 text-[#7A9D96]"
              size={18}
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              disabled={cargando}
              className="w-full bg-white/80 border border-[#E8E8E8] rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-[#7A9D96] transition-colors text-slate-600 disabled:opacity-60"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={cargando}
              className="w-full bg-white/80 border border-[#E8E8E8] rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-[#7A9D96] transition-colors text-slate-600 disabled:opacity-60"
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50/80 border border-red-200 rounded-xl px-4 py-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-[#A8E6CF] hover:bg-[#97D8C0] text-[#557B74] font-bold py-4 rounded-2xl mt-4 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 relative z-10 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {cargando ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              <>
                Iniciar Sesión <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* ENLACE A REGISTRO */}
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