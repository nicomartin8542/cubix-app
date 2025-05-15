import React, { useState } from "react";
import { Link, useUpdatePassword } from "@refinedev/core";

export const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { mutate, isLoading } = useUpdatePassword();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    mutate(
      { password },
      {
        onSuccess: (data: any) => {
          if (data?.success) {
            setSuccess(
              "Contraseña actualizada correctamente. Ya puedes iniciar sesión."
            );
          } else {
            setError(data?.message || "No se pudo actualizar la contraseña.");
          }
        },
        onError: (err: any) => {
          setError(err?.message || "No se pudo actualizar la contraseña.");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 md:p-10">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Actualizar contraseña
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nueva contraseña
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
                    d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3m6 0c0 1.657 1.343 3 3 3s3-1.343 3-3m-6 0V9a3 3 0 016 0v2m0 0V9a3 3 0 00-6 0v2m6 0v2a3 3 0 01-6 0v-2"
                  />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-indigo-500"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? (
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.828-2.828A8.963 8.963 0 0021 12c-1.657 2.667-5 6-9 6s-7.343-3.333-9-6a8.963 8.963 0 013.172-2.828"
                    />
                  </svg>
                ) : (
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
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4 0-7.343-3.333-9-6a9.956 9.956 0 012.458-3.042m2.356-1.908A8.963 8.963 0 0112 5c4 0 7.343 3.333 9 6a9.956 9.956 0 01-1.258 1.858M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contraseña
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
                    d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3m6 0c0 1.657 1.343 3 3 3s3-1.343 3-3m-6 0V9a3 3 0 016 0v2m0 0V9a3 3 0 00-6 0v2m6 0v2a3 3 0 01-6 0v-2"
                  />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Confirma tu nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            {isLoading ? "Actualizando..." : "Actualizar contraseña"}
          </button>
        </form>
        <div className="flex justify-between mt-5 text-sm">
          <Link to="/login" className="text-indigo-500 hover:underline">
            Volver a iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
};
