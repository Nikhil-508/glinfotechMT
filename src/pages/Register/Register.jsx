import React from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Assets } from "../../components/Assets/Assets";
import { SiComma } from "react-icons/si";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  date: yup.string().required("Date is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
    .required("Mobile is required"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
});

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      console.log(data,"dataaa")

      // Save extra details to Firestore
      await setDoc(doc(db, "USERS", user.uid), {
        fullName: data.fullName,
        email: data.email,
        date: data.date,
        mobile: data.mobile,
      });

      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error.message);
      alert(error.message);
    }
  };




  return (
    <div className="register-container">
      {/* Left Side Image */}
      <div className="register-left">
        <img src={Assets.RegisterImage} alt="register" />
        <div className="image-text-container">
          <div>
            <SiComma />
            <SiComma />
          </div>
          <span>
            Figma ipsum component variant main layer. Create flatten create
            effect move strikethrough. Union export plugin bullet effect hand
            arrange align. Project project boolean arrow scale. Rectangle device
            clip hand figma content frame underline content.
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
      <div className="register-right">
        <div className="form-box">
          <h2 className="form-title">Create an Account</h2>
          <p className="form-subtitle">
            Are you ready to join us! Let's create Account
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Full name</label>
              <input type="text" {...register("fullName")} />
              <p className="error">{errors.fullName?.message}</p>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" {...register("email")} />
              <p className="error">{errors.email?.message}</p>
            </div>

            <div className="form-group">
              <label>Date Field</label>
              <input type="date" {...register("date")} />
              <p className="error">{errors.date?.message}</p>
            </div>

            <div className="form-group">
              <label>Mobile</label>
              <input type="tel" {...register("mobile")} />
              <p className="error">{errors.mobile?.message}</p>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" {...register("password")} />
              <p className="error">{errors.password?.message}</p>
            </div>

            <button type="submit" className="btn">
              Create Account
            </button>
          </form>

          <p className="signin-text">
            Already have an account?{" "}
            <span className="signin-link" onClick={() => navigate("/login")}>
              Sign-In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
