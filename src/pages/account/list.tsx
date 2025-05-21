import { useGetIdentity } from "@refinedev/core";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/config/constants";
import { Identity } from "@/types";
import { CandadoIcon } from "@/components/icons/CandadoIcon";
import { CamaraIcon } from "@/components/icons/CamaraIcon";
import { PencilIcon } from "@/components/icons/PencilIcon";

// Extended Identity type with additional fields for the profile
type UserProfile = Identity & {
  dni?: string;
  avatar?: string;
  institution?: string;
  status?: "Activo" | "Inactivo";
  roles?: string[];
};

// Componente para mostrar un campo de información
const InfoField = ({ label, value, icon }: { label: string; value?: string | null; icon?: React.ReactNode }) => (
  <div className="mb-4">
    <div className="flex items-center gap-2 mb-1">
      {icon && <span className="text-indigo-500">{icon}</span>}
      <label className="text-sm font-medium text-gray-700">{label}</label>
    </div>
    <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-800 shadow-sm">
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
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
  </svg>
);

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H7a1 1 0 00-1 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
  </svg>
);

export const MisDatos = () => {
  const { data: user, isLoading } = useGetIdentity<UserProfile>();

  // Mock data for demonstration - replace with actual user data
  const userData = {
    id: user?.id || "1",
    name: user?.name || "Juan Pérez",
    email: user?.email || "juan.perez@ejemplo.com",
    dni: user?.dni || "30.123.456",
    institution: user?.institucion_id
      ? "Universidad Nacional"
      : "Universidad Nacional",
    status: "Activo",
    roles: ["Administrador", "Docente"],
    avatar: user?.avatar || "https://randomuser.me/api/portraits/men/32.jpg",
  };

  const handleChangePassword = () => {
    // Implement password change logic
    alert("Funcionalidad de cambio de contraseña en desarrollo");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="text-indigo-700 font-medium">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-indigo-100 overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-indigo-600 py-6 px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Mi Cuenta</h1>
              <p className="text-indigo-100 text-sm mt-1">Información personal y configuración</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleChangePassword}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <CandadoIcon />
                Resetear Contraseña
              </button>
            </div>
          </div>

          {/* User Profile Header */}
          <div className="bg-gradient-to-b from-indigo-500/10 to-white px-8 py-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CamaraIcon />
                )}
              </div>
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-gray-800">{userData.name}</h3>
              <p className="text-indigo-600">{userData.email}</p>
              <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {userData.status}
                </span>
                {userData.roles.map((role, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              {/* Información Personal */}
              <section className="mb-8 col-span-1">
                <h2 className="flex items-center gap-3 text-lg font-bold text-indigo-700 mb-4 pb-2 border-b border-indigo-100">
                  <UserIcon /> Información Personal
                </h2>
                <div className="space-y-2">
                  <InfoField label="Nombre completo" value={userData.name} icon={<UserIcon />} />
                  <InfoField label="DNI" value={userData.dni} icon={<DocumentIcon />} />
                </div>
              </section>

              {/* Información de Contacto */}
              <section className="mb-8 col-span-1">
                <h2 className="flex items-center gap-3 text-lg font-bold text-indigo-700 mb-4 pb-2 border-b border-indigo-100">
                  <EmailIcon /> Información de Contacto
                </h2>
                <div className="space-y-2">
                  <InfoField label="Correo electrónico" value={userData.email} icon={<EmailIcon />} />
                  <InfoField label="Institución" value={userData.institution} icon={<BuildingIcon />} />
                </div>
              </section>
            </div>

            {/* Botón de edición */}
            <div className="flex justify-end pt-4 mt-4 border-t border-slate-100">
              <Link
                to={ROUTES.ACCOUNT.EDIT}
                className="px-5 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center gap-2"
              >
                <PencilIcon />
                Editar Perfil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
