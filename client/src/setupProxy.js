const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/auth/google", { target: "http://localhost:4000" }));
  app.use(proxy("/api/budgets", { target: "http://localhost:4000" }));
  app.use(proxy("/api/budgets/delete/", { target: "http://localhost:4000" }));
  app.use(proxy("/api/budgets/edit/", { target: "http://localhost:4000" }));
  app.use(proxy("/api/checks", { target: "http://localhost:4000" }));
  app.use(proxy("/api/checks/new/", { target: "http://localhost:4000" }));
  app.use(proxy("/api/*", { target: "http://localhost:4000" }));
};
