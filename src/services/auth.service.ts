// ─────────────────────────────────────────────────────────
// src/services/authService.ts
// ─────────────────────────────────────────────────────────
 
const BASE_URL = `${
  import.meta.env.VITE_API_URL ||
  "https://iaassistantemotional-production.up.railway.app/api"
}/auth`; 
// ── Tipos ─────────────────────────────────────────────────
 
export interface RegisterData {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
}
 
export interface LoginData {
  correo: string;
  password: string;
}
 
export interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  rol: string;
  estado: number;
  fecha_registro: string;
  fecha_actualizacion: string;
}
 
export interface LoginResponse {
  mensaje: string;
  usuario: Usuario;
}
 
export interface RegisterResponse {
  mensaje: string;
  id_usuario: number;
}
 
// ── Funciones ─────────────────────────────────────────────
 
export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
 
  const json = await res.json();
 
  if (!res.ok) throw new Error(json.error || "Error al iniciar sesión");
 
  return json;
};
 
export const registerUser = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
 
  const json = await res.json();
 
  if (!res.ok) throw new Error(json.error || "Error al registrar usuario");
 
  return json;
};
 