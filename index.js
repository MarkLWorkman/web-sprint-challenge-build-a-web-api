require("dotenv").config();

const server = require("./api/server");

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
