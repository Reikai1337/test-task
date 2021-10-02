import React, { useEffect, useContext, useState, useReducer } from "react";
import { API } from "../../API";
import ResourceContext from "../../context";
import "./Content.css";

function init(state) {
  return { ...state };
}

function reducer(state, action) {
  switch (action.type) {
    case "RESET":
      return init(action.payload);
    case "SET_DATA":
      return {
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const Content = () => {
  const [data, dispatch] = useReducer(
    reducer,
    { data: [], loading: true },
    init
  );
  const [page, setPage] = useState(1);
  const { resource } = useContext(ResourceContext);
  useEffect(() => {
    async function fetchData(resource, page) {
      try {
        const response = await API.get(resource, page);
        // console.log(response);
        dispatch({ type: "SET_DATA", payload: response });
      } catch (e) {
        // console.log(e);
        throw e
      }
    }
    // fetchData(resource, page);
  }, [resource]);
  console.log(data);
  return (
    <div className="content">
      <table className='content-table'>
        <thead>
          <tr>
            <th>Time</th>
            <th>Title</th>
            <th>Domain</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>this is time</td>
            <td>this is title</td>
            <td>this is domain</td>
          </tr>
          <tr className="active-row">
            <td>this is time</td>
            <td>this is title</td>
            <td>this is domain</td>
          </tr>
          <tr>
            <td>this is time</td>
            <td>this is title</td>
            <td>this is domain</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Content;
