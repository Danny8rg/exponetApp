import { useState } from 'react';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Components/Header/Header';

function UpdateShop() {

  const [producto, setProducto] = useState('')
  const [cantidad, setCantidad] = useState()
  const [categoria, setCategoria] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaVencimiento, setFechaVencimiento] = useState()
  const [id, setId] = useState()
  const [precio, setPrecio] = useState('')
  const [editar, setEditar] = useState(false)
  const [productosList, setProductosList] = useState([])

  const add =() =>{
    Axios.post("http://localhost:3001/createProduct",{
      producto: producto,
      cantidad: cantidad,
      categoria: categoria,
      descripcion: descripcion,
      fechaVencimiento: fechaVencimiento,
      precio: precio
    }).then(() =>{
      getProductos()
      limpiarCampos()
      alert("Producto registrado")
    })
  }

  
  const update =() =>{
    Axios.put("http://localhost:3001/updateProduct",{
      id: id,
      producto: producto,
      cantidad: cantidad,
      categoria: categoria,
      descripcion: descripcion,
      fechaVencimiento: fechaVencimiento,
      precio: precio
    }).then(() =>{
      getProductos()
      alert("Producto actualizado")
      limpiarCampos()
    })
  }

  const deleteProducto =(id) =>{
    Axios.put(`http://localhost:3001/delete/Product${id}`).then(() =>{
      alert("Producto eliminado")
      limpiarCampos()
      getProductos()
    })
  }

  const limpiarCampos = () =>{
    setProducto("")
    setCantidad("")
    setCategoria("")
    setDescripcion("")
    setFechaVencimiento("")
    setPrecio("")
    setId("")
    setEditar(false)
  }

  const CancelarUpdate = () =>{
    limpiarCampos()
    setEditar(false)
  }

  const editarProducto = (val) =>{
    setEditar(true)

    setProducto(val.producto)
    setCantidad(val.cantidad)
    setCategoria(val.categoria)
    setDescripcion(val.descripcion)
    setFechaVencimiento(val.fechaVencimiento)
    setPrecio(val.precio)
    setId(val.id)
  }

  const getProductos =() =>{
    Axios.get("http://localhost:3001/productos").then((response) =>{
      setProductosList(response.data);
    })
  }
  
  return (
    <>
    <Header />
    <div className="container">

      <div className="card text-center">
        <div className="card-header">
          GESTION DE PRODUCTOS
        </div>
        <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Producto:</span>
          <input type="text" value={producto}
              onChange={(Event)=>{
                setProducto(Event.target.value)
              }}
              className="form-control" placeholder="Ingrese un producto" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Cantidad:</span>
          <input type="number" value={cantidad}
              onChange={(Event)=>{
                setCantidad(Event.target.value)
              }}
              className="form-control" placeholder="Ingrese la cantidad" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Categoría:</span>
          <input type="text" value={categoria}
              onChange={(Event)=>{
                setCategoria(Event.target.value)
              }}
              className="form-control" placeholder="Ingrese la categoría" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Descripción:</span>
          <input type="text" value={descripcion}
              onChange={(Event)=>{
                setDescripcion(Event.target.value)
              }}
              className="form-control" placeholder="Ingrese la descripción" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Fecha Vencimiento:</span>
          <input type="date" value={fechaVencimiento} 
              onChange={(Event)=>{
                setFechaVencimiento(Event.target.value)
              }}
              className="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">precio:</span>
          <input type="number" value={precio} 
              onChange={(Event)=>{
                setPrecio(Event.target.value)
              }}
              className="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        </div>
        <div className="card-footer text-body-secondary">

          {
            editar?
            <div>
            <button onClick={update} className='btn btn-warning m-2'>Actualizar</button>
            <button onClick={CancelarUpdate} className='btn btn-info m-2'>Cancelar</button>
            </div>
            : <button onClick={add} className='btn btn-success'>Registrar</button>
          }
        </div>
      </div>

      <table className="table table-striped">
      <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Producto</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Categoría</th>
      <th scope="col">Descripción</th>
      <th scope="col">Fecha Vencimiento</th>
      <th scope="col">Precio</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>

    {
      productosList.map((val, key) =>{
        return <tr key={val.id}>
          <th scope="row">{val.id}</th>
          <td>{val.producto}</td>
          <td>{val.cantidad}</td>
          <td>{val.categoria}</td>
          <td>{val.descripcion}</td>
          <td>{val.fechaVencimiento}</td>
          <td>{val.precio}</td>
          <td>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" 
            onClick={()=>{
              editarProducto(val)
            }}
            className="btn btn-info">Editar</button>
            <button type="button"
              onClick={()=>{
                deleteProducto(val.id)
              }}
              className="btn btn-danger">Eliminar</button>
          </div>
          </td>
        </tr>
      })
    }
  </tbody>
      </table>
    </div>
  </>
  );
}

export default UpdateShop;