import 'antd/dist/antd.css';
import { Button, Card, Input, notification } from 'antd';
import './Register.css';
import React, { useState } from 'react';
import axios from 'axios'
import dayjs from 'dayjs';

const Register = ({ setUser }) => {

    const generalCardCss = { 
        height: 220,
        width: "30vw",
        margin: "1em",
        color: "white" ,
        cursor: "default",
        backgroundColor: "#D40031",
    }

    const [ active, setActive  ] = useState( true );
    const [ userInfo, setUserInfo ] = useState( { userName:"", password:"" } );

    const sendLoginRegister = async () => {
        
        //Default message
        let resData = {
            code: 400,
            response:{},
            message: "Error: Fill the inputs"
        }

        //if username and password are set we proceede
        if ( userInfo.userName && userInfo.password ) {
            
            let usNameLen = userInfo.userName.length;
            let passwLen = userInfo.userName.length;

            if ( 
                usNameLen > 3 
                && usNameLen < 10
                && passwLen > 3 
                && passwLen < 10
            ) {

                const direction = active? "/login" : "/register"
                
                // if active is truthy it will send a get, else it will send a post
                await axios.post( "http://localhost:5000" + direction , userInfo )
                .then( res => {
                    resData = res.data
                })
                .catch( Err => {
                    resData = {
                        code: 400,
                        message: ""+Err
                    }
                })

            } else if ( usNameLen < 3 || usNameLen > 10 ) resData.message = "User Name has to have between 4 and 9 characters";
            else resData.message = "Password has to have between 4 and 9 characters";

        }
        
        //Doesnt matter the code recived we always inform how did things go
        notification.open({
            message: resData.message,
        });

        //we set the user if the code recived is lower than 300
        if ( resData.code < 300 ) {
            setUser( resData.response )
        } 
    }

    return (
        <>  
            <Card
                hoverable
                className='cardRegister'
                style= {  active ? generalCardCss : { ...generalCardCss, backgroundColor: "#1A365D" } }
            >
                
                User Name
                <Input 
                    style={ { marginBottom: "0.5em" } }
                    onKeyPress={ async (_event) => {
                        if(_event.key === "Enter") await sendLoginRegister()
                    }}
                    onChange={ ( _this ) =>{
                        setUserInfo({ 
                            ...userInfo,
                            userName: _this.currentTarget.value 
                        })
                    }}
                />
                
                Password
                <Input 
                    type={"password"}
                    style={ { marginBottom: "0.5em" } }
                    onKeyPress={ async (_event) => {
                        if(_event.key === "Enter") await sendLoginRegister()
                    }}
                    onChange={ ( _this ) =>{
                        setUserInfo({ 
                            ...userInfo,
                            password: _this.currentTarget.value 
                        })
                    }}
                />

                <Button 
                    style={ { color:"white", width:"100%", backgroundColor:'transparent', marginTop:"1em" } }
                    onClick={ async() => {
                        console.log( userInfo );
                        
                        await sendLoginRegister()
                    }}
                >
                    { active ? "Login":"Register" }
                </Button>
            </Card>

            <Button 
                style= { {...generalCardCss, height: "auto" } } 
                onClick= { () => {
                    setActive( ! active ) 
                }} 
            >
                { active ? "Register":"Back" } 
            </Button>
        </>
    )
}

export default Register