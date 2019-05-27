const generateId = n => {
  let uuid = "";
  let random;

  for (let i = 0; i < n; i++) {
    random = Math.floor(Math.random() * 10);
    uuid += random;
  }

  return uuid;
};

export default generateId;
