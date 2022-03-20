import React from "react";
/*
Interface for Each individual Marker
When creating markers for the map an array of these objects should be used
*/
export default interface Markers {
    lat: number;
    lng: number;
    marker: JSX.Element;
    draggable?: boolean;
    dragEnd?(e: MouseEvent): void;
    click?(): void;
    MEnter?(e: React.MouseEvent): void;
    MLeave?(e: React.MouseEvent): void;
};