import React from "react";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
  Button,
  Container,
} from "reactstrap";
import { mailPattern, strongPwd } from "../../variables/constants";
import { useUserAuth } from "../store/UserAuthContext";

const RegisterForm = () => {
  const { signUp } = useUserAuth();
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
      if (strongPwd.test(event.target.value)) setIsPasswordValid(true);
      else setIsPasswordValid(false);
    }
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    if (data.password === "") {
      return false;
    } else if (data.email === "") {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await signUp(data.email, data.password);
      navigate("/login")
    } catch(err) {
      setError(err.message);
    }
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
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="mt-8">
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
                  onChange={(e) => handleChange(e)}
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
              className="bg-violet-500 text-white text-lg font-bold py-3 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out disabled:bg-slate-500 disabled:cursor-not-allowed"
              disabled={!isEmailValid || !isPsswordValid ? true : false}
            >
              Sign in
            </Button>
            {error && <p className="text-red-600">{error}</p>}
          </div>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </Container>
  );
};

export default RegisterForm;
