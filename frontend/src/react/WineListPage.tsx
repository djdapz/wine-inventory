import CreateWineForm from "./CreateWineForm";
import SearchBar from "./SearchBar";
import WineList from "./WineList";
import NewWineButton from "./NewWineButton";
import * as React from "react";
import styled from "styled-components";

const StyledWineListPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export default () => <StyledWineListPage>
    <CreateWineForm/>
    <SearchBar/>
    <WineList/>
    <NewWineButton/>
</StyledWineListPage>