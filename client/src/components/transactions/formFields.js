import generateId from "utils/generateId";

export default [
  {
    label: "Description",
    name: "description",
    type: "text",
    id: generateId(16)
  },
  {
    label: "Amount",
    name: "amount",
    type: "number",
    id: generateId(16)
  }
];
