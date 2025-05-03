import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './login.module.css';
import backgroundGif from "../assets/images/play.gif";
const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.username || !formData.password) {
        setError('Please enter both username and password.');
        return;
      }  
      const response = await axios.post('http://localhost:4000/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userID);
      
      onLogin();
      navigate('/play');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('User not found. Please register first.');
      } else {
        setError(error.response?.data.message || 'Error logging in');
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${backgroundGif})` }}>
      <h1 className={styles.loginTitle}>Login</h1>
      <p className="modal-h2">Please enter your credentials below.</p>
      <form onSubmit={handleSubmit} >
       
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className={styles.gameBtn}
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={styles.gameBtn}
        />

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.gameBtn}>
            Login
          </button>
          <button type="button" onClick={handleRegisterRedirect} className={styles.gameBtn}>
            Register
          </button>
        </div>

        {error && <p className={styles.errorText}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;