import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Header.css'

const Header = () => {
  const navigate = useNavigate();
  const userId = Cookies.get('userId');

  const handleLogout = () => {
    // Elimina la cookie y realiza cualquier otra lógica de cierre de sesión necesaria
    Cookies.remove('userId');
    // Redirige a la página de inicio o a donde prefieras
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
          <Link to="/UpdateShop">Actualizar Productos</Link>
          <Link to="/CreateShop">crear tienda</Link>
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