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
import "./MobileContent.css";
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
import Button from "../UI/Button/Button.jsx";
import { width } from "../../utils/checkMobile";

function getValidTitle (title) {
  
}

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

function tableRowCreator(data, dispatch, isOpen) {
  return data.map((item, id) => {
    return (
      <tr
        className='valid-row'
        onClick={() => {
          if (!isOpen) dispatch(showComments(item.id));
        }}
        key={id}
      >
        <td>{item.title}</td>
      </tr>
    );
  });
}

const MobileContent = () => {
  const { resource } = useContext(ResourceContext);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortTimeType, setSortTimeType] = useState("new");
  const [isSorted, setIsSorted] = useState(false);
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
    setIsSorted(false)
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
            <th>Title ({isSorted ? sortTimeType : "no filters"})</th>
          </tr>
        </thead>
        <tbody>
          {tableRowCreator(state.data, dispatch, state.comments.isOpen)}
        </tbody>
      </table>
      {fetching && (
        <div className="loader-wrapper">
          <Loader />
        </div>
      )}
      {/* {state.comments.isOpen ? (
        <CommentsPanel dispatch={dispatch} id={state.comments.id} />
      ) : null} */}
      <div className="sort-button">
        <Button
          onClick={() => {
            setIsSorted(true);
            if (sortTimeType === "new") {
              dispatch(sortByTime("latest"));
              setSortTimeType("latest");
            } else {
              dispatch(sortByTime("new"));
              setSortTimeType("new");
            }
          }}
          isMobile={true}
          type="success"
        >
          {isSorted ? sortTimeType : "no filters"}
        </Button>
      </div>
    </div>
  );
};

export default MobileContent;
