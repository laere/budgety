export default [
  {
    label: "Budget Title",
    name: "title",
    type: "text",
    required: true,
    validationMsg: "You must provide a title!"
  },
  {
    label: "Budget Description",
    name: "description",
    type: "text",
    required: true,
    validationMsg: "You must provide a description!"
  },
  {
    label: "Budget Amount",
    name: "amount",
    type: "number",
    required: true,
    validationMsg: "You must provide an amount!"
  },
  {
    label: "Budget Start Date",
    name: "startDate",
    type: "date",
    required: true,
    validationMsg: "You must provide a start date!"
  },
  {
    label: "Budget End Date",
    name: "endDate",
    type: "date",
    required: true,
    validationMsg: "You must provide an end date!"
  }
];
