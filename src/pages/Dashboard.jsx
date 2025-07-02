import { useState, useMemo } from 'react';

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

    return { income, expenses, balance, categoryBreakdown };
  }, [transactions, selectedMonth]);

  // Get recent transactions (last 5)
  const recentTransactions = transactions.slice(0, 5);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
            {financialSummary.balance >= 0 ? ' Positive' : ' Negative'}
          </p>
        </div>

        {/* Monthly Income */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Monthly Income</h3>
          <p className="text-3xl font-bold">{formatCurrency(financialSummary.income)}</p>
          <p className="text-green-100 mt-2"> This month</p>
        </div>

        {/* Monthly Expenses */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Monthly Expenses</h3>
          <p className="text-3xl font-bold">{formatCurrency(financialSummary.expenses)}</p>
          <p className="text-red-100 mt-2"> This month</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(financialSummary.categoryBreakdown).map(([category, amounts]) => (
              <div key={category} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-medium">{category}</span>
                <div className="text-right">
                  <div className="text-green-600 dark:text-green-400">
                    +{formatCurrency(amounts.income)}
                  </div>
                  <div className="text-red-600 dark:text-red-400">
                    -{formatCurrency(amounts.expense)}
                  </div>
                </div>
              </div>
            ))}
            {Object.keys(financialSummary.categoryBreakdown).length === 0 && (
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
    </div>
  );
};

export default Dashboard; 