import { Outlet } from 'react-router-dom';
import backgroundImage from '../../assets/로우몬기본bg.png';
import Spline from '@splinetool/react-spline';



export default function Layout() {
  return (
    <div
      className="flex items-center justify-center fixed inset-0 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        width: '100%',
        height: '100%',
        maxWidth: '1920px',
        maxHeight: '1080px',
        minWidth: '700px',
      }}
    >
      <div className="absolute inset-0 overflow-auto flex items-center justify-center">
        <main className="relative z-10 w-full h-full flex items-center justify-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
