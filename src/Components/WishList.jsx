import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/CartContext'
import { ThreeDots } from 'react-loader-spinner'
import toast from 'react-hot-toast'

export default function WishList() {
  const { wishList, removeFromWishList, addProductCart } = useContext(Context)
  const [data, setData] = useState(null)

  async function viewWishList() {
    try {
      const response = await wishList()
      console.log("Respuesta de lista de deseos:", response)
      if (response?.data?.status === 'success') {
        setData(response.data.data)
      } else {
        setData([])
      }
    } catch (error) {
      console.error("Error al obtener la lista de deseos:", error)
      setData([])
    }
  }

  async function removeProductFromWishList(id) {
    try {
      const response = await removeFromWishList(id)
      if (response?.data?.status === 'success') {
        toast.success('Producto eliminado con éxito', { className: 'bg-black text-white' })
        setData(prevData => prevData.filter(product => product._id !== id))
      } else {
        toast.error('Por favor, inténtalo de nuevo')
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error)
      toast.error('Error al eliminar el producto')
    }
  }

  async function addProductToCart(productId) {
    try {
      const response = await addProductCart(productId)
      if (response?.data?.status === 'success') {
        toast.success('Producto agregado con éxito', { className: 'bg-black text-white' })
      } else {
        toast.error('Por favor, inténtalo de nuevo')
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error)
      toast.error('Error al agregar el producto')
    }
  }

  useEffect(() => {
    viewWishList()
  }, [])

  return (
    <div className="container py-2 mt-5">
      <div className="row">
        <div className="d-flex align-content-center justify-content-between col-md-10 m-auto pt-5">
          <h2 className="text-gray fw-bolder py-5">Carrito de Compras</h2>
        </div>
        {data === null ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <ThreeDots visible={true} height="80" width="80" color="#4fa94d" radius="9" ariaLabel="three-dots-loading" />
          </div>
        ) : data.length > 0 ? (
          data.map((product) => (
            <div key={product._id} className="col-md-10 m-auto py-4 cart rounded-4 mb-4">
              <div className="row">
                <div className="col-md-2">
                  <img src={product.imageCover} alt={product.title} className="w-100" />
                </div>
                <div className="col-md-10 align-content-center">
                  <div className="d-flex align-content-center justify-content-between">
                    <div>
                      <h5 className="text-gray fw-bolder">
                        {product.title.split(" ").slice(0, 3).join(" ")}
                      </h5>
                      <p className="text-gray fw-bold pt-1">
                        <span className="text-main fw-bolder">{product.price} USD</span>
                      </p>
                      <button
                        onClick={() => removeProductFromWishList(product._id)}
                        className="p-0 border-0 bg-transparent text-danger ps-1 fw-bolder"
                      >
                        <i className="fas fa-trash text-danger fs-5"></i> Eliminar
                      </button>
                    </div>
                    <div className="align-content-center px-1">
                      <button className="btn bg-main text-white" onClick={() => addProductToCart(product._id)}>
                        Agregar al Carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-center text-muted">No hay productos en la lista de deseos</h3>
        )}
      </div>
    </div>
  )
}