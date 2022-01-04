import 'antd/dist/antd.css';
import { Button, Card, Input, notification } from 'antd';
import './Register.css';
import React, { useState } from 'react';
import axios from 'axios'

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
                    onChange={ ( _this ) =>{
                        setUserInfo( { ...userInfo, userName: _this.currentTarget.value } ) }
                    }
                ></Input>
                
                Password
                <Input 
                    style={ { marginBottom: "0.5em" } }
                    onChange={ ( _this ) =>{
                        setUserInfo( { ...userInfo, password: _this.currentTarget.value } ) }
                    }
                ></Input>

                <Button 
                    style={ { color:"white", width:"100%", backgroundColor:'transparent', marginTop:"1em" } }
                    onClick={ async() => {
                        console.log( userInfo );
                        
                        let resData = {
                            code: 400,
                            response:{},
                            message: "Error: Fill the inputs"
                        }

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
                                await (
                                    active ? axios.get 
                                    : axios.post 
                                )( "http://localhost:5000" + direction , userInfo )
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

                        notification.open({
                            message: resData.message,
                        });
                        
                        if ( resData.code < 300 ){
                            localStorage.setItem('user', JSON.stringify( resData.response ))
                            setUser( resData.response )
                        } 
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