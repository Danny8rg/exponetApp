import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './ProductSampler.css';

function PrincipalShop() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [stock, setStock] = useState({});
  const [showBuyCar, setShowBuyCar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/productsList');
        setProducts(response.data);

        const stockData = response.data.reduce((acc, product) => {
          acc[product.productId] = product.productStock;
          return acc;
        }, {});
        setStock(stockData);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalPrice = (productId) => {
    const product = products.find((p) => p.productId === productId);
    const quantity = selectedProducts[productId] || 0;
    return product ? product.productPrize * quantity : 0;
  };

  const handleBuyClick = () => {
    setShowBuyCar(true);
  };

  return (
    <>
      <div className="product-container">
        {products.slice(0, 3).map((product) => (
          <div key={product.productId} className="product-card">
            <h2>{product.productName}</h2>
            <img src={product.imgurl} alt="imgProduct" className="mages" />
            <p>Descripción: {product.productDescription}</p>
            <p>Precio: {product.productPrize}</p>
            <p>Cantidad: {selectedProducts[product.productId] || 0}</p>
            <p>Total: ${calculateTotalPrice(product.productId)}</p>
            <p>Stock: {stock[product.productId]}</p>
            <p>Tienda: {product.productShopOwner}</p>
            <Link to="/PrincipalShop" className='buttonbuy'>Comprar El Producto</Link>
          </div>
        ))}
      </div>

      
    </>
  );
}

export default PrincipalShop;
