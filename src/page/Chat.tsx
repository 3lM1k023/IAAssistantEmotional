import { Mic, Send, Smile } from "lucide-react";
import Spline from "@splinetool/react-spline";
import { RecordingAnimation } from "../components/RecordingAnimation";
import { VoiceButton } from "../components/VoiceButton";
import logoImg from "../components/Logo.png";

export const Chat = () => {
  const messages = [
    { id: 1, text: "Hola, ¿cómo te sientes hoy?", sender: "bot" },
    {
      id: 2,
      text: "Me siento un poco ansioso por el trabajo.",
      sender: "user",
    },
    { id: 3, text: "Entiendo. Respiremos juntos un momento.", sender: "bot" },
    { id: 4, text: "Eso me ayudaría mucho, gracias.", sender: "user" },
  ];

  return (
    // CAMBIO 1: p-4 a p-2 para ganar espacio en pantallas pequeñas
    <div className="h-screen flex flex-col items-center p-2 md:p-4 font-sans overflow-hidden relative bg-[#E9E4F0] bg-gradient-to-br from-[#E9E4F0] via-[#F3F0F7] to-[#DDE4F7]">
      <div className="relative z-10 w-full max-w-6xl flex flex-col h-full items-center">
        {/* Header: Reducimos el tamaño del logo para que no empuje el contenido */}
        <header className="w-full flex items-center justify-start mb-1 px-2">
          <div className="mr-4 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
            <img
              src={logoImg}
              alt="Logo Orbyn"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#7A9D96] tracking-tight">
            Orbyn
          </h1>
        </header>

        {/* Main Container: Añadimos min-h-0 para que el grid respete la altura del padre */}
        <main className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 flex-1 min-h-0 mb-2 overflow-hidden">
          {/* COLUMNA IZQUIERDA: HISTORIAL DE CHAT */}
          <section className="bg-white/70 backdrop-blur-md rounded-[32px] md:rounded-[40px] p-4 md:p-6 flex flex-col shadow-sm border border-white/50 relative overflow-hidden max-h-full">
            <h2 className="text-[#7A9D96] font-medium text-center mb-4 text-sm">
              ¿Qué tienes en mente?
            </h2>

            {/* Este contenedor es el que absorbe el exceso de altura con scroll */}
            <div className="flex-1 overflow-y-auto space-y-4 px-2 custom-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`max-w-[75%] px-5 py-2 md:py-3 rounded-[25px] text-sm font-medium shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-[#7B42FF] to-[#60A5FA] text-white rounded-br-none"
                        : "bg-white/90 text-slate-600 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input y Botón: Se mantienen fijos al final de la tarjeta */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/30">
                <input
                  type="text"
                  placeholder="Escribe aquí..."
                  className="bg-transparent flex-1 outline-none text-slate-600 text-sm py-2"
                />
              </div>
              <button className="w-full bg-[#A8E6CF] text-[#557B74] font-bold py-3 md:py-4 rounded-full shadow-md hover:bg-[#97D8C0] transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs active:scale-95">
                Enviar <Send size={14} />
              </button>
            </div>
          </section>

          {/* COLUMNA DERECHA: ORBYN */}
          {/* CAMBIO 2: hidden md:flex para que en móviles muy pequeños no rompa el layout, y max-h-full para escalar */}
          <section className="bg-white/40 backdrop-blur-md rounded-[32px] md:rounded-[40px] p-4 flex flex-col items-center justify-center shadow-sm border border-white/20 relative overflow-hidden max-h-full">
            <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0">
              <p className="text-[#7A9D96] font-bold text-lg mb-2 animate-bounce">
                ¡Conoce a Orbyn!
              </p>

              {/* El personaje de Spline ahora escala mejor */}
              <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 relative flex items-center justify-center rounded-full overflow-hidden">
                <div className="absolute inset-0 scale-[1.4]">
                  <Spline scene="https://prod.spline.design/T5BUKCGLIItxEM58/scene.splinecode" />
                </div>
              </div>

              <div className="w-full max-w-[400px] h-24 md:h-32 flex items-center justify-center">
                <RecordingAnimation />
              </div>

              <div className="w-full max-w-[280px] h-24 md:h-32 flex items-center justify-center">
                <VoiceButton />
              </div>
            </div>
          </section>
        </main>

        <footer className="w-full py-1 md:py-2 opacity-40">
          <p className="text-[9px] text-slate-400 uppercase tracking-[0.6em] text-center font-bold">
            Tecnológico de Zacatepec • Orbyn.Alpha
          </p>
        </footer>
      </div>
    </div>
  );
};
