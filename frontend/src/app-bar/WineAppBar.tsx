import * as React from "react";
import AppBarRouter from "./AppBarRouter";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import "../main/app-bar.scss"

export const whiteInputs = createMuiTheme({
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

export default () =>
    <MuiThemeProvider theme={whiteInputs}>
        <header id={"app-bar"}>
            <div className={"content"}>
                <AppBarRouter/>
            </div>
        </header>
    </MuiThemeProvider>