import React, { useState } from "react";
import { Button, Container, FormGroup, Input, InputGroup } from "reactstrap";
import {
  alphabetsPattern,
  image,
  mailPattern,
  phone,
} from "../../../variables/constants";

function  AddForm() {
  const [isFnameValid, setIsFnameValid] = useState(false);
  const [isLnameValid, setIsLnameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isFileValid, setIsFileValid] = useState(false);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    image: "",
  });

  const handleChange = (event) => {
    if (event.target.name === "email") {
      if (mailPattern.test(event.target.value)) setIsEmailValid(true);
      else setIsEmailValid(false);
    } else if (event.target.name === "fname") {
      if (alphabetsPattern.test(event.target.value)) setIsFnameValid(true);
      else setIsFnameValid(false);
    } else if (event.target.name === "lname") {
      if (alphabetsPattern.test(event.target.value)) setIsLnameValid(true);
      else setIsLnameValid(false);
    } else if (event.target.name === "phone") {
      if (phone.test(event.target.value)) setIsPhoneValid(true);
      else setIsPhoneValid(false);
    } else if (event.target.name === "image") {
      if (image.test(event.target.value)) setIsFileValid(true);
      else setIsFileValid(false);
    }
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data)
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        alert("data saved successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Container>
      <div className="bg-white px-10 pb-20 rounded-3xl mx-8">
        <p className="font-medium text-lg text-gray-500">
          Please enter details.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mt-8">
            <label className="text-lg font-medium">First Name</label>
            <FormGroup className="w-96">
              <InputGroup
                className="input-group-alternative mb-3"
                style={{ position: "relative" }}
              >
                <Input
                  placeholder="First Name"
                  type="text"
                  name="fname"
                  value={data.fname}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={handleChange}
                />
                {data.fname && !isFnameValid && (
                  <p className="ml-4 text-red-500 bg-transparent mt-1 text-sm">
                    Please enter valid name
                  </p>
                )}
              </InputGroup>
            </FormGroup>

            <label className="text-lg font-medium">Last name</label>
            <FormGroup className="w-96">
              <InputGroup
                className="input-group-alternative mb-3"
                style={{ position: "relative" }}
              >
                <Input
                  placeholder="Last Name"
                  type="text"
                  value={data.lname}
                  name="lname"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={handleChange}
                />
                {data.lname && !isLnameValid && (
                  <p className="ml-4 text-red-500 bg-transparent mt-1 text-sm">
                    Please enter valid name
                  </p>
                )}
              </InputGroup>
            </FormGroup>

            <label className="text-lg font-medium">Email</label>
            <FormGroup className="w-96">
              <InputGroup
                className="input-group-alternative mb-3"
                style={{ position: "relative" }}
              >
                <Input
                  placeholder="test@test.com"
                  type="email"
                  name="email"
                  value={data.email}
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

            <label className="text-lg font-medium">Phone Number</label>
            <FormGroup className="w-96">
              <InputGroup
                className="input-group-alternative mb-3"
                style={{ position: "relative" }}
              >
                <Input
                  placeholder="1234567890"
                  type="tel"
                  name="phone"
                  pattern="[0-9]{10}"
                  value={data.phone}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={handleChange}
                />
                {data.phone && !isPhoneValid && (
                  <p className="ml-4 text-red-500 bg-transparent mt-1 text-sm">
                    Please enter valid phone number
                  </p>
                )}
              </InputGroup>
            </FormGroup>

            <label className="text-lg font-medium">Upload Image</label>
            <FormGroup className="w-96">
              <InputGroup
                className="input-group-alternative mb-3"
                style={{ position: "relative" }}
              >
                <Input
                  type="file"
                  name="image"
                  value={data.image}
                  accept="image/*"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={handleChange}
                  maxLength="200"
                  required
                />
                {data.image && !isFileValid && (
                  <p className="ml-4 text-red-500 bg-transparent mt-1 text-sm">
                    Please enter valid image file
                  </p>
                )}
              </InputGroup>
            </FormGroup>
          </div>
          <div className="mt-8 flex flex-col gap-y-4 w-96">
            <Button
              type="submit"
              className="text-white bg-green-500 text-lg font-bold py-3 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out disabled:bg-slate-500 disabled:cursor-not-allowed"
              disabled={
                !isFnameValid ||
                !isLnameValid ||
                !isEmailValid ||
                !isPhoneValid ||
                !isFileValid
                  ? true
                  : false
              }
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default AddForm;
