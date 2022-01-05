import React, { useState, useEffect } from 'react';
import defaults from '../../daultConfigurations'
import './News.css'
import ContentsTable from '../../components/ContentsTable';
import axios from 'axios';
import { SaveOutlined, SearchOutlined } from '@ant-design/icons';
import Button from 'antd/lib/button';
import { notification, Tooltip } from 'antd';

const News = ( { user, setUser } ) => {

  const [rssData, setRssData] = useState( [] );

  const getRss = async rssUrl => {
    //fetch with the allorigin api to get the xml
    const res = await fetch( `https://api.allorigins.win/get?url=${rssUrl}` );
    
    //Parse to Json then html
    const { contents } = await res.json();
    const feed = new window.DOMParser().parseFromString(contents, "text/xml");
    
    
    //TODO: interesting to add callback where we can set the html tags to different RSS formats
    
    const items = feed.querySelectorAll("item");
    
    //collect with querySelector the html tags
    const feedItems = [...items].map( item => ({
      link: item.querySelector("link").innerHTML,
      id: item.querySelector("guid").innerHTML.split("content/")[1],
      title: item.querySelector("title").innerHTML,
      description: item.querySelector("description").innerHTML,
      pubDate: item.querySelector("pubDate").innerHTML
    }));
  
    return feedItems
  };

  const saveArticle = async ( articleData ) => {

    //if the article selected already exists we dont query
    if ( ! user.archived.find( e => e.id === articleData.id )) {

      const savedArticle = await axios.post( "http://localhost:5000"+"/saveArticle" , { articleData , user } )
      if ( savedArticle ) setUser( savedArticle.data.res )
      
      notification.open({
        message: savedArticle.data.message,
      });

    } else notification.open({
      message: "Article is already stored",
    });
  
  }

  useEffect( async () => {
    //at renders we set rssData
    let newSetRssData = await getRss('https://www.economist.com/finance-and-economics/rss.xml');
    if( newSetRssData.length ) setRssData( newSetRssData )

  }, []);
  
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
        
        { !user.archived.find( e => e.id === row.id ) && <Tooltip 
          title="Save the Article"
          placement="top"
        >
          <Button 
              className='blueback-text' 
              onClick={ () => saveArticle(row) } 
            >
              <SaveOutlined />
            </Button>
        </Tooltip>
      
        }
      </>)
    }
  ]

  return (
      <>
        <div id="newsPage">

          <h1 style={{ fontSize: "3.5em", color: "white" }}>RSS NEWS FEED</h1>
          <h3 style={{ color:"white" }}>Visit or save for later the articles you like.</h3>
          {/* add button to add new rssUrl to add news to feed, only if admin role */}
          <div id="newsTable" style={{ width:"80%" }} >
              <ContentsTable 
                  data={ rssData }
                  columns={ columns }
              />
          </div>
        </div>
      </>
  )
}
export default News;