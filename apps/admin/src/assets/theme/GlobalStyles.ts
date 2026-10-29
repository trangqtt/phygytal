/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createGlobalStyle } from 'styled-components';

type StyleSchema = {
  id: string;
  colors: {
    body: string;
    sideBody: string;
    text: string;
    highlight: string;
    mainColor: string;
    navbarText: string;
    darkColor: string;
    black: string;
    white: string;
    link: {
      text: string;
    };
    button: {
      background: string;
      text: string;
    };
  };
  font: string;
};

export const GlobalStyles = createGlobalStyle<{ theme: StyleSchema }>`

  html {
    font-size: 14px;
    font-family: ${({ theme }) => theme.font};
  }

  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.50s linear;
  }

  label {
    font-size: var(--biggest-text);
  }

  a {
    color: ${({ theme }) => theme.colors.link.text};
    cursor: pointer;
    text-decoration: none;
  }

  button.btn {
    background-color: ${({ theme }) => theme.colors.button.background};
    color: ${({ theme }) => theme.colors.button.text};
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  :root {
    --body: ${({ theme }) => theme.colors.body};
    --side-body: ${({ theme }) => theme.colors.sideBody};
    --text: ${({ theme }) => theme.colors.text};
    --highlight: ${({ theme }) => theme.colors.highlight};
    --link-text: ${({ theme }) => theme.colors.link.text};
    --button-background: ${({ theme }) => theme.colors.button.background};
    --button-text: ${({ theme }) => theme.colors.button.text};
    --navbar-text: ${({ theme }) => theme.colors.navbarText};
    --main-color: ${({ theme }) => theme.colors.mainColor};
    --dark-color: ${({ theme }) => theme.colors.darkColor};
    --black: ${({ theme }) => theme.colors.black};
    --white: ${({ theme }) => theme.colors.white};
    --warning: #ff0000;
    --main-font: ${({ theme }) => theme.font};

    --normal-text: 1rem;
    --small-text: 0.8rem;
    --smaller-text: 0.6rem;
    --big-text: 1.2rem;
    --bigger-text: 1.4rem;
    --biggest-text: 1.6rem;

    --padding-normal: 1.6rem;
    --padding-small: 1.2rem;
    --padding-smaller: 0.8rem;
    --padding-big: 2.4rem;
    --padding-bigger: 3.2rem;

    --full-width: 100%;
    --half-width: 50%;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  h5 {
    font-size: var(--bigger-text);
    font-weight: 600;
  }
`;
