import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../layout/Spinner'

export default props => {
  const [track, setTrack] = useState({})
  const [lyrics, setLyrics] = useState({})

  useEffect(() => {
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        let lyrics = res.data.message.body.lyrics;
        setLyrics({lyrics});
        return axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => {
          setTrack({
            track: res.data.message.body.track,
          });
        }).catch(err => console.log(err))

      })
      .catch(err => console.log(err));
    
  },[props.match.params.id]);
  if (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) {
    return <Spinner />;
  } else {
    return (
      <React.Fragment>
        <div className="flex justify-center flex-col my-5">
          <div className="w-1/2 mb-5">
            <Link to="/" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 hover:shadow transition duration-300"><i className="fas fa-chevron-left"></i> Go Back</Link>
          </div>
          <div className="w-1/2 border hover:shadow-lg hover:bg-gray-100 transition duration-300">
            <div className="px-6 py-4">
              <h4 className="font-semibold text-xl mb-2"><i className="fas fa-music"></i> {track.track.track_name} {track.track.explicit === 1 ? '[Explicit]' : ''}</h4>
              <p className="text-gray-700 text-base"><i className="fas fa-microphone-alt"></i> {track.track.artist_name}</p>
            </div>
            <hr />
            <div className="px-6 py-4">
              <div className="my-2">
                <h4 className="text-xl font-semibold mb-2">Lyrics</h4>
                <p>{lyrics.lyrics.lyrics_body}</p>
              </div>
              <hr />
              <div className="btn btn-dark btn-block my-3">
                <a href={track.track.track_share_url} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 transition duration-300 ease-in-out bg-indigo-500 hover:bg-gray-700 transform hover:-translate-y-1 hover:scale-110">Share <i className="fas fa-share-alt"></i></a>
                <a href={track.track.track_edit_url} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 transition duration-300 ease-in-out bg-teal-500 hover:bg-gray-700 transform hover:-translate-y-1 hover:scale-110">Edit <i className="fas fa-edit"></i></a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
