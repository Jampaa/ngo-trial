import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load transactions from localStorage on component mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      // Initialize with mock data if no saved transactions
      const mockTransactions = [
        {
          id: 1,
          date: "2025-01-20",
          description: "Grocery Shopping",
          amount: 1500,
          category: "Food",
          type: "Expense"
        },
        {
          id: 2,
          date: "2025-01-19",
          description: "Salary",
          amount: 20000,
          category: "Income",
          type: "Income"
        },
        {
          id: 3,
          date: "2025-01-18",
          description: "Gas Station",
          amount: 800,
          category: "Transportation",
          type: "Expense"
        },
        {
          id: 4,
          date: "2025-01-17",
          description: "Freelance Project",
          amount: 5000,
          category: "Income",
          type: "Income"
        },
        {
          id: 5,
          date: "2025-01-16",
          description: "Restaurant",
          amount: 1200,
          category: "Food",
          type: "Expense"
        },
        {
          id: 6,
          date: "2025-01-15",
          description: "Movie Tickets",
          amount: 600,
          category: "Entertainment",
          type: "Expense"
        },
        {
          id: 7,
          date: "2025-01-14",
          description: "Online Course",
          amount: 2000,
          category: "Education",
          type: "Expense"
        },
        {
          id: 8,
          date: "2025-01-13",
          description: "Part-time Job",
          amount: 3000,
          category: "Income",
          type: "Income"
        },
        {
          id: 9,
          date: "2025-01-12",
          description: "Coffee Shop",
          amount: 400,
          category: "Food",
          type: "Expense"
        },
        {
          id: 10,
          date: "2025-01-11",
          description: "Gym Membership",
          amount: 1500,
          category: "Health",
          type: "Expense"
        }
      ];
      setTransactions(mockTransactions);
      localStorage.setItem('transactions', JSON.stringify(mockTransactions));
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Add new transaction
  const addTransaction = (newTransaction) => {
    const transaction = {
      ...newTransaction,
      id: Date.now() // Simple ID generation
    };
    setTransactions([transaction, ...transactions]);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard transactions={transactions} />} />
            <Route path="/transactions" element={<Transactions transactions={transactions} />} />
            <Route path="/add-transaction" element={<AddTransaction onAddTransaction={addTransaction} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
