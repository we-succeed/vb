import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import { Box, Grid, FilledInput, DialogTitle, DialogContent, DialogActions, Typography, Button, CircularProgress, Card } from "@material-ui/core";


const Signup = () => {
  
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    province: "",
    city: "",
    address: "",
    postalCode: "",
    PhoneNumber: "",
  });
  
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value});
  }

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    try {
      const url = "http://localhost:5003/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message)
      }
    }
  }

  return (
    <div>
    <div>
      <div>
        <h1>Welcome Back</h1>
        <Link to="/login">
          <button type="button">
            Sing in
          </button>
        </Link>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            value={data.firstName}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            value={data.lastName}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
          />
          <input
            type="text"
            placeholder="province"
            name="province"
            onChange={handleChange}
            value={data.province}
          />
          <input
            type="text"
            placeholder="city"
            name="city"
            onChange={handleChange}
            value={data.city}
          />
          <input
            type="text"
            placeholder="address"
            name="address"
            onChange={handleChange}
            value={data.address}
          />
          <input
            type="text"
            placeholder="postalcode"
            name="postalcode"
            onChange={handleChange}
            value={data.postalCode}
          />
          <input
            type="number"
            placeholder="phonenumber"
            name="phonenumber"
            onChange={handleChange}
            value={data.PhoneNumber}
          />
          {error && <div>{error}</div>}
          <button type="submit">
            Sing Up
          </button>
        </form>
      </div>
    </div>
  </div>
  );
};



export default Signup;