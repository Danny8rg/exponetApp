import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header/Header'
import './PrincipalShop.css';
import Footer from '../Components/Footer/Footer';

function PrincipalShop() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [stock, setStock] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/productsList');
        setProducts(response.data);

        // Inicializar el estado de stock con los valores del servidor
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

  const handleIncrement = (productId) => {
    if (stock[productId] > 0) {
      setSelectedProducts((prevSelectedProducts) => {
        const updatedProducts = { ...prevSelectedProducts };
        updatedProducts[productId] = (updatedProducts[productId] || 0) + 1;
        return updatedProducts;
      });

      setStock((prevStock) => {
        const updatedStock = { ...prevStock };
        updatedStock[productId] = (updatedStock[productId] || 0) - 1;
        return updatedStock;
      });
    }
  };

  const handleDecrement = (productId) => {
    if (selectedProducts[productId] > 0) {
      setSelectedProducts((prevSelectedProducts) => {
        const updatedProducts = { ...prevSelectedProducts };
        updatedProducts[productId] -= 1;
        return updatedProducts;
      });

      setStock((prevStock) => {
        const updatedStock = { ...prevStock };
        updatedStock[productId] = (updatedStock[productId] || 0) + 1;
        return updatedStock;
      });
    }
  };

  const calculateTotalPrice = (productId) => {
    const product = products.find((p) => p.productId === productId);
    const quantity = selectedProducts[productId] || 0;
    return product ? product.productPrize * quantity : 0;
  };

  return (
    <>
      <Header />
      <h1 className='title'>Exponet.com</h1>
      <div className="product-container">
        {products.map((product) => (
          <div key={product.productId} className="product-card">
            <h2>{product.productName}</h2>
            <img src={product.imgurl} alt="imgProduct" className="mages" />
            <p>Descripción: {product.productDescription}</p>
            <p>Precio: {product.productPrize}</p>
            <div className="quantity-controls">
              <button onClick={() => handleDecrement(product.productId)}>-</button>
              <span>{selectedProducts[product.productId] || 0}</span>
              <button onClick={() => handleIncrement(product.productId)}>+</button>
            </div>
            <p>Total: ${calculateTotalPrice(product.productId)}</p>
            <p>Stock: {stock[product.productId]}</p>
            <p>Tienda: {product.productShopOwner}</p>
          </div>
        ))}
      <Footer />
      </div>
    </>
  );
}

export default PrincipalShop;
