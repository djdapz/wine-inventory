import * as React from "react";

import {connect} from 'react-redux'
import {Dispatch} from "redux";
import {getAllWine} from "./Wine.actions";
import './WineList.scss'
import Card from "@material-ui/core/Card/Card";

export class Wine {
    type: string;
    producer: string;
    year: number;
    quantity: number;
    country: string;
}

interface WineListProps {
    wines: Wine[],
    getWines: () => void
}

class WineList extends React.Component<WineListProps> {


    constructor(props: WineListProps) {
        super(props);
        this.props.getWines()
    }

    render() {
        return <div id={'wine-list'}>
            {this.renderWines()}
        </div>
    }

    private renderWines() {
        return this.props.wines.map((wine: Wine) => <Card className={'wine-card'}>
            <div>
                <div>
                    <span className={'producer'}>{wine.producer}</span>
                    <span className={'pipe'}>|</span>
                    <span className={'country'}>{wine.country}</span>
                </div>
                <div>
                    <span className={'type'}>{wine.type}</span>
                    <span className={'pipe'}>|</span>
                    <span className={'year'}>{wine.year}</span>
                </div>
            </div>
            <div className={'quantity'}><b>{wine.quantity}</b> left</div>
        </Card>)
    }
}

const mapStateToProps = (state: any) => ({
    wines: state.wines
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getWines: () => getAllWine(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WineList)