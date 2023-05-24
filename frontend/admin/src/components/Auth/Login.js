import './auth.css';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginall } from './action';

// login page setup

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    // validation
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      dispatch(loginall(values, navigate));
      console.log(values);
    },
  });

  return (
    // login from
    <div>
      <img
        className="wave"
        src="https://static.wixstatic.com/media/3cbdaa_c253a71b18ee4aadb8f929e86d83a652~mv2.png/v1/fill/w_498,h_778,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/3cbdaa_c253a71b18ee4aadb8f929e86d83a652~mv2.png"
        alt="Wave"
      />
      <div className="containers">
        <div className="img">
          <img
            src="https://netlinks.net//wp-content/uploads/2020/08/HMS-min.png"
            alt="Background"
          />
        </div>
        <div className="login-content">
          <div>
            <form onSubmit={formik.handleSubmit} className="forms">
              <img
                src="https://jnvetah-alumni.in/wp-content/uploads/jet-engine-forms/1/2021/09/undraw_profile_pic_ic5t-1.png.webp"
                alt="Avatar"
              />
              <h2 className="title">Welcome</h2>
              <div className="input-div one">
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <input
                    type="email"
                    className="input"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="error text-danger">{formik.errors.email}</div>
              ) : null}
              <div className="input-div pass">
                <div className="i">
                  <i className="fas fa-lock"></i>
                </div>
                <div className="div">
                  <input
                    type="password"
                    className="input"
                    id="password"
                    name="password"
                    placeholder="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                </div>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="error text-danger">
                  {formik.errors.password}
                </div>
              ) : null}
              <input type="submit" className="button" value="Login" />
            </form>
            <span>
              If Not Registered?<Link to="/signup">SignUp</Link>
            </span>
            <span>
              <Link to="http://localhost:3000/">Back To Home</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
