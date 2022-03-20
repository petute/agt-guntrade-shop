import {
  Box,
  Flex,
  Heading
} from '@chakra-ui/react'
import {GatsbyImage, IGatsbyImageData, StaticImage} from 'gatsby-plugin-image'
import {Breadcrumbs, ShopLayout} from '../ShopLayout'

import {GCImage, gridPadBoxes} from '../../common/utils'
import * as style from './style'


export interface BannerLayoutProps {
  title: string
  path: string
}

export const BannerLayout = (props: BannerLayoutProps) => {
  return (
    <Box position={'relative'} color="white">
      <style.Banner>
        <GCImage
          gimg={
            <StaticImage
              src="https://i.imgur.com/8zG2Ymd.jpeg"
              alt="bg"
              imgClassName="banner-image"
            />
          }
        />
      </style.Banner>
      <Flex position={'absolute'} top="5" w='100%' justifyContent={'center'} alignItems={'center'}>
        <Box w="8xl">
          <Breadcrumbs path={props.path} />
          <Heading size="2xl" my="8">
            {props.title}
          </Heading>
        </Box>
      </Flex>
    </Box>
  )
}