import './App.css';
import {Routes, Route } from 'react-router-dom';
import EmployeeListPage from './page/EmployeeListPage/EmployeeListPage';
import Register from './page/Register/Register';
import Login from './page/Login/Login';
import CreateNewEmployee from './page/CreateNewEmployee/CreateNewEmployee';
import PersonalProfile from './page/PersonalProfile/PersonalProfile';
import PersonalProfileEdit from './page/PersonalProfileEdit/PersonalProfileEdit';
import PersonalProfileLeave from './page/PersonalProfileLeave/PersonalProfileLeave';
import EmployeeLeaveListPage from './page/EmployeeLeaveListPage/EmployeeLeaveListPage';
import CreateNewLeaveRecord from './page/CreateNewLeaveRecord/CreateNewLeaveRecord';
import DashboardPage from './page/DashboardPage/DashboardPage';
import PayrollGroupPage from './page/PayrollGroupPage/PayrollGroupPage';
import PayrollCalPage from './page/PayrollCalPage/PayrollCalPage';
import PayrollDetailPage from './page/PayrollDetailPage/PayrollDetailPage';


function App() {
  return (
    <div className="app">
       <Routes>
          <Route path='/' element={<EmployeeListPage />} />
          <Route path='/list' element={<EmployeeListPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/createNewEmployee' element={<CreateNewEmployee />} />
          <Route path='/employee/profile/:id' element={<PersonalProfile />} />
          <Route path='/employee/profile/:id/leave' element={<PersonalProfileLeave />} />
          <Route path='/employee/profile/edit/:id' element={<PersonalProfileEdit />} />
          <Route path='/leave/list' element={< EmployeeLeaveListPage/>} />
          <Route path='/employee/leave/:id/newRecord' element={<CreateNewLeaveRecord />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/payroll' element={<PayrollGroupPage/>} />
          <Route path='/payroll/cal/:id' element={<PayrollCalPage />} />
          <Route path='/payroll/detail/:id' element={<PayrollDetailPage/>} />
       </Routes>
    </div>
  );
}

export default App;
