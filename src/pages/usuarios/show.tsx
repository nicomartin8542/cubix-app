import { useNavigation, useResource, useShow } from "@refinedev/core";
import { BackIcon } from "../../components/icons/BackIcon";
import { IdentIcon } from "../../components/icons/IdentIcon";
import { ContactIcon } from "../../components/icons/ContactIcon";
import { JobIcon } from "../../components/icons/JobIcon";

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

export const UsuariosShow = () => {
  const { edit, list } = useNavigation();
  const { query } = useShow();
  const { data } = query;
  const record = data?.data;

  return (
    <div className="min-h-screen flex items-center justify-center py-8 ">
      <div className="relative w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl border border-slate-200 p-0 sm:p-6 md:p-10 flex flex-col">
        {/* Botones header */}
        <div className="flex items-center justify-between mb-8">
          <button
            className="flex items-center gap-2 text-indigo-700 hover:text-indigo-900 font-semibold text-base px-3 py-2 rounded transition hover:bg-indigo-100 shadow-sm bg-white/80 backdrop-blur z-10"
            onClick={() => list("empleados")}
          >
            <span className="text-lg">
              <BackIcon />
            </span>
            Volver a la lista
          </button>
          <button
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 cursor-pointer shadow-xl text-base transition focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-300 disabled:cursor-not-allowed"
            onClick={() =>
              record?.id !== undefined && edit("empleados", record.id)
            }
            disabled={record?.id === undefined}
          >
            Editar
          </button>
        </div>
        {/* Card principal */}
        <div className="bg-white/80 rounded-2xl shadow p-6 flex flex-col gap-10">
          {/* Sección Identificación */}
          <section>
            <h2 className="flex items-center gap-3 text-xl font-bold text-indigo-700 mb-4">
              <IdentIcon /> Identificación
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <section>
            <h2 className="flex items-center gap-3 text-xl font-bold text-indigo-700 mb-4">
              <ContactIcon /> Contacto y Domicilio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <h2 className="flex items-center gap-3 text-xl font-bold text-indigo-700 mb-4">
              <JobIcon /> Laboral y Bancario
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
