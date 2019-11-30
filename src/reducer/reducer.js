const init = {
  obj: ''
}
const Reducer = (state = init, action) => {
  switch (action.type) {
    case 'SAVE_REQUEST':
      return {
        ...state,
        obj: action.obj
      }
    case 'SAVE_CHANGE':
      return {
        ...state,
        obj: action.obj
      }
    default:
      return state
  }
}
export default Reducer
