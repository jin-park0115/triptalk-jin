import styled from 'styled-components';
import { TbMessageCircle } from 'react-icons/tb';

const KakaoLogin = () => {
  const REST_API_KEY = import.meta.env.VITE_REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REACT_APP_KAKAO_REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = link;
  };

  return (
    <Kakao onClick={handleKakaoLogin}>
      <TbMessageCircle />
    </Kakao>
  );
};

export default KakaoLogin;

const Kakao = styled.div`
  width: 50%;
  font-size: 22px;
  font-weight: 500;
  background-color: #fee500;
  border-radius: 10px;
  height: 60px;
  line-height: 60px;
  margin-bottom: 32px;
  cursor: pointer;
  border: none;
  &:focus {
    outline: none;
  }
  @media (max-width: 430px) {
    height: 40px;
    line-height: 40px;
    margin-bottom: 16px;
  }
`;
