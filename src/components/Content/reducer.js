const TYPES = {
    RESET: "RESET",
    SET_DATA: "SET_DATA"
}

export function init(state) {
  return {
    ...state,
  };
}

export const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.RESET:
      return init(action.payload);
    case TYPES.SET_DATA:
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    default:
      return state;
  }
}

export const reset = (payload) => {
    return {
        type: TYPES.RESET,
        payload
    }
}

export const setData = (payload) => {
    return {
        type: TYPES.SET_DATA,
        payload
    }
}