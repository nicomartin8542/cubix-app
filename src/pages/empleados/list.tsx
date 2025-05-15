import { useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { flexRender } from "@tanstack/react-table";
import React from "react";

export const EmpleadosList = () => {
  const { edit, show, create } = useNavigation();

  const columns = React.useMemo(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "ID",
      },
      {
        id: "ape_nom",
        accessorKey: "ape_nom",
        header: "Apellido y Nombre",
      },
      {
        id: "nro_cuil",
        accessorKey: "nro_cuil",
        header: "CUIL",
      },
      {
        id: "email",
        accessorKey: "email",
        header: "Email",
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Estado",
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: {
      tableQuery: { data: tableData },
    },
  } = useTable({
    columns,
    refineCoreProps: {
      resource: "empleados",
    },
  });

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">Empleados</h2>
        <button
          onClick={() => create("empleados")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
        >
          Crear
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-indigo-100">
          <thead className="bg-indigo-50">
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider"
                  >
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Acciones</th>
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-indigo-50">
            {getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-indigo-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="px-4 py-2 whitespace-nowrap flex gap-2">
                  <button
                    onClick={() => {
                      const id = row.original.id;
                      if (id !== undefined) show("empleados", id);
                    }}
                    className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold py-1 px-3 rounded-lg transition"
                  >
                    Ver detalles
                  </button>
                  <button
                    onClick={() => {
                      const id = row.original.id;
                      if (id !== undefined) edit("empleados", id);
                    }}
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-semibold py-1 px-3 rounded-lg border border-indigo-200 transition"
                  >
                    Modificar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
