import React, { useState, useEffect, useContext } from "react"
import { GlobalContext } from "../../context/Global"
import axios from "axios"

export default () => {
  const [userInput, setUserInput] = useState("");
  const [trackTitle, setTrackTitle] = useState("");
  const { searchTracks } = useContext(GlobalContext);

  useEffect(() => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        searchTracks(res.data.message.body.track_list)
      })
      .catch(err => console.log(err));
    
  },[trackTitle]);

  const handleSubmit = e => {
    e.preventDefault();
    setTrackTitle(userInput);
  };

  const handleChange = e => {
    setUserInput(e.target.value);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="flex items-center border-b-2 border-white py-2 hover:border-indigo-700 transition duration-500">
          <input id="search" name="userInput" value={userInput} className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Write a song name..." aria-label="Song Name" onChange={handleChange}/>
          <button className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded shadow font-semibold" type="submit">
            Search
          </button>
        </div>
      </form>
    </React.Fragment>
  )
}
