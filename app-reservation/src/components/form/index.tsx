import { useFormik } from "formik";
import { useState } from "react";
import { IReservation, createReservation } from "services/reservation";
import * as Yup from "yup";

const initialValues: IReservation = {
  email: "",
  name: "",
  seatNumber: 0,
  uidFlight: "",
};

interface Iprops {
  uid: string;
}

const FormReservation = ({ uid }: Iprops) => {
  const [loading, setLoading] = useState<boolean>(false);

  const FormReservation = Yup.object().shape({
    email: Yup.string().required("Este campo es requerido"),
    name: Yup.string().required("Este campo es requerido"),
    seatNumber: Yup.number().required("Este campo es requerido"),
  });

  const { handleSubmit, handleChange, touched, errors, values, resetForm } =
    useFormik({
      initialValues,
      validationSchema: FormReservation,
      onSubmit: async (values) => {
        const body = {
          ...values,
          uidFlight: uid,
        };
        setLoading(true);
        const rs = await createReservation(body);
        setLoading(false);
      },
    });

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre completo
          </label>
          <input
            className={`form-control  ${
              errors.name && touched.name ? "is-invalid" : ""
            } `}
            id="name"
            onChange={handleChange("name")}
            value={values.name}
          />

          {errors?.name && touched?.name ? (
            <div className="invalid-feedback">{errors?.name}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control  ${
              errors.email && touched.email ? "is-invalid" : ""
            } `}
            id="email"
            onChange={handleChange("email")}
            value={values.email}
          />
          {errors?.email && touched?.email ? (
            <div className="invalid-feedback">{errors?.email}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Numero de puesto
          </label>
          <input
            className={`form-control  ${
              errors.seatNumber && touched.seatNumber ? "is-invalid" : ""
            } `}
            id="seatNumber"
            onChange={handleChange("seatNumber")}
            value={values.seatNumber}
          />
          {errors?.seatNumber && touched?.seatNumber ? (
            <div className="invalid-feedback">{errors?.seatNumber}</div>
          ) : null}
        </div>

        <div className="d-grid gap-2">
          {!loading && (
            <button type="submit" className="btn btn-primary">
              Hacer la reserva
            </button>
          )}

          {loading && (
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Guardando...
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormReservation;
