import { useNavigation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const UsuariosCreate = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 flex flex-col gap-6">
        <h2 className="text-3xl font-extrabold text-indigo-800 mb-2 text-center">Crear usuario</h2>
        <form onSubmit={handleSubmit(onFinish)} className="flex flex-col gap-5">
          <div>
            <input
              type="text"
              {...register("name", { required: "Campo obligatorio" })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-slate-50 text-base transition-all placeholder:text-slate-400"
              placeholder="Nombre completo"
              autoComplete="off"
            />
            <span className="text-red-500 text-xs block mt-1 min-h-[18px]">{errors?.name?.message as string}</span>
          </div>
          <div>
            <input
              type="email"
              {...register("email", { required: "Campo obligatorio" })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-slate-50 text-base transition-all placeholder:text-slate-400"
              placeholder="Correo electrónico"
              autoComplete="off"
            />
            <span className="text-red-500 text-xs block mt-1 min-h-[18px]">{errors?.email?.message as string}</span>
          </div>
          <div>
            <input
              type="password"
              {...register("password", { required: "Campo obligatorio" })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-slate-50 text-base transition-all placeholder:text-slate-400"
              placeholder="Contraseña"
              autoComplete="new-password"
            />
            <span className="text-red-500 text-xs block mt-1 min-h-[18px]">{errors?.password?.message as string}</span>
          </div>
          <div className="flex gap-3 mt-6">
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
              Crear usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
