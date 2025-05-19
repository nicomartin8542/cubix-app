export const columnListEmpleados = [
  // {
  //   id: "instituciones_id",
  //   accessorKey: "instituciones_id",
  //   header: "Instituciones",
  //   cell: ({ getValue }) => {
  //     const id = getValue();
  //     const institucion = institucionesData?.data?.find((i) => i.id === id);
  //     return institucion ? institucion.descripcion : id;
  //   },
  // },
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
    id: "nro_doc",
    accessorKey: "nro_doc",
    header: "DNI",
  },

  {
    id: "nro_cbu",
    accessorKey: "nro_cbu",
    header: "CBU",
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
];

export const columnListUsuarios = [
  {
    id: "name",
    accessorKey: "name",
    header: "Apellido y Nombre",
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Correo",
  },

  {
    id: "dni",
    accessorKey: "dni",
    header: "DNI",
  },
];
