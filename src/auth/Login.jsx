import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useAuthStore from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const loginFunction = useAuthStore((state) => state.loginFunction);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6).required("Required"),
  });

  const handleSubmit = (values) => {
    loginFunction(values);
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="email" type="text" placeholder="Email" />
          <br />
          <Field name="password" type="password" placeholder="Password" />
          <br />
          <button type="submit">Login</button>
        </Form>
      </Formik>

      <p
        onClick={() => navigate("/register")}
        style={{ cursor: "pointer", marginTop: 10, color: "blue" }}
      >
        Don't have an account? Register
      </p>
    </div>
  );
}

export default Login;
