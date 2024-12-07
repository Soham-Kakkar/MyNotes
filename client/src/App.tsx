import React, { useState, useEffect } from 'react';
import AuthForm from './components/Auth/AuthForm';
import ProfileViewer from './components/ProfileViewer/ProfileViewer';
import NotesList from './components/Notes/NotesList';
import { UserAPI } from './api/UserAPI';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await UserAPI.isLoggedIn();
        setIsAuthenticated(authStatus.authenticated);
        setUsername(authStatus.username);
        setNickname(authStatus.nickname);
      }
      finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (username: string) => {
    setUsername(username);
    setNickname(nickname);
    setIsAuthenticated(true);
    window.location.reload();
  };

  return (
    <>
      {isAuthenticated && (
        <div className="navbar">
          <h1 style={{ margin: 0 }}>MyNotes</h1>
          <ProfileViewer username={username || ""} nickname={nickname || ""} />
        </div>
      )}
      
      {loading ? (
        <p style={{ width: '100vw', textAlign: 'center' }}>Loading...</p>
      ) : (
        isAuthenticated ? (
          <NotesList username={username || ""} />
        ) : (
          <>
            <h1>MyNotes</h1>
            <AuthForm onAuthSuccess={handleLogin} />
          </>
        )
      )}
    </>
  );
};

export default App;