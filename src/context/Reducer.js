export default (state, action) => {
  switch (action.type) {
    case 'GET_TOP_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Top 10 Tracks'
      };
    case 'SEARCH_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search Results'
      };
    default:
      return state;
  }
}