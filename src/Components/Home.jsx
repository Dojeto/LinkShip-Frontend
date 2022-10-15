import React, { useState } from "react";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import Modal from "../model/Modal";
import toast from "react-hot-toast";

const Home = (props) => {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");

  const onRegisterSubmit = async () => {
    const response = await fetch(
      `https://linkship.herokuapp.com/auth/register`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname:firstname,
          lastname:lastname,
          username: username,
          password: pass,
        }),
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      localStorage.setItem("token", data.token);
      toast.success("Register Success");
      props.setAuth(true);
      return;
    }
    toast.error(data);
  };

  const onLoginSubmit = async () => {
    const response = await fetch(
      `https://linkship.herokuapp.com/auth/login`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: pass,
        }),
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      localStorage.setItem("token", data.token);
      toast.success("Login Successfully");
      props.setAuth(true);
      return;
    }
    toast.error(data);
  };
  return (
    <>
      <div className="bg-[#06283D] h-screen flex items-center flex-col justify-center">
        <Card
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            rowGap: "30px",
            alignItems: "center",
            height: "500px",
            backgroundColor: "#DDDDDD",
            minWidth: "350px",
            borderRadius: "15px",
            boxShadow: "10px 20px #000000",
          }}
          variant="outlined"
        >
          <img
            style={{
              width: "300px",
            }}
            src="./zyro-image-removebg-preview.png"
          />
          <h1 className="text-[#000000] text-center">
            Link Ship Easy Way to Share Social Links <br /> Make Your Own Simple
            Website
          </h1>
          <Button
            key={1}
            style={{
              color: "#DFF6FF",
              backgroundColor: "#F05454 ",
              padding: "14px 30px",
              fontSize: "15px",
              minWidth: "150px",
              maxHeight: "50px",
            }}
            onClick={() => setRegister(true)}
            variant="contained"
          >
            Sign Up
          </Button>
          <Button
            key={12}
            style={{
              color: "#DFF6FF",
              backgroundColor: "#F05454",
              padding: "14px 30px",
              fontSize: "15px",
              minWidth: "150px",
              maxHeight: "50px",
            }}
            onClick={() => setLogin(true)}
            variant="contained"
          >
            Login
          </Button>
        </Card>
        <h3
          className="text-[#DFF6FF]"
          style={{
            position: "relative",
            top: "65px",
          }}
        >
          Made By Dojeto 🤍
        </h3>
        {register && (
          <Modal close={() => setRegister(false)}>
            <div className="flex flex-col gap-5">
              <span className="font-bold">Username</span>
              <input
                value={username}
                className="border-2 h-10 border-black"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="font-bold">First Name</span>
              <input
                value={firstname}
                className="border-2 h-10 border-black"
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
              />
              <span className="font-bold">Last Name</span>
              <input
                value={lastname}
                className="border-2 h-10 border-black"
                type="text"
                onChange={(e) => setLastname(e.target.value)}
              />
              <span className="font-bold">Password</span>
              <input
                value={pass}
                className="border-2 h-10 border-black"
                type="text"
                onChange={(e) => setPass(e.target.value)}
              />
              <Button
                key={10}
                style={{
                  color: "black",
                  backgroundColor: "#F05454",
                  padding: "14px 30px",
                  fontSize: "15px",
                  minWidth: "150px",
                  maxHeight: "50px",
                }}
                onClick={() => onRegisterSubmit()}
                variant="contained"
              >
                Sign Up
              </Button>
            </div>
          </Modal>
        )}
        {login && (
          <Modal close={() => setLogin(false)}>
            <div className="flex flex-col gap-5">
              <span className="font-bold">Username</span>
              <input
                value={username}
                className="border-2 h-10 border-black"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="font-bold">Password</span>
              <input
                value={pass}
                className="border-2 h-10 border-black"
                type="text"
                onChange={(e) => setPass(e.target.value)}
              />
              <Button
                key={10}
                onClick={() => onLoginSubmit()}
                style={{
                  color: "black",
                  backgroundColor: "#F05454",
                  padding: "14px 30px",
                  fontSize: "15px",
                  minWidth: "150px",
                  maxHeight: "50px",
                }}
                variant="contained"
              >
                Log In
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Home;
