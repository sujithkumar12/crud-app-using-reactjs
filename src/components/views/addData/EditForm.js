import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Container, FormGroup, Input, InputGroup } from "reactstrap";
import {
  MainURL,
  image,
  alphabetsPattern,
  mailPattern,
  phone,
} from "../../../variables/constants";
import idContext from "../../store/IdContext";

function EditForm({ onClosee, forceUpdate }) {
  const [fname, setIsFname] = useState("");
  const [lname, setIsLname] = useState("");
  const [email, setIsEmail] = useState("");
  const [isPhone, setIsPhone] = useState("");
  const [isImage, setIsFile] = useState("");

  const [isFnameValid, setIsFnameValid] = useState(true);
  const [isLnameValid, setIsLnameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isFileValid, setIsFileValid] = useState(true);

  const idd = useContext(idContext);

  const [isPreImg, setIsPreImg] = useState(idd.editImage);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    setIsFname(idd.editFname);
    setIsLname(idd.editLname);
    setIsEmail(idd.editEmail);
    setIsPhone(idd.editPhone);
    setIsFile(idd.editImage);
  }, [
    idd.editFname,
    idd.editLname,
    idd.editEmail,
    idd.editPhone,
    idd.editImage,
  ]);

  const handleFnameChange = (event) => {
    if (alphabetsPattern.test(event.target.value)) {
      setIsFnameValid(true);
    } else {
      setIsFnameValid(false);
    }
    setIsFname(event.target.value);
  };

  const handleLnameChange = (event) => {
    if (alphabetsPattern.test(event.target.value)) {
      setIsLnameValid(true);
    } else {
      setIsLnameValid(false);
    }
    setIsLname(event.target.value);
  };

  const handleEmailChange = (event) => {
    if (mailPattern.test(event.target.value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
    setIsEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    if (phone.test(event.target.value)) {
      setIsPhoneValid(true);
    } else {
      setIsPhoneValid(false);
    }
    setIsPhone(event.target.value);
  };

  const handleFileChange = (event) => {
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

    formData.append("first_name", fname);
    formData.append("last_name", lname);
    formData.append("phone", isPhone);
    formData.append("email", email);
    formData.append("image", isImage);

    const userToken = localStorage.getItem("user-info");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        autherization: userToken,
      },
    };

    axios
      .put(`${MainURL}/update_profile/${idd.editId}`, formData, config)
      .then((res) => {
        if (res.data.responseCode === 200) {
          toast.success("Data updated successfully", toastOptions);
          onClosee(true);
          forceUpdate();
          // window.location.reload();
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
                  value={fname}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={handleFnameChange}
                  required
                />
                {fname && !isFnameValid && (
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
                  value={lname}
                  name="lname"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={handleLnameChange}
                  required
                />
                {lname && !isLnameValid && (
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
                  value={email}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={handleEmailChange}
                  required
                />
                {email && !isEmailValid && (
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
                  value={isPhone}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={handlePhoneChange}
                  required
                  maxLength={10}
                  minLength={10}
                  // pattern="[0-9]{10}"
                />
                {isPhone && !isPhoneValid && (
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
                  accept="image/heic, image/jpeg, image/png, image/jpg"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={handleFileChange}
                />
                {isImage && !isFileValid && (
                  <p className="ml-4 text-red-500 bg-transparent mt-1 text-sm">
                    Please enter valid image
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
              disabled={
                !isFnameValid ||
                !isLnameValid ||
                !isEmailValid ||
                !isPhoneValid ||
                !isFileValid
                  ? true
                  : false
              }
              className="text-white bg-green-500 text-lg font-bold py-3 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out disabled:bg-slate-500 disabled:cursor-not-allowed"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default EditForm;
