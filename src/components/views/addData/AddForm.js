import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
} from "reactstrap";
import {
  alphabetsPattern,
  image,
  mailPattern,
  MainURL,
  phone,
} from "../../../variables/constants";

function AddForm({ onClose, forceUpdate }) {
  const [isFnameValid, setIsFnameValid] = useState(false);
  const [isLnameValid, setIsLnameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isFileValid, setIsFileValid] = useState(false);
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    image: "",
  });
  const [isFile, setIsFile] = useState("");
  const [isPreImg, setIsPreImg] = useState(
    "https://nato.cdnartwhere.eu/cdn/ff/oca4fwSi7ZMflFF5-LRcenPXoZTDpZSTkwLZEvZtQIw/1607780582/public/default_images/default-image.jpg"
  );

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (event) => {
    if (event.target.name === "email") {
      if (mailPattern.test(event.target.value)) setIsEmailValid(true);
      else setIsEmailValid(false);
    } else if (event.target.name === "first_name") {
      if (alphabetsPattern.test(event.target.value)) setIsFnameValid(true);
      else setIsFnameValid(false);
    } else if (event.target.name === "last_name") {
      if (alphabetsPattern.test(event.target.value)) setIsLnameValid(true);
      else setIsLnameValid(false);
    } else if (event.target.name === "phone") {
      if (phone.test(event.target.value)) setIsPhoneValid(true);
      else setIsPhoneValid(false);
    }
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setIsPreImg("");
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setIsPreImg(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    if (image.test(event.target.value)) {
      setIsFile(event.target.files[0]);
      setIsFileValid(true);
    } else {
      setIsFileValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("image", isFile);

    let userToken = localStorage.getItem("user-info");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        autherization: userToken,
      },
    };

    axios
      .post(`${MainURL}/add_profile`, formData, config)
      .then((res) => {
        if (res.data.responseCode === 200) {
          onClose(true);
          toast.success("Data saved successfully", toastOptions);
          forceUpdate();
        } else {
          toast.warn(res.data.responseMessage, toastOptions);
        }
      })
      .catch((err) => {
        toast.error(err, toastOptions);
      });
  };

  return (
    <Container>
      <div className="bg-white px-10 pb-20 rounded-3xl mx-8">
        <p className="font-medium text-lg text-gray-500">
          Please enter details.
        </p>
        <Form onSubmit={handleSubmit}>
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
                  name="first_name"
                  value={data.first_name}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={handleChange}
                />
                {data.first_name && !isFnameValid && (
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
                  value={data.last_name}
                  name="last_name"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={handleChange}
                />
                {data.last_name && !isLnameValid && (
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
                  type="number"
                  name="phone"
                  maxLength={10}
                  minLength={10}
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

            <Label className="text-lg font-medium">Upload Image</Label>
            <FormGroup className="w-96">
              <InputGroup
                className="input-group-alternative mb-3"
                style={{ position: "relative" }}
              >
                <Input
                  type="file"
                  name="image"
                  accept="image/heic, image/jpeg, image/png, image/jpg"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={handleFileChange}
                  required
                />
                {isFile && !isFileValid && (
                  <p className="ml-4 text-red-500 bg-transparent mt-1 text-sm">
                    Please enter valid image file
                  </p>
                )}
              </InputGroup>
            </FormGroup>
          </div>
          <Container className="text-center">
            <img
              src={isPreImg}
              alt={isPreImg}
              className="w-20 text-center h-20 rounded-2xl"
              hideZoom={true}
              hideDownload={true}
            />
          </Container>
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
        </Form>
      </div>
    </Container>
  );
}

export default AddForm;
