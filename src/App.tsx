import React from "react";
import "./App.css";
// @ts-ignore
import Input from "./components/input/input.tsx";
// @ts-ignore
import SingleUser from "./components/userList/singleUser.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import store from "./redux/store";

function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Input />} />
            <Route path="/mithya-labs-crud" element={<Input />} />
            <Route path="/user/:id" element={<SingleUser />} />
          </Routes>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
