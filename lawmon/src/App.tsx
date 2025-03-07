import { Routes, Route, Link } from 'react-router-dom';
import Main from './pages/Main';
import Chat from './pages/Chat';
import Init from './pages/Init/index';
// import Default from './pages/not-found';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Init />} />
        <Route path="/about" element={<Chat />} />
        {/* <Route path="*" element={<Default />} /> */}
      </Routes>

    </div>
  );
}

export default App;