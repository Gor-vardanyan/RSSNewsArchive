import React,{useState,useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './containers/Header/Header';
import Home from './containers/Home/Home';
import Archive from './containers/Archive/Archive';
import dayjs from 'dayjs';


function App() {

  const [ user, setUser ] = useState( false );

  useEffect( () => {

    let userLocalHost = JSON.parse(localStorage.getItem("user"));
    
    //if localstorage expire unix code is lower than now, remove local storage 
    if ( userLocalHost?.expire < dayjs().unix() ) {
      userLocalHost = false;
      localStorage.removeItem("user");
    }

    // if user is not set take from local storage
    if ( ! user && userLocalHost ) {
      setUser( userLocalHost );
    }

    // if user exists||change update local storage
    if ( user ) {
      localStorage.setItem('user', JSON.stringify( { ...user, expire: dayjs().add(1, 'day').unix() } ))
    } 

  }, [ user ]);

  return (<>

      <BrowserRouter>
      {/* SWITCHER */}
            
      { user ?
        <Header user={ user } setUser={ setUser } />
        :<></>
      } 
        <div style={{ 
          marginLeft: user ? "5%" : "0%",
          width:"95%",
          height:"100vh",
          backgroundColor: "rgb(47, 80, 128)"
        }}>
          <Routes>
            <Route path="/" element={ <Home user={ user } setUser={ setUser }/> }/>
            <Route path="/archive" element={ <Archive user={user} setUser={setUser}/> }/>
          </Routes>
        </div>
      </BrowserRouter>

  </>
  );
}

export default App;
