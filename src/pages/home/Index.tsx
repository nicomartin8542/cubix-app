import { Spinner } from "@/components/ui/Spinner";
import { Identity } from "@/types";
import { useGetIdentity, useOne } from "@refinedev/core";

export const Home = () => {
  const { data: identity } = useGetIdentity<Identity>();

  const {
    data: institucion,
    isLoading,
    error,
  } = useOne({
    resource: "instituciones",
    id: identity?.institucion_id || "0",
  });

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 py-8">
      {/* Main Title */}
      <h1 className="text-4xl font-extrabold text-indigo-900 mb-8 flex items-center gap-3">
        Bienvenido
      </h1>
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-2xl w-full border border-indigo-100 flex flex-col gap-8 items-center">
        <div className="flex items-center gap-2 mb-2">
          <svg
            className="w-7 h-7 text-indigo-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10l9-7 9 7v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z"
            />
          </svg>
          <span className="text-2xl font-extrabold text-indigo-800 text-center">
            {institucion?.data?.descripcion}
          </span>
        </div>
        <p className="text-md text-gray-500 text-center mb-2">
          Detalles de la institución
        </p>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <div className="text-red-600 font-semibold text-center">
            {error?.message}
          </div>
        ) : institucion ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                Código
              </span>
              <span className="text-lg font-semibold text-indigo-600 text-center break-words">
                {institucion?.data?.codigo}
              </span>
            </div>
            <div className="bg-indigo-50 rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                CUIT
              </span>
              <span className="text-lg font-semibold text-indigo-600 text-center break-words">
                {institucion?.data?.cuit}
              </span>
            </div>
            {institucion?.data?.empresa_constructora && (
              <div className="bg-indigo-50 rounded-xl shadow p-6 flex flex-col items-center">
                <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Empresa Constructora
                </span>
                <span className="text-lg font-semibold text-indigo-600 text-center break-words">
                  {institucion?.data?.empresa_constructora}
                </span>
              </div>
            )}
            {typeof institucion?.data?.firma_conjunta !== "undefined" && (
              <div className="bg-indigo-50 rounded-xl shadow p-6 flex flex-col items-center">
                <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Firma conjunta
                </span>
                <span className="text-lg font-semibold text-indigo-600 text-center break-words">
                  {institucion?.data?.firma_conjunta ? "Sí" : "No"}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-500 text-center">
            No hay datos de institución disponibles.
          </div>
        )}
      </div>
    </div>
  );
};
