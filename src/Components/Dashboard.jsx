import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Table from "react-bootstrap/Table";
import { AiFillEdit } from "react-icons/ai";
import Modal from "../model/Modal";

let test = "";
const Dashboard = () => {
  const [addLink, setaddLink] = useState(false);
  const [updateLinks, setupdateLinks] = useState(false);
  const [userName, setuserName] = useState("");
  const [userData, setuserData] = useState(false);

  const [appname, setAppname] = useState("");
  const [applink, setApplink] = useState("");

  const onAddLink = async () => {
    const response = await fetch(
      "https://linkpeti-backend-production.up.railway.app/manage/addlink",
      {
        method: "POST",
        credentials: "include",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appname: appname,
          link: applink,
        }),
      }
    );
    console.log(await response.json());
    setaddLink(false);
    // window.location.href='/user/dashboard'
  };
  const getuser = async () => {
    const response = await fetch(
      "https://linkpeti-backend-production.up.railway.app/dashboard",
      {
        method: "GET",
        headers: { token: localStorage.getItem("token") },
      }
    );
    const data = await response.json();
    setuserName(data);
  };

  const getUserDetails = async () => {
    const response = await fetch(
      `https://linkpeti-backend-production.up.railway.app/manage/getall/${userName}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    test = data;
    setuserData(true);
  };

  useEffect(() => {
    getuser();
    getUserDetails();
    console.log(userData);
  }, [userName]);
  return (
    <>
      <div>
        <div className="bg-[#0f172a] h-screen flex items-center flex-col p-5">
          <div style={{ display: "block", position: "relative" }}>
            <h2 className="text-white text-2xl">
              Welcome Back {userName.toUpperCase()} ~
            </h2>
            <img
              style={{
                position: "absolute",
                top: "-15px",
                left: "-90px",
                width: "80px",
              }}
              src="../pngtree-game-treasure-chest-png-image_4705366-removebg-preview.png"
            />
          </div>
          <Button
            key={12}
            style={{
              color: "black",
              backgroundColor: "#7e89ab",
              padding: "14px 30px",
              fontSize: "15px",
              minWidth: "150px",
              maxHeight: "50px",
              margin: "40px",
            }}
            onClick={() => setaddLink(true)}
            variant="contained"
          >
            Add Link
          </Button>
          {userData &&
            test.userinput.appname.map((ele, index) => {
              return (
                <Table
                  key={index}
                  className="text-white"
                  striped
                  bordered
                  hover
                  size="sm"
                >
                  <div className="flex gap-3 flex-col text-2xl m-5">
                    <div className="flex gap-9">
                      <span>{ele}</span>
                      <span>{test.userinput.links[index]}</span>
                      <span>
                        <AiFillEdit />
                      </span>
                    </div>
                  </div>
                </Table>
              );
            })}
          {addLink && (
            <Modal close={() => setaddLink(false)}>
              <div className="flex flex-col gap-5">
                <span className="font-bold">App Name</span>
                <input
                  value={appname}
                  className="border-2 h-10 border-black"
                  type="text"
                  onChange={(e) => {
                    setAppname(e.target.value);
                    console.log(appname);
                  }}
                />
                <span className="font-bold">Url</span>
                <input
                  value={applink}
                  className="border-2 h-10 border-black"
                  type="text"
                  onChange={(e) => {
                    setApplink(e.target.value);
                    console.log(applink);
                  }}
                />
                <Button
                  key={10}
                  style={{
                    color: "black",
                    backgroundColor: "#7e89ab",
                    padding: "14px 30px",
                    fontSize: "15px",
                    minWidth: "150px",
                    maxHeight: "50px",
                  }}
                  onClick={() => onAddLink()}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
