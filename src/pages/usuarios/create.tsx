import { useUser } from "@/context/UserContext";
import { useNavigation, useRegister } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const UsuariosCreate = () => {
  const { list } = useNavigation();
  const { mutate, isLoading } = useRegister();
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onFinish = (values: Record<string, unknown>) => {
    mutate({ ...values, institucion_id: user?.institucion_id });
    reset();
    list("usuarios");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 py-8 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-indigo-100 overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 py-6 px-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Crear nuevo usuario
          </h2>
          <p className="text-indigo-100 text-sm mt-1">
            Complete los datos para registrar un nuevo usuario
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onFinish)}
          className="flex flex-col gap-6 p-8"
        >
          <div className="space-y-6">
            {/* Nombre */}
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1 ml-1"
              >
                Nombre completo
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "Campo obligatorio" })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 text-base transition-all placeholder:text-slate-400"
                  placeholder="Ingrese nombre completo"
                  autoComplete="off"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {errors?.name ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : null}
                </div>
              </div>
              <span className="text-red-500 text-xs block mt-1 min-h-[18px]">
                {errors?.name?.message as string}
              </span>
            </div>

            {/* Email */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1 ml-1"
              >
                Correo electrónico
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Campo obligatorio",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Dirección de correo inválida",
                    },
                  })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 text-base transition-all placeholder:text-slate-400"
                  placeholder="ejemplo@correo.com"
                  autoComplete="off"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {errors?.email ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : null}
                </div>
              </div>
              <span className="text-red-500 text-xs block mt-1 min-h-[18px]">
                {errors?.email?.message as string}
              </span>
            </div>

            {/* Password */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1 ml-1"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Campo obligatorio",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 text-base transition-all placeholder:text-slate-400"
                  placeholder="Contraseña segura"
                  autoComplete="new-password"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {errors?.password ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : null}
                </div>
              </div>
              <span className="text-red-500 text-xs block mt-1 min-h-[18px]">
                {errors?.password?.message as string}
              </span>
            </div>

            {/* DNI */}
            <div className="relative">
              <label
                htmlFor="dni"
                className="block text-sm font-medium text-gray-700 mb-1 ml-1"
              >
                DNI
              </label>
              <div className="relative">
                <input
                  id="dni"
                  type="text"
                  {...register("dni", {
                    required: "Campo obligatorio",
                    pattern: {
                      value: /^[0-9]{7,8}$/,
                      message: "DNI inválido (7-8 dígitos)",
                    },
                  })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 text-base transition-all placeholder:text-slate-400"
                  placeholder="Ingrese DNI sin puntos"
                  autoComplete="off"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {errors?.dni ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : null}
                </div>
              </div>
              <span className="text-red-500 text-xs block mt-1 min-h-[18px]">
                {errors?.dni?.message as string}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6 pt-4 border-t border-slate-100">
            <button
              type="button"
              className="flex-1 bg-white border border-slate-300 text-indigo-700 px-5 py-3 rounded-xl shadow-sm hover:bg-slate-50 transition font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => list("users")}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Procesando...
                </>
              ) : (
                "Crear usuario"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
