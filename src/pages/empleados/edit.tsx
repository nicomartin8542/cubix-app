import { useNavigation, useParsed } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { BackIcon } from "../../components/icons/BackIcon";
import { JobIcon } from "@components/icons/JobIcon";
import { FormEmpleado } from "@/components/empleados/Form";

export const EmpleadosEdit = () => {
  const { list } = useNavigation();
  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const { action } = useParsed();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-indigo-600 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-8 text-white">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="bg-white/10 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                <div className="w-6 h-6 sm:w-8 sm:h-8 text-white">
                  <JobIcon />
                </div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-left">
                  Editar Empleado
                </h1>
                <p className="text-indigo-100 mt-1 text-sm sm:text-base text-center sm:text-left">
                  Modifique los datos del empleado
                </p>
              </div>
            </div>
            <button
              onClick={() => list("empleados")}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg sm:rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-white/50 shadow-md sm:shadow-lg text-sm sm:text-base mt-2 sm:mt-0"
            >
              <BackIcon /> Volver a la lista
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-0 sm:p-4 md:p-6">
            <FormEmpleado
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              onSubmit={onFinish}
              formtype={action}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
