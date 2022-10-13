import React, { useEffect, useState } from "react"
import Links from "./Components/Userlink"
import { Routes , Route, Navigate } from "react-router-dom"
import Home from "./Components/Home"
import { Toaster } from "react-hot-toast";
import Dashboard from "./Components/Dashboard";

const App = () => {
  const [userVerified,setUserverified] = useState(false);
  const checkUser = async () =>{
     const response = await fetch('https://linkpeti-backend-production.up.railway.app/auth/is-verify',{
      method:"GET",
      headers:{token:localStorage.token}
     })
     const data = await response.json()
     console.log(data)
     if(data === true)
     {
        setUserverified(true);
     }
  }

  useEffect(()=>{
    checkUser();
  },[])
  return (
    <>
    {/* <div className="text-grey-600">
      <h1 className="text-3xl flex font-bold underline">hii</h1>
      <h1 className="text-red-500 sm:bg-white text-4xl text-center font-bold bg-red-600 ">hii</h1>
    </div> */}
    <Routes>
      <Route path="/user/dashboard" element={userVerified ? <Dashboard/> : <Navigate to="/"/>}/>
      <Route path="/" element={!userVerified ? <Home setAuth = {setUserverified} /> : <Navigate to="/user/dashboard"/>}/>
      <Route path="/:username" element={<Links/>}/>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
