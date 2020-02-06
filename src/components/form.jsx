import React, { useState, useEffect } from "react";
import axios from "axios";

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [currSupplier, setCurrSupplier] = useState("");
  const [location, setLocation] = useState("Houston");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [formError, setError] = useState({});

  function formSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/post", {
        firstname: firstName,
        lastname: lastName,
        phonenumber: phoneNumber,
        email: email,
        company: company,
        currsupplier: currSupplier,
        location: location,
        message: message
      })
      .then(function(response) {
        if (!response.data.errors && response.data.name != "MongoError") {
          setSent(true);
        }
        let resError = response.data.errors || response.data;
        setError(resError);
      })
      .catch(function(error) {});
  }

  function determError(formError) {
    return formError.name == "MongoError"
      ? (formError.type = "Duplicate Error")
      : (formError.type = "Validation error");
  }

  function catchErr(formError) {
    useEffect(() => {
      setError(formError);
    });
    console.log(formError);
  }

  function configError(formError, e) {
    determError(formError);
    element = e.target.id;
    if (formError.type === "Validation Error") {
      return formError.hasOwnProperty(element) ? (
        <span className="warning">{formError[element].message}</span>
      ) : null;
    } else if (formError.type === "Duplicate Error") {
      return <span className="warning">{formError.type}</span>;
    } else {
      null;
    }
  }

  return (
    <div>
      {/* Ternary statement display form or null dependent on sent state  */}
      {!sent ? (
        <form className="form-container" onSubmit={formSubmit} id="form">
          <h1 className="form-header"> Request A Quote </h1>
          <hr></hr>
          <label className="form-labels">
            First Name: {catchErr(formError)}
          </label>
          <input
            form="form"
            className="input-container"
            id="firstname"
            onInput={e => setFirstName(e.target.value)}
            onChange={e => hello(e)}
          />
          <label className="form-labels" htmlFor="lastname">
            {/* Last Name: {formError.hasOwnProperty("lastname") ? 
              <span className="warning">{formError.lastname.message}</span>
             : null} */}
          </label>
          <input
            className="input-container"
            id="lastname"
            onInput={e => setLastName(e.target.value)}
          />
          <label className="form-labels" htmlFor="email">
            {/* Email: {formError.hasOwnProperty("email") ? 
              <span className="warning">{formError.email.message}</span>
             : null} */}
          </label>
          <input
            className="input-container"
            type="email"
            id="email"
            onInput={e => setEmail(e.target.value)}
          />
          <label className="form-labels" htmlFor="phonenumber">
            Phone Number: <span className="example">xxx-xxx-xxxx</span>{" "}
            {/* {formError.hasOwnProperty("phonenumber") ? 
              <span className="warning">{formError.phonenumber.message}</span>
             : null} */}
          </label>
          <input
            className="input-container"
            type="tel"
            id="phonenumber"
            onInput={e => setPhoneNumber(e.target.value)}
          />
          <label className="form-labels" htmlFor="company">
            {/* Company: {formError.hasOwnProperty("company") ? 
              <span className="warning">{formError.company.message}</span>
             : null} */}
          </label>
          <input
            className="input-container"
            id="company"
            onInput={e => setCompany(e.target.value)}
          />
          <label className="form-labels" htmlFor="location">
            {/* Location: {formError.hasOwnProperty("location") ? 
              <span className="warning">{formError.location.message}</span>
             : null} */}
          </label>
          <select
            className="input-container"
            value={location}
            id={location}
            onChange={e => setLocation(e.target.value)}
          >
            <option value="Houston">Houston</option>
            <option value="San Antonio">San Antonio</option>
            <option value="Austin">Austin</option>
          </select>
          <label className="form-labels" htmlFor="currSupplier">
            {/* Current Supplier: {formError.hasOwnProperty("currsupplier") ? 
              <span className="warning">{formError.currsupplier.message}</span>
             : null} */}
          </label>
          <input
            className="input-container"
            id="currSupplier"
            onInput={e => setCurrSupplier(e.target.value)}
          />
          <label className="form-labels" htmlFor="message">
            {/* How Can We Help? {formError.hasOwnProperty("message") ? 
              <span className="warning">{formError.message.message}</span>
             : null} */}
          </label>
          <textarea
            className="input-container"
            type="text"
            id="message"
            onInput={e => setMessage(e.target.value)}
          />
          <input className="form-button" type="submit" value="Submit"></input>
        </form>
      ) : (
        <div className="thankyou">
          <h1>{`Thank You, ${firstName}`}</h1>
          <h3>We will be with you shortly</h3>
        </div>
      )}
    </div>
  );
}

export default Form;
