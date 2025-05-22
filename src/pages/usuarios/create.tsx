import { useUser } from "@/context/UserContext";
import { useNavigation, useRegister } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { IdentIcon } from "../../components/icons/IdentIcon";
import { ContactIcon } from "../../components/icons/ContactIcon";
import { BackIcon } from "../../components/icons/BackIcon";
import {
  UserIcon,
  EmailIcon,
  DocumentIcon,
  PhoneIcon,
  CalendarIcon,
  HomeIcon,
} from "../../components/icons/EditIcons";

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
    const password = "123456";
    mutate({ ...values, password, institucion_id: user?.institucion_id });
    reset();
    list("usuarios");
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-4">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-indigo-100 overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 py-6 px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Crear nuevo usuario
            </h2>
            <p className="text-indigo-100 text-sm mt-1">
              Complete los datos para registrar un nuevo usuario
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => list("users")}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all"
            >
              <BackIcon />
              Volver
            </button>
          </div>
        </div>

        {/* User Profile Header */}
        <div className="bg-gradient-to-b from-indigo-500/10 to-white px-8 py-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="bg-indigo-100 rounded-full p-4 h-24 w-24 flex items-center justify-center">
            <span className="text-indigo-600 text-4xl font-bold">U</span>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold text-gray-800">Nuevo Usuario</h3>
            <p className="text-indigo-600">Complete el formulario</p>
            <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Pendiente
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onFinish)} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {/* Sección Identificación */}
            <section className="mb-8 col-span-1">
              <h2 className="flex items-center gap-3 text-lg font-bold text-indigo-700 mb-4 pb-2 border-b border-indigo-100">
                <IdentIcon /> Información Personal
              </h2>
              <div className="space-y-6">
                {/* Nombre */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-indigo-500">
                      <UserIcon className="size-4" />
                    </span>
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold text-slate-500 uppercase"
                    >
                      Nombre completo
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      {...register("name", { required: "Campo obligatorio" })}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 text-base transition-all placeholder:text-slate-400"
                      placeholder="Ingrese nombre completo"
                      autoComplete="off"
                    />
                  </div>
                  {errors?.name && (
                    <span className="text-red-500 text-xs block mt-1 min-h-[18px]">
                      {errors?.name?.message as string}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-indigo-500">
                      <EmailIcon />
                    </span>
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold text-slate-500 uppercase"
                    >
                      Correo electrónico
                    </label>
                  </div>
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
                  </div>
                  {errors?.email && (
                    <span className="text-red-500 text-xs block mt-1 min-h-[18px]">
                      {errors?.email?.message as string}
                    </span>
                  )}
                </div>

                {/* DNI */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-indigo-500">
                      <DocumentIcon />
                    </span>
                    <label
                      htmlFor="dni"
                      className="text-xs font-semibold text-slate-500 uppercase"
                    >
                      DNI
                    </label>
                  </div>
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
                  </div>
                  {errors?.dni && (
                    <span className="text-red-500 text-xs block mt-1 min-h-[18px]">
                      {errors?.dni?.message as string}
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* Sección Contacto */}
            <section className="mb-8 col-span-1">
              <h2 className="flex items-center gap-3 text-lg font-bold text-indigo-700 mb-4 pb-2 border-b border-indigo-100">
                <ContactIcon /> Información de Contacto
              </h2>
              <div className="space-y-6">
                {/* Teléfono */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-indigo-500">
                      <PhoneIcon />
                    </span>
                    <label
                      htmlFor="telefono"
                      className="text-xs font-semibold text-slate-500 uppercase"
                    >
                      Teléfono
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="telefono"
                      type="text"
                      {...register("telefono")}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 text-base transition-all placeholder:text-slate-400"
                      placeholder="Ingrese número de teléfono"
                      autoComplete="off"
                    />
                  </div>
                  {errors?.telefono && (
                    <span className="text-red-500 text-xs block mt-1 min-h-[18px]">
                      {errors?.telefono?.message as string}
                    </span>
                  )}
                </div>

                {/* Dirección */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-indigo-500">
                      <HomeIcon />
                    </span>
                    <label
                      htmlFor="direccion"
                      className="text-xs font-semibold text-slate-500 uppercase"
                    >
                      Dirección
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="direccion"
                      type="text"
                      {...register("direccion")}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 text-base transition-all placeholder:text-slate-400"
                      placeholder="Ingrese dirección"
                      autoComplete="off"
                    />
                  </div>
                  {errors?.direccion && (
                    <span className="text-red-500 text-xs block mt-1 min-h-[18px]">
                      {errors?.direccion?.message as string}
                    </span>
                  )}
                </div>

                {/* Fecha de Nacimiento */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-indigo-500">
                      <CalendarIcon />
                    </span>
                    <label
                      htmlFor="fecha_nacimiento"
                      className="text-xs font-semibold text-slate-500 uppercase"
                    >
                      Fecha de Nacimiento
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="fecha_nacimiento"
                      type="date"
                      {...register("fecha_nacimiento")}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 text-base transition-all placeholder:text-slate-400"
                      autoComplete="off"
                    />
                  </div>
                  {errors?.fecha_nacimiento && (
                    <span className="text-red-500 text-xs block mt-1 min-h-[18px]">
                      {errors?.fecha_nacimiento?.message as string}
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* Buttons */}
            <div className="flex gap-4 mt-6 pt-4 border-t border-slate-100 col-span-2">
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
          </div>
        </form>
      </div>
    </div>
  );
};
