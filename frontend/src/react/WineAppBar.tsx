import * as React from "react";
import AppBarRouter from "./AppBarRouter";
import {AppBar, createMuiTheme} from "@material-ui/core";
import styled from "styled-components";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import WineBottleCount from "./WineBottleCount";

const AppBarContainer = styled.div`
display: flex;
justify-content: space-between;
padding: .5rem 1rem;
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
  box-sizing: border-box;
  align-items: center;
`

export const whiteInputs = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            light: "#fff",
            main: "#fff",
            dark: "#fff",
            contrastText: "#8e2dfa",
        },
        text: {
            primary: "#fff", //actually-typing
            secondary: "#ddd", //placeholder
            disabled: "#aaa",
            hint: "#ddd",
        },
        type: "dark"
    },
});

const Spacing = styled.div`
  width: 1rem;
`

export default () => <AppBar>
    <MuiThemeProvider theme={whiteInputs}>
        <AppBarContainer>
            <AppBarRouter/>
            <Spacing/>
            <WineBottleCount/>
        </AppBarContainer>
    </MuiThemeProvider>
</AppBar>