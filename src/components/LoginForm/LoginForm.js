import React from "react";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
  Button,
  Container,
} from "reactstrap";
import { mailPattern, MainURL, nonstrongPwd } from "../../variables/constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPsswordValid, setIsPasswordValid] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "email") {
      if (mailPattern.test(event.target.value)) setIsEmailValid(true);
      else setIsEmailValid(false);
    } else if (event.target.name === "password") {
      if (nonstrongPwd.test(event.target.value)) setIsPasswordValid(true);
      else setIsPasswordValid(false);
    }
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    //fetch method to get access token
    fetch(`${MainURL}/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.responseCode == 200) {
          localStorage.setItem("user-info", json.responseData.access_token);
          navigate("/");
          console.log("success");
        } else {
          setError("Email or Password incorrect");
          return;
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Container>
      <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
        <h1 className="text-5xl font-semibold">Welcome Back</h1>
        <p className="font-medium text-lg text-gray-500 mt-4">
          Welcome back! Please enter your details.
        </p>
        {error && <p className="text-red-600 mt-4">{error}</p>}
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="mt-4">
            <label className="text-lg font-medium">Email</label>
            <FormGroup>
              <InputGroup
                className="input-group-alternative mb-3"
                style={{ position: "relative" }}
              >
                <Input
                  placeholder="E-mail"
                  type="email"
                  // value={data.email}
                  name="email"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={handleChange}
                />
                {data.email && !isEmailValid && (
                  <p className="ml-4 text-red-500 bg-transparent mt-1 text-sm">
                    Please enter valid email
                  </p>
                )}
              </InputGroup>
            </FormGroup>

            <FormGroup className="mb-3">
              <label
                className="form-control-label text-lg font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <InputGroup className="input-group-alternative relative">
                <Input
                  className="form-control-alternative w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  id="password"
                  name="password"
                  // value={data.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  type={!passwordVisible ? "password" : "text"}
                  required
                />
                {data.password && !isPsswordValid && (
                  <p className="ml-4 text-red-500 bg-transparent mt-1 text-sm">
                    Please enter valid password
                  </p>
                )}
                <InputGroupText className="text-2xl absolute top-6 right-3 cursor-pointer">
                  {!passwordVisible ? (
                    <AiFillEye onClick={togglePasswordVisibility} />
                  ) : (
                    <AiFillEyeInvisible onClick={togglePasswordVisibility} />
                  )}
                </InputGroupText>
              </InputGroup>
              <div className="pt-2 text-xs text-blue-900">
                Password must have at least 1 uppercase, 1 lowercase, 1 special
                character and 1 number. Must be atleast 8 characters
              </div>
            </FormGroup>
          </div>
          <div className="mt-8 flex flex-col gap-y-4">
            <Button
              type="submit"
              className="bg-teal-500 text-white text-lg font-bold py-3 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out disabled:bg-slate-500 disabled:cursor-not-allowed"
              disabled={!isEmailValid || !isPsswordValid ? true : false}
            >
              Sign In
            </Button>
          </div>
        </form>
        {/* <Link to="/register">Register</Link> */}
      </div>
      <ToastContainer />
    </Container>
  );
};

export default LoginForm;
