import {Dropdown} from "../../shared/FormComponents";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../index";
import {SortableField, updateSortBy} from "./SortBy.actions";
import styled from "styled-components";

const SortByWrapper = styled.div`
  width: 6rem;
  margin-left: .5rem;
`

export default () => {

    const dispatch = useDispatch()
    const value = useSelector<StoreType, SortableField>(state => state.sortBy)

    return <SortByWrapper>
        <Dropdown cy="sort-by"
                  label={"Sort By"}
                  onChange={(it:SortableField) => dispatch(updateSortBy(it))}
                  options={[SortableField.YEAR]}
                  default={SortableField.NONE}
                  optionToLabel={(it: SortableField) => it.toString()}
                  convertFromStringToType={(it: string) => SortableField[it]}
                  value={value}
                  identifier={"sort-by"}/>
    </SortByWrapper>;
}


