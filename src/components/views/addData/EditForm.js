import React, { useContext, useEffect, useState } from "react";
import { Button, Container, FormGroup, Input, InputGroup } from "reactstrap";
import idContext from "../../store/IdContext";

function EditForm() {
  const [fname, setIsFname] = useState("");
  const [lname, setIsLname] = useState("");
  const [email, setIsEmail] = useState("");
  const [phone, setIsPhone] = useState("");
  const [image, setIsFile] = useState("");

  const idd = useContext(idContext);

  useEffect(() => {
    fetch("http://localhost:8000/users/" + idd)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setIsFname(resp.fname);
        setIsLname(resp.lname);
        setIsEmail(resp.email);
        setIsPhone(resp.phone);
        setIsFile(resp.image);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const empData = { fname, lname, email, phone, image };
    fetch("http://localhost:8000/users/" + idd, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empData),
    })
      .then((res) => {
        window.location.reload();
        alert("data updated successfully");
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
                  value={fname}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={(event) => setIsFname(event.target.value)}
                  required
                />
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
                  onChange={(event) => setIsLname(event.target.value)}
                  required
                />
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
                  onChange={(event) => setIsEmail(event.target.value)}
                  required
                />
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
                  value={phone}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={(event) => setIsPhone(event.target.value)}
                  required
                  pattern="[0-9]{10}"
                />
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
                  //   value={data.image}
                  accept="image/*"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  onChange={(event) => setIsFile(event.target.value)}
                  maxLength="200"
                  required
                />
              </InputGroup>
            </FormGroup>
          </div>
          <div className="mt-8 flex flex-col gap-y-4 w-96">
            <Button
              type="submit"
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
