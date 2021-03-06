import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR
} from '../types'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

//crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto())

        try {

            //Insertar en la API
            await clienteAxios.post('/productos', producto)

            //Si todo sale bien, actualizar state
            dispatch(agregarProductoExito(producto))

            //Alerta
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            )
        } catch (error) {
            console.log(error)
            //si hay un error cambiar state
            dispatch(agregarProductoError(true))

            //Alerta error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

//Si el producto se guarda en la BD
const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//Error
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

const obtenerProductoEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
}) 


//selecciona y elimina producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id))
        
        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch(eliminarProductoExito())
        } catch (error) {
            
        }
    }
}


//funcion que descarga productos de la bd
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch(descargarProductos())

        try {
            const respuesta = await clienteAxios.get('/productos')
            dispatch(descargaProductosExitosa(respuesta.data))
            console.log(respuesta.data)
        } catch (error) {
            dispatch(descargaProductosError())
            console.log(error)
        }
    }
}