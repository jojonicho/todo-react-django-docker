import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { theme } from "../utils/theme";
import { css, Global, ThemeProvider } from "@emotion/react";
import "typeface-overpass";
import { Home } from "../pages";
import styled from "@emotion/styled";

export const Routes: React.FC = () => {
  const Wrapper = styled.div`
    margin: 15px 20vw;
    @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
      margin: 10px;
    }
    transition: ${({ theme }) => theme.transitions.boom.transition};
    color: ${({ theme }) => theme.colors.white.base};
    font-weight: bold;
    overflow: hidden;
  `;
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          *,
          *:before,
          *:after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          html {
            text-rendering: optimizeLegibility;
            overflow-x: hidden;
            -ms-overflow-style: scrollbar;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          body {
            display: flex;
            flex-direction: column;
            background: ${theme.colors.white.background};
            font-family: ${theme.fontFamily.body};
            background-color: #8ec5fc;
            background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
          }
          h1 {
            font-family: ${theme.fontFamily.heading};
          }
        `}
      />
      <BrowserRouter>
        <Wrapper>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Wrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
};
