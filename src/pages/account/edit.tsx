import { useState, useRef, useEffect, useMemo } from "react";
import { useGetIdentity, useUpdate } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/config/constants";
import { Identity } from "@/types";

// Extended Identity type with additional fields for the profile
type UserProfile = Identity & {
  dni?: string;
  avatar?: string;
  institution?: string;
  status?: "Activo" | "Inactivo";
  roles?: string[];
  phone?: string;
};

export const AccountEdit = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetIdentity<UserProfile>();
  const { mutate: updateProfile } = useUpdate();
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dni: "",
    phone: "",
  });

  // Avatar state
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Define default user data with useMemo to avoid recreation on every render
  const defaultUserData = useMemo(() => ({
    id: "1",
    name: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    dni: "30.123.456",
    phone: "+54 9 11 1234-5678",
    institution: "Universidad Nacional",
    status: "Activo" as const,
    roles: ["Administrador", "Docente"],
  }), []);
  
  // Update form data when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || defaultUserData.name,
        email: user.email || defaultUserData.email,
        dni: user.dni || defaultUserData.dni,
        phone: user.phone || defaultUserData.phone,
      });
      setAvatarUrl(user.avatar || "https://randomuser.me/api/portraits/men/32.jpg");
    }
  }, [user, defaultUserData]);
  
  // Combine user data with defaults
  const userData = useMemo(() => ({
    ...defaultUserData,
    id: user?.id || defaultUserData.id,
    name: user?.name || defaultUserData.name,
    email: user?.email || defaultUserData.email,
    dni: user?.dni || defaultUserData.dni,
    phone: user?.phone || defaultUserData.phone,
    institution: user?.institucion_id ? "Universidad Nacional" : defaultUserData.institution,
  }), [user, defaultUserData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Por favor, sube una imagen válida (JPG, PNG)");
      return;
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      alert("La imagen no debe pesar más de 2MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update profile with form data and new avatar URL if available
      await updateProfile({
        resource: "users",
        id: userData.id,
        values: {
          ...formData,
          avatar: avatarUrl,
        },
      });

      alert("Datos actualizados correctamente");
      navigate(ROUTES.ACCOUNT.LIST);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error al actualizar los datos");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.ACCOUNT.LIST);
  };

  // Loading state
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
          <div className="bg-indigo-600 py-6 px-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">Editar Mi Cuenta</h1>
            <p className="text-indigo-100 text-sm mt-1">Actualice su información personal</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Picture Section */}
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-40 h-40 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 text-indigo-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-indigo-500 text-center font-medium">
                  Cambiar foto de perfil
                </p>
                <p className="text-xs text-gray-500 text-center mt-1">
                  Formatos: JPG, PNG (Máx. 2MB)
                </p>
              </div>

              {/* Form Fields */}
              <div className="flex-1 space-y-6">
                {/* Nombre */}
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 ml-1">Nombre completo</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 text-base transition-all placeholder:text-slate-400"
                    placeholder="Ingrese nombre completo"
                    required
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 ml-1">Correo electrónico</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 text-base transition-all placeholder:text-slate-400"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>

                {/* Teléfono */}
                <div className="relative">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 ml-1">Teléfono</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 text-base transition-all placeholder:text-slate-400"
                    placeholder="Ingrese número de teléfono"
                  />
                </div>

                {/* Campos de solo lectura */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">DNI</label>
                    <div className="bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-gray-700">
                      {userData.dni}
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Institución</label>
                    <div className="bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-gray-700">
                      {userData.institution}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Estado</label>
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

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Perfiles</label>
                    <div className="flex flex-wrap gap-2">
                      {userData.roles.map((role: string, index: number) => (
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

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-5 py-3 bg-white border border-slate-300 text-indigo-700 rounded-xl shadow-sm hover:bg-slate-50 transition font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Guardando...
                      </>
                    ) : (
                      <>Guardar Cambios</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
