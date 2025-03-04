import { createBrowserRouter } from 'react-router-dom';
import App from '../../App'; // 기존 App 컴포넌트 경로로 수정
import Main from '../../pages/Main'; // 기존 Main 컴포넌트 경로로 수정
import Chat from '../../pages/Chat'; // 기존 Chat 컴포넌트 경로로 수정
import Default from '../../pages/Default'; // 기존 Default 컴포넌트 경로로 수정

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Default />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'about',
        element: <Chat />,
      },
    ],
  },
]);