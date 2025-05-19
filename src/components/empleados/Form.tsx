import React from "react";
import { IdentIcon } from "../../components/icons/IdentIcon";
import { ContactIcon } from "../../components/icons/ContactIcon";
import { JobIcon } from "../../components/icons/JobIcon";

interface FormEmpleadoProps {
  register: any;
  errors: any;
  handleSubmit: (
    onSubmit: (values: any) => void
  ) => (e?: React.BaseSyntheticEvent) => void;
  onSubmit: (values: any) => void;
  defaultValues?: any;
  isLoading?: boolean;
  formtype?: any;
}

export const FormEmpleado: React.FC<FormEmpleadoProps> = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  isLoading = false,
  formtype,
}) => {
  const update = formtype === "edit" ? true : false;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col gap-10 pt-16 pb-8 px-4 sm:px-8"
    >
      {/* Sección 1: Identificación */}
      <section id="seccion-identificacion" className="mb-6 ">
        <h2 className="text-2xl font-extrabold text-indigo-700 mb-6 flex items-center gap-3">
          <IdentIcon />
          Identificación
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-semibold text-indigo-700 text-base">
              CUIL
            </label>
            <input
              type="text"
              maxLength={11}
              {...register("nro_cuil", { required: "Campo obligatorio" })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
              placeholder="Ej: 20123456783"
            />
            <span className="text-red-500 text-xs">
              {errors?.nro_cuil?.message as string}
            </span>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-indigo-700 text-base">
              Tipo Doc.
            </label>
            <select
              {...register("tpo_doc", { required: "Campo obligatorio" })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
            >
              <option value="">Seleccione...</option>
              <option value="1">DNI</option>
              <option value="2">LC</option>
              <option value="3">LE</option>
              <option value="4">Otro</option>
            </select>
            <span className="text-red-500 text-xs">
              {errors?.tpo_doc?.message as string}
            </span>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-indigo-700 text-base">
              Nro. Documento
            </label>
            <input
              type="number"
              {...register("nro_doc", { required: "Campo obligatorio" })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
              placeholder="Ej: 12345678"
            />
            <span className="text-red-500 text-xs">
              {errors?.nro_doc?.message as string}
            </span>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-indigo-700 text-base">
              Apellido y Nombre
            </label>
            <input
              type="text"
              maxLength={100}
              {...register("ape_nom", { required: "Campo obligatorio" })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
              placeholder="Ej: Juan Pérez"
            />
            <span className="text-red-500 text-xs">
              {errors?.ape_nom?.message as string}
            </span>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-indigo-700 text-base">
              Sexo
            </label>
            <select
              {...register("sexo", { required: "Campo obligatorio" })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
            >
              <option value="">Seleccione...</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="X">Otro</option>
            </select>
            <span className="text-red-500 text-xs">
              {errors?.sexo?.message as string}
            </span>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-indigo-700 text-base">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              {...register("fecha_nac", { required: "Campo obligatorio" })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
            />
            <span className="text-red-500 text-xs">
              {errors?.fecha_nac?.message as string}
            </span>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-indigo-700 text-base">
              Estado Civil
            </label>
            <select
              {...register("est_civil", { required: "Campo obligatorio" })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
            >
              <option value="">Seleccione...</option>
              <option value="soltero">Soltero/a</option>
              <option value="casado">Casado/a</option>
              <option value="divorciado">Divorciado/a</option>
              <option value="viudo">Viudo/a</option>
              <option value="otro">Otro</option>
            </select>
            <span className="text-red-500 text-xs">
              {errors?.est_civil?.message as string}
            </span>
          </div>
        </div>
      </section>
      {/* Sección 2: Contacto y Domicilio */}
      <section id="seccion-contacto" className="mb-6 scroll-mt-32">
        <h2 className="text-2xl font-extrabold text-indigo-700 mb-6 flex items-center gap-3">
          <ContactIcon />
          Contacto y Domicilio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-semibold text-indigo-700 text-base">
              Email
            </label>
            <input
              type="email"
              maxLength={100}
              {...register("email", { required: "Campo obligatorio" })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
              placeholder="Ej: correo@ejemplo.com"
            />
            <span className="text-red-500 text-xs">
              {errors?.email?.message as string}
            </span>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-indigo-700 text-base">
              Teléfono
            </label>
            <input
              type="text"
              maxLength={100}
              {...register("tel")}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
              placeholder="Ej: 299-1234567"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-indigo-700 text-base">
              Celular
            </label>
            <input
              type="text"
              maxLength={100}
              {...register("cel")}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
              placeholder="Ej: 299-7654321"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-indigo-700 text-base">
              Código Postal
            </label>
            <input
              type="text"
              maxLength={100}
              {...register("cod_pos")}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
              placeholder="Ej: 8300"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-indigo-700 text-base">
              Calle
            </label>
            <input
              type="text"
              maxLength={100}
              {...register("nom_call")}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
              placeholder="Ej: Belgrano"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block mb-1 font-semibold text-indigo-700 text-base">
                Nro.
              </label>
              <input
                type="number"
                {...register("nro_call")}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
                placeholder="Ej: 123"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-indigo-700 text-base">
                Piso
              </label>
              <input
                type="number"
                {...register("nro_piso")}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
                placeholder="Ej: 2"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-indigo-700 text-base">
                Dpto.
              </label>
              <input
                type="number"
                {...register("nro_dpto")}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
                placeholder="Ej: A"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Sección 3: Laboral y Bancario */}
      <section id="seccion-laboral" className="scroll-mt-32">
        <h2 className="text-2xl font-extrabold text-indigo-700 mb-6 flex items-center gap-3">
          <JobIcon />
          Laboral y Bancario
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-semibold text-indigo-700 text-base">
              CBU
            </label>
            <input
              type="text"
              maxLength={100}
              {...register("nro_cbu")}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
              placeholder="Ej: 2850590940090418135201"
            />
          </div>
          <div className={!update ? "hidden" : ""}>
            <label className="block mb-1 font-semibold text-indigo-700 text-base">
              Fecha de Baja
            </label>
            <input
              type="date"
              {...register("fecha_de_baja")}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
            />
          </div>
          <div className="hidden">
            <label className="block mb-1 font-semibold text-indigo-700 text-base">
              Status
            </label>
            <input
              type="text"
              maxLength={100}
              {...register("status")}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
              placeholder="Ej: Activo"
            />
          </div>
          <div className="hidden">
            <label className="block mb-1 font-semibold text-indigo-700 text-base">
              Posee Litis
            </label>
            <select
              {...register("posee_litis")}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
            >
              <option value="">Seleccione...</option>
              <option value="1">Sí</option>
              <option value="0">No</option>
            </select>
          </div>
          <div className="hidden">
            <label className="block mb-1 font-semibold text-indigo-700 text-base">
              Enviado sin CBU
            </label>
            <input
              type="text"
              maxLength={100}
              {...register("enviado_sin_cbu", {})}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50 text-base transition-all"
              placeholder="Obligatorio"
            />
            <span className="text-red-500 text-xs">
              {errors?.enviado_sin_cbu?.message as string}
            </span>
          </div>
        </div>
      </section>
      {/* Botón de guardar */}
      <div className="lg:col-span-3 flex justify-end mt-8">
        <button
          type="submit"
          className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 cursor-pointer shadow-xl text-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          <span role="img" aria-label="Guardar">
            💾
          </span>{" "}
          Guardar
        </button>
      </div>
    </form>
  );
};
