import React, { useEffect, useContext, useState, useReducer } from "react";
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
  return { ...state };
}

function reducer(state, action) {
  switch (action.type) {
    case "RESET":
      return init(action.payload);
    case "SET_DATA":
      return {
        ...state,
        data: [...state.data, ...action.payload],
        fetching: false,
        pageToLoad: ++state.pageToLoad,
      };
    case "SET_FETCHING":
      return {
        ...state,
        fetching: true,
      };
    default:
      return state;
  }
}

const Content = () => {
  const { resource } = useContext(ResourceContext);
  const [state, dispatch] = useReducer(
    reducer,
    {
      data: [],
      pageToLoad: 1,
      fetching: true,
      currentResource: resource,
      // maxPage: getMaxPages(resource),
    },
    init
  );

  console.log(state, "resource", resource);
  useEffect(() => {
    console.log("effect");

    async function fetchData(resource, pageToLoad) {
      try {
        const response = await API.get(resource, pageToLoad);
        dispatch({ type: "SET_DATA", payload: response });
      } catch (e) {
        throw e;
      }
    }


    console.log(resource, state.currentResource, "in eff");
    // console.log(state.pageToLoad, state.maxPage);



    if (
      state.fetching &&
      resource === state.currentResource 
      // state.pageToLoad !== state.maxPage-1
    ) {
      fetchData(resource, state.pageToLoad);
    }

    if (resource !== state.currentResource) {
      dispatch({
        type: "RESET",
        payload: {
          data: [],
          pageToLoad: 1,
          fetching: true,
          currentResource: resource,
          // maxPage: getMaxPages(resource),
        },
      });
    }

  }, [resource, state.fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      console.log("scroll");
      dispatch({ type: "SET_FETCHING" });
    }
  };

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
      {state.fetching ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : null}
    </div>
  );
};

export default Content;
