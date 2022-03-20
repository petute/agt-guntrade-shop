import React, {useRef, useEffect, useState} from 'react'
import {Flex, Box, BoxProps} from '@chakra-ui/react'
import mapboxgl from 'mapbox-gl'
import {MapStyle} from './style'
import Map, {IMarker} from '../../components/organisms/Map/Map'


mapboxgl.accessToken = process.env.GATSBY_MAPBOX_ACCESS_TOKEN!

interface IProps extends BoxProps {
  latitude: number,
  longitude: number,
  zoom: number,
  interactive?: boolean
  markers: IMarker[]
}

export const MapLayout = ({ latitude=46.53825, longitude=14.29214, zoom=16, markers}: IProps) => {
  return (
    // <div className={styles.container}>
      <Map latitude={latitude} longitude={longitude} zoom={zoom} markers={markers} />
    // </div>
  )
}