import * as React from "react";
import MenuItem, {MenuItemProps} from "@material-ui/core/MenuItem/MenuItem";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Menu from "@material-ui/core/Menu/Menu";
import styled from "styled-components";

interface ActionButton {
    label: string,
    action?: () => void,
    className: string,
    component?: React.ReactType<MenuItemProps>
}

const StyledDotDot = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  fill: grey
`;

export class ActionMenu extends React.Component<{ actions: ActionButton[] }, { anchorEl: HTMLElement | null }> {

    constructor(props: { actions: ActionButton[] }) {
        super(props);
    }

    state = {
        anchorEl: null,
    };

    handleClick = (event: any) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {anchorEl} = this.state;

        let actions = this.props.actions.map(action =>
            <MenuItem key={action.label}
                      className={action.className}
                      component={action.component}
                      onClick={() => {
                          action.action ? action.action() : "";
                          this.handleClose()
                      }}>
                {action.label}
            </MenuItem>);

        return <div className={"dot-dot-dot-menu"}>
            <IconButton
                aria-label="More"
                aria-owns={open ? 'long-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
            >
                <StyledDotDot
                    focusable="false"
                    viewBox="0 0 24 24"
                    role="presentation">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </StyledDotDot>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
            >
                {actions}
            </Menu>
        </div>
    }


}
