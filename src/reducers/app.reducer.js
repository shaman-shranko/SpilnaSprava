import initialState from '../store/app.store';

export default function appReducer(state = initialState.app, action) {
  switch (action.type) {
    case "CHANGE_SELECTED": {
      return {
        ...state,
        selected: action?.payload?.selected ?? null
      }
    }

    default: return state;
  }
}