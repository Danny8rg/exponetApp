import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Header.css'

const Header = () => {
  const navigate = useNavigate();
  const userId = Cookies.get('userId');

  const handleLogout = () => {
    Cookies.remove('userId');
    navigate('/');
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>   
          <li>
          <Link to="/PrincipalShop">Tiendas</Link>
          </li>
          <li>
          <Link to="/UpdateShop">Productos</Link>
          </li>
          <li>
          <Link to="/CreateShop">Unete</Link>
          </li>    
          {userId ? (
            <>
              <li>
                <button onClick={handleLogout}>Cerrar Sesión</button>
              </li>
              <li>
                <Link to="/BuyCar">Mirar Carrito de Compras</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/Register">Crear Usuario</Link>
              </li>
              <li>
                <Link to="/Login">Iniciar Sesión</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;