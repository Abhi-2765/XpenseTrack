import { Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider"

import BudgetPage from "./pages/main/BudgetPage";
import Dashboard from "./pages/main/Dashboard";
import Login from "./pages/authentication/LoginPage";
import Signup from "./pages/authentication/SignUpPage";
import Transaction from "./pages/main/TransactionPage";
import AI from "./pages/main/AI";

import AddTransaction from "./pages/main/AddTransaction"
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import AddBudget from "./pages/main/AddBudget";
import Verification from "./pages/authentication/Verification";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import Footer from "./components/Footer";
import PageNotFound from "./pages/utils/PageNotFound";
import Profile from "./pages/main/Profile";
import ComingSoon from "./pages/utils/ComingSoon";
import Home from "./pages/Home";

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
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route path="/verify-otp" element={<Verification />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/groups" element={<ComingSoon pageName="Groups" />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/add-transaction" element={<AddTransaction />} />
            <Route path="/add-budget" element={<AddBudget />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>

      {!hideNavbar && <Footer />}
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