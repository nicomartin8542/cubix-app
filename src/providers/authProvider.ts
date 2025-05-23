import { AuthProvider } from "@refinedev/core";
import { supabaseClient } from "../utility";
import { handleResponse } from "../utility/helpers";
import { Identity } from "@/types";

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const { data: user, error } =
        await supabaseClient.auth.signInWithPassword({ email, password });

      if (error) return handleResponse(false, { error });

      const { data: userData, error: userError } = await supabaseClient
        .from("users")
        .select("institucion_id")
        .eq("id", user?.user?.id)
        .single();
      console.log(user);

      if (userError || !userData?.institucion_id) {
        await supabaseClient.auth.signOut();
        return handleResponse(false, {
          error: {
            message:
              "No tienes una empresa asignada. Contacta al administrador.",
          },
        });
      }
      if (user?.user) return handleResponse(true, { redirectTo: "/" });
    } catch (error: any) {
      return handleResponse(false, { error });
    }
  },

  onError: async (error) => {
    console.error(error);
    return { error };
  },

  register: async ({ email, name, dni, institucion_id }) => {
    try {
      const { data: existingUser } = await supabaseClient
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

      let emailError: string | null = null;

      if (existingUser) {
        console.log("User already exists");
        emailError = "El usuario ya existe.";
        return handleResponse(false, { error: { message: emailError } });
      }

      const { data, error } = await supabaseClient.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/update-password`,
        },
      });

      if (error) return handleResponse(false, { error });

      if (data?.user) {
        const { error: updateError } = await supabaseClient
          .from("users")
          .update({ name, dni, institucion_id })
          .eq("id", data?.user?.id);
        if (updateError) return handleResponse(false, { error: updateError });
        return handleResponse(true);
      }
    } catch (error: any) {
      return handleResponse(false, { error });
    }
  },

  forgotPassword: async ({ email }) => {
    try {
      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/update-password`,
        }
      );
      if (error) return handleResponse(false, { error });
      if (data) return handleResponse(true);
    } catch (error: any) {
      return handleResponse(false, { error });
    }
  },

  updatePassword: async ({ password }) => {
    try {
      const { data, error } = await supabaseClient.auth.updateUser({
        password,
      });
      if (error) return handleResponse(false, { error });
      if (data) return handleResponse(true, { redirectTo: "/" });
    } catch (error: any) {
      return handleResponse(false, { error });
    }
  },

  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();
    return handleResponse(!error, { redirectTo: "/" }, error);
  },

  check: async () => {
    try {
      const { data } = await supabaseClient.auth.getSession();
      const { session } = data;
      if (!session) {
        return {
          authenticated: false,
          error: { message: "Check failed", name: "Session not found" },
          logout: true,
          redirectTo: "/login",
        };
      }
    } catch (error: any) {
      return {
        authenticated: false,
        error: error || { message: "Check failed", name: "Not authenticated" },
        logout: true,
        redirectTo: "/login",
      };
    }
    return { authenticated: true };
  },

  getPermissions: async () => {
    const { data: user } = await supabaseClient.auth.getUser();
    if (!user?.user?.id) return null;
    const { data: userRoles, error } = await supabaseClient
      .from("user_roles")
      .select("roles(name)")
      .eq("user_id", user.user.id);
    if (error) return null;
    if (userRoles?.length > 0) {
      return userRoles.map((r) => r.roles?.name);
    }
    return null;
  },

  getIdentity: async (): Promise<Identity | null> => {
    const { data: user } = await supabaseClient.auth.getUser();
    if (!user?.user?.id) return null;
    const { data: userData } = await supabaseClient
      .from("users")
      .select("institucion_id, name")
      .eq("id", user?.user?.id)
      .single();
    if (user?.user) {
      return {
        id: user.user.id,
        email: user.user.email || "",
        institucion_id: userData?.institucion_id || "",
        name: userData?.name || "",
      };
    }
    return null;
  },
};

export default authProvider;
