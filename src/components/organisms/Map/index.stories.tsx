import {Meta} from '@storybook/react'
import Map from './Map'
import {Logo} from '../../../common/assets'

export default {
  title: 'Stories/Map',
  component: Map
} as Meta


const markers = [
  {
    name: 'AGT Guntrade',
    city: 'Ried im Innkreis',
    zip_code:'4910',
    address: 'Wildfellnerstraße 22/1',
    image: <Logo />,
    description: '',
    latitude: 46.53825,
    longitude: 14.29214
  }
]

export const Component = () => <Map latitude={46.53825} longitude={14.29214} zoom={16} markers={markers} />
