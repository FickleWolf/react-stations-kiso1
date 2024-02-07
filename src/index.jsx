import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateThred from './route/CreateThread';
import ThreadDetail from './route/ThreadDetail';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path={'/'} element={<App />}></Route>
      <Route exact path={'/thread/new'} element={<CreateThred />}></Route>
      <Route exact path={'/thread/:id'} element={<ThreadDetail />}></Route>
    </Routes>
  </BrowserRouter>
);
