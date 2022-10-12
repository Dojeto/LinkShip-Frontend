import React from "react";
import Typewriter from "typewriter-effect";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

const Links = () => {
  const { username } = useParams();
  
  return (
    <>
    <div className="bg-[#0f172a] h-screen">
        <div className="text-white flex items-center justify-center flex-col gap-y-2 pt-10">
          <h2 className="font-bold font-body text-xl">Hey There I am Om Limdiwala ~ </h2>
          <Typewriter
                options={{
                  strings: ['Web Developer'],
                  autoStart: true,
                  loop: true,
                }}

                onInit={(typewriter)=> {
                
                typewriter
                .pauseFor(1000)
                .deleteAll()
                .typeString()
                .start();
                }}
                />
        </div>
        <div className="pt-8 flex justify-center items-center flex-col gap-y-7">
          <Button
            style={{
              color:"black",
              backgroundColor: "#90caf9",
              padding: "14px 30px",
              fontSize: "15px",
              minWidth : "150px"
            }}
            onClick={()=> window.location.assign('http://github.com/Dojeto')}
            variant="contained"
          >
            Github
          </Button>
        </div>
    </div>
    </>
  );
};

export default Links;
