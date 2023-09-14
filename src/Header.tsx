import styled from 'styled-components';
import Search from './Search';
import { MAIN_COLOR } from './color/color';

export default function Header() {
  return (
    <GnbContainer>
      <Gnb>
        <Logo>
          <LogoImg src="/img/logo.png" alt="로고" />
        </Logo>
        <Avatar></Avatar>
      </Gnb>
      <Nav>
        <NavItem>홈</NavItem>
        <NavItem>여행지</NavItem>
        <NavItem>일정</NavItem>
        <NavItem>
          <Search />
        </NavItem>
      </Nav>
    </GnbContainer>
  );
}

const GnbContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  height: auto;
`;

const Gnb = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 55px 15px;
  border-bottom: 1px solid #c1c1c1;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  padding-right: 400px;
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 200px;
  height: auto;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  border-radius: 100%;
`;

const Nav = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #343434;
  padding: 15px 55px;
`;

const NavItem = styled.li`
  font-size: 23px;
  cursor: pointer;

  &:hover {
    color: ${MAIN_COLOR};
  }
`;
