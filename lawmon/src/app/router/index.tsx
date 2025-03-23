import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import Init from 'pages/Init/index';
import { Main } from 'pages/main/index';
import Chat from 'pages/chat/index';
import { NotFound } from 'pages/not-found';
import Login from 'pages/login/index';
import Profile from 'pages/profile';
import Review from 'pages/review';
import Expert from 'pages/expert';
import Contract from 'pages/contract';
import Past from 'pages/past';

export const router = createBrowserRouter([
  {
    element: <Layout />, // 레이아웃 컴포넌트 적용
    children: [
      {
        path: '/',
        element: <Init />,
      },
      {
        path: '/main',
        element: <Main />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/review',
        element: <Review />,
      },
      {
        path: '/expert',
        element: <Expert />,
      },
      {
        path: '/contract',
        element: <Contract />,
      },
      {
        path: '/past',
        element: <Past />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
