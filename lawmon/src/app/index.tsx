import { Routes, Route } from 'react-router-dom';
import { Main } from '../pages/main/index'
import { Chat } from '../pages/chat/ChattingComponent'
import { NotFound } from 'pages/not-found';

export function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}