// const xlsx = require("xlsx");
const User = require("../models/User");
const Income = require("../models/Income");
const fs = require("fs");
const ExcelJS = require("exceljs");

//Add income source
exports.addIncome = async (req, res) => {
  const userId = req.user._id;
  try {
    const { icon, source, amount, date } = req.body;

    // validation: check for missing fields
    if (!source || !amount || !date) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });
    await newIncome.save();
    res.status(201).json({
      success: true,
      message: "Income source added successfully",
      data: newIncome,
    });
  } catch (error) {
    console.error("Error adding income source:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//get all income source
exports.getAllIncome = async (req, res) => {
  const userId = req.user._id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    console.error("Error fetching income sources:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//delete income source
exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.findByIdAndDelete(id);

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income source not found",
      });
    }
    res.json({
      success: true,
      message: "Income source deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting income source:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//download income source in excel format
// exports.downloadIncomeExcel = async (req, res) => {
//   const userId = req.user._id;
//   try {
//     const income = await Income.find({ userId }).sort({ date: -1 });

//     //prepare data for excel
//     const data = income.map((item) => ({
//       Source: item.source,
//       Amount: item.amount,
//       Date: item.date.toISOString().split("T")[0],
//     }));

//     const wb = xlsx.utils.book_new();
//     const ws = xlsx.utils.json_to_sheet(data);
//     xlsx.utils.book_append_sheet(wb, ws, "Income Data");
//     xlsx.writeFile(wb, "income.xlsx");
//     res.download("income.xlsx", (err) => {
//       if (err) {
//         console.error("Error downloading file:", err);
//         res.status(500).json({
//           success: false,
//           message: "Error downloading file",
//         });
//       } else {
//         // Optionally, delete the file after download
//         fs.unlinkSync("income.xlsx");
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user._id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Income Data");

    // Add headers
    worksheet.columns = [
      { header: "Source", key: "source", width: 20 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Date", key: "date", width: 15 },
    ];

    // Add style to headers
    worksheet.getRow(1).font = { bold: true };

    // Add data
    income.forEach((item) => {
      worksheet.addRow({
        source: item.source,
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
      "attachment; filename=income_details.xlsx"
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
