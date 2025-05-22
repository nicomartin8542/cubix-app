import { useNavigation, useShow } from "@refinedev/core";
import { BackIcon } from "@components/icons/BackIcon";
import { IdentIcon } from "@components/icons/IdentIcon";
import { ContactIcon } from "@components/icons/ContactIcon";
import { JobIcon } from "@components/icons/JobIcon";
import { Spinner } from "@/components/ui/Spinner";

export const EmpleadosShow = () => {
  const { edit, list } = useNavigation();
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;

  return isLoading ? (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner />
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-indigo-600 rounded-2xl shadow-xl p-6 sm:p-8 mb-8 text-white">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-4 rounded-xl">
                <div className="w-8 h-8 text-white">
                  <JobIcon />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Detalle del Empleado
                </h1>
                <p className="text-indigo-100 mt-1">
                  {record?.ape_nom || "Información completa del empleado"}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => list("empleados")}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
              >
                <BackIcon /> Volver
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() =>
                  record?.id !== undefined && edit("empleados", record?.id)
                }
                disabled={record?.id === undefined}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Editar
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-6 sm:p-8">
          {/* Sección Identificación */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-indigo-700 mb-6 pb-2 border-b border-indigo-100">
              <IdentIcon /> Identificación
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DataField label="Apellido y Nombre" value={record?.ape_nom} />
              <DataField label="CUIL" value={record?.nro_cuil} />
              <DataField label="Tipo Doc." value={record?.tpo_doc} />
              <DataField label="Nro. Documento" value={record?.nro_doc} />
              <DataField label="Sexo" value={record?.sexo} />
              <DataField
                label="Fecha de Nacimiento"
                value={record?.fecha_nac}
              />
              <DataField label="Estado Civil" value={record?.est_civil} />
            </div>
          </section>
          
          {/* Sección Contacto */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-indigo-700 mb-6 pb-2 border-b border-indigo-100">
              <ContactIcon /> Contacto y Domicilio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DataField label="Email" value={record?.email} />
              <DataField label="Teléfono" value={record?.tel} />
              <DataField label="Celular" value={record?.cel} />
              <DataField label="Código Postal" value={record?.cod_pos} />
              <DataField label="Calle" value={record?.nom_call} />
              <DataField label="Nro." value={record?.nro_call} />
              <DataField label="Piso" value={record?.nro_piso} />
              <DataField label="Dpto." value={record?.nro_dpto} />
            </div>
          </section>
          
          {/* Sección Laboral */}
          <section>
            <h2 className="flex items-center gap-3 text-xl font-bold text-indigo-700 mb-6 pb-2 border-b border-indigo-100">
              <JobIcon /> Laboral y Bancario
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DataField label="CBU" value={record?.nro_cbu} />
              <DataField label="Fecha de Baja" value={record?.fecha_de_baja} />
              <DataField label="Status" value={record?.status} />
              <DataField
                label="Posee Litis"
                value={record?.posee_litis ? "Sí" : "No"}
              />
              <DataField
                label="Enviado sin CBU"
                value={record?.enviado_sin_cbu}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para mostrar un campo
const DataField = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => (
  <div className="flex flex-col mb-2">
    <span className="text-xs font-semibold text-slate-500 uppercase mb-1">
      {label}
    </span>
    <span className="text-base text-slate-800 bg-slate-50 rounded px-2 py-1 border border-slate-100">
      {value ?? <span className="text-slate-300">-</span>}
    </span>
  </div>
);
