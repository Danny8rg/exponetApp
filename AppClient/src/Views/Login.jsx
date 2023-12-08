import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

function Login() {
  const [formData, setFormData] = useState({
    userMail: '',
    userPassword: '',

  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/UserRead', {
        userMail: formData.userMail,
        userPassword: formData.userPassword,
      });

      console.log(response.data);

      if (response.data.userId) {
        Cookies.set('userId', response.data.userId);
        console.log('Cookie userId establecida:', response.data.userId);     
        navigate('/'); 
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <>
    <Header />
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='userMail'>Correo Electrónico</label>
        <input
          type='email'
          id='userMail'
          name='userMail'
          value={formData.userMail}
          onChange={handleChange}
          />
      </div>
      <div>
        <label htmlFor='userPassword'>Contraseña</label>
        <input
          type='password'
          id='userPassword'
          name='userPassword'
          value={formData.userPassword}
          onChange={handleChange}
          />
      </div>
      <button type='submit'>Iniciar Sesión</button>
    </form>
    < Footer />
  </>
  );
}

export default Login;