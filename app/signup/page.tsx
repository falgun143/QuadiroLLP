"use client";
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLogin } from "../../context/LoginContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure this import is included

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const router = useRouter();
  const { setLogin } = useLogin();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(username, password, role);
      const response = await axios.post("/api/signup", {
        username,
        password,
        role,
      });
      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("token", token);
        setLogin(true);
        toast.success("User registered");
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
  
        if (status === 401) {
          toast.error(data.message);
        } else if (status === 404) {
          toast.error(data.message );
        } else {
          toast.error("An unexpected error occurred.");
        }
      } else {
        toast.error("Network or server error. Please try again later.");
      }
    }
  };

  return (
    <>
    <ToastContainer  theme="dark" />
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={onSubmit} style={{ width: "30%" }}>
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 15,
            padding: 20,
            width: "100%",
            marginTop: 100,
          }}
        >
          <Typography variant="h6" style={{ marginBottom: 20 }}>
            Welcome SignUp Below
          </Typography>
          <TextField
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            label="Username"
            fullWidth
            color="success"
          />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            label="Password"
            type="password"
            fullWidth
            color="success"
          />
          <FormControl fullWidth>
            <InputLabel id="role" color="success">
              Role
            </InputLabel>
            <Select
              labelId="role"
              id="role"
              required
              label="Role"
              onChange={(e) => {
                setRole(e.target.value as string);
              }}
              color="success"
            >
              <MenuItem value={"USER"}>USER</MenuItem>
              <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            style={{ width: "50%", backgroundColor:"#36cc00" }}
            type="submit"
          >
            SignUp
          </Button>
        </Card>
      </form>
    </Box>
    </>
  );
};

export default Signup;