import { LoginPage, RegistrationPage } from './pages';
import { Route, Routes } from 'react-router';
import { RoutePaths } from './constants/commonConstants';
import { DepartmentsPage } from './pages';
import { NoPermission } from './pages';
import { AdminPage } from './pages/admin/AdminPage';
import './styles/globalStyles.scss'

function App() {
  return (
    <Routes>
      <Route path={RoutePaths.Login} element={<LoginPage/>} />
      <Route path={RoutePaths.Registration} element={<RegistrationPage/>} />
      <Route path={RoutePaths.Departments} element={<DepartmentsPage/>} />
      <Route path={RoutePaths.Admin} element={<AdminPage/>} />
      <Route path={RoutePaths.NoPermission} element={<NoPermission/>}/>
      <Route path='*' element={<NoPermission/>} />
    </Routes>
  );
}

export default App;