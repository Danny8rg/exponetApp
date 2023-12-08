import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Components/Header/Header';

function UpdateShop() {
  const [shopName, setShopName] = useState('');
  const [shopTell, setShopTell] = useState('');
  const [shopMail, setShopMail] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [editar, setEditar] = useState(false);
  const [shopsList, setShopsList] = useState([]);

  const addShop = () => {
    Axios.post('http://localhost:3001/CreateShop', {
      shopName: shopName,
      shopTell: shopTell,
      shopMail: shopMail,
      shopAddress: shopAddress,
    }).then(() => {
      getShops();
      limpiarCampos();
      alert('Tienda registrada');
    });
  };

  const updateShop = () => {
    Axios.put('http://localhost:3001/updateShop', {
      shopName: shopName,
      shopTell: shopTell,
      shopMail: shopMail,
      shopAddress: shopAddress,
    }).then(() => {
      getShops();
      alert('Tienda actualizada');
      limpiarCampos();
    });
  };

  const deleteShop = (id) => {
    Axios.put(`http://localhost:3001/deleteShop/${id}`).then(() => {
      alert('Tienda eliminada');
      limpiarCampos();
      getShops();
    });
  };

  const limpiarCampos = () => {
    setShopName('');
    setShopTell('');
    setShopMail('');
    setShopAddress('');
    setEditar(false);
  };

  const CancelarUpdate = () => {
    limpiarCampos();
    setEditar(false);
  };

  const editarTienda = (val) => {
    setEditar(true);

    setShopName(val.shopName);
    setShopTell(val.shopTell);
    setShopMail(val.shopMail);
    setShopAddress(val.shopAddress);
  };

  const getShops = () => {
    Axios.get('http://localhost:3001/shops').then((response) => {
      setShopsList(response.data);
    });
  };

  return (
    <>
    <Header />
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTION DE TIENDAS</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre de la Tienda:
            </span>
            <input
              type="text"
              value={shopName}
              onChange={(event) => {
                setShopName(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese el nombre de la tienda"
              />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Teléfono:
            </span>
            <input
              type="tel"
              value={shopTell}
              onChange={(event) => {
                setShopTell(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese el teléfono de la tienda"
              />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Correo Electrónico:
            </span>
            <input
              type="email"
              value={shopMail}
              onChange={(event) => {
                setShopMail(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese el correo electrónico de la tienda"
              />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Dirección:
            </span>
            <input
              type="text"
              value={shopAddress}
              onChange={(event) => {
                setShopAddress(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese la dirección de la tienda"
              />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {editar ? (
            <div>
              <button onClick={updateShop} className="btn btn-warning m-2">
                Actualizar
              </button>
              <button
                onClick={CancelarUpdate}
                className="btn btn-info m-2"
                >
                Cancelar
              </button>
            </div>
          ) : (
            <button onClick={addShop} className="btn btn-success">
              Registrar
            </button>
          )}
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Correo Electrónico</th>
            <th scope="col">Dirección</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {shopsList.map((val, key) => (
            <tr key={val.id}>
              <th scope="row">{val.id}</th>
              <td>{val.shopName}</td>
              <td>{val.shopTell}</td>
              <td>{val.shopMail}</td>
              <td>{val.shopAddress}</td>
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                  >
                  <button
                    type="button"
                    onClick={() => {
                      editarTienda(val);
                    }}
                    className="btn btn-info"
                    >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteShop(val.id);
                    }}
                    className="btn btn-danger"
                    >
                    Eliminar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Redirigir a la página de productos
                      // Aquí asumo que '/UpdateShop' es la ruta correcta
                      window.location.href = '/UpdateShop';
                    }}
                    className="btn btn-primary"
                    >
                    Productos
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default UpdateShop;
