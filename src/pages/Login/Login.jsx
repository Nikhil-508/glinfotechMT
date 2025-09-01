// import React, { useState } from "react";
// import './Login.css'
// import { Assets } from "../../components/Assets/Assets";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import { SiComma } from "react-icons/si";
// import { useNavigate } from "react-router-dom";

// import { signInWithEmailAndPassword } from "firebase/auth";

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { auth } from "../../firebaseConfig";
// import { useAuth } from "../../context/AuthContext";

// // ✅ Validation schema
// const schema = yup.object().shape({
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
// });

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [firebaseError, setFirebaseError] = useState("");

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     setFirebaseError("");
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         data.email,
//         data.password
//       );

//       // Save login state in context + localStorage
//       login(userCredential.user);

//       console.log("Login successful:", userCredential.user);
//       navigate("/products"); //  redirect to Product Listing Page
//     } catch (error) {
//       console.error("Login Error:", error.message);
//       setFirebaseError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="login-container">
//       {/* Left Side Image */}
//       <div className="login-left">
//         <img src={Assets.LoginImage} alt="login" />
//         <div className="image-text-container">
//           <div>
//             <SiComma />
//             <SiComma />
//           </div>
//           <span>
//             Figma ipsum component variant main layer. Create flatten create
//             effect move strikethrough. Union export plugin bullet effect hand
//             arrange align. Project project boolean arrow scale. Rectangle device
//             clip hand figma content frame underline content.
//           </span>
//           <h3>Pam Hand</h3>
//           <div className="image-text-bottom-container">
//             <h3>pam.hand@gmail.com</h3>
//             <div>
//               <MdKeyboardArrowLeft />
//               <MdKeyboardArrowRight />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side Form */}
//       <div className="login-right">
//         <div className="form-box">
//           <h2 className="form-title">Welcome Back !!</h2>
//           <p className="form-subtitle-login">
//             Please Login your Account
//           </p>

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="form-group-login">
//               <label>Email</label>
//               <input type="email" placeholder="admin@gmail.com" {...register("email")} />
//               <p className="error">{errors.email?.message}</p>
//             </div>

//             <div className="form-group-login">
//               <label>Password</label>
//               <input type="password" placeholder="********" {...register("password")} />
//               <p className="error">{errors.password?.message}</p>
//             </div>

//             {firebaseError && <p className="error">{firebaseError}</p>}

//             <div className="forgot-password">
//               <h3>Forgot Password</h3>
//             </div>
//             <button type="submit" className="btn">
//               Sign in
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="divider">
//             <span className="divider-line"></span>
//             <span className="divider-text">OR</span>
//             <span className="divider-line"></span>
//           </div>

//           <p className="login-text">
//             Didn’t have an Account!?{" "}
//             <span className="login-link" onClick={() => navigate("/signup")}>
//               Sign-up
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;









import React, { useState } from "react";
import "./Login.css";
import { Assets } from "../../components/Assets/Assets";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { SiComma } from "react-icons/si";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth } from "../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation(); // Get location state for redirect
  const [firebaseError, setFirebaseError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setFirebaseError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Save login state in context + localStorage
      login(userCredential);

      console.log("Login successful:", userCredential.user);
      // Redirect to intended destination or default to /products
      const redirectTo = state?.from?.pathname || "/products";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error("Login Error:", error.message);
      setFirebaseError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      {/* Left Side Image */}
      <div className="login-left">
        <img src={Assets.LoginImage} alt="login" />
        <div className="image-text-container">
          <div>
            <SiComma />
            <SiComma />
          </div>
          <span>
            Figma ipsum component variant main layer. Create flatten create effect
            move strikethrough. Union export plugin bullet effect hand arrange
            align. Project project boolean arrow scale. Rectangle device clip hand
            figma content frame underline content.
          </span>
          <h3>Pam Hand</h3>
          <div className="image-text-bottom-container">
            <h3>pam.hand@gmail.com</h3>
            <div>
              <MdKeyboardArrowLeft />
              <MdKeyboardArrowRight />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="login-right">
        <div className="form-box">
          <h2 className="form-title">Welcome Back !!</h2>
          <p className="form-subtitle-login">Please Login your Account</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group-login">
              <label>Email</label>
              <input
                type="email"
                placeholder="admin@gmail.com"
                {...register("email")}
              />
              <p className="error">{errors.email?.message}</p>
            </div>

            <div className="form-group-login">
              <label>Password</label>
              <input
                type="password"
                placeholder="********"
                {...register("password")}
              />
              <p className="error">{errors.password?.message}</p>
            </div>

            {firebaseError && <p className="error">{firebaseError}</p>}

            <div className="forgot-password">
              <h3>Forgot Password</h3>
            </div>
            <button type="submit" className="btn">
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-text">OR</span>
            <span className="divider-line"></span>
          </div>

          <p className="login-text">
            Didn’t have an Account!?{" "}
            <span
              className="login-link"
              onClick={() => navigate("/signup", { state })}
            >
              Sign-up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

