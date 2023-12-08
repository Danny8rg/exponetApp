const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  port: 3308,
  password: "Sena1234",
  database: "exponetApp"
});

app.post("/createUser", async (req, res) => {
  const { userName, userMail, userPassword, userAdress } = req.body;
  console.log (userName)
  console.log (userMail)
  
  const hashedPassword = await bcrypt.hash(userPassword, 10);

  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error de conexión a la base de datos");
      return;
    }

    connection.query(
      'INSERT INTO appUsers (userName, userMail, userPassword, userAdress) VALUES (?, ?, ?, ?)',
      [userName, userMail, hashedPassword, userAdress],
      (error, result) => {
        connection.release(); // Liberar la conexión después de su uso

        if (error) {
          console.log(error);
          res.status(500).send("Error al registrar el usuario");
        } else {
          res.status(200).send("Registro de usuario exitoso");
        }
      }
    );
  });
});

app.post("/userRead", (req, res) => {
  const { userMail, userPassword } = req.body;

  db.query(
    'SELECT * FROM appUsers WHERE userMail = ?',
    [userMail],
    async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error interno del servidor');
      } else {
        if (result.length > 0) {
          const match = await bcrypt.compare(userPassword, result[0].userPassword);
          if (match) {
            res.status(200).json(result[0]);
          } else {
            res.status(401).send('Contraseña incorrecta');
          }
        } else {
          res.status(404).send('Usuario no encontrado');
        }
      }
    }
  );
});

app.post("/CreateShop", (req, res) => {
    const shopName = req.body.shopName;
    const shopTell = req.body.shopTell;
    const shopMail = req.body.shopMail;
    const shopAddress = req.body.shopAddress;
  
    db.query(
      'INSERT INTO appShops (shopName, shopTell, shopMail, shopAddress) VALUES (?, ?, ?, ?)',
      [shopName, shopTell, shopMail, shopAddress],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al crear la tienda");
        } else {
          res.status(200).send(result);
        }
      }
    );
  });

app.post("/createProduct", (req, res) => {
const producto = req.body.producto;
const cantidad = req.body.cantidad;
const categoria = req.body.categoria;
const descripcion = req.body.descripcion;
const fechaVencimiento = req.body.fechaVencimiento;
const precio = req.body.precio;
const shopId = '';
const productId = '';

db.query(
        'INSERT INTO productos(productName, productCategory, productDescription) VALUES (?, ?, ?)',
        [producto, cantidad, categoria, descripcion, fechaVencimiento, precio],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al registrar el producto");
            } else {
                res.status(200).send("Registro de producto exitoso");
        }
    }
);

db.query(
    'INSERT INTO stock(shopId2, productId2, productAmount, productDueDate, ProductPrize) VALUES (?, ?, ?, ?, ?)',
    [shopId, productId, cantidad, fechaVencimiento, precio],
    (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al registrar el producto");
        } else {
            res.status(200).send("Registro de producto exitoso");
    }
}
);


});

app.get("/productsList", (req, res) => {
  db.query('SELECT * FROM appProducts', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener la lista de productos");
    } else {
            res.status(200).send(result);
            console.log(result)
    }
});
});

app.put("/updateProduct", (req, res) => {
const id = req.body.id;
const producto = req.body.producto;
const cantidad = req.body.cantidad;
const categoria = req.body.categoria;
const descripcion = req.body.descripcion;
const fechaVencimiento = req.body.fechaVencimiento;

db.query(
        'UPDATE productos SET producto=?, cantidad=?, categoria=?, descripcion=?, fechaVencimiento=? WHERE id=?',
        [producto, cantidad, categoria, descripcion, fechaVencimiento, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al actualizar el producto");
        } else {
                res.status(200).send(result);
        }
    }
);
});

app.put("/deleteProduct/:id", (req, res) => {
const id = req.params.id;

db.query('DELETE FROM productos WHERE id=?', id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al eliminar el producto");
    } else {
            res.status(200).send(result);
    }
});
});




app.listen(3001,()=>{
    console.log("app listen on port 3001")
})