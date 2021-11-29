import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@material-ui/core";
import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar"; //*/*/*/ /
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to='/posts'/>} /> {/* We only want to see posts if we are on this specific path */}
          <Route path="/posts" element={<Home/>}/>
          <Route path="/posts/search" element={<Home/>}/> {/* we also want to render the home component if we're on the /posts/search */}
          <Route path="/posts/:id" element={<PostDetails/>}/> {/* This is the post details path and the id will be dynamic( the id would be whatever card/post was clicked on)*/}
          <Route path="/auth" element={ !user ? <Auth/> : <Navigate to='/posts'/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
