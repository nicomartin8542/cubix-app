export const handleResponse = (
  success: boolean,
  payload: any = {},
  fallbackError?: any
) => {
  if (success) return { success: true, ...payload };
  return {
    success: false,
    error: payload?.error ||
      fallbackError || { message: "Unknown error", name: "Error" },
  };
};
