const TYPES = {
  RESET: "RESET",
  SET_DATA: "SET_DATA",
  SORT_BY_TIME: "SORT_BY_TIME",
  SORT_BY_TITLE: "SORT_BY_TITLE",
  SORT_BY_DOMAIN: "SORT_BY_DOMAIN",
  SHOW_COMMENTS: "SHOW_COMMENTS",
  CLOSE_COMMENTS: "CLOSE_COMMENTS",
};

function domainValidator(domain) {
  return domain === undefined ? "" : domain;
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
    case TYPES.SORT_BY_TIME:
      return {
        ...state,
        data:
          action.payload === "new"
            ? [...state.data.sort((a, b) => b.time - a.time)]
            : [...state.data.sort((a, b) => a.time - b.time)],
      };
    case TYPES.SORT_BY_TITLE:
      return {
        ...state,
        data:
          action.payload === "new"
            ? [...state.data.sort((a, b) => (a.title > b.title ? 1 : -1))]
            : [...state.data.sort((a, b) => (b.title > a.title ? 1 : -1))],
      };
    case TYPES.SORT_BY_DOMAIN:
      return {
        ...state,
        data:
          action.payload === "new"
            ? [
                ...state.data.sort((a, b) =>
                  domainValidator(a.domain) > domainValidator(b.domain) ? 1 : -1
                ),
              ]
            : [...state.data.sort((a, b) => (b.domain > a.domain ? 1 : -1))],
      };

    case TYPES.SHOW_COMMENTS:
      return {
        ...state,
        comments: {
          ...state.comments,
          isOpen: true,
          id: action.payload,
        },
      };
    case TYPES.CLOSE_COMMENTS:
      return {
        ...state,
        comments: {
          ...state.comments,
          isOpen: false
        }
      };
    default:
      return state;
  }
};

export const reset = (payload) => {
  return {
    type: TYPES.RESET,
    payload,
  };
};

export const setData = (payload) => {
  return {
    type: TYPES.SET_DATA,
    payload,
  };
};
export const sortByTime = (payload) => {
  return {
    type: TYPES.SORT_BY_TIME,
    payload,
  };
};
export const sortByTitle = (payload) => {
  return {
    type: TYPES.SORT_BY_TITLE,
    payload,
  };
};
export const sortByDomain = (payload) => {
  return {
    type: TYPES.SORT_BY_DOMAIN,
    payload,
  };
};
export const showComments = (payload) => {
  return {
    type: TYPES.SHOW_COMMENTS,
    payload,
  };
};

export const closeCommends = () => {
  return {
    type: TYPES.CLOSE_COMMENTS,
  };
};
