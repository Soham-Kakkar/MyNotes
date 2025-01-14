import { handleApiError } from '../utils/general.utils'

const API_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:5000/api';

export interface UserCredentials {
  username: string;
  nickname?: string;
  password: string;
}

export class UserAPI {
  static async registerUser (credentials: UserCredentials): Promise<void> {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    await handleApiError(response);

  }

  static async loginUser (credentials: UserCredentials): Promise<void> {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    await handleApiError(response);
    
  }

  static async isLoggedIn(): Promise<{ authenticated: boolean; username: string; nickname: string }> {
    const response = await fetch(`${API_URL}/users/isLoggedIn`, {
      method: 'GET',
      credentials: 'include',
    });

    await handleApiError(response);
    
    return await response.json();
  }

  static async logoutUser (): Promise<void> {
    const response = await fetch(`${API_URL}/users/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    await handleApiError(response);
    
  }

  static async deleteUserAccount(username: string): Promise<void> {
    const response = await fetch(`${API_URL}/users/delete-account`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    await handleApiError(response);
    
  }
}