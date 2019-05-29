import generateId from "utils/generateId";

export default [
  {
    label: "Budget Title",
    name: "title",
    id: generateId(16)
  },
  {
    label: "Budget Description",
    name: "description",
    type: "textarea",
    classStyleName: "textarea",
    id: generateId(16)
  }
];
