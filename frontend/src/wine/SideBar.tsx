import * as React from 'react'
import styled from "styled-components";
import CreateWineForm from "./CreateWineForm";


const StyledSideBar = styled.div`
  padding: 1rem;
  transition: max-width 2s;
  background-color: white;
  max-width: 10rem;
`;

export const SideBar = () => <StyledSideBar><CreateWineForm/></StyledSideBar>;