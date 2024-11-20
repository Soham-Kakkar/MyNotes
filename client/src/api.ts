const API_URL = 'http://localhost:5000/api'; // Replace with your actual API URL

export interface UserCredentials {
  username: string;
  nickname?: string;
  password: string;
}

export const registerUser = async (credentials: UserCredentials): Promise<void> => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(`Error: ${await response.json().then(data => data.message)}`);
  }
};

export const loginUser = async (credentials: UserCredentials): Promise<void> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(`Error: ${await response.json().then(data => data.message)}`);
  }
};

export const isLoggedIn = async (): Promise<{ authenticated: boolean, username: string, nickname: string }> => {
  const response = await fetch(`${API_URL}/users/isLoggedIn`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error checking for session');
  }

  const data = await response.json();
  return data;
}

export const logoutUser = async (): Promise<void> => {
  const response = await fetch(`${API_URL}/users/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
};

export const deleteUserAccount = async (username: string): Promise<void> => {
  const response = await fetch(`${API_URL}/users/delete-account`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    throw new Error('Account deletion failed');
  }
};

export interface noteData {
  username?: string;
  userId?: string,
  title: string,
  content: string,
  createdAt?: Date,
  updatedAt?: Date;
}

export const createNote = async (data: noteData): Promise<void> => {
  const response = await fetch(`${API_URL}/notes/create-note`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error: ${await response.json().then(data => data.message)}`);
  }
};

export const getNotes = async (username: string): Promise<Array<noteData>> => {
  const response = await fetch(`${API_URL}/notes/get-notes?username=${encodeURIComponent(username)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error fetching notes');
  }

  const data = await response.json();
  return data;
}

export const modifyNote = async (data: {id: string, title: string, content: string}): Promise<noteData> => {
  const response = await fetch(`${API_URL}/notes/modify-note`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error: ${await response.json().then(data => data.message)}`);
  }

  const res = await response.json();
  return res;
}

export const deleteNote = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/notes/delete-note`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${await response.json().then(data => data.message)}`);
  }
}