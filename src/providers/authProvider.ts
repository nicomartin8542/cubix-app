import { AuthProvider } from "@refinedev/core";
import { supabaseClient } from "../utility";
import { handleResponse } from "../utils/helpers";

const redirectHome = { redirectTo: "/" };

const authProvider: AuthProvider = {
  login: async ({ email, password, providerName }) => {
    try {
      if (providerName) {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
          provider: providerName,
        });
        return handleResponse(!error, {}, error);
      }
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return handleResponse(false, { error });

      if (data?.user) return handleResponse(true, redirectHome);
    } catch (error) {
      return handleResponse(false, { error });
    }
    return handleResponse(
      false,
      {},
      { message: "Login failed", name: "Invalid email or password" }
    );
  },

  register: async ({ email, password }) => {
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });
      if (error) return handleResponse(false, { error });
      if (data) return handleResponse(true, redirectHome);
    } catch (error) {
      return handleResponse(false, { error });
    }
    return handleResponse(
      false,
      {},
      { message: "Register failed", name: "Invalid email or password" }
    );
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
    } catch (error) {
      return handleResponse(false, { error });
    }
    return handleResponse(
      false,
      {},
      { message: "Forgot password failed", name: "Invalid email" }
    );
  },

  updatePassword: async ({ password }) => {
    try {
      const { data, error } = await supabaseClient.auth.updateUser({
        password,
      });
      if (error) return handleResponse(false, { error });
      if (data) return handleResponse(true, redirectHome);
    } catch (error) {
      return handleResponse(false, { error });
    }
    return handleResponse(
      false,
      {},
      { message: "Update password failed", name: "Invalid password" }
    );
  },

  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();
    return handleResponse(!error, redirectHome, error);
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
          error: { message: "Check failed", name: "Session not found" },
          logout: true,
          redirectTo: "/login",
        };
      }
    } catch (error) {
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
    const { data } = await supabaseClient.auth.getUser();
    return data?.user?.role ?? null;
  },

  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser();
    if (data?.user) {
      return { ...data.user, name: data.user.email };
    }
    return null;
  },
};

export default authProvider;
