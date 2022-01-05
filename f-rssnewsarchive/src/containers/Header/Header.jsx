import logoRed from '../../Img/logoRed2.png';
import { Button, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ReadOutlined, HddOutlined, LogoutOutlined } from '@ant-design/icons';
import './Header.css';

const Header =({ user, setUser })=>{
    
    const navigate = useNavigate();
    
    const buttonStyle={
        border: "none",
        color:"white",
        marginBottom:"0.5em",
        fontSize:"2.3em",
        backgroundColor:"transparent"
    }

    return (
        <div id="navInHeader" style={{ width: "5%", height: "100vh", }}>

            <img style={{ marginTop:"0.5em",  width:"100%"}} alt={"link to news feed"} src={ logoRed }></img>


            <Button onClick={ ()=> navigate('/') } style={ buttonStyle } >
                <ReadOutlined />
            </Button>
            <h4 style={ { color:"white" } } >News</h4>


            <Button onClick={ ()=> navigate('/Archive') } style={ buttonStyle } >
                <HddOutlined />
            </Button>
            <h4 style={ { color:"white" } } >Archive</h4>


            <Button 
                onClick={ () => {
                    localStorage.removeItem("user")
                    navigate('/')
                    setUser( false )
                } } 
                style={ { ...buttonStyle, fontSize:"2.2em" } } 
            >
                <LogoutOutlined />
            </Button>
            <h4 style={ { color:"white" } } >logOut</h4>


        </div>
    )
}
export default Header