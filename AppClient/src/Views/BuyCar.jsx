import React from 'react';

function BuyCar({ selectedProducts, products, onClose }) {
  const generatePurchaseList = () => {
    const purchaseList = [];
    let totalPrice = 0;

    Object.keys(selectedProducts).forEach((productId) => {
      const product = products.find((p) => p.productId === parseInt(productId, 10));
      const quantity = selectedProducts[productId];

      if (product && quantity > 0) {
        const totalProductPrice = product.productPrize * quantity;
        totalPrice += totalProductPrice;

        purchaseList.push(
          <li key={productId}>
            {product.productName} - Cantidad: {quantity} - Precio total: ${totalProductPrice}
          </li>
        );
      }
    });

    return { purchaseList, totalPrice };
  };

  const { purchaseList, totalPrice } = generatePurchaseList();

  return (
    <div>
      <h2>Lista de Compra</h2>
      <ul>{purchaseList}</ul>
      <p>Total a Pagar: ${totalPrice}</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
}

export default BuyCar;