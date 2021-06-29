import React from 'react';
import { useState, useEffect } from 'react';
import ToDo from './components/todo/todo.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import useAjax from './hooks/useAjax.js';
// import SettingsProvider from './context/Settings.js';

export default function App() {


  return (
    <>
      <ToDo/>
      {/* <ToDo title={title} setTitle={setTitle}/> */}
    </>
  );
}