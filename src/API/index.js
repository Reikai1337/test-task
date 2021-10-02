const baseULR = "https://api.hnpwa.com/v0";
export const API = {
  get: (resource, page) => {
    return fetch(baseULR + resource + "/" + page + ".json").then(response=>resource);
  },
};
