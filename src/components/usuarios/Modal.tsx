import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export const Modal = ({
  showModal,
  setShowModal,
  resetSuccess,
  record,
}: any) => {
  return (
    <>
      {/* Modal de confirmación */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-2 ${
                  resetSuccess ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>

              <div className="p-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50">
                  {resetSuccess ? (
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-8 h-8 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  )}
                </div>

                <h3 className="mb-2 text-xl font-bold text-center text-gray-900">
                  {resetSuccess ? "Correo enviado" : "Error"}
                </h3>

                <p className="mb-6 text-center text-gray-600">
                  {resetSuccess
                    ? `Se ha enviado un correo a ${record?.email} con instrucciones para restablecer la contraseña.`
                    : "No se pudo enviar el correo. Inténtalo de nuevo más tarde."}
                </p>

                <div className="flex justify-center">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all"
                  >
                    Entendido
                  </button>
                </div>
              </div>

              {resetSuccess && (
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Cerrando automáticamente...
                    </span>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5 }}
                      className="h-1 bg-indigo-500 rounded-full w-24"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
