import React, { useState, useRef, useEffect } from 'react';
import { logoutUser, deleteUserAccount } from '../api';
import './ProfileViewer.css';

interface ProfileViewerProps {
  username: string;
  nickname: string;
}

const ProfileViewer: React.FC<ProfileViewerProps> = ({ username, nickname }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Calculate initials
  const parts = nickname.split(' ');
  const initials = (parts.length > 1
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : username[0].toUpperCase());

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsVisible(!isVisible);
  };

  const handleLogout = () => {
    logoutUser();
    window.location.reload();
  }

  const handleDeleteAccount = async () => {
    try {
      if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        await deleteUserAccount(username);
        window.location.reload();
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="profile-container" ref={dropdownRef}>
      <div 
        className="profile-avatar" 
        onClick={handleProfileClick}
      >
        {initials}
      </div>

      {isVisible && (
        <div className="profile-dropdown">
          <div className="profile-info">
            <div className="profile-info-avatar">
              {initials}
            </div>
            <div className="profile-info-name">{nickname}</div>
            <div className="profile-info-username">@{username}</div>
          </div>

          <div className="profile-actions">
            <button 
              className="profile-btn profile-btn-logout" 
              onClick={handleLogout}
            >
              Logout
            </button>
            <button 
              className="profile-btn profile-btn-delete" 
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>

          {error && (
            <div className="profile-error">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileViewer;