import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";

//Actions de Redux
import {crearNuevoProductoAction} from '../actions/productoActions'


const NuevoProducto = ({history}) => {

  //state del componente
  const [nombre, guardarNombre] = useState('')
  const [precio, guardarPrecio] = useState(0)

  //utilizar use dispatch y te crea una funcion
  const dispatch = useDispatch()

  //acceder al state del store
  const cargando = useSelector((state) => state.productos.loading )
  console.log(cargando)
  const error = useSelector((state) => state.productos.error)

  //mandar llamar el action de productoAction
  const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto))

  //cuando el user haga submit
  const submitNuevoProducto = e => {
    e.preventDefault();

    //validar form
    if(nombre.trim() === '' || precio <= 0){
      return
    }

    //si no hay errorer

    //crear nuevo producto
    agregarProducto({
      nombre,
      precio
    });

    //redireccionar home
    history.push('/')
  }
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>

            <form
              onSubmit={submitNuevoProducto}
            >
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  tyoe="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={ e => guardarNombre(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  tyoe="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  value={precio}
                  onChange={ e => guardarPrecio(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {cargando ? <p>Cargando</p> : null}
            {error ? <p className="alert alert-danger p-2 mt-4 text-center">Hubo un error</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
