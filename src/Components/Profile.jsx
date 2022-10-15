import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import { Button } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import { PickerOverlay } from "filestack-react";
import Modal from "../model/Modal";

let global = "";
const Profile = () => {
  const [userName, setuserName] = useState("");
  const [userData, setuserData] = useState(false);

  const [bio, setBio] = useState("");
  const [onUpdatebio, setonUpdateBio] = useState(false);
  const [isPicker, setIsPicker] = useState(false);
  const [img_url, setImageurl] = useState(
    "https://cdn.filestackcontent.com/U0ujuEFvQrW0rcMFcqSa"
  );

  const onBioUpdate = async () =>{
    try {
      const response = await fetch(`https://linkship.herokuapp.com/manage/addbio`,{
        method:"POST",
        credentials: "include",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          userBio  : bio
        })
      })
      console.log(response);
      window.location.href='/user/profile'
    } catch (err) {
      console.log(err.message)
    }
  }
  const onImageUpload = async(url)=>{
    try {
      const response = await fetch(`https://linkship.herokuapp.com/manage/addimage`,{
        method:"POST",
        credentials: "include",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          imageUrl : url
        })
      })
      console.log(response)
      window.location.href='/user/profile'
    } catch (err) {
      console.log(err.message)
    }
  }
  const getuser = async () => {
    const response = await fetch(
      `https://linkship.herokuapp.com/dashboard`,
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
      `https://linkship.herokuapp.com/manage/getall/${userName}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    global = data;
    setuserData(true);
  };

  useEffect(() => {
    getuser();
    getUserDetails();
    console.log(userData);
  }, [userName]);
  return (
    <>
      <div className="bg-[#06283D] h-screen flex items-center justify-center flex-col p-5">
        <Card
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            rowGap: "20px",
            alignItems: "center",
            height: "500px",
            backgroundColor: "#DDDDDD",
            minWidth: "350px",
            borderRadius: "15px",
            boxShadow: "10px 20px #000000",
          }}
          variant="outlined"
        >
          <img style={{ width: "100px", borderRadius: "50%" }} src={global.imgurl} />
          <div
            style={{
              textAlign: "center",
              background: "white",
              width: "100px",
              border: "solid black 1px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              isPicker ? setIsPicker(false) : setIsPicker(true);
            }}
          >
            <input id="files" class="hidden" />
            <label style={{ cursor: "pointer" }} for="files">
              Choose File
            </label>
          </div>
          <p className="font-bold"> {userData && global.username}</p>
          <p>First Name: {userData && global.firstname}</p>
          <p>Last Name: {userData && global.lastname}</p>
          <p>
            Description: {userData && global.userbio}
            <AiFillEdit
              onClick={() => {
                setonUpdateBio(true);
              }}
              style={{ display: "inline" }}
            />{" "}
          </p>
        </Card>

        {isPicker && (
          <PickerOverlay
            apikey={"AJbGbxcJRbqofHCOKiyGJz"}
            action="pick"
            pickerOptions={{
              maxSize: 10 * 1024 * 1024,
              accept: "image/*",
            }}
            onSuccess={(resp) => {
              setImageurl(resp.filesUploaded[0].url);
              setIsPicker(false);
              onImageUpload(resp.filesUploaded[0].url);
            }}
            onUploadDone={(res) => console.log(res)}
          />
        )}

        {onUpdatebio && (
          <Modal close={() => setonUpdateBio(false)}>
            <div className="flex flex-col gap-5">
              <span className="font-bold">Bio</span>
              <input
                className="border-2 h-10 border-black"
                type="text"
                onChange={(e) => setBio(e.target.value)}
              />
              <Button
                key={10}
                onClick={() => onBioUpdate()}
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
                Done
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Profile;
