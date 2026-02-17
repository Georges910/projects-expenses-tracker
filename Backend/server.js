const express = require("express");
const cors = require("cors");

const projectRoutes = require("./routes/projects");
const expenseRoutes = require("./routes/expenses");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/projects", projectRoutes);
app.use("/expenses", expenseRoutes);

app.listen(4000, () => console.log("Server running on port 4000"));
