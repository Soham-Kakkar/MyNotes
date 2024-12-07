import React, { useState, useRef, useEffect } from 'react';
import { handleLogout, handleDeleteAccount } from '../../utils/user.utils';
import { handleClickOutside, getInitials } from '../../utils/general.utils';
import './ProfileViewer.css';

interface ProfileViewerProps {
  username: string;
  nickname: string;
}

const ProfileViewer: React.FC<ProfileViewerProps> = ({ username, nickname }) => {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const initials = getInitials(nickname);

  useEffect(() => {
    const clickOutsideHandler = handleClickOutside(dropdownRef, () => setIsVisible(false));
    document.addEventListener('mousedown', clickOutsideHandler);
    return () => {
      document.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, []);

  const handleProfileClick = () => {
    setIsVisible(!isVisible);
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
              onClick={() => handleLogout()}
            >
              Logout
            </button>
            <button 
              className="profile-btn profile-btn-delete" 
              onClick={() => handleDeleteAccount(username)}
            >
              Delete Account
            </button>
          </div>

          {/* {error && (
            <div className="profile-error">
              {error}
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default ProfileViewer;