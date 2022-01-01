import './Home.css';
import logosvg from '../../Img/logo.svg';
import Register from '../Register/Register';
import React, { useState } from 'react';

const Home = () => {

    const [ user, setUser ] = useState( false );

    return (
        <>
            { ! user 
            ?   <div id='homePageComp'>
                    <div style={{width:"50%"}}>
                        <img alt={"logo of the company AllFunds"} src={ logosvg }></img>
                        <div style={ { width:"40%", marginLeft: "4em" } }>
                            <h4 style={{color: "#1A365D"}}>RSS News archive project in the area of finance and economics,
                            you can save the articles you like to your archive.</h4>
                        </div>
                    </div>
                    <div style={{width:"50%"}}>
                        <Register setUser={ setUser }/>
                    </div>
                </div>
            :   <>{user}</>
            }
        </>
    )
}
export default Home;
