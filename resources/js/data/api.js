const apiUrl = "http://localhost/api";

export const commentDataService = {
  fetchComments: function() {
    return fetch(`${apiUrl}/comments`).then((response) => response.json());
  },
  createComment: function(comment) {
    return fetch(`${apiUrl}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(comment),
    }).then((response) => response.json());
  },
  deleteComment: function(id) {
    return fetch(`${apiUrl}/comments/${id}`, {
      method: "DELETE",
    }).then((response) => response.json());
  },
};
