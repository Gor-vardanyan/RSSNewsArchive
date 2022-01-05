import React from "react";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import Button from "antd/lib/button";
import axios from "axios";
import ContentsTable from "../../components/ContentsTable";
import defaults from '../../daultConfigurations'
import './Archive.css'
import { notification, Tooltip } from "antd";

const Archive = ( { user ,setUser } )=> {

  const deleteArticle = async ( articleData ) => {

    const deletedArticle = await axios.post( "http://localhost:5000"+"/deleteArticle" , { articleData , user } )
    if ( deletedArticle ) {
      setUser( deletedArticle.data.res )
    }

    notification.open({
      message: deletedArticle.data.message,
    });
  }

  //defaultColumns are the columns strictly defined && multi-used
  const columns = [
    ...defaults.defaultColums,
    {
      title: "Actions",
      render : row => (<>
        <Tooltip 
          title="Open the Article"
          placement="top"
        >
          <Button 
            className='blueback-text' 
            style={{ marginBottom:"5px" }} 
            href={ row.link } 
            target="_blank" 
          >
            <SearchOutlined/>
          </Button>
        </Tooltip>
        
        <Tooltip 
          title="Remove from archive"
          placement="top"
        >
          <Button 
            className='blueback-text' 
            onClick={ () => deleteArticle( row ) } 
          >
            <DeleteOutlined/>
          </Button>
        </Tooltip>
      </>)
    }
  ]

    return (
      <>
        { user
          ? <div id="archiveTable" style={{ width:"100%", height:"100%" }} >
              <div style={{ width:"80%"}}>

                <h1 style={{ color:"white", marginTop:"25px" }}>Archived News</h1>
                <ContentsTable
                  data={user.archived}
                  columns={columns}
                />
              
              </div>
            </div>
          : <></>
        } 
      </>
    );
  }
  
  export default Archive;