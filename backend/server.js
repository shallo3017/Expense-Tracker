// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const incomeRoutes = require("./routes/incomeRoutes");
// const expenseRoutes = require("./routes/expenseRoutes");
// const dashboardRoutes = require("./routes/dashboardRoutes");

// const app = express();

// //middleware to handle CORS
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(express.json());

// connectDB();
// const _dirname = path.resolve();

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/income", incomeRoutes);
// app.use("/api/v1/expense", expenseRoutes);
// app.use("/api/v1/dashboard", dashboardRoutes);

// //server uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const PORT = process.env.PORT || 5000;

// app.use(
//   express.static(path.join(_dirname, "frontend", "expense-tracker", "dist"))
// );
// app.get("*", (_, res) => {
//   res.sendFile(
//     path.resolve(_dirname, "frontend", "expense-tracker", "dist", "index.html")
//   );
// });
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require("express");
// const path = require("path");

// const app = express();
// const PORT = process.env.PORT || 5000;
// const _dirname = path.resolve();

// // Serve static files from frontend build folder
// app.use(
//   express.static(path.join(_dirname, "frontend", "expense-tracker", "dist"))
// );

// // Catch-all route to serve index.html for any route
// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(_dirname, "frontend", "expense-tracker", "dist", "index.html")
//   );
// });

// app.listen(PORT, () => {
//   console.log(`Static server running on port ${PORT}`);
// });
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const incomeRoutes = require("./routes/incomeRoutes");
// const expenseRoutes = require("./routes/expenseRoutes");
// const dashboardRoutes = require("./routes/dashboardRoutes");

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(express.json());

// // Connect to database
// connectDB();

// // API routes - must come before static files
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/income", incomeRoutes);
// app.use("/api/v1/expense", expenseRoutes);
// app.use("/api/v1/dashboard", dashboardRoutes);

// // Upload folder - must come before static files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Serve static files from React build
// app.use(
//   express.static(
//     path.join(__dirname, "..", "frontend", "expense-tracker", "dist")
//   )
// );

// // Catch-all route - must be last
// app.use((req, res) => {
//   res.sendFile(
//     path.join(
//       __dirname,
//       "..",
//       "frontend",
//       "expense-tracker",
//       "dist",
//       "index.html"
//     )
//   );
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Connect to database
connectDB();

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
