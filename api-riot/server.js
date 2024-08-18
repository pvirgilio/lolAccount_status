const express = require("express");
const { setupMiddlewares } = require("./middlewares");
const port = process.env.PORT || 4000;
const app = express();
const router = require("./routes");

setupMiddlewares(app);

app.use(router);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
