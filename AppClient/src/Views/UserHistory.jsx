import axios from "axios";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./UserHistory.css";

function UserHistory() {
  const [buyCars, setBuyCars] = useState([]);
  const [buyCarUser, setBuyCarUser] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBuyCarUser(Cookies.get("userId"));
    const fetchBuyCars = async () => {
      try {
        const response = await axios.get(
          "https://exponetapp-8fxj.onrender.com/buyCarsList"
        );
        console.dir(response.data);
        setBuyCars(response.data);
        setLoading(false); // Cambia el estado de carga a falso cuando se completa la solicitud
      } catch (error) {
        console.error("Error al obtener historial de compras:", error);
        setLoading(false); // Cambia el estado de carga a falso si hay un error
      }
    };

    fetchBuyCars();
  }, []);

  return (
    <>
      <Header />
      <div className="box-title-historial">
        <h2 className="product-title-historial">Historial De Compras</h2>
      </div>
      {loading ? (
        <p>Cargando historial de compras...</p>
      ) : (
        <div className="shops-container-historial">
           <thead>
              <tr>
                <th>Nombre del Producto</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Cantidad</th>
              </tr>
            </thead>
          <table>
            <tbody>
              {buyCars
                .filter((buyCar) => buyCar.buyCarUser === parseInt(buyCarUser))
                .map((filteredBuyCar) =>
                  JSON.parse(filteredBuyCar.buyCarContent).products.map(
                    (product, index) => (
                      <tr key={product.productId}>
                        <td>{product.productName}</td>
                        <td>{product.productDescription}</td>
                        <td>{product.productPrize}</td>
                        <td>{product.productState}</td>
                        <td>
                          {Array.isArray(
                            JSON.parse(filteredBuyCar.buyCarContent).quantities
                          ) &&
                            JSON.parse(filteredBuyCar.buyCarContent)
                              .quantities[index].quantity}
                        </td>
                      </tr>
                    )
                  )
                )}
            </tbody>
          </table>
        </div>
      )}
      <Footer />
    </>
  );
}

export default UserHistory;
