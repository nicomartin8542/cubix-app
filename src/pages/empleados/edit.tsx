import { useNavigation, useParsed, useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { BackIcon } from "../../components/icons/BackIcon";
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
    <div className="min-h-screen  flex items-center justify-center">
      <div className="relative w-full max-w-5xl p-0 sm:p-4 md:p-8 bg-white/90 rounded-3xl shadow-2xl border border-slate-200 flex flex-col">
        {/* Botón volver fijo */}
        <button
          type="button"
          className="absolute left-6 top-6 flex items-center gap-2 text-indigo-700 hover:text-indigo-900 font-semibold text-base px-3 py-2 rounded transition hover:bg-indigo-100 shadow-sm bg-white/80 backdrop-blur z-10"
          onClick={() => list("empleados")}
        >
          <span aria-hidden="true" className="text-lg">
            <BackIcon />
          </span>{" "}
          Volver a la lista
        </button>
        <div className="flex flex-col w-full">
          {/* Formulario */}
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
  );
};
