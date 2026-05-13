import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import Spline from "@splinetool/react-spline";

import { RecordingAnimation } from "../components/RecordingAnimation";
import { VoiceButton } from "../components/VoiceButton";
import logoImg from "../components/Logo.png";

type Message = {
  id: number;
  text: string;
  sender: "bot" | "user";
};

export const Chat = () => {
  const orbContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hola, ¿cómo te sientes hoy?", sender: "bot" },
  ]);

  const [input, setInput] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://iaassistantemotional-production.up.railway.app/api";
  
  useEffect(() => {
    const element = orbContainerRef.current;
    if (!element) return;

    let isHoveringSpline = false;

    const handleMouseEnter = () => {
      isHoveringSpline = true;
    };

    const handleMouseLeave = () => {
      isHoveringSpline = false;
    };

    const blockZoom = (e: WheelEvent) => {
      if (isHoveringSpline) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    window.addEventListener("wheel", blockZoom, {
      passive: false,
      capture: true,
    });

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);

      window.removeEventListener("wheel", blockZoom, {
        capture: true,
      } as EventListenerOptions);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setIsSpeaking(false);
  };

  const playAudioFromBase64 = (base64Audio: string) => {
    try {
      stopAudio();

      const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
      audioRef.current = audio;

      audio.onplay = () => setIsSpeaking(true);
      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => setIsSpeaking(false);

      audio.play();
    } catch (error) {
      console.error("Error al reproducir el audio:", error);
      setIsSpeaking(false);
    }
  };

  const handleToggleVoice = () => {
    setVoiceEnabled((prev) => {
      const newValue = !prev;

      if (!newValue) {
        stopAudio();
      }

      return newValue;
    });
  };

  const handleSendMessage = async () => {
    const text = input.trim();

    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/emotion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          texto: text,
          voz: voiceEnabled,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.mensaje || "Error al procesar el mensaje");
      }

      const respuestaIA =
        data.resultado?.respuesta_ia ||
        data.resultado?.texto_narracion ||
        "Lo siento, no pude generar una respuesta.";

      const botMessage: Message = {
        id: Date.now() + 1,
        text: respuestaIA,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);

      if (
        voiceEnabled &&
        data.resultado?.audio_disponible === true &&
        data.resultado?.audio?.base64
      ) {
        playAudioFromBase64(data.resultado.audio.base64);
      }
    } catch (error) {
      console.error(error);

      const errorMessage: Message = {
        id: Date.now() + 2,
        text: "Ocurrió un problema al generar la respuesta. Intenta nuevamente.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col items-center p-2 md:p-4 font-sans relative bg-[#E9E4F0] bg-gradient-to-br from-[#E9E4F0] via-[#F3F0F7] to-[#DDE4F7]">
      <div className="relative z-10 w-full max-w-6xl h-full flex flex-col items-center">
        {/* HEADER */}
        <header className="w-full flex items-center justify-start mb-2 px-2 shrink-0">
          <div className="mr-3 w-14 h-14 md:w-20 md:h-20 flex items-center justify-center">
            <img
              src={logoImg}
              alt="Logo Orbyn"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-[#7A9D96] tracking-tight">
            Orbyn
          </h1>
        </header>

        {/* MAIN */}
        <main className="w-full flex-1 min-h-0 flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-8 mb-2">
          {/* PANEL ORBYN */}
          <section className="order-first md:order-last h-[360px] md:h-full bg-white/40 backdrop-blur-md rounded-[28px] md:rounded-[40px] p-3 md:p-4 flex flex-col items-center justify-center shadow-sm border border-white/20 relative overflow-hidden">
            <div className="h-full flex flex-col items-center justify-center w-full min-h-0">
              <p className="text-[#7A9D96] font-bold text-lg md:text-lg mb-1 md:mb-2 shrink-0">
                ¡Conoce a Orbyn!
              </p>

              {/* SPLINE */}
              <div
                ref={orbContainerRef}
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 lg:w-72 lg:h-72 relative flex items-center justify-center rounded-full overflow-hidden select-none shrink-0"
                style={{
                  touchAction: "pan-x pan-y",
                  WebkitUserSelect: "none",
                  userSelect: "none",
                }}
              >
                <div className="absolute inset-0 scale-[1.15] md:scale-[1.35]">
                  <Spline scene="https://prod.spline.design/T5BUKCGLIItxEM58/scene.splinecode" />
                </div>
              </div>

              {/* ANIMACION LOTTIE */}
              <div className="w-full max-w-[250px] md:max-w-[340px] h-16 md:h-24 flex items-center justify-center shrink-0">
                {voiceEnabled ? (
                  <RecordingAnimation />
                ) : (
                  <p className="text-xs text-[#7A9D96]/60 font-semibold">
                    Activa la voz para escuchar a Orbyn
                  </p>
                )}
              </div>

              {/* BOTON DE VOZ */}
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`w-full max-w-[220px] md:max-w-[260px] h-16 md:h-24 flex items-center justify-center cursor-pointer rounded-full transition-all duration-300 shrink-0 ${
                  voiceEnabled
                    ? "scale-105 drop-shadow-lg"
                    : "opacity-80 hover:opacity-100"
                }`}
                title={
                  voiceEnabled
                    ? "Voz activada con ElevenLabs"
                    : "Voz desactivada"
                }
              >
                <VoiceButton />
              </button>

              <p className="text-xs text-[#7A9D96] font-semibold mt-1 shrink-0">
                {voiceEnabled
                  ? isSpeaking
                    ? "Orbyn está hablando..."
                    : "Voz activada"
                  : "Voz desactivada"}
              </p>
            </div>
          </section>

          {/* PANEL CHAT */}
          <section className="order-last md:order-first h-[520px] md:h-full bg-white/70 backdrop-blur-md rounded-[28px] md:rounded-[40px] p-4 md:p-6 flex flex-col shadow-sm border border-white/50 relative overflow-hidden min-h-0">
            <h2 className="text-[#7A9D96] font-medium text-center mb-4 text-base md:text-sm shrink-0">
              ¿Qué tienes en mente?
            </h2>

            {/* MENSAJES */}
            <div className="flex-1 min-h-0 overflow-y-auto space-y-4 px-1 md:px-2 pr-2 custom-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[78%] px-4 md:px-5 py-2 md:py-3 rounded-[22px] md:rounded-[25px] text-sm font-medium shadow-sm whitespace-pre-wrap break-words ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-[#7B42FF] to-[#60A5FA] text-white rounded-br-none"
                        : "bg-white/90 text-slate-600 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-end gap-2 flex-row">
                  <div className="bg-white/90 text-slate-500 px-5 py-3 rounded-[25px] rounded-bl-none text-sm font-medium shadow-sm">
                    Orbyn está pensando...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="mt-4 space-y-3 shrink-0">
              <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-[28px] px-4 py-2 border border-white/40 shadow-sm">
                <textarea
                  placeholder="Escribe aquí..."
                  value={input}
                  rows={2}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={isLoading}
                  className="bg-transparent flex-1 resize-none outline-none text-slate-600 placeholder:text-slate-400 text-sm py-2 max-h-28 disabled:opacity-60"
                />
              </div>

              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="w-full bg-[#A8E6CF] text-[#557B74] font-bold py-3 md:py-4 rounded-full shadow-md hover:bg-[#97D8C0] transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-[0.25em] text-xs active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Enviando..." : "Enviar"}
                <Send size={14} />
              </button>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="w-full py-1 opacity-30 shrink-0">
          <p className="text-[8px] md:text-[9px] text-slate-400 uppercase tracking-[0.45em] md:tracking-[0.6em] text-center font-bold">
            Tecnológico de Zacatepec • Orbyn.Alpha
          </p>
        </footer>
      </div>
    </div>
  );
};