import styled from "styled-components";
import Card from "@material-ui/core/Card";
import * as React from "react";
import {Wine} from "./Wine.types";
import {ActionMenu} from "../list/ActionMenu";
import {BottleSize} from "./BottleSize";

const StyledWineCard = styled(Card)`
  margin-bottom: 1rem;
  background-color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProducerHeading = styled.span`
  font-size: large;
  font-weight: bold;
  margin-bottom: .25rem;
`;

const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-right: 1rem;
  padding-left: 1rem;
`;

const LeftPanel = styled.div`
  text-align: right;
  display: flex;
`;

const Badge = styled.span`
  background-color: #ff9800;
  border-radius: 2px;
  flex-grow: 0;
  padding: 1px 4px 0px;
  color: white;
  margin-left: .5rem;
`

const Country = styled.div`
  
`

const Year = styled.span`
  text-decoration: underline;
  margin-right: .5rem;
`

const WineType = styled.span`
`


const OriginalWoodenCase = (props: { owc: boolean }) => props.owc ?
    <Badge data-cy="original-wooden-case-indicator">OWC</Badge> : <span/>

export default ({wine: {bottleSize, cellarLocation, country, id, notes, originalWoodenCase, producer, quantity, type, year}}: {
    wine: Wine
}) =>
    <StyledWineCard key={year + producer + type}
                    data-cy={'wine-card'}>
        <CardSection>
            <div>
                <ProducerHeading data-cy={'producer'}>
                    {producer}
                </ProducerHeading>
            </div>
            <div>
                <Year data-cy={'year'}>{year}</Year>
                <WineType data-cy={'type'}>{type}</WineType>
            </div>
            <Country data-cy={'country'}>
                {country}
            </Country>

            <div>
                <span data-cy="bottle-size">{new BottleSize(bottleSize).display}</span>
                <OriginalWoodenCase owc={originalWoodenCase}/>
            </div>
            <div data-cy="notes">{notes}</div>
        </CardSection>
        <LeftPanel>
            <CardSection>
                <div data-cy={'quantity'}><b>{quantity}</b> left</div>
                {cellarLocation ?
                    <div data-cy={'cellar-location'}>Cellar Location: {cellarLocation}</div> : ""}
            </CardSection>
            <ActionMenu id={id}
                        removeLabel={quantity === 1 ? "Remove Last Bottle From Cellar" : "Remove One Bottle From Cellar"}/>
        </LeftPanel>
    </StyledWineCard>
;
