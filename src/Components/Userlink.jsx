import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

let test = false;
const Links = () => {
  const { username } = useParams();
  const [userData, setuserData] = useState(false);
  const getUserDetails = async () => {
    const response = await fetch(
      `https://linkpeti-backend-production.up.railway.app/manage/getall/${username}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    test = data;
    console.log(test);
    setuserData(true);
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <>
      <div className="bg-[#0f172a] h-screen">
        <div className="text-white flex items-center justify-center flex-col gap-y-2 pt-10">
          <h2 className="font-bold font-body text-xl">
            Hey There I am Om Limdiwala ~{" "}
          </h2>
          <Typewriter
            options={{
              strings: ["Web Developer"],
              autoStart: true,
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter.pauseFor(1000).deleteAll().typeString().start();
            }}
          />
        </div>
        <div className="pt-8 flex justify-center items-center flex-col gap-y-7">
          {userData &&
            test.userinput.appname.map((ele, index) => {
              return (
                <Button
                  key={index}
                  style={{
                    color: "black",
                    backgroundColor: "#90caf9",
                    padding: "14px 30px",
                    fontSize: "15px",
                    minWidth: "150px",
                  }}
                  onClick={() => {
                    const newUrl = test.userinput.links[index]
                      .replace("http://", "")
                      .replace("https://", "");
                    window.open(`https://${newUrl}`);
                  }}
                  variant="contained"
                >
                  {ele}
                </Button>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Links;
