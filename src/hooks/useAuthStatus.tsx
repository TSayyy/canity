export const useAuthStatus = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated;
};
