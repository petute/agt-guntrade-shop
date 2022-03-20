import React, {useEffect, useState} from 'react'
import {useMemo} from 'react'
import ReactMapGL, {
    Popup,
    Marker,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
    ViewState
} from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import Pin from './pin'
import {Box, Heading, Text} from '@chakra-ui/react'

export interface IMarker {
    name: string
    city: string
    zip_code: string
    address: string
    image: React.ReactNode
    description: string
    latitude: number
    longitude: number
    handleClick?(): void
    handleMouseEnter?(e: React.MouseEvent): void
    handleMouseLeave?(e: React.MouseEvent): void
}

export interface IMap {
    width?: number
    height?: number
    latitude: number
    longitude: number
    zoom?: number
    layerColour?: string
    markers: IMarker[]
    buttons?: JSX.Element[]
}


const TOKEN = process.env.GATSBY_MAPBOX_ACCESS_TOKEN

const Map = (props: IMap):JSX.Element => {
    const [popupInfo, setPopupInfo] = useState<IMarker|undefined>(undefined);

    const viewport: ViewState = {
        latitude: props.latitude ? props.latitude : 40,
        longitude: props.longitude ? props.longitude : -100,
        zoom: (typeof props.zoom !== "undefined") ? props.zoom : 10,
        bearing: 0,
        pitch: 0,
        padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right:0
        }
    }

    const markes = useMemo(
        () =>
            props.markers.map((marker, index) => {

                const handleClick = (marker: any) => {
                    if (typeof marker.handleClick === "function") {
                        marker.handleClick();
                    } else {
                        setPopupInfo(marker)
                    }
                    
                }
            
                const handleMouseEnter = (e: React.MouseEvent) => {
                    if (typeof marker.handleMouseEnter === "function") {
                        marker.handleMouseEnter(e);
                    }
                }
            
                const handleMouseLeave = (e: React.MouseEvent) => {
                    if (typeof marker.handleMouseLeave === "function") {
                        marker.handleMouseLeave(e);
                    }
                }
                
                return(
                <div
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={(e) => handleMouseLeave(e)}>
                    <Marker
                        key={`marker-${index}`}
                        longitude={marker.longitude}
                        latitude={marker.latitude}
                        anchor="bottom">
                        <Pin onClick={() => handleClick(marker)} />
                    </Marker>
                </div>
            )
            }),
        []
    )

    return (
        <Box>
        <ReactMapGL
            initialViewState={viewport}
            style={{width: '100%', height: 400}}
            mapStyle="mapbox://styles/kleberbaum/cl0v92bz0000j14o5nejnswcn"
            mapboxAccessToken={TOKEN}>
            <GeolocateControl position="top-left" />
            <FullscreenControl position="top-left" />
            <NavigationControl position="top-left" />
            <ScaleControl />
            {markes}
            {popupInfo && (
            <Popup
                anchor="top"
                longitude={Number(popupInfo.longitude)}
                latitude={Number(popupInfo.latitude)}
                closeOnClick={false}
                onClose={() => setPopupInfo(undefined)}
            >
                <Box>
                    <Heading as="h4" size="sm" mb="1">
                        {popupInfo.name}
                    </Heading>
                    <Text>
                        {popupInfo.zip_code}, {popupInfo.city}
                    </Text>
                    <Text>
                        {popupInfo.address}
                    </Text>
                    <Text>
                        {popupInfo.description}
                    </Text>
                </Box>
                {popupInfo.image}
            </Popup>
            )}
        </ReactMapGL>
        </Box>
    )
}

export default Map
