+import React from "react";
import "./App.css";
// @ts-ignore
import Input from "./components/input/input.tsx";
// @ts-ignore
import SingleUser from "./components/userList/singleUser.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Input />} />
          <Route path="/cards/user/:id" element={<SingleUser />} />
        </Routes>
         </BrowserRouter>
      </div>
  );
}

export default App;
