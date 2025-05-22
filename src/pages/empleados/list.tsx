import { useMany, useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { flexRender } from "@tanstack/react-table";
import { ViewIcon } from "@components/icons/ViewIcon";
import { UpdateIcon } from "@components/icons/UpdateIcon";
import { columnListEmpleados } from "@/config/columnList";
import { Spinner } from "@/components/ui/Spinner";
import { JobIcon } from "@components/icons/JobIcon";

export const EmpleadosList = () => {
  const { edit, show, create } = useNavigation();

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: {
      tableQuery: { isLoading },
    },
  } = useTable({
    columns: columnListEmpleados,
    refineCoreProps: {
      resource: "empleados",
    },
  });

  const institucionIds = getRowModel()
    .rows.map((row) => row.original.instituciones_id?.toString())
    .filter((id): id is string => !!id);

  const { data: institucionesData } = useMany({
    resource: "instituciones",
    ids: institucionIds,
  });

  // Obtener el nombre de la empresa (institución) para mostrar en el header
  let empresaNombre = "";
  if (
    institucionesData &&
    institucionesData.data &&
    institucionesData.data.length > 0
  ) {
    empresaNombre = institucionesData.data[0].descripcion || "";
  }

  return isLoading ? (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner />
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
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
                  Empleados{empresaNombre ? ` - ${empresaNombre}` : ""}
                </h1>
                <p className="text-indigo-100 mt-1">
                  Gestión de empleados de la institución
                </p>
              </div>
            </div>
            <button
              onClick={() => create("empleados")}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Crear Empleado
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-100">
              <thead className="bg-gradient-to-r from-indigo-500 to-indigo-600">
                {getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider"
                      >
                        {!header.isPlaceholder &&
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </th>
                    ))}
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-3">
                      <button
                        className="flex items-center justify-center p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        onClick={() => {
                          const id = row.original.id;
                          if (id !== undefined) show("empleados", id.toString());
                        }}
                        title="Ver detalle"
                      >
                        <ViewIcon />
                      </button>
                      <button
                        className="flex items-center justify-center p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                        onClick={() => {
                          const id = row.original.id;
                          if (id !== undefined) edit("empleados", id.toString());
                        }}
                        title="Actualizar"
                      >
                        <UpdateIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {getRowModel().rows.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              No hay empleados para mostrar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
