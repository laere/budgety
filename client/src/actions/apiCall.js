const apiCall = (path, method, options) => {
  return method(path, options);
};

export default apiCall;
