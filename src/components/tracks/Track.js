import React from 'react'
import { Link } from 'react-router-dom'

export default ({track}) => {
  return (
    <React.Fragment>
      <div className="rounded shadow hover:shadow-lg hover:bg-gray-300 transition duration-300">
        <div className="px-6 py-4">
          <h4 className="font-semibold text-xl mb-2"><i className="fas fa-music"></i> {track.track_name}</h4>
          <p className="text-gray-700 text-base"><i className="fas fa-microphone-alt"></i> {track.artist_name}</p>
        </div>
        <div className="px-6 py-4">
          <Link to={`lyrics/track/${track.track_id}`} className="btn btn-dark btn-block">
            <span className="inline-block bg-indigo-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">View Lyrics <i className="fas fa-chevron-right"></i></span>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}
