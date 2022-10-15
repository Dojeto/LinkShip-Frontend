import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

let global = false;
const Links = () => {
  const { username } = useParams();
  const [userData, setuserData] = useState(false);
  const [userfound, setuserFound] = useState(false);
  const getUserDetails = async () => {
    const response = await fetch(
      `https://linkship.herokuapp.com/manage/getall/${username}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (data == false) {
      return;
    }
    global = data;
    setuserFound(true);
    setuserData(true);
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <>
      {!userfound ? (
        <>Invalid Link</>
      ) : (
        <>
          <div className="bg-[#06283D] h-screen">
            <div className="text-white flex items-center justify-center flex-col gap-y-2 pt-10">
              <h2 className="font-bold font-body text-xl">
                Hey There I am {global.firstname} {global.lastname} ~
              </h2>
              <img
                style={{ margin: "20px", width: "120px", borderRadius: "50%" }}
                src={global.imgurl}
              />
              <Typewriter
                options={{
                  strings: [global.userbio],
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
                global.userinput.appname.map((ele, index) => {
                  return (
                    <Button
                      key={index}
                      style={{
                        color: "black",
                        backgroundColor: "#F05454",
                        padding: "14px 30px",
                        fontSize: "15px",
                        minWidth: "150px",
                      }}
                      onClick={() => {
                        const newUrl = global.userinput.links[index]
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
      )}
    </>
  );
};

export default Links;
