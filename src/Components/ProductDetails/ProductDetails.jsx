import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Context } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  let { id } = useParams();
  const { addProductCart, addToWishList } = useContext(Context);
  const [wishlisted, setWishlisted] = useState({});

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => (
      <ul style={{ margin: "0px", bottom: "5px" }}>
        {dots}
      </ul>
    ),
  };

  async function getProductDetails(id) {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data } = useQuery({
    queryKey: ['productdetails'],
    queryFn: () => getProductDetails(id)
  });

  async function addProductToCart(productId) {
    let { data } = await addProductCart(productId);
    if (data.status === 'success') {
      toast.success('Producto agregado exitosamente', { className: 'bg-black text-white' });
    } else {
      toast.error('Por favor, inténtalo de nuevo');
    }
  }

  async function addProductToWishList(productId) {
    let response = await addToWishList(productId);
    if (response.data.status === 'success') {
      toast.success('Producto agregado a la lista de deseos', { className: 'bg-black text-white' });
    } else {
      toast.error('Por favor, inténtalo de nuevo');
    }
  }

  return (
    <>
      <div className="container mt-5">
        {data?.data?.data ? (
          <>
            <div className="row align-items-center mt-5">
              <div className="col-md-5 mt-5">
                <Slider {...settings} className="my-slider">
                  <img
                    src={data?.data?.data?.imageCover}
                    alt={data?.data?.data?.title}
                    className="w-100 mb-5"
                  />
                  {data.data.data.images.map((img, index) => (
                    <div key={index}>
                      <img
                        src={img}
                        alt={`Slide ${index}`}
                        className="w-100"
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="col-md-7 align-items-center mt-4">
                <h3 className="fw-semibold pb-3 pt-2">
                  {data?.data?.data?.title.split(" ").slice(0, 5).join(" ")}
                </h3>
                <p className="fw-semibold">{data?.data?.data?.description}</p>
                <span className="text-main fw-semibold">
                  {data?.data?.data?.slug.split("-").slice(0, 2).join("-")}
                </span>
                <div className="d-flex justify-content-between my-3 px-5">
                  <p className="fw-semibold">{data?.data?.data?.price} USD</p>
                  <p>
                    <i className="fa fa-star me-1" style={{ color: "orange" }}></i>
                    {data?.data?.data?.ratingsAverage}
                  </p>
                  <Link
                    className="align-content-center"
                    onClick={() => {
                      addProductToWishList(data.data.data.id);
                      setWishlisted((prev) => ({
                        ...prev,
                        [data.data.data.id]: !prev[data.data.data.id],
                      }));
                    }}
                  >
                    <i
                      className={`${wishlisted[data.data.data.id] ? 'fa-solid' : 'fa-regular'} fa-heart mx-2 fs-3`}
                      style={{ color: 'red' }}
                    ></i>
                  </Link>
                </div>
                <button
                  className="btn bg-main text-white w-100 mb-5"
                  onClick={() => addProductToCart(data.data.data.id)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-center align-items-center vh-100">
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}