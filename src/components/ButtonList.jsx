import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import { setKeywords } from '../utils/appSlice';

const buttonList = ["All", "HTML", "CSS", "JavaScript", "Music", "Song", "Live", "Sports", "Vlogs", "Trending", "News", "Technology", "Comedy clubs", "Gadgets", "Colleges", "Mixer", "Animated Films", "Podcasts", "New to you" ]
const ButtonList = () => {
  const [active,setActive] = useState("All");
  const dispatch = useDispatch();
  const videoByTag = (tag)=>{
    if (active != tag){
      dispatch(setKeywords(tag));
      setActive(tag);
    }
  }
  console.log(active);
  return (
    <div className='flex w-full my-1 overflow-x-scroll no-scrollbar'>
       {
        buttonList.map((buttonName,index)=>{
            return(
              <div key={index} >
                <button onClick={()=>{videoByTag(buttonName)}} className={` ${active == buttonName ? "bg-slate-900 text-white" : "bg-gray-200"}  mx-1  px-4 py-1 font-medium rounded-lg`}><span className=' whitespace-nowrap'>{buttonName}</span></button>
              </div>
            ) 
        })
       }
        
    </div>
  )
}

export default ButtonList