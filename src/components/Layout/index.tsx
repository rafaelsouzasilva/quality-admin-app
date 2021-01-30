import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Menu as MenuIcon } from '@styled-icons/entypo/Menu';
import { useAuth } from '../../hooks/AuthContext';

import logo from '../../assets/img/logo.png';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

interface NavbarProps {
  visible: boolean;
}

const Navbar = styled.div<NavbarProps>`
  min-height: 100vh;
  height: 100%;
  width: 100%;
  max-width: 250px;
  background: #094684;
  overflow-y: scroll;

  ${props =>
    !props.visible &&
    css`
      visibility: hidden;
      flex: 0;
      width: 0px;
    `}

  ::-webkit-scrollbar {
    display: none;
  }
`;

interface ContentProps {
  visible: boolean;
}

const Content = styled.div<ContentProps>`
  width: calc(100% - 250px);
  height: 100%;
  display: flex;
  flex-direction: column;

  ${props =>
    !props.visible &&
    css`
      width: 100%;
    `}

  h2 {
    font-size: 2rem;
    margin: 0;
    margin-bottom: 5px;
    font-weight: 400;
    line-height: 1.2;
    color: #212529;
  }

  .create {
    background-color: transparent;
    color: #999;
    text-decoration: none;
  }

  table {
    width: 100%;
    max-width: 100%;
    margin: 1rem 0;
    background-color: transparent;
    border-collapse: collapse;
    text-align: left;
    border-spacing: 2px;
    border-color: grey;

    td,
    th {
      padding: 0.75rem;
      vertical-align: top;
      border-top: 1px solid #dee2e6;
    }

    th {
      font-weight: 600;
      border-bottom: 2px solid #dee2e6;
    }

    button {
      background: transparent;
      border: 0;
      font-size: 16px;
      outline: none;
      font-size: 12px;
      cursor: pointer;
      color: #999;

      :hover {
        color: #333;
      }
    }
  }
`;

const StatusBar = styled.div`
  position: relative;
  width: 90%;
  padding: 25px 10px;
  text-align: right;
  border: none;
  border-radius: 0;
  margin-bottom: 40px;
  font-size: 1rem;
  margin: 40px 4%;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;

const Logout = styled.button`
  background: transparent;
  border: 0;
  font-size: 1rem;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
  margin: 0 20px;

  :hover {
    color: rgba(0, 0, 0, 0.7);
  }
`;

const MenuButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgb(10, 70, 132);
  border: 0px;
  padding: 5px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  outline: none;
`;

const ContentChildren = styled.div`
  padding: 0 4%;
`;

const Logo = styled.img`
  background-color: #eee;
  width: 100%;
  padding: 15px 0px;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

interface NavbarItemProps {
  active?: boolean;
  disabled?: boolean;
}

const NavbarItem = styled.div<NavbarItemProps>`
  width: calc(100% - 20px);
  font-size: 18px;
  padding: 5px;
  padding-left: 15px;
  margin-top: 5px;
  color: #fff;
  cursor: pointer;

  :hover {
    background: #00bdf3;
    color: #094684;
  }

  ${props =>
    props.active &&
    css`
      background: #00bdf3;
      color: #094684;
    `}

  ${props =>
    props.disabled &&
    css`
      color: #999;

      :hover {
        background: #094684;
        color: #999;
        cursor: default;
      }
    `}
`;

interface NavbarSubItemsInterface {
  visible?: boolean;
}

const NavbarSubItems = styled.div<NavbarSubItemsInterface>`
  padding-left: 20px;
  display: none;

  ${props =>
    props.visible &&
    css`
      display: block;
    `}

  > div {
    font-size: 16px;
  }
`;

const Layout: React.FC = ({ children }) => {
  const [showMenu, setShowMenu] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const history = useHistory();

  const handleSelectNavbar = (clicked: string) => {
    setSelected(clicked === selected ? '' : clicked);
  };

  const link = (path: string) => {
    history.push(path);
  };

  const auth = useAuth();
  const logout = () => {
    auth.signOut();
    link('/login');
  }

  return (
    <Wrapper>
      <Navbar visible={showMenu}>
        <Logo
          src={logo}
          width="80%"
          alt="Gestão de Qualidade"
          onClick={() => link('/')}
        />
        <NavbarItem active onClick={() => link('/')}>
          Home
        </NavbarItem>

        <NavbarItem onClick={() => handleSelectNavbar('config')}>
          Processos
        </NavbarItem>
        <NavbarSubItems visible={selected === 'config'}>
          <NavbarItem disabled>Cadastrar</NavbarItem>
          <NavbarItem disabled>Listar</NavbarItem>
          <NavbarItem onClick={() => link('/qualityControl')}>Controle de Qualidade</NavbarItem>
          <NavbarItem onClick={() => link('/nonCompliance')}>Não conformidades</NavbarItem>
        </NavbarSubItems>

        <NavbarItem onClick={() => handleSelectNavbar('register')}>
          Cadastros
        </NavbarItem>
        <NavbarSubItems visible={selected === 'register'}>
          <NavbarItem disabled>Funcionário</NavbarItem>
          <NavbarItem disabled>Perfil</NavbarItem>
        </NavbarSubItems>
      </Navbar>
      <Content visible={showMenu}>
        <StatusBar>
          <MenuButton onClick={() => setShowMenu(!showMenu)}>
            <MenuIcon size={24} />
          </MenuButton>
          <span>Rafael</span>
          <Logout onClick={logout}>Sair</Logout>
        </StatusBar>
        <ContentChildren>{children}</ContentChildren>
      </Content>
    </Wrapper>
  );
};

export default Layout;
