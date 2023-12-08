import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

function RegisterForm() {
  const [formData, setFormData] = useState({
    userName: '',
    userMail: '',
    userPassword: '',
    confirmPassword: '',
    userAdress: '',
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

    if (formData.userPassword !== formData.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

   
    if (!formData.userName || !formData.userMail || !formData.userPassword || !formData.confirmPassword) {
      console.error('Por favor, complete todos los campos');
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.userMail)) {
      console.error('Formato de correo electrónico inválido');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/createUser', {
        userName: formData.userName,
        userMail: formData.userMail,
        userPassword: formData.userPassword,
        userAdress: formData.userAdress,
      });

      console.log(response.data);

      navigate('/');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <>
    <Header />
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='userName'>Nombre De Usuario</label>
        <input
          type='text'
          id='userName'
          name='userName'
          value={formData.userName}
          onChange={handleChange}
          />
      </div>
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
        <label htmlFor='userAdress'>Direccion de residencia</label>
        <input
          type='text'
          id='userAdress'
          name='userAdress'
          value={formData.userAdress}
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
      <div>
        <label htmlFor='confirmPassword'>Confirmar Contraseña</label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
          />
      </div>
      <button type='submit'>Registrarse</button>
    </form>
    < Footer />
  </>
  );
}

export default RegisterForm;
