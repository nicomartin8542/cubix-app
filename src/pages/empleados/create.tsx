import { useNavigation, useParse, useParsed } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { BackIcon } from "../../components/icons/BackIcon";

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
  const onFinish = (values: any) => {
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
        {/* Stepper visual */}
        <div className="flex flex-col lg:flex-row w-full">
          {/* Stepper vertical */}

          {/* Formulario */}
          <FormEmpleado
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onFinish}
          />
        </div>
      </div>
    </div>
  );
};
