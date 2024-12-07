import { UserCredentials, UserAPI } from "../api/UserAPI";

export const registerUser = (credentials: UserCredentials) => UserAPI.registerUser(credentials);
export const loginUser = (credentials: UserCredentials) => UserAPI.loginUser(credentials);

export const handleLogout = async () => {
  try {
    await UserAPI.logoutUser();
    window.location.reload();
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export const handleDeleteAccount = async (username: string) => {
  try {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      await UserAPI.deleteUserAccount(username);
      window.location.reload();
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};