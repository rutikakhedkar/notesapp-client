import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import useAuthStore from '../store/useAuthStore.js'
import { useNavigate } from 'react-router-dom'

function Register() {
      const navigate = useNavigate();
  const registerFunction = useAuthStore((state) => state.registerFunction);

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6).required("Required"),
  });

  const handleSubmit = (values) => {
    registerFunction(values);
    console.log(values)
    navigate("/")
  };
    return (
        <div>
            <Formik
                initialValues={{ name: "", email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                <Form>
                    <Field name="name" type="text" placeholder="name" />
                    <br />
                    <Field name="email" type="text" placeholder="Email" />
                    <br />
                    <Field name="password" type="password" placeholder="Password" />
                    <br />
                    <button type="submit">Register</button>
                </Form>
            </Formik>

            <p
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer", marginTop: 10, color: "blue" }}
            >
                already registered ? login here
            </p>
        </div>
    )
}

export default Register