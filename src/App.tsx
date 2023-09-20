import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Main from './page/Main/Main';
import MainLayout from './component/MainLayout';
import LoginContainer from './page/LoginPage/LoginContainer';
import EditMyInfo from './page/myPage/EditInfo/EditMyInfo';
import MyInfo from './page/myPage/MyInfo';
import SignupForm from './page/LoginPage/SignupForm';
import LookMap from './page/reviewMap/LookMap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Header,Footer 보여주고 싶은 컴포넌트 */}
        <Route element={<MainLayout />}>
          <Route path="/main" element={<Main />} />
          <Route path="/myinfo" element={<MyInfo />} />
          <Route path="/lookmap" element={<LookMap />} />
        </Route>
        {/* Header,Footer을 안 보여주고 싶은 컴포넌트 */}
        <Route path="/editmyinfo" element={<EditMyInfo />} />
        <Route path="/" element={<LoginContainer />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
