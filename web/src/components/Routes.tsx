import React, { useState, useCallback, useMemo, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { theme } from "../utils/theme";
import { css, Global, ThemeProvider } from "@emotion/react";
import "typeface-overpass";
import { Home } from "../pages";

import GoogleLogin from "react-google-login";
import { AUTH_TOKEN_STORAGE_KEY, API_URL, headers } from "../constants";
import { User } from "../utils/types";
import { UserContext } from "../datastore/UserContext";
import { Header } from "./Header";

import { Facebook } from "react-content-loader";

export const Routes: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY))
  );
  const refreshAuthStatus = useCallback(() => {
    setIsAuthenticated(Boolean(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)));
  }, []);

  const getUser = useCallback(async () => {
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    if (token) {
      try {
        const response = await fetch(`${API_URL}/todos/current-user`, {
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          }),
          method: "GET",
        });
        const json = await response.json();
        console.log(json);
        setUser(json);
      } catch (e) {
        console.log(e);
        refreshAuthStatus();
        setUser(null);
      }
    } else {
      refreshAuthStatus();
      setUser(null);
    }
  }, [refreshAuthStatus]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    setUser(null);
    refreshAuthStatus();
  }, [refreshAuthStatus]);

  const login = useCallback(
    async (token: any) => {
      try {
        const response = await fetch(`${API_URL}/rest-auth/google/`, {
          headers,
          method: "POST",
          body: JSON.stringify({ access_token: token.accessToken, code: "" }),
        });
        const authToken = await response.json();
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, authToken.key);
        refreshAuthStatus();
        getUser();
      } catch (e) {
        console.log(e);
        setUser(null);
      }
    },
    [refreshAuthStatus, getUser]
  );

  useEffect(() => {
    getUser();
  }, [refreshAuthStatus, getUser, isAuthenticated]);

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
          input {
            border: none;
          }
          button {
            cursor: pointer;
          }
          textarea:focus,
          button:focus,
          input:focus {
            outline: none;
          }
        `}
      />
      <BrowserRouter>
        {isAuthenticated ? (
          !user ? (
            <Facebook />
          ) : (
            <UserContext.Provider value={value}>
              <Header logout={logout}>
                <Switch>
                  <Route exact path="/" component={Home} />
                </Switch>
              </Header>
            </UserContext.Provider>
          )
        ) : (
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
            buttonText="Login with Google"
            onSuccess={(token) => login(token)}
            onFailure={(err) => console.log(err)}
            cookiePolicy={"single_host_origin"}
          />
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
};
