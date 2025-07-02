import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            💰 Finance Dashboard
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/')
                  ? `${darkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-blue-700'}`
                  : `${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/transactions')
                  ? `${darkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-blue-700'}`
                  : `${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
              }`}
            >
              Transactions
            </Link>
            <Link
              to="/add-transaction"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/add-transaction')
                  ? `${darkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-blue-700'}`
                  : `${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
              }`}
            >
              Add Transaction
            </Link>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors ${
              darkMode 
                ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/')
                  ? `${darkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-blue-700'}`
                  : `${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/transactions')
                  ? `${darkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-blue-700'}`
                  : `${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
              }`}
            >
              Transactions
            </Link>
            <Link
              to="/add-transaction"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/add-transaction')
                  ? `${darkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-blue-700'}`
                  : `${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
              }`}
            >
              Add Transaction
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 