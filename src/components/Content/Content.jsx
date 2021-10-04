import React, {
  useEffect,
  useContext,
  useState,
  useReducer,
  useCallback,
} from "react";
import { API } from "../../API";
import ResourceContext from "../../context.js";
import Loader from "../UI/Loader/index.jsx";
import "./Content.css";
import {
  reducer,
  setData,
  reset,
  init,
  sortByTime,
  sortByTitle,
  sortByDomain,
  showComments,
} from "./reducer.js";
import useScroll from "../../hooks/use-scroll.js";
import CommentsPanel from "../CommentsPanel/CommentsPanel.jsx";

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

function tableRowCreator(data, dispatch) {
  return data.map((item, id) => {
    return (
      <tr onClick={() => dispatch(showComments(item.id))} key={id}>
        <td>{item.time_ago}</td>
        <td>{item.title}</td>
        <td>{item.domain}</td>
      </tr>
    );
  });
}

const Content = () => {
  const { resource } = useContext(ResourceContext);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortTimeType, setSortTimeType] = useState("new");
  const [sortTitleType, setSortTitleType] = useState("new");
  const [sortDomainType, setSortDomainType] = useState("new");
  const [state, dispatch] = useReducer(
    reducer,
    {
      data: [],
      currentResource: resource,
      maxPage: getMaxPages(resource),
      comments: {
        id: null,
        isOpen: false,
      },
    },
    init
  );
  const WINDOW_HEIGHT = window.innerHeight;

  useEffect(() => {
    dispatch(
      reset({
        data: [],
        currentResource: resource,
        maxPage: getMaxPages(resource),
        comments: {
          id: null,
          isOpen: false,
        },
      })
    );
    setCurrentPage(1);
    setSortTimeType("new");
    setSortTitleType("new");
    setSortDomainType("new");
    setFetching(true);
  }, [resource]);

  async function fetchData(resource, currentPage) {
    try {
      const response = await API.get(resource, currentPage);
      dispatch(setData(response));
      setCurrentPage((prev) => ++prev);
    } catch (e) {
      throw e;
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    if (fetching) {
      fetchData(resource, currentPage);
    }
  }, [fetching]);

  const scrollHandler = useCallback(
    (e) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + WINDOW_HEIGHT) <
          100 &&
        currentPage <= state.maxPage
      ) {
        setFetching(true);
      }
    },
    [currentPage]
  );

  useScroll(scrollHandler);

  return (
    <div className="content">
      <table className="content-table">
        <thead>
          <tr>
            <th
              onClick={() => {
                dispatch(sortByTime(sortTimeType));
                if (sortTimeType === "new") {
                  setSortTimeType("latest");
                } else {
                  setSortTimeType("new");
                }
              }}
            >
              Time
            </th>
            <th
              onClick={() => {
                dispatch(sortByTitle(sortTitleType));
                if (sortTitleType === "new") {
                  setSortTitleType("latest");
                } else {
                  setSortTitleType("new");
                }
              }}
            >
              Title
            </th>
            <th
              onClick={() => {
                dispatch(sortByDomain(sortDomainType));
                if (sortDomainType === "new") {
                  setSortDomainType("latest");
                } else {
                  setSortDomainType("new");
                }
              }}
            >
              Domain
            </th>
          </tr>
        </thead>
        <tbody>{tableRowCreator(state.data, dispatch)}</tbody>
      </table>
      {fetching && (
        <div className="loader-wrapper">
          <Loader />
        </div>
      )}
      {state.comments.isOpen ? <CommentsPanel dispatch={dispatch} id={state.comments.id}/> : null}
    </div>
  );
};

export default Content;
