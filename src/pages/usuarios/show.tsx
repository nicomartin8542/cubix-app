import { useNavigation, useShow, useForgotPassword } from "@refinedev/core";
import { IdentIcon } from "../../components/icons/IdentIcon";
import { ContactIcon } from "../../components/icons/ContactIcon";
import { JobIcon } from "../../components/icons/JobIcon";
import { BackIcon } from "../../components/icons/BackIcon";
import { Spinner } from "@/components/ui/Spinner";
import { useState, useEffect } from "react";
import { Modal } from "@/components/usuarios/Modal";

// Componente auxiliar para mostrar un campo
const DataField = ({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | number | null;
  icon?: React.ReactNode;
}) => (
  <div className="flex flex-col mb-3 sm:mb-4">
    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
      {icon && <span className="text-indigo-500">{icon}</span>}
      <span className="text-xs font-semibold text-slate-500 uppercase">
        {label}
      </span>
    </div>
    <div className="text-sm sm:text-base text-slate-800 bg-slate-50 rounded-md sm:rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 shadow-sm">
      {value ? (
        <span className="font-medium">{value}</span>
      ) : (
        <span className="text-slate-400 italic">No disponible</span>
      )}
    </div>
  </div>
);

// Iconos para los campos
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const DocumentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
      clipRule="evenodd"
    />
  </svg>
);

export const UsuariosShow = () => {
  const { edit, list } = useNavigation();
  const { query } = useShow({
    resource: "users",
  });
  const { mutate: forgotPassword, isLoading: isResetting } =
    useForgotPassword();

  const { data, isLoading } = query;
  const record = data?.data;

  // Estado para controlar la visibilidad del modal
  const [showModal, setShowModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Cierra el modal después de 5 segundos si fue exitoso
  useEffect(() => {
    if (resetSuccess) {
      const timer = setTimeout(() => {
        setShowModal(false);
        setResetSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [resetSuccess]);

  const handleResetPassword = () => {
    if (record?.email) {
      forgotPassword({ email: record.email });
      setResetSuccess(true);
      setShowModal(true);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        resetSuccess={resetSuccess}
        record={record}
      />

      <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 py-4 sm:py-8">
        <div className="relative w-full max-w-4xl bg-white rounded-xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-indigo-100 overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 py-4 sm:py-6 px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight text-center sm:text-left">
                Detalles del usuario
              </h2>
              <p className="text-indigo-100 text-xs sm:text-sm mt-1 text-center sm:text-left">
                Información completa del usuario
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-end">
              <button
                onClick={() => record?.id && edit("users", record.id)}
                className="flex items-center gap-1 sm:gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all text-sm sm:text-base"
                disabled={!record?.id}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Editar
              </button>
              <button
                onClick={() => list("users")}
                className="flex items-center gap-1 sm:gap-2 bg-white/10 hover:bg-white/20 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all text-sm sm:text-base"
              >
                <BackIcon />
                Volver
              </button>
              <button
                onClick={handleResetPassword}
                className="flex items-center gap-1 sm:gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all text-sm sm:text-base"
                disabled={isResetting}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {isResetting ? "Procesando..." : "Resetear contraseña"}
              </button>
            </div>
          </div>

          {/* User Profile Header */}
          <div className="bg-gradient-to-b from-indigo-500/10 to-white px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="bg-indigo-100 rounded-full p-3 sm:p-4 h-20 w-20 sm:h-24 sm:w-24 flex items-center justify-center">
              <span className="text-indigo-600 text-3xl sm:text-4xl font-bold">
                {record?.name ? record.name.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-2 sm:mt-0">
                {record?.name || "Usuario"}
              </h3>
              <p className="text-indigo-600 text-sm sm:text-base">
                {record?.email || "Sin correo electrónico"}
              </p>
              <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start flex-wrap">
                <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Activo
                </span>
                <span className="text-xs sm:text-sm text-gray-500">
                  ID: {record?.id || "--"}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2">
              {/* Sección Identificación */}
              <section className="mb-6 sm:mb-8 col-span-2 lg:col-span-1 ">
                <h2 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-indigo-700 mb-3 sm:mb-4 pb-2 border-b border-indigo-100">
                  <IdentIcon /> Información Personal
                </h2>
                <div className="space-y-2 md:space-y-4">
                  <DataField
                    label="Nombre completo"
                    value={record?.name}
                    icon={<UserIcon />}
                  />
                  <DataField
                    label="DNI"
                    value={record?.dni}
                    icon={<DocumentIcon />}
                  />
                  <DataField
                    label="Fecha de Nacimiento"
                    value={record?.fecha_nacimiento}
                  />
                </div>
              </section>

              {/* Sección Contacto */}
              <section className="mb-6 sm:mb-8 col-span-2 md:col-span-2 lg:col-span-1">
                <h2 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-indigo-700 mb-3 sm:mb-4 pb-2 border-b border-indigo-100">
                  <ContactIcon /> Información de Contacto
                </h2>
                <div className="space-y-2 md:space-y-4">
                  <DataField
                    label="Email"
                    value={record?.email}
                    icon={<EmailIcon />}
                  />
                  <DataField
                    label="Teléfono"
                    value={record?.telefono}
                    icon={<PhoneIcon />}
                  />
                  <DataField label="Dirección" value={record?.direccion} />
                </div>
              </section>

              {/* Sección Adicional */}
              <section className="col-span-2">
                <h2 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-indigo-700 mb-3 sm:mb-4 pb-2 border-b border-indigo-100">
                  <JobIcon /> Información Adicional
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2">
                  <DataField
                    label="Fecha de Registro"
                    value={record?.createdAt}
                  />
                  <DataField
                    label="Última Actualización"
                    value={record?.updatedAt}
                  />
                  <DataField label="Rol" value={record?.role || "Usuario"} />
                  <DataField
                    label="Estado"
                    value={record?.status || "Activo"}
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
