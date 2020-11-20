export const fetchdataV = () => {
  return fetch("http://127.0.0.1:5000/blogs").then((response) =>
    response.json()
  );
};

export const fetchdataVD = (id) => {
  return fetch(`http://127.0.0.1:5000/deleteblog/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
};

export function fetchdataS(id) {
  return fetch(`http://127.0.0.1:5000/singleblog/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}
