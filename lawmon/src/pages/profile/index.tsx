import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import profileImage from '../../assets/윾건이형.png';

export default function Profile() {
  const navigate = useNavigate();

  useEffect(() => {
    // 3초 후 다음 페이지로 자동 이동
    const timer = setTimeout(() => {
      navigate('/'); // 이동할 다음 페이지 경로
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-screen  relative">
      {/* LAWMON 로고 - 왼쪽 상단에 고정 */}
      <div className="ml-[50px] " style={{
        color: '#3D4E84'
      }}>
        <h1 className="text-[36px] font-bold">LAWMON</h1>
      </div>

      {/* 프로필 컨텐츠 - 중앙에 배치 */}
      <div className="flex mt-[260px] justify-center h-full ">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden mb-6">
            <img
              src={profileImage}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
          </div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-xl font-medium text-[#3A4374] mt-[50px]"
          >
            현우진 전문가님 안녕하세요!
          </motion.h2>
        </motion.div>
      </div>
    </div>
  );
}
