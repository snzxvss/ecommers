import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// Se eliminó la importación de axios ya que ya no se necesita
import { useNavigate } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import { UserContext } from "../../Context/UserContext";
import image from '../../Assets/images/signin-DlR7P608.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let { setUserToken, setUserDetails } = useContext(UserContext);

  async function loginSubmit(values) {
    setIsLoading(true);
    // Simula un inicio de sesión exitoso sin importar las credenciales
    setTimeout(() => {
      const dummyToken = "dummyToken";
      const dummyUser = {
        name: "Test User",
        email: values.email,
      };
      localStorage.setItem('userToken', dummyToken);
      setUserToken(dummyToken);
      localStorage.setItem('userDetails', JSON.stringify(dummyUser));
      setUserDetails(dummyUser);
      setIsLoading(false);
      navigate("/");
    }, 1000);
  }

  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Formato de correo electrónico inválido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .matches(
        /^[A-Za-z][a-zA-Z0-9]{5,10}$/,
        "La contraseña debe comenzar con una letra y tener entre 6 y 11 caracteres"
      )
      .required("La contraseña es obligatoria"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <div className="container pt-5">
        <div className="row align-content-center justify-content-center ">
          <div className="col-md-5">
            <img src={image} alt="img" className="w-100" />
          </div>
          <div className="col-md-5">
            <div className="mx-auto py-5">
              <h3 className="pt-5 text-gray-900 fw-bolder">Inicia sesión en Ecommers</h3>
              <p className="text-gray-900p fw-bolder">¡Bienvenido de nuevo a Ecommers! Ingresa tu correo electrónico para comenzar.</p>

              {error ? <div className="alert alert-danger p-2 mt-2">{error}</div> : null}

              <form onSubmit={formik.handleSubmit}>
                {/* Entrada de correo electrónico */}
                <label htmlFor="email" className="text-gray-900p fw-bolder py-2">Correo electrónico</label>
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

                {/* Entrada de contraseña con ícono de ojo */}
                <label htmlFor="password" className="text-gray-900p fw-bolder py-2">Contraseña</label>
                <div className="input-group mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="form-control border-end-0"
                    id="password"
                  />
                  <i
                    type="button"
                    className="btn border-0 border-end border-bottom border-top"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </i>
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <div className="alert alert-danger p-2 mb-4">{formik.errors.password}</div>
                ) : null}

                {/* Botón para enviar */}
                {isLoading ? (
                  <button className="btn bg-main text-white w-100 mt-4">
                    <FallingLines color="#fff" width="20" visible={true} ariaLabel="cargando" />
                  </button>
                ) : (
                  <button
                    disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                    className="btn bg-main ps-1 text-white w-100"
                  >
                    Iniciar sesión
                  </button>
                )}

                {/* Botón para registrarse */}
                <div className="mt-3 align-content-center">
                  <p className="text-gray-900p fw-bolder py-2">
                    ¿No tienes una cuenta?    
                    <button
                      type="button"
                      className="btn bg-transparent text-main fw-bold px-1"
                      onClick={() => navigate("/register")}
                    >
                      Regístrate
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}