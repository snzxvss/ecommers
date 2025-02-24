import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import image from "../../Assets/images/signup-g-Dtp6-wtD.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function registerSubmit(values) {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/login");
      setIsLoading(false);
    }, 1000);
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(10, "El nombre no debe exceder los 10 caracteres")
      .required("El nombre es obligatorio"),
    email: Yup.string()
      .email("Formato de correo electrónico inválido")
      .required("El correo electrónico es obligatorio"),
    phone: Yup.string()
      .matches(/^(010|011|012|015)\d{8}$/, "Número de teléfono inválido")
      .required("El número de teléfono es obligatorio"),
    password: Yup.string()
      .matches(
        /^[A-Za-z][a-zA-Z0-9]{5,10}$/,
        "La contraseña debe comenzar con una letra y tener entre 6 y 11 caracteres"
      )
      .required("La contraseña es obligatoria"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
      .required("La confirmación de la contraseña es obligatoria"),
  });

  let formik = useFormik({
    initialValues: { name: "", phone: "", email: "", password: "", rePassword: "" },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <div className="container pt-5">
      <div className="row align-content-center justify-content-center gap-4 g-3">
        <div className="col-md-5 pt-5">
          <img src={image} alt="Registro" className="w-100 pt-5 mt-3" />
        </div>
        <div className="col-md-5">
          <div className="mx-auto py-5">
            <h3 className="pt-5 text-gray-900 fw-bolder">Crea una cuenta</h3>
            <p className="text-gray-900p fw-bolder">
              ¡Únete a Ecommers hoy! Ingresa tus datos para registrarte.
            </p>
            {error ? <div className="alert alert-danger p-2 mt-2">{error}</div> : null}
            <form onSubmit={formik.handleSubmit}>
              <label className="text-gray-900p fw-bolder py-2" htmlFor="name">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                className="form-control mb-2"
                id="name"
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="alert alert-danger p-2 mt-2">{formik.errors.name}</div>
              ) : null}
              <label className="text-gray-900p fw-bolder py-2" htmlFor="email">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                className="form-control mb-2"
                id="email"
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div>
              ) : null}
              <label className="text-gray-900p fw-bolder py-2" htmlFor="phone">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                className="form-control mb-2"
                id="phone"
              />
              {formik.errors.phone && formik.touched.phone ? (
                <div className="alert alert-danger p-2 mt-2">{formik.errors.phone}</div>
              ) : null}
              <label className="text-gray-900p fw-bolder py-2" htmlFor="password">
                Contraseña
              </label>
              <div className="input-group mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="form-control border-end-0"
                  id="password"
                />
                <button
                  type="button"
                  className="btn border-0 border-end border-bottom border-top"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {formik.errors.password && formik.touched.password ? (
                <div className="alert alert-danger p-2 mt-2">{formik.errors.password}</div>
              ) : null}
              <label className="text-gray-900p fw-bolder py-2" htmlFor="rePassword">
                Confirma la contraseña
              </label>
              <div className="input-group mb-2">
                <input
                  type={showRePassword ? "text" : "password"}
                  name="rePassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.rePassword}
                  className="form-control border-end-0"
                  id="rePassword"
                />
                <button
                  type="button"
                  className="btn border-0 border-end border-bottom border-top"
                  onClick={() => setShowRePassword(!showRePassword)}
                >
                  {showRePassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {formik.errors.rePassword && formik.touched.rePassword ? (
                <div className="alert alert-danger p-2 mt-2">{formik.errors.rePassword}</div>
              ) : null}
              {isLoading ? (
                <button className="btn bg-main text-white w-100 mt-4">
                  <Bars height="30" width="80" color="#fff" ariaLabel="bars-loading" visible={true} />
                </button>
              ) : (
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn bg-main text-white w-100"
                >
                  Registrarse
                </button>
              )}
              <div className="mt-3 align-content-center">
                <p className="text-gray-900p fw-bolder py-2">
                  ¿Ya tienes una cuenta?
                  <button
                    type="button"
                    className="btn bg-transparent text-main fw-bold px-1"
                    onClick={() => navigate("/login")}
                  >
                    Inicia sesión
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}