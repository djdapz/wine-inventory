import * as React from "react";
import SearchBar from "../list/search/SearchBar";
import SortBy from "../list/sort/SortBy";

export const WineListAppBar = () => <section id={'wine-list-controls'}>
    <SearchBar/>
    <SortBy/>
</section>