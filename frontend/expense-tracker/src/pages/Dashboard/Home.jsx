import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect } from "react";
import InfoCard from "../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import NewUser from "../../components/Dashboard/NewUser.jsx";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);

      // Only redirect to login if it's an authentication error (401)
      if (error.response?.status === 401) {
        console.error("Authentication error - redirecting to login");
        navigate("/login");
      } else {
        // For other errors (like 404), just set an error state
        setError(
          `Failed to load dashboard: ${error.response?.status} ${
            error.response?.statusText || "Unknown error"
          }`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  // Updated logic to determine transaction status and dashboard visibility
  const getTransactionStatus = () => {
    if (!dashboardData) {
      return {
        hasIncome: false,
        hasExpense: false,
        shouldShowDashboard: false,
        transactionCount: 0,
        incomeCount: 0,
        expenseCount: 0,
      };
    }

    // Check for income transactions
    const incomeTransactions =
      dashboardData.last60DaysIncomeTransactions?.transactions || [];
    const hasIncomeTransactions = incomeTransactions.length > 0;
    const hasIncomeAmount =
      dashboardData.totalIncome && dashboardData.totalIncome > 0;
    const hasIncome = hasIncomeTransactions || hasIncomeAmount;

    // Check for expense transactions
    const expenseTransactions =
      dashboardData.last30DaysExpenseTransactions?.transactions || [];
    const hasExpenseTransactions = expenseTransactions.length > 0;
    const hasExpenseAmount =
      dashboardData.totalExpense && dashboardData.totalExpense > 0;
    const hasExpense = hasExpenseTransactions || hasExpenseAmount;

    // Check recent transactions
    const recentTransactions = dashboardData.recentTransaction || [];
    const hasRecentTransactions = recentTransactions.length > 0;

    // Calculate total transaction count for better decision making
    const totalTransactionCount =
      incomeTransactions.length +
      expenseTransactions.length +
      recentTransactions.length;

    // Updated condition: Show dashboard if user has 1+ income AND 2+ expenses
    const shouldShowDashboard = hasIncome && expenseTransactions.length >= 2;

    return {
      hasIncome,
      hasExpense,
      shouldShowDashboard,
      transactionCount: totalTransactionCount,
      incomeCount: incomeTransactions.length,
      expenseCount: expenseTransactions.length,
    };
  };

  // Show loading state
  if (loading) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Get transaction status
  const transactionStatus = getTransactionStatus();

  // Show welcome screen for new users or users with insufficient data
  if (!loading && dashboardData && !transactionStatus.shouldShowDashboard) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <NewUser
          hasIncome={transactionStatus.hasIncome}
          hasExpense={transactionStatus.hasExpense}
          transactionCount={transactionStatus.transactionCount}
          incomeCount={transactionStatus.incomeCount}
          expenseCount={transactionStatus.expenseCount}
        />
      </DashboardLayout>
    );
  }

  // Show regular dashboard for users with sufficient transaction data
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransaction}
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransactions
            transactions={
              dashboardData?.last30DaysExpenseTransactions?.transactions || []
            }
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={
              dashboardData?.last30DaysExpenseTransactions?.transactions || []
            }
          />

          <RecentIncomeWithChart
            data={
              dashboardData?.last60DaysIncomeTransactions?.transactions?.slice(
                0,
                4
              ) || []
            }
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={
              dashboardData?.last60DaysIncomeTransactions?.transactions || []
            }
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
