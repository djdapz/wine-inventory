import {Dropdown} from "./wine-form/FormComponents";
import * as React from "react";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import {StoreType} from "../index";
import {SortableField, updateSortBy} from "../redux/SortBy.actions";
import styled from "styled-components";


interface DispatchProps {
    updateSortBy: (sortBy: string | undefined) => void
}

interface PassedProps {
    sortBy: string | undefined
}

const SortByWrapper = styled.div`
  width: 6rem;
  margin-left: .5rem;
`

const SortBy = (props: PassedProps & DispatchProps) => <SortByWrapper><Dropdown data-cy="sort-by"
                                                                 label={"Sort By"}
                                                                 onChange={props.updateSortBy}
                                                                 options={[SortableField.YEAR]}
                                                                 default={SortableField.NONE}
                                                                 optionToLabel={(it: SortableField) => it.toString()}
                                                                 convertFromStringToType={(it: string) => SortableField[it]}
                                                                 identifier={"sort-by"}/>
</SortByWrapper>

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({updateSortBy}, dispatch)

const mapStateToProps = (state: StoreType) => ({sortBy: state.sortBy})

export default connect(mapStateToProps, mapDispatchToProps)(SortBy)
