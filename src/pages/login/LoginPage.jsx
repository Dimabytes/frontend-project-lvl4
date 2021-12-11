import React from 'react';
import {
  Field, Formik, Form,
} from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Обязательно'),
  password: Yup.string()
    .required('Обязательно'),
});
const initialValues = {
  username: '',
  password: '',
};

const LoginPage = () => {
  const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={LoginSchema}
              >

                {({ errors, touched }) => (
                  <Form className="col-12 mt-mb-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3 form-group">
                      <Field
                        className="form-control mb-3"
                        name="username"
                        placeholder="Ваш ник"
                      />
                      {errors.username && touched.username ? (
                        <div className="alert alert-danger">{errors.username}</div>
                      ) : null}
                    </div>
                    <div className="form-floating mb-4 form-group">
                      <Field
                        className="form-control mb-3"
                        name="password"
                        placeholder="Пароль"
                      />
                      {errors.password && touched.password ? (
                        <div className="alert alert-danger">{errors.password}</div>
                      ) : null}
                    </div>
                    <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                  </Form>
                )}
              </Formik>

            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
export default LoginPage;
