import { useMany, useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { flexRender } from "@tanstack/react-table";
import React from "react";
import { ViewIcon } from "../../components/icons/ViewIcon";
import { UpdateIcon } from "../../components/icons/UpdateIcon";
import { columnListEmpleados } from "../../config/columnList";
import { Spinner } from "../../components/Spinner";

export const EmpleadosList = () => {
  const { edit, show, create } = useNavigation();

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: {
      tableQuery: { data: tableData, isLoading },
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
    <Spinner />
  ) : (
    <div className="bg-white rounded-xl shadow p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">
          Empleados{empresaNombre ? ` - ${empresaNombre}` : ""}
        </h2>
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                  Acciones
                </th>
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
                    className="text-blue-600 hover:text-blue-900 mr-2"
                    onClick={() => {
                      const id = row.original.id;

                      if (id !== undefined) show("empleados", id);
                    }}
                    title="Ver detalle"
                  >
                    <ViewIcon />
                  </button>
                  <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => {
                      const id = row.original.id;
                      if (id !== undefined) edit("empleados", id);
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
    </div>
  );
};
