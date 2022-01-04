import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Col } from 'antd';
import ContentsTable from '../../components/ContentsTable';

const Archive = ({user})=> {

    return (
      <>
        { user
          ? <div id="newsTable" style={{ width:"80%" }} >
              <ContentsTable restParameters = { { tableData: user.archived } } />
            </div>
          : <></>
        } 
      </>
    );
  }
  
  export default Archive;