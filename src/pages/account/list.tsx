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

export const MisDatos = () => {
  const { data: user } = useGetIdentity<UserProfile>();

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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mis Datos</h1>
        <div className="flex gap-2">
          <button
            onClick={handleChangePassword}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <CandadoIcon />
            Resetear Contraseña
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Picture Section */}
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-indigo-100">
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
              </div>
            </div>

            {/* User Information */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">
                    {userData.name}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    DNI
                  </label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">
                    {userData.dni}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <p className="text-gray-900 bg-gray-50 p-2 rounded">
                  {userData.email}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institución
                </label>
                <p className="text-gray-900 bg-gray-50 p-2 rounded">
                  {userData.institution}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      userData.status === "Activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {userData.status}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Perfiles
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {userData.roles.map((role, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Link
                  to={ROUTES.ACCOUNT.EDIT}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
                >
                  <PencilIcon />
                  Editar Perfil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
