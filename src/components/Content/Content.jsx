import React, { useEffect, useContext, useState, useReducer, useCallback } from "react";
import { API } from "../../API";
import ResourceContext from "../../context";
import Loader from "../UI/Loader/index.jsx";
import "./Content.css";

function getMaxPages(resource) {
  switch (resource) {
    case "news":
      return 10;
    case "newest":
      return 12;
    case "ask":
      return 2;
    case "show":
      return 2;
    case "jobs":
      return 1;

    default:
      break;
  }
}

function tableRowCreator(data) {
  return data.map((item, id) => {
    return (
      <tr key={id}>
        <td>{item.time_ago}</td>
        <td>{item.title}</td>
        <td>{item.domain}</td>
      </tr>
    );
  });
}

function init(state) {
  return {
    ...state,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "RESET":
      return init(action.payload);
    case "SET_DATA":
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    default:
      return state;
  }
}

const Content = () => {
  const { resource } = useContext(ResourceContext);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [state, dispatch] = useReducer(
    reducer,
    {
      data: [],
      currentResource: resource,
      maxPage: getMaxPages(resource),
    },
    init
  );
  /* console.log(state, "f", fetching, "cP", currentPage); */
  useEffect(() => {
    /* console.log("resource is changed"); */
    dispatch({
      type: "RESET",
      payload: {
        data: [],
        currentResource: resource,
        maxPage: getMaxPages(resource),
      },
    });
    setCurrentPage(1);
    setFetching(true);
  }, [resource]);

  useEffect(() => {
    async function fetchData(resource, currentPage) {
      try {
        /* console.log("fetching"); */
        const response = await API.get(resource, currentPage);
        dispatch({ type: "SET_DATA", payload: response });
        setCurrentPage((prev) => ++prev);
      } catch (e) {
        throw e;
      } finally {
        setFetching(false);
      }
    }

    /* console.log("currentPage", currentPage, "state.maxPage", state.maxPage); */
    if (fetching) {
      fetchData(resource, currentPage);
    }
  }, [fetching]);

  const scrollHandler = useCallback((e) => {
    console.log(currentPage);
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      currentPage <= state.maxPage
    ) {
      /* console.log(currentPage, "after if"); */
      setFetching(true);
    }
  }, [currentPage]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [scrollHandler]);

  return (
    <div className="content">
      <table className="content-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Title</th>
            <th>Domain</th>
          </tr>
        </thead>
        <tbody>{tableRowCreator(state.data)}</tbody>
      </table>
      {fetching ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : null}
    </div>
  );
};

export default Content;