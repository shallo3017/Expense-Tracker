const Income = require("../models/Income");
const Expense = require("../models/Expense");

const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Total income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Total expense
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Income transactions in last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    // Expense transactions in last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    // Last 5 transactions (income and expense combined)
    const lastTransaction = [
      ...(
        await Income.find({ userId: userObjectId })
          .sort({ date: -1 })
          .limit(5)
          .lean()
      ).map((t) => ({ ...t, type: "income" })),
      ...(
        await Expense.find({ userId: userObjectId })
          .sort({ date: -1 })
          .limit(5)
          .lean()
      ).map((t) => ({ ...t, type: "expense" })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Final response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpenseTransactions: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncomeTransactions: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransaction: lastTransaction,
      success: true,
      message: "Dashboard data fetched successfully",
    });
  } catch (error) {
    console.error("Error in addExpense:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
