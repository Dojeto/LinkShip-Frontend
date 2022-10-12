import React from "react"
import Links from "./Components/Userlink"
import { Routes , Route } from "react-router-dom"

const App = () => {
  return (
    <>
    {/* <div className="text-grey-600">
      <h1 className="text-3xl flex font-bold underline">hii</h1>
      <h1 className="text-red-500 sm:bg-white text-4xl text-center font-bold bg-red-600 ">hii</h1>
    </div> */}
    <Routes>
      <Route path="/:username" element={<Links/>}/>
    </Routes>
    </>
  )
}

export default App
