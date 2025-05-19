import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import Init from 'pages/Init/index';
import { Main } from 'pages/main/index';
import Chat from 'pages/chat/index';
import ChatRoom from 'pages/chat/ChatRoom';
import ChatGPT from 'pages/chat/ChatGpt';
import { NotFound } from 'pages/not-found';
import Login from 'pages/login/index';
import Signup from 'pages/signup';
import Profile from 'pages/profile';
import Review from 'pages/review';
import Result from 'pages/result';
import Expert from 'pages/expert';
import Contract from 'pages/contract';
import Past from 'pages/past';
import Loading from 'pages/contract/Loading';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Init /> },
      { path: '/main', element: <Main /> },
      { path: '/chat', element: <Chat /> },
      { path: '/chat/:roomId', element: <ChatRoom /> },
      { path: '/chatgpt', element: <ChatGPT /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/profile', element: <Profile /> },
      { path: '/result', element: <Result /> },
      { path: '/expert', element: <Expert /> },
      { path: '/contract', element: <Contract /> },
      { path: '/past', element: <Past /> },
      { path: '/review', element: <Review /> },
      { path: '/loading', element: <Loading /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
