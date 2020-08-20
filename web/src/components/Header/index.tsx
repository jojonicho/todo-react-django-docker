import React, { useContext, useState } from "react";
import {
  Container,
  RowContainer,
  Button,
  ColumnContainer,
  SubTitle,
} from "../../ui-kit";
import { UserContext } from "../../datastore/UserContext";

import styled from "@emotion/styled/";
import { Instagram } from "react-content-loader";

interface HeaderProps {
  logout: any;
}

const Nav = styled.nav`
  width: 100vw;
  backdrop-filter: blur(30px);
  padding: 10px;
  position: fixed;
  // background: white;
  z-index: 2;
  img {
    cursor: pointer;
    width: calc(0.5vw + 2rem);
    border-radius: ${({ theme }) => theme.borderRadius.default};
  }
  .modal {
    // background: black;
    min-width: calc(3vw + 60px);
    padding: 10px;
    position: absolute;
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(40px) contrast(0.8);
    // background: ${({ theme }) => theme.colors.background.dlight};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    background: ${({ theme }) => theme.colors.white};
    margin-top: -2px;
    box-shadow: ${({ theme }) => theme.shadow.mekari};
  }
`;

const Wrapper = styled.div`
  margin-top: 65px;
  transition: ${({ theme }) => theme.transitions.boom.transition};
  color: ${({ theme }) => theme.colors.white.base};
  font-weight: bold;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header: React.FC<HeaderProps> = ({ children, logout }) => {
  const { user } = useContext(UserContext);
  console.log(user!.picture);
  const [modal, setModal] = useState(false);
  return (
    <>
      <Nav>
        <RowContainer>
          <ColumnContainer>
            {!user! ? (
              <Instagram />
            ) : (
              <img
                onClick={() => setModal((v) => !v)}
                src={user!.picture}
                alt="google-profile"
              ></img>
            )}
          </ColumnContainer>
          <SubTitle>Dashboard</SubTitle>
        </RowContainer>
        {modal && (
          <div className="modal">
            <SubTitle>
              <a href={`/${user!.id}`}>{user!.given_name}</a>
            </SubTitle>
            <Button onClick={logout} color="RED">
              Logout
            </Button>
          </div>
        )}
      </Nav>
      <Wrapper>{children}</Wrapper>
    </>
  );
};
