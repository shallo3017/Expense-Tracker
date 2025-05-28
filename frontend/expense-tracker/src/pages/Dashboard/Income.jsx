import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import { data } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  //Getting income data
  const fetchIncomeData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      // Simulating an API call to fetch income data
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      console.log("Income data fetched successfully:", response.data);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again", error);
    } finally {
      setLoading(false);
    }

    //handle add income
    const handleAddIncome = async (income) => {};
    //Delete income
    const handleDeleteIncome = async (incomeId) => {};
    //handle download income
    const handleDownloadIncomeDetails = async () => {
      // Logic to download income data
      console.log("Downloading income data...");
    };
    useEffect(() => {
      fetchIncomeData();
    }, []);
  };
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Income;
