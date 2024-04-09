import {createSlice} from "@reduxjs/toolkit";

const appSlice = createSlice({
    name:"app",
    initialState:{
        open:true,
        video:[],
        keywords:"All",
        searchSuggestion:[],
        mode: 'light',
    },
    reducers:{
        toggleSidebar:(state)=>{
            state.open = !state.open;
        },
        setHomeVideo:(state,action)=>{
            state.video = action.payload;
        },
        setKeywords:(state,action)=>{
            state.keywords = action.payload;
        },
        setSearchSuggestion:(state,action)=>{
            state.searchSuggestion = action.payload;
        },
        toggleMode: (state) =>{
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        }
    }
});
export const {toggleSidebar,setHomeVideo,setKeywords,setSearchSuggestion,toggleMode} = appSlice.actions;
export default appSlice.reducer;