import React,{useState,useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './containers/Header/Header';

import Home from './containers/Home/Home';
import Archive from './containers/Archive/Archive';

function App() {

  const [ user, setUser ] = useState( false );
  useEffect( () => {
    let userLocalHost = JSON.parse(localStorage.getItem("user"));
    if( userLocalHost ) console.log( user );
  }, [user]);
  return (<>

      <BrowserRouter>
      {/* SWITCHER */}
            
      { user ?
        <Header user={ user } setUser={ setUser } />
        :<></>
      }
        <Routes>
          <Route path="/" element={ <Home user={ user } setUser={ setUser }/> }/>
          <Route path="/archive" element={ <Archive user={user} /> }/>
        </Routes>
      </BrowserRouter>

  </>
  );
}

export default App;
