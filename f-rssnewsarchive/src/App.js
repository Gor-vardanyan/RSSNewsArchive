import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './containers/Home/Home';
import Register from './containers/Register/Register';
import News from './containers/News/News';

function App() {

  const [ user, setUser ] = useState( false );

  return (<>
          
      <BrowserRouter>
      {/* SWITCHER */}
        <Routes>
          <Route path="/" element={ <Home prop= { setUser } /> }/>
          <Route path="/news" element={ <News/> }/>
        </Routes>
      </BrowserRouter>

  </>
  );
}

export default App;
