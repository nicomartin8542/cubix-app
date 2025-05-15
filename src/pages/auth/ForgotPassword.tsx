import React, { useState } from "react";
import { Link, useForgotPassword } from "@refinedev/core";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { mutate, isLoading } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    mutate(
      { email },
      {
        onSuccess: (data: any) => {
          if (data?.success) {
            setSuccess(
              "Te hemos enviado un correo para recuperar tu contraseña."
            );
          } else {
            setError(data?.message || "No se pudo enviar el correo de recuperación.");
          }
        },
        onError: (err: any) => {
          setError(err?.message || "No se pudo enviar el correo de recuperación.");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 md:p-10">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Recuperar contraseña
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v1a4 4 0 01-4 4H8a4 4 0 01-4-4v-1"
                  />
                </svg>
              </span>
              <input
                type="email"
                name="email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          {success && (
            <div className="text-green-600 text-sm text-center">{success}</div>
          )}
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition text-lg ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Enviando..." : "Enviar instrucciones"}
          </button>
        </form>
        <div className="flex justify-between mt-5 text-sm">
          <Link to="/login" className="text-indigo-500 hover:underline">
            Volver a iniciar sesión
          </Link>
          <Link to="/register" className="text-indigo-500 hover:underline">
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
};
