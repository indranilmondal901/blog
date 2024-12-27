import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../store/Action/authAction";
import { RESET_AUTH_MESSAGES } from "../store/Types/authTypes";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { authSuccessMessage, authErrorMessage } = useSelector(
    (state) => state.Auth
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginAction(formData));
  };

  const ClearMsg = () => {
    setTimeout(() => {
      dispatch({ type: RESET_AUTH_MESSAGES });
    }, 1000);
  };

  useEffect(() => {
    if (authSuccessMessage) {
      ClearMsg();
      setFormData({
        email: "",
        password: "",
      });
      navigate("/blogs");
    }
    if (authErrorMessage) {
      ClearMsg();
      setFormData({
        email: "",
        password: "",
      });
    }
  }, [authSuccessMessage, authErrorMessage]);

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      {authSuccessMessage && (
        <p className="success-message">{authSuccessMessage}</p>
      )}
      {authErrorMessage && <p className="error-message">{authErrorMessage}</p>}

      <div className="login-redirect">
        <p>Don't have an account?</p>
        <a href="/" className="login-link">
          Click here to register
        </a>
      </div>

    </div>
  );
};

export default LoginPage;
