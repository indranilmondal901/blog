import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterAction } from "../store/Action/authAction";
import { useNavigate } from "react-router-dom";
import { RESET_AUTH_MESSAGES } from "../store/Types/authTypes";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { regSuccessMessage, authErrorMessage } = useSelector(
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
    dispatch(RegisterAction(formData));
  };

  const ClearMsg = () => {
    setTimeout(() => {
      dispatch({ type: RESET_AUTH_MESSAGES });
    }, 1000);
  };

  useEffect(() => {
    if (regSuccessMessage) {
      ClearMsg();
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    }
    if (authErrorMessage) {
      ClearMsg();
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [regSuccessMessage, authErrorMessage]);

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
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
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      {regSuccessMessage && (
        <p className="success-message">{regSuccessMessage}</p>
      )}
      {authErrorMessage && <p className="error-message">{authErrorMessage}</p>}
      <div className="login-redirect">
        <p>Already have an account?</p>
        <a href="/login" className="login-link">
          Click here to login
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
