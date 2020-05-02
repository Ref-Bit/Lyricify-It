import React, {useContext} from 'react'
import { GlobalContext } from '../../context/Global'
import Spinner from "../layout/Spinner"
import Track from './Track'

export default () => {
  const {track_list, heading} = useContext(GlobalContext);

  if (track_list === undefined || track_list.length === 0) {
    return <Spinner />;
  } else {
    return (
      <React.Fragment>
        <h2 className="text-center text-4xl my-4">{heading}</h2>
        <div className="grid grid-cols-3 gap-4">
          {track_list.map(item => (<Track key={item.track.track_id} track={item.track}/>))}
        </div>
      </React.Fragment>
    )
  }
}
