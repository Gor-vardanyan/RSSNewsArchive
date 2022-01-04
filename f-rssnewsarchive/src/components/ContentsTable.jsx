import React, { useState, useEffect } from "react";
import { Button } from 'antd';
import { Table } from "ant-table-extensions";
import { SearchOutlined, DeliveredProcedureOutlined, } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const ContentsTable = ( { restParameters } )=> {
    dayjs.extend(utc);
    dayjs.extend(timezone);

    let { tableData, options, style } = restParameters

    //Table structure
    if ( ! tableData ) tableData = []
    if ( ! style ) style = { marginTop:"25px"}
    if ( ! options ) options = [
        {
          title: "Title",
          render : rssRecivedData => rssRecivedData.title
        },
        {
          title: "Description",
          render : rssRecivedData => rssRecivedData.description
        },    
        {
          title: "Date",
          render : rssRecivedData => {
            return <div style={{ width:"6em" }}> {dayjs( rssRecivedData.pubDate ).tz("Europe/Madrid").local().format("DD-MM-YYYY")}</div>
          },
          sorter: (a, b) => {
            let ini = dayjs( a.pubDate ).tz("Europe/Madrid").local().unix();
            let bini = dayjs( b.pubDate ).tz("Europe/Madrid").local().unix();
            if ( ini === bini ) ini++
            
          return ini - bini ;
          },
          sortDirections: ['descend','ascend'],
          defaultSortOrder: 'descend',
    
        },
        {
          title: "Actions",
          render : rssRecivedData => (
          <>
            <Button className='blueback-text' style={{ marginBottom:"5px" }} href={ rssRecivedData.link } target="_blank" ><SearchOutlined/></Button>
            <Button className='blueback-text' onClick={ ()=> console.log("saveFoo") } ><DeliveredProcedureOutlined/></Button>
          </>
          )
        }
    
    ]

    return (
            <Table
              style={ style }
              dataSource = { tableData }
              columns = { options }
              rowClassName = {(record, index) => {
                return "blueback-text"
              }}
              pagination={{
                pageSizeOptions: [ '10', '20', '50', '100', '500'],
                showSizeChanger: true,
                locale: { items_per_page: "" },
                showTotal: (total, range )=>{
                  return `total (${total})`
                }
              }}
            /> 
    )
}

export default ContentsTable;