// const xlsx = require("xlsx");
const ExcelJS = require("exceljs");
const Expense = require("../models/Expense");
const fs = require("fs");
const User = require("../models/User");

//Add Expense
exports.addExpense = async (req, res) => {
  const userId = req.user._id;
  try {
    const { icon, category, amount, date } = req.body;

    // validation: check for missing fields
    if (!category || !amount || !date) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });
    await newExpense.save();
    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: newExpense,
    });
  } catch (error) {
    console.error("Error adding Expense:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//get all expense
exports.getAllExpense = async (req, res) => {
  const userId = req.user._id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//delete expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    res.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Expense :", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//download expense list in excel format
// exports.downloadExpenseExcel = async (req, res) => {
//   const userId = req.user._id;
//   try {
//     const expense = await Expense.find({ userId }).sort({ date: -1 });

//     //prepare data for excel
//     const data = expense.map((item) => ({
//       Category: item.category,
//       Amount: item.amount,
//       Date: item.date.toISOString().split("T")[0],
//     }));

//     const wb = xlsx.utils.book_new();
//     const ws = xlsx.utils.json_to_sheet(data);
//     xlsx.utils.book_append_sheet(wb, ws, "Expense");
//     xlsx.writeFile(wb, "expense_details.xlsx");
//     res.download("expense_details.xlsx", (err) => {
//       if (err) {
//         console.error("Error downloading file:", err);
//         res.status(500).json({
//           success: false,
//           message: "Error downloading file",
//         });
//       } else {
//         // Optionally, delete the file after download
//         fs.unlinkSync("expense_details.xlsx");
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user._id;
  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Expense Data");

    // Add headers
    worksheet.columns = [
      { header: "Category", key: "category", width: 20 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Date", key: "date", width: 15 },
    ];

    // Add style to headers
    worksheet.getRow(1).font = { bold: true };

    // Add data
    expenses.forEach((item) => {
      worksheet.addRow({
        category: item.category,
        amount: item.amount,
        date: new Date(item.date).toISOString().split("T")[0],
      });
    });

    // Set response headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=expense_details.xlsx"
    );

    // Write to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error generating Excel file:", error);
    res.status(500).json({
      success: false,
      message: "Error generating Excel file",
    });
  }
};
