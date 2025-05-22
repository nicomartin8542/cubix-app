import { Spinner } from "@/components/ui/Spinner";
import { Identity } from "@/types";
import { useGetIdentity, useOne, Link } from "@refinedev/core";

// Importamos íconos
import { HomeIcon } from "@components/icons/EditIcons";
import { IdentIcon } from "@components/icons/IdentIcon";
import { ContactIcon } from "@components/icons/ContactIcon";

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

  // Componente para mostrar un campo de datos
  const DataField = ({
    label,
    value,
  }: {
    label: string;
    value?: string | number | null | boolean;
  }) => (
    <div className="flex flex-col mb-2">
      <span className="text-xs font-semibold text-slate-500 uppercase mb-1">
        {label}
      </span>
      <span className="text-base text-slate-800 bg-slate-50 rounded px-2 py-1 border border-slate-100">
        {value !== undefined && value !== null ? (
          typeof value === "boolean" ? (
            value ? (
              "Sí"
            ) : (
              "No"
            )
          ) : (
            value
          )
        ) : (
          <span className="text-slate-300">-</span>
        )}
      </span>
    </div>
  );

  return isLoading ? (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner />
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-8 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-indigo-600 rounded-2xl shadow-xl p-6 sm:p-8 mb-8 text-white">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-4 rounded-xl">
                <div className="w-8 h-8 text-white">
                  <HomeIcon />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Bienvenido a Cubix
                </h1>
                <p className="text-indigo-100 mt-1">
                  {identity?.name
                    ? `Hola, ${identity.name}`
                    : "Panel de administración"}
                </p>
              </div>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-lg text-sm font-medium">
              {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Institución Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <IdentIcon /> Información de la Institución
                </h2>
              </div>

              <div className="p-6">
                {error ? (
                  <div className="text-red-600 font-semibold text-center p-4 bg-red-50 rounded-lg">
                    {error?.message ||
                      "Error al cargar datos de la institución"}
                  </div>
                ) : !institucion?.data ? (
                  <div className="text-slate-500 text-center p-4 bg-slate-50 rounded-lg">
                    No hay datos de institución disponibles.
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                      <div className="bg-indigo-100 p-3 rounded-full">
                        <svg
                          className="w-6 h-6 text-indigo-700"
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
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">
                          {institucion?.data?.descripcion}
                        </h3>
                        <p className="text-slate-500 text-sm">
                          Información detallada de la institución
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <DataField
                        label="Código"
                        value={institucion?.data?.codigo}
                      />
                      <DataField label="CUIT" value={institucion?.data?.cuit} />
                      <DataField
                        label="Empresa Constructora"
                        value={institucion?.data?.empresa_constructora}
                      />
                      <DataField
                        label="Firma conjunta"
                        value={institucion?.data?.firma_conjunta}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats & Quick Access */}
          <div className="space-y-8">
            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ContactIcon /> Acceso Rápido
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <Link
                  to="app/empleados"
                  className="flex items-center gap-3 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all cursor-pointer"
                >
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <svg
                      className="w-5 h-5 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-indigo-800">Empleados</h3>
                    <p className="text-xs text-slate-500">
                      Gestionar empleados
                    </p>
                  </div>
                </Link>

                <Link
                  to="app/usuarios"
                  className="flex items-center gap-3 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all cursor-pointer"
                >
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <svg
                      className="w-5 h-5 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-indigo-800">Usuarios</h3>
                    <p className="text-xs text-slate-500">
                      Administrar usuarios
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* System Info */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-6">
                <h3 className="text-sm font-semibold text-slate-500 uppercase mb-3">
                  Información del Sistema
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Versión</span>
                    <span className="font-medium text-slate-800">1.0.0</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Última actualización</span>
                    <span className="font-medium text-slate-800">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
