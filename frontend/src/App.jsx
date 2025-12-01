import { Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider"

import BudgetPage from "./pages/BudgetPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignUpPage";
import Transaction from "./pages/TransactionPage";

import AddTransaction from "./pages/AddTransaction"
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import AddBudget from "./pages/AddBudget";
import Verification from "./pages/Verification";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import PublicRoutes from "./utils/PublicRoutes";

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
            <Loading />
          </div>
        }
      >
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route path="/verify-otp" element={<Verification />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/add-transaction" element={<AddTransaction />} />
            <Route path="/add-budget" element={<AddBudget />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </BrowserRouter>
);

export default App;