import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAction } from '../store/Action/authAction';

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.Auth);

  const handleLogout = () => {
    dispatch(LogoutAction());
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-username">
          Welcome, <span>{currentUser?.name || 'Guest'}</span>
        </div>
        <button onClick={handleLogout} className="header-logout-button">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;