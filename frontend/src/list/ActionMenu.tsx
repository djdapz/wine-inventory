import * as React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {removeBottleFromCellar} from "./Cellar.actions";
import {push} from 'connected-react-router'

const StyledDotDot = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  fill: grey
`;

interface ActionMenuProps{ id: number, removeLabel: string}

export const ActionMenu = ({id, removeLabel} : ActionMenuProps) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement|null>(null)

    const handleClick = (event: any) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const dispatch = useDispatch()

    return  <div className={"dot-dot-dot-menu"}>
        <IconButton
            aria-label="More"
            aria-owns={'long-menu'}
            aria-haspopup="true"
            onClick={handleClick}
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
            onClose={handleClose}
        >
            <MenuItem key={`remove-${id}`}
                      className={"remove-bottle-from-cellar"}
                      onClick={() => {
                          removeBottleFromCellar(dispatch, id)
                          handleClose()
                      }}>
                {removeLabel}
            </MenuItem>
            <MenuItem key={`EDIT-${id}`}
                      className={'edit-record'}
                      onClick={() => {
                          dispatch(push(`/wine-record/${id}`))
                          handleClose()
                      }}>
                Edit Record
            </MenuItem>
        </Menu>
    </div>
}