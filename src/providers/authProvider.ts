import { AuthProvider } from "@refinedev/core";

import { supabaseClient } from "../utility";

const authProvider: AuthProvider = {
  login: async ({ email, password, providerName }) => {
    // sign in with oauth
    try {
      if (providerName) {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
          provider: providerName,
        });

        if (error) {
          return {
            success: false,
            error,
          };
        }

        if (data?.url) {
          return {
            success: true,
          };
        }
      }

      // sign in with email and password

      const { data: user, error } =
        await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      const { data: userData, error: userError } = await supabaseClient
        .from("users")
        .select("institucion_id")
        .eq("id", user?.user?.id)
        .single();

      if (userError || !userData || !userData.institucion_id) {
        // Desloguea inmediatamente
        await supabaseClient.auth.signOut();
        return {
          success: false,
          error: {
            message:
              "No tienes una empresa asignada. Contacta al administrador.",
          },
        };
      }

      if (user?.user) {
        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
      },
    };
  },

  register: async ({ email, password, name, dni }) => {
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      // Actualizar los datos extra en la tabla users (name y dni)
      if (data?.user) {
        const { error: updateError } = await supabaseClient
          .from("users")
          .update({
            name,
            dni,
          })
          .eq("id", data.user.id);

        if (updateError) {
          return {
            success: false,
            error: updateError,
          };
        }
      }

      if (data) {
        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: {
        message: "Register failed",
        name: "Invalid email or password",
      },
    };
  },
  forgotPassword: async ({ email }) => {
    try {
      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/update-password`,
        }
      );

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
          success: true,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: {
        message: "Forgot password failed",
        name: "Invalid email",
      },
    };
  },
  updatePassword: async ({ password }) => {
    try {
      const { data, error } = await supabaseClient.auth.updateUser({
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error: any) {
      console.log(error);
      return {
        success: false,

        error,
      };
    }
    return {
      success: false,
      error: {
        message: "Update password failed",
        name: "Invalid password",
      },
    };
  },
  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      redirectTo: "/",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async () => {
    try {
      const { data } = await supabaseClient.auth.getSession();
      const { session } = data;

      if (!session) {
        return {
          authenticated: false,
          error: {
            message: "Check failed",
            name: "Session not found",
          },
          logout: true,
          redirectTo: "/login",
        };
      }
    } catch (error: any) {
      return {
        authenticated: false,
        error: error || {
          message: "Check failed",
          name: "Not authenticated",
        },
        logout: true,
        redirectTo: "/login",
      };
    }

    return {
      authenticated: true,
    };
  },

  getPermissions: async () => {
    const { data: user } = await supabaseClient.auth.getUser();

    if (!user?.user?.id) return null;

    const { data: userRoles, error } = await supabaseClient
      .from("user_roles")
      .select("roles(name)")
      .eq("user_id", user.user.id);

    if (error) return null;

    if (userRoles && userRoles.length > 0) {
      // Aquí accedemos correctamente al nombre del rol
      return userRoles.map((r) => r.roles?.name);
    }
    return null;
  },

  getIdentity: async () => {
    const { data: user } = await supabaseClient.auth.getUser();

    const { data: userData, error: userError } = await supabaseClient
      .from("users")
      .select("institucion_id")
      .eq("id", user?.user?.id)
      .single();

    if (user?.user) {
      return {
        ...user.user,
        ...userData,
        name: user.user.email,
      };
    }

    return null;
  },
};

export default authProvider;
