import React, {createContext, useEffect, useReducer} from 'react'
import axios from 'axios'
import Reducer from './Reducer'

// Create Context
export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
  
  // Initial State
  const initialState = {
    track_list: [],
    heading: 'Heading Title'
  }

  const [state, dispatch] = useReducer(Reducer, initialState);

  // Actions
  function getTopTracks(tracks){
    dispatch({
      type: 'GET_TOP_TRACKS',
      payload: tracks
    });
  }
  function searchTracks(tracks){
    dispatch({
      type: 'SEARCH_TRACKS',
      payload: tracks
    });
  }

  useEffect(() => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        // console.log(res.data);
        getTopTracks(res.data.message.body.track_list)
      })
      .catch(err => console.log(err));
    
  },[]);

  return (
    <GlobalContext.Provider value={{track_list: state.track_list, heading: state.heading, searchTracks}}>
      {children}
    </GlobalContext.Provider>
  )
}
