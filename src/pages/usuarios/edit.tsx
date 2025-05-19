import { useNavigation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Spinner } from "@/components/ui/Spinner";

export const UsuariosEdit = () => {
  const { list } = useNavigation();
  const {
    refineCore: { onFinish: refineOnFinish },
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({});

  const onFinish = (values: any) => {
    refineOnFinish(values);
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 pt-8 pb-4 px-2">
      <div className="w-full max-w-lg rounded-3xl shadow-2xl border border-indigo-200 bg-white/90 flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="bg-indigo-700 py-6 px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight drop-shadow mb-1">Editar usuario</h2>
          <p className="text-indigo-100/90 text-base font-medium">Actualiza los datos del usuario</p>
        </div>
        {/* Form Section */}
        <form onSubmit={handleSubmit(onFinish)} className="flex flex-col gap-6 p-8 bg-white">
          <div className="rounded-2xl border border-slate-100 shadow-sm bg-white/90 p-5 mb-2">
            <label className="block mb-2 font-semibold text-indigo-700">Nombre completo</label>
            <input
              type="text"
              {...register("name", { required: "Campo obligatorio" })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all placeholder:text-slate-400"
              placeholder="Nombre completo"
              autoComplete="off"
            />
            <span className="text-red-500 text-xs block mt-1 min-h-[18px]">{errors?.name?.message as string}</span>
          </div>
          <div className="rounded-2xl border border-slate-100 shadow-sm bg-white/90 p-5 mb-2">
            <label className="block mb-2 font-semibold text-indigo-700">Correo electrónico</label>
            <input
              type="email"
              {...register("email", { required: "Campo obligatorio" })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all placeholder:text-slate-400"
              placeholder="Correo electrónico"
              autoComplete="off"
            />
            <span className="text-red-500 text-xs block mt-1 min-h-[18px]">{errors?.email?.message as string}</span>
          </div>
          <div className="rounded-2xl border border-slate-100 shadow-sm bg-white/90 p-5 mb-2">
            <label className="block mb-2 font-semibold text-indigo-700">DNI</label>
            <input
              type="text"
              {...register("dni", { required: "Campo obligatorio" })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all placeholder:text-slate-400"
              placeholder="DNI"
              autoComplete="off"
            />
            <span className="text-red-500 text-xs block mt-1 min-h-[18px]">{errors?.dni?.message as string}</span>
          </div>
          <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100 bg-slate-50/60 rounded-xl">
            <button
              type="button"
              className="flex-1 bg-slate-200 text-indigo-800 px-5 py-3 rounded-xl shadow hover:bg-slate-300 transition font-semibold"
              onClick={() => list("users")}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white px-5 py-3 rounded-xl shadow hover:bg-indigo-700 transition font-semibold"
              disabled={isSubmitting}
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
