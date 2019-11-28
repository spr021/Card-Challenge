const init = {
  obj: ''
}
const Reducer = (state = init, action) => {
  switch (action.type) {
    case 'SAVE_REQUEST':
      console.log('$$$$', action.obj)
      return {
        ...state,
        obj: action.obj
      }
    default:
      return state
  }
}
export default Reducer
