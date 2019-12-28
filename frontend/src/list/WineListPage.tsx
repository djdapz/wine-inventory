import CreateWineForm from "../wine-form/CreateWineForm";
import WineList from "./WineList";
import NewWineButton from "../wine-form/NewWineButton";
import * as React from "react";
import "./wine-list.scss"

export default () => <div className={'content'} id={'wine-list-page'}>
    <CreateWineForm/>
    <WineList/>
    <NewWineButton/>
</div>