const mongoose = require("mongoose");
const IncomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: { type: String },
    source: { type: String, required: true }, //Example: salary, business, etc.
    amount: { type: Number, required: true }, //Example: 1000, 2000, etc.
    date: { type: Date, default: Date.now }, //Example: 2023-10-01, 2023-10-02, etc.
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", IncomeSchema);
