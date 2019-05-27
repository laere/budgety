import generateId from "utils/generateId";

export default [
  {
    label: "Budget Title",
    name: "title",
    type: "text",
    id: generateId(16)
  },
  {
    label: "Budget Description",
    name: "description",
    type: "textarea",
    style: "textarea",
    id: generateId(16)
  }
];
