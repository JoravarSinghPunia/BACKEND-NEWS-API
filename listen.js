const app = require("./app");

const { PORT = 9090 } = process.env;

app.listen(9090, () => console.log(`Listening on 9090`));
