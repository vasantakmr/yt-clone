import React, { useEffect, useState } from 'react'
import axios from "axios";
import { YOUTUBE_VIDEO_API} from '../constant/youtube';
import VideoCart from './VideoCart';
import { Link } from 'react-router-dom';
import { API_KEY } from '../constant/youtube';
import {useDispatch,useSelector} from "react-redux";
import { setHomeVideo } from '../utils/appSlice';

function VideoContainer() {
  const {video,keywords} = useSelector((store)=>store.app);
  const dispatch = useDispatch();

  //whenever we do api call/ network call we have to use useEffect 
  const fetchingYoutubeVideo = async ()=>{
    try {
      const res = await axios.get(`${YOUTUBE_VIDEO_API}`);
      dispatch(setHomeVideo(res?.data?.items))
    } catch (error) {
      console.log(error);
    }
    
  }
  const fetchVideoByKeywords = async () => {
    try {
      const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${keywords}&type=video&key=${API_KEY}`);
      dispatch(setHomeVideo(res?.data?.items))
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    if(keywords=="All"){
      fetchingYoutubeVideo();
    }else{
      fetchVideoByKeywords();
    }
  },[keywords]);
  return (
    <div className=' grid grid-cols-3 gap-2'>
      {
        video.map((item)=>{
          return(
            <Link to={`/watch?v=${typeof item.id === 'object' ? item.id.videoId : item.id}`} key={typeof item.id === 'object' ? item.id.videoId : item.id}>
              <VideoCart item = {item} />
            </Link>
            
          )
        })
      }
    </div>
  )
}

export default VideoContainer