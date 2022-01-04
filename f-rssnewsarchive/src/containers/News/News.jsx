import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import './News.css'
import ContentsTable from '../../components/ContentsTable';

const News = ( { user } ) => {
  
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const [rssData, setRssData] = useState( [] );

  const getRss = async (e) => {
    const res = await fetch(`https://api.allorigins.win/get?url=${e}`);
    const { contents } = await res.json();
    
    const feed = new window.DOMParser().parseFromString(contents, "text/xml");
    
    const items = feed.querySelectorAll("item");
    
    const feedItems = [...items].map( item => ({
      link: item.querySelector("link").innerHTML,
      title: item.querySelector("title").innerHTML,
      description: item.querySelector("description").innerHTML,
      pubDate: item.querySelector("pubDate").innerHTML
    }));
  
    return feedItems
  };

  useEffect( async () => {
    let newSetRssData = await getRss('https://www.economist.com/finance-and-economics/rss.xml');
      if( newSetRssData.length ) setRssData( newSetRssData )

  }, []);

  return (
      <>
        <div id="newsPage">

          <h1 style={{ fontSize: "3.5em", color: "white" }}>RSS NEWS FEED</h1>
          <h3 style={{ color:"white" }}>Visit or save for later the articles you like.</h3>

          <div id="newsTable" style={{ width:"80%" }} >
              <ContentsTable restParameters = { { tableData: rssData } } />
          </div>
        </div>
      </>
  )
}
export default News;