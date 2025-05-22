import { useNavigation, useParsed } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { BackIcon } from "../../components/icons/BackIcon";
import { JobIcon } from "@components/icons/JobIcon";
import { FormEmpleado } from "@/components/empleados/Form";
export const EmpleadosCreate = () => {
  const { list } = useNavigation();
  const {
    refineCore: { onFinish: refineOnFinish },

    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  // Normalizar fechas vacías a null
  const onFinish = (values: Record<string, unknown>) => {
    const fixed = {
      ...values,
      fecha_nac: values.fecha_nac === "" ? null : values.fecha_nac,
      fecha_de_baja: values.fecha_de_baja === "" ? null : values.fecha_de_baja,
    };
    refineOnFinish(fixed);
  };

  const { action } = useParsed();

  console.log(action);

  return (
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
                  Crear Nuevo Empleado
                </h1>
                <p className="text-indigo-100 mt-1">
                  Complete el formulario para registrar un nuevo empleado
                </p>
              </div>
            </div>
            <button
              onClick={() => list("empleados")}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
            >
              <BackIcon /> Volver a la lista
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-0 sm:p-4 md:p-8">
            <FormEmpleado
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              onSubmit={onFinish}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
