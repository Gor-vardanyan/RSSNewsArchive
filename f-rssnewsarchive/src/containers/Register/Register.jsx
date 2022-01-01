import 'antd/dist/antd.css';
import { Button, Card, Input} from 'antd';
import './Register.css';
import React, { useState } from 'react';

const Register = ({ setUser }) => {

    const generalCardCss = { 
        height: 220,
        width: "30vw",
        margin: "1em",
        color: "white" ,
        cursor: "default",
        backgroundColor: "#D40031",
    }

    const [ active, setActive  ] = useState( false );
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
                    onClick={() => {
                        debugger
                        //TODO: send query depending of active /register or login 
                        console.log( userInfo );
                        setUser("existts")
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