import { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import backgroundGif from "../assets/images/play.gif";
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/users/register', formData);
      navigate('/login');
    } catch (error) {
      console.log(error)
      setError(error.response?.data.message || 'Error registering');
    }
  };

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${backgroundGif})` }}>
      <h1 className={styles.loginTitle}>Register</h1>
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
          <button type="submit"  className={styles.gameBtn}>
            Register
          </button>
        </div>

        {error && <p className={styles.errorText}>{error}</p>}
      </form>
    </div>
    
  );
};

export default Register;