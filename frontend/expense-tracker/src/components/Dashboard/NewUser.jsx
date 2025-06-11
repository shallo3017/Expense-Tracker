import React from "react";
import {
  LuTrendingUp,
  LuTrendingDown,
  LuPlus,
  LuCheck,
  LuTarget,
  LuActivity,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const NewUser = ({
  hasIncome = false,
  hasExpense = false,
  transactionCount = 0,
  incomeCount = 0,
  expenseCount = 0,
}) => {
  const navigate = useNavigate();

  const handleAddIncome = () => {
    navigate("/income");
  };

  const handleAddExpense = () => {
    navigate("/expense");
  };

  // Calculate progress percentage (out of 100%)
  const calculateProgress = () => {
    let progress = 0;
    const milestones = [
      { condition: hasIncome, points: 50 },
      { condition: hasExpense, points: 50 },
    ];

    milestones.forEach((milestone) => {
      if (milestone.condition) {
        progress += milestone.points;
      }
    });

    return Math.min(progress, 100);
  };

  const progressPercentage = calculateProgress();

  // Determine welcome message based on what user has
  const getWelcomeMessage = () => {
    if (hasIncome && expenseCount >= 2) {
      return {
        title: "You're All Set! 🎉",
        subtitle:
          "Perfect! You have income and multiple expenses recorded. Your dashboard is ready with full insights and analytics.",
      };
    } else if (hasIncome && hasExpense) {
      return {
        title: "Great Progress! 💰",
        subtitle:
          "You have income and expenses recorded. Add one more expense to unlock your complete dashboard experience.",
      };
    } else if (hasIncome && !hasExpense) {
      return {
        title: "Income Added! 💰",
        subtitle:
          "Great start! Now add at least 2 expenses to get a complete picture of your financial situation.",
      };
    } else if (!hasIncome && hasExpense) {
      return {
        title: "Expenses Tracked! 📊",
        subtitle:
          "Good job tracking expenses! Now add your income source to see your complete financial overview.",
      };
    } else {
      return {
        title: "Welcome to Expenso! 👋",
        subtitle:
          "Start your financial journey by adding your first transaction. Track your income and expenses to get insights into your spending habits.",
      };
    }
  };

  const welcomeMessage = getWelcomeMessage();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative">
      {/* Background Logo Cover */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="/logo-bg.jpeg"
          alt="Expenso Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Welcome Message */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {welcomeMessage.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {welcomeMessage.subtitle}
        </p>
      </div>

      {/* Progress Bar Section */}
      <div className="w-full max-w-2xl mb-8 relative z-10">
        <div className="cards">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Setup Progress
            </h3>
            <span className="text-sm font-medium text-gray-600">
              {progressPercentage}% Complete
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Progress Milestones */}
          <div className="space-y-3">
            <div
              className={`flex items-center space-x-3 ${
                hasIncome ? "text-green-600" : "text-gray-500"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  hasIncome ? "bg-green-500 text-white" : "bg-gray-300"
                }`}
              >
                {hasIncome ? <LuCheck className="w-3 h-3" /> : "1"}
              </div>
              <span className={`text-sm ${hasIncome ? "font-medium" : ""}`}>
                Add your income source {hasIncome && `✓ Completed`}
              </span>
            </div>

            <div
              className={`flex items-center space-x-3 ${
                expenseCount >= 2 ? "text-green-600" : "text-gray-500"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  expenseCount >= 2 ? "bg-green-500 text-white" : "bg-gray-300"
                }`}
              >
                {expenseCount >= 2 ? <LuCheck className="w-3 h-3" /> : "2"}
              </div>
              <span
                className={`text-sm ${expenseCount >= 2 ? "font-medium" : ""}`}
              >
                Add 2 expense sources ({expenseCount}/2 added)
              </span>
            </div>
          </div>

          {progressPercentage >= 100 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <LuTarget className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  🎉 Congratulations! You're ready for the full dashboard
                  experience!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto w-full mb-8 relative z-10">
        {/* Add Income Card */}
        <div
          onClick={handleAddIncome}
          className={`cards cursor-pointer transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl ${
            hasIncome
              ? "border-2 border-green-200 bg-green-50"
              : "hover:border-green-200"
          }`}
        >
          <div className="p-8 text-center">
            <div className="relative inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <LuTrendingUp className="w-8 h-8 text-green-600" />
              {hasIncome && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <LuCheck className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {hasIncome ? "Add More Income" : "Add Income"}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {hasIncome
                ? incomeCount > 0
                  ? `Add more income sources to track all your earnings (${incomeCount} added)`
                  : "Add more income sources to track all your earnings"
                : "Record your salary, freelance work, investments, or any money coming in"}
            </p>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
              <LuPlus className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Add Expense Card */}
        <div
          onClick={handleAddExpense}
          className={`cards cursor-pointer transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl ${
            hasExpense
              ? "border-2 border-red-200 bg-red-50"
              : "hover:border-red-200"
          }`}
        >
          <div className="p-8 text-center">
            <div className="relative inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <LuTrendingDown className="w-8 h-8 text-red-600" />
              {hasExpense && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <LuCheck className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {expenseCount >= 2
                ? "Expenses Complete!"
                : hasExpense
                ? "Add One More Expense"
                : "Add Expenses"}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {expenseCount >= 2
                ? `Perfect! You've added ${expenseCount} expense sources`
                : hasExpense
                ? expenseCount > 0
                  ? `Add one more expense to unlock your complete dashboard (${expenseCount}/2 added)`
                  : "Add one more expense to unlock your complete dashboard"
                : "Track your spending on food, rent, entertainment, and other expenses (Need 2 sources)"}
            </p>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500 rounded-full">
              <LuPlus className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      {(hasIncome || hasExpense) && (
        <div className="cards max-w-4xl mx-auto w-full mb-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <LuActivity className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              What's Next?
            </h4>
            <p className="text-gray-600 mb-4">
              Keep adding transactions to unlock powerful features:
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-900 mb-1">
                  📊 Charts & Analytics
                </div>
                <div className="text-blue-700">
                  Visual insights into your spending patterns
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="font-medium text-purple-900 mb-1">
                  📈 Trends Analysis
                </div>
                <div className="text-purple-700">
                  Track your financial progress over time
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-medium text-green-900 mb-1">
                  🎯 Smart Insights
                </div>
                <div className="text-green-700">
                  Personalized recommendations for better saving
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Tips - Only show if no transactions have been added */}
      {!hasIncome && !hasExpense && (
        <div className="cards max-w-4xl mx-auto w-full relative z-10">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            💡 Quick Tips to Get Started
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Add Regular Income
              </h4>
              <p className="text-sm text-gray-600">
                Start with your salary or main income source
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Track Daily Expenses
              </h4>
              <p className="text-sm text-gray-600">
                Record your daily spending habits
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Review Insights
              </h4>
              <p className="text-sm text-gray-600">
                Get detailed reports and analytics
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewUser;
