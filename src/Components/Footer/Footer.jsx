import React from 'react'

export default function Footer() {
  return (
    <>
      <div className="py-4 bg-main-light">
        <div className="container">

          <h1 className="my-4 text-gray fw-bolder">Obtén la aplicación Ecommers</h1>
          <p className="text-gray fw-bolder">
            Te enviaremos un enlace, ábrelo en tu teléfono para descargar la aplicación.
          </p>
  
          <div className="row my-3">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-100 d-flex align-items-center"
            >
              <div className="col-md-9">
                <input
                  type="email"
                  className="form-control w-100"
                  placeholder="Introduce tu correo electrónico..."
                  required
                />
              </div>
              <div className="col-md-3">
                <button type="submit" className="btn bg-main text-white fw-bold w-100 ms-2">
                  Enviar enlace
                </button>
              </div>
            </form>
          </div>
  
          <hr />
  
          <div className="col-md-12 text-center">
            <p className="text-gray fw-bolder">
              © 2025 - 2026 | Todos los derechos reservados.
              <br />
              Hecho por <span className="fw-bolder fs-6 text-main">Camilo Sanz</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}