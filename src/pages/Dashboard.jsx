import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#34d399', '#f87171', '#60a5fa', '#fbbf24', '#a78bfa', '#f472b6', '#38bdf8', '#facc15', '#4ade80', '#f472b6', '#818cf8'];

const Dashboard = ({ transactions }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0'));

  // Calculate financial summary
  const financialSummary = useMemo(() => {
    const currentMonthTransactions = transactions.filter(transaction => 
      transaction.date.startsWith(selectedMonth)
    );

    const income = currentMonthTransactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = currentMonthTransactions
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    // Category breakdown
    const categoryBreakdown = {};
    currentMonthTransactions.forEach(transaction => {
      if (!categoryBreakdown[transaction.category]) {
        categoryBreakdown[transaction.category] = { income: 0, expense: 0 };
      }
      if (transaction.type === 'Income') {
        categoryBreakdown[transaction.category].income += transaction.amount;
      } else {
        categoryBreakdown[transaction.category].expense += transaction.amount;
      }
    });

    return { income, expenses, balance, categoryBreakdown, currentMonthTransactions };
  }, [transactions, selectedMonth]);

  // Get recent transactions (last 5)
  const recentTransactions = transactions.slice(0, 5);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Prepare data for bar chart
  const barData = [
    {
      name: 'This Month',
      Income: financialSummary.income,
      Expense: financialSummary.expenses,
    },
  ];

  // Prepare data for pie chart
  const pieData = Object.entries(financialSummary.categoryBreakdown).map(([category, amounts]) => ({
    name: category,
    value: amounts.expense + amounts.income,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="mt-4 sm:mt-0">
          <label htmlFor="month-select" className="block text-sm font-medium mb-1">
            Select Month:
          </label>
          <input
            type="month"
            id="month-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Account Balance */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Account Balance</h3>
          <p className="text-3xl font-bold">{formatCurrency(financialSummary.balance)}</p>
          <p className="text-blue-100 mt-2">
            {financialSummary.balance >= 0 ? '💰 Positive' : '⚠️ Negative'}
          </p>
        </div>

        {/* Monthly Income */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Monthly Income</h3>
          <p className="text-3xl font-bold">{formatCurrency(financialSummary.income)}</p>
          <p className="text-green-100 mt-2">📈 This month</p>
        </div>

        {/* Monthly Expenses */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Monthly Expenses</h3>
          <p className="text-3xl font-bold">{formatCurrency(financialSummary.expenses)}</p>
          <p className="text-red-100 mt-2">📉 This month</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart for Income & Expenses */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Monthly Income & Expenses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={formatCurrency} />
              <Legend />
              <Bar dataKey="Income" fill="#34d399" />
              <Bar dataKey="Expense" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart for Category Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={formatCurrency} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-4">No transactions for this month</p>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(transaction.date)} • {transaction.category}
                </p>
              </div>
              <div className={`text-right font-semibold ${
                transaction.type === 'Income' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {transaction.type === 'Income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
          {recentTransactions.length === 0 && (
            <p className="text-gray-500 text-center py-4">No transactions yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 