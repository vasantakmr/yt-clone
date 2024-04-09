import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiVideoUploadLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import {useDispatch,useSelector} from  "react-redux"
import { setKeywords, setSearchSuggestion, toggleSidebar } from "../utils/appSlice";
import { SEARCH_SUGGESTIONS_API } from "../constant/youtube";
import axios from "axios";
const Navbar = () => {
  const [input,setInput] = useState("");
  const [suggestion,setSuggestion] = useState(false)
  const dispatch = useDispatch();
  const {searchSuggestion} = useSelector((store)=>store.app);
  const searchVideo = () =>{
    dispatch(setKeywords(input));
    setInput("");
  }
  const toggleHandler = () => {
    dispatch(toggleSidebar());
  }
  const showSuggestion = async () =>{
    try {
      const res = await axios.get(SEARCH_SUGGESTIONS_API+input);
      dispatch(setSearchSuggestion(res?.data[1]))
    } catch (error) {
      
    }
  }
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion); // Set the clicked suggestion as input value
    dispatch(setSearchSuggestion([]));
  } // Clear suggestions

  const openSuggestion = () =>{
    setSuggestion(true);
  }
  useEffect(()=>{
    const timer = setTimeout(()=>{
      showSuggestion();
    }, 200)
    return()=>{
      clearTimeout(timer);
    }
  },[input])
  return (
    <div className="flex fixed top-0 justify-center items-center w-[100%] z-10 bg-white">
      <div className=" flex w-[96%] justify-between py-3">
        <div className="flex items-center">
          <RxHamburgerMenu onClick={toggleHandler} className=" cursor-pointer" size={"24px"} />
          <img className="px-4" width={"115px"} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/768px-YouTube_Logo_2017.svg.png"  />
        </div>
        <div className="flex w-[40%] items-center">
          <div className=" flex w-[100%] ">
            <input value={input} onKeyDown={(e) => { if (e.key === "Enter") { searchVideo(); } }} onFocus={openSuggestion} onChange={(e)=>setInput(e.target.value)} type="text" placeholder="Search" className=" w-full py-2 px-4 border border-gray-400 rounded-l-full  outline-none " />
          
            <button onClick={searchVideo} className="py-2 border border-gray-400 rounded-r-full px-4"><CiSearch size={"24px"} /></button>
          </div>
          {
            (suggestion && searchSuggestion.length != 0) &&
            <div className="absolute top-2 z-50 w-[30%] py-5 bg-white shadow-lg mt-12 rounded-lg">
            <ul>{
              searchSuggestion.map((text,idx)=>{
                return(
                  <div className=" flex items-center px-4 hover:bg-gray-100" onClick={() => handleSuggestionClick(text)}>
                    <CiSearch size={"24px"} />
                    <li className="px-2 py-1 cursor-pointer text-md font-medium">{text}</li>
                  </div>
                  
                )
              })
            }
            </ul>
          </div>}
          
        </div> 
         
       
          
        
        <div className="flex w-[15%] justify-between items-center">
          <IoIosNotificationsOutline size={"24px"} className=" cursor-pointer" />
          <RiVideoUploadLine size={"24px"} className=" cursor-pointer" />
          <Avatar className=" cursor-pointer" src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw" size={35} round={true} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
