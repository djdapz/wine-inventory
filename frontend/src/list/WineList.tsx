import * as React from "react";

import {connect} from 'react-redux'
import {getAllWine} from "../wine/Wine.actions";
import {Wine} from "../wine/Wine.types";
import {StoreType} from "../index";
import {removeBottleFromCellar} from "./Cellar.actions";
import WineCard from "../wine/WineCard";
import {getSortedVisibleWine} from "./selectors/filteredWine";
import {ThunkDispatch} from "redux-thunk";

interface WineListDispatchProps {
    getWines: () => void,
    removeBottleFromCellar: (id: number) => void,
}

interface WineListPassedProps {
    wines: Wine[]
}

type WineListProps = WineListDispatchProps & WineListPassedProps


class WineList extends React.Component<WineListProps> {

    constructor(props: WineListProps) {
        super(props);
        this.props.getWines()
    }

    render() {
        return <div id={'wine-list'}>
            {this.props.wines.map((wine: Wine) =>
                <WineCard key={wine.id}
                          wine={wine}/>)}
        </div>
    }
}

const mapStateToProps = (state: StoreType) => ({
    wines: getSortedVisibleWine(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any ,any ,any>) => ({
    getWines: () => dispatch(getAllWine()),
    removeBottleFromCellar: (id: number) => removeBottleFromCellar(dispatch, id),
});

export default connect<WineListPassedProps, WineListDispatchProps, {}, StoreType>(mapStateToProps, mapDispatchToProps)(WineList)