import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import CreatePost from './Pages/CreatePost';
import './App.css'
const App = () => (
  <BrowserRouter>
    <div className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;