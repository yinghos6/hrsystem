import './App.css';
import {Routes, Route } from 'react-router-dom';
import EmployeeListPage from './page/EmployeeListPage/EmployeeListPage';
import Register from './page/Register/Register';
import Login from './page/Login/Login';
import CreateNewEmployee from './page/CreateNewEmployee/CreateNewEmployee';
import PersonalProfile from './page/PersonalProfile/PersonalProfile';
import PersonalProfileEdit from './page/PersonalProfileEdit/PersonalProfileEdit';


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
          <Route path='/employee/profile/edit/:id' element={<PersonalProfileEdit />} />




       </Routes>
    </div>
  );
}

export default App;
