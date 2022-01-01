import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './containers/Home/Home';
import Archive from './containers/Archive/Archive';

function App() {

  return (<>
          
      <BrowserRouter>
      {/* SWITCHER */}
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="/archive" element={ <Archive/> }/>
        </Routes>
      </BrowserRouter>

  </>
  );
}

export default App;
