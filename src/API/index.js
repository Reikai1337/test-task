const baseULR = "https://api.hnpwa.com/v0/";
export const API = {
  get: (resource, page = 1) => {
    console.log(baseULR + resource + "/" + page + ".json");
    return fetch(baseULR + resource + "/" + page + ".json").then((res) =>
      res.json().then((data) => data)
    );
  },
};
