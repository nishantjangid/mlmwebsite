import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Register from './Components/register/Register.js';
import AuthLayout from "./Layout/AuthLayout"
import Layout from "./Layout/Layout"
import StackManage from "./Components/StackManage"
import ProfilePage from "./Components/ProfilePage"

import Login from './Components/login/Login';
import { useEffect } from 'react';
import DirectMembers from './Users/DirectMembers';
import DashBoard from './Components/DashBoard';
import AllUsersNew from './Users/AllUsersNew';
import AllActiveUSers from './Users/AllActiveUSers';
import AllInActiveUsers from './Users/AllInActiveUsers';
import BlockUsers from './Users/BlockUsers';
import AllDeposite from './DepositsFunds/AllDeposite';
import MyDirectTeam from './Users/MyDirectTeam';
import TotalIncome from './IncomeReports/TotalIncome';
import LevelIncome from './IncomeReports/LevelIncome';
import SendRequest from './Withdraw-requests/SendRequest';
import WalletHistory from './Withdraw-requests/WalletIncome';
import ApprovedDeposite from './DepositsFunds/ApprovedDeposite';
import PendingDeposite from './DepositsFunds/PendingDeposite';
import RejectDeposite from './DepositsFunds/RejectDeposite';
import ROIIncome from './IncomeReports/ROIIncome';
import Investments from './Components/Investments/MyInvestments';
import MyInvestments from './Components/Investments/MyInvestments';
import InvestmentHistory from './Components/Investments/InvestmentHistory';
import AdminInvestment from './Components/Investments/AdminInvestment';
import FundsTransfer from './Funds/FundsTransfer';
import UserTransferHistory from './Funds/UserTransferHistory';
import AdminTransferFunds from './Funds/AdminTransferFunds';
import RewardIncome from './IncomeReports/RewardIncome';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Header from './Components/Header';


const App = () => {

const isAuthenticated = false;

  return (
    <Router>
      <Routes>  
      <Route exact path="/*" element={<Layout />}>
          {/* <Route path='' element={isAuthenticated ? <Header /> : <Navigate to="/login" replace />} /> */}
          <Route path='' element={<ProtectedRoute >  <DashBoard  /> </ProtectedRoute >} />
          <Route path='dashboard' element={<ProtectedRoute > <DashBoard  /> </ProtectedRoute >} />
          <Route path='AllUsers' element={<ProtectedRoute > <AllUsersNew /> </ProtectedRoute >} />
          <Route path='AllActiveUSers' element={<ProtectedRoute > <AllActiveUSers /> </ProtectedRoute >} />
          <Route path='AllInActiveUsers' element={<ProtectedRoute > <AllInActiveUsers /> </ProtectedRoute >} />
          <Route path='AllDeposite' element={<ProtectedRoute > <AllDeposite /> </ProtectedRoute >} />
          <Route path='ApprovedDeposite' element={<ProtectedRoute > <ApprovedDeposite /> </ProtectedRoute >} />
          <Route path='PendingDeposite' element={<ProtectedRoute > <PendingDeposite /> </ProtectedRoute >} />
          <Route path='RejectDeposite' element={<ProtectedRoute > <RejectDeposite /> </ProtectedRoute >} />
          <Route path='BlockUsers' element={<ProtectedRoute > <BlockUsers /> </ProtectedRoute >} />
          <Route path='MyDirectTeam' element={<ProtectedRoute > <MyDirectTeam /> </ProtectedRoute >} />
          <Route path='TotalIncome' element={<ProtectedRoute > <TotalIncome /> </ProtectedRoute >} />
          <Route path='ROIIncome' element={<ProtectedRoute > <ROIIncome /> </ProtectedRoute >} />
          <Route path='LevelIncome' element={<ProtectedRoute > <LevelIncome /> </ProtectedRoute >} />
          <Route path='RewardIncome' element={<ProtectedRoute > <RewardIncome /> </ProtectedRoute >} />
          <Route path='DirectMembers' element={<ProtectedRoute > <DirectMembers /> </ProtectedRoute >} />
          <Route path='SendRequest' element={<ProtectedRoute > <SendRequest /> </ProtectedRoute >} />
          <Route path='WalletHistory' element={<ProtectedRoute > <WalletHistory /> </ProtectedRoute >} />
          <Route path='StackManage' element={<ProtectedRoute > <StackManage /> </ProtectedRoute >} />
          <Route path='MyInvestments' element={<ProtectedRoute > <MyInvestments /> </ProtectedRoute >} />
          <Route path='InvestmentHistory' element={<ProtectedRoute > <InvestmentHistory /> </ProtectedRoute >} />
          <Route path='AdminInvestment' element={<ProtectedRoute > <AdminInvestment /> </ProtectedRoute >} />
          <Route path='FundsTransfer' element={<ProtectedRoute > <FundsTransfer /> </ProtectedRoute >} />
          <Route path='UserTransferHistory' element={<ProtectedRoute > <UserTransferHistory /> </ProtectedRoute >} />
          <Route path='AdminTransferFunds' element={<ProtectedRoute > <AdminTransferFunds /> </ProtectedRoute >} />
          <Route path='ProfilePage' element={<ProtectedRoute > <ProfilePage  /> </ProtectedRoute >} />
        </Route>      
          <Route exact path='register' element={<Register /> } />
          <Route exact path='login' element={ <Login />} />
              
      </Routes>
    </Router>
  );
}

export default App;
