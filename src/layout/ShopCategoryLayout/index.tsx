import {
  AspectRatio,
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Text,
  VStack
} from '@chakra-ui/react'
import {GatsbyImage, IGatsbyImageData, StaticImage} from 'gatsby-plugin-image'
import {Breadcrumbs, ShopLayout} from '../ShopLayout'

import {GCImage, gridPadBoxes} from '../../common/utils'
import * as style from './style'
import React from 'react'
import {ProductGrid} from '../ProductGridLayout'
import {BaseLayout} from '../BaseLayout'

import {Link as GatsbyLink} from 'gatsby'

export type CategoryItem = {
  title: string
  handle: string
  totalProducts: number
  image: {
    alt: string
    gatsbyImageData: IGatsbyImageData
  } | null
}

const categoryLinkTo = (item: CategoryItem) => {
  if (item.handle === 'alle-produkte') {
    return './products'
  } else {
    return `./${item.handle.split('-').at(-1)}`
  }
}

const Header = (props: {path: string; title: string}) => {
  // banner image
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
      <Box position={'absolute'} top="5" left="5" mx="8">
        <Breadcrumbs path={props.path} />
        <Heading size="2xl" my="8">
          {props.title}
        </Heading>
        <HStack
          spacing={'10'}
          textTransform="uppercase"
          fontWeight={'semibold'}
          fontSize="larger">
          <Text>Highlights</Text>
          <Text>Marken</Text>
        </HStack>
      </Box>
    </Box>
  )
}

const CategoryGrid = (props: {
  items: Array<CategoryItem>
  getPath: (handle: string) => string
}) => {
  // grid that does not stretch if there are less items than the grid size

  const {items} = props

  const emptyBoxes: Array<any> = gridPadBoxes(items)

  return (
    <SimpleGrid spacing={'4'} {...props} minChildWidth="200px" py="8">
      {items.map((item, index) => (
        <Link
          as={GatsbyLink}
          to={props.getPath(item.handle)}
          key={index}
          borderRadius="lg"
          overflow="hidden"
          position="relative"
          p="4"
          mb="4"
          cursor="pointer"
          _hover={{
            transform: 'scale(1.05)',
            color: 'agt.blue'
          }}>
          <AspectRatio ratio={1}>
            <VStack>
              <GatsbyImage
                alt={item.image?.alt || item.title}
                image={item.image?.gatsbyImageData!}
                style={{
                  minHeight: '100%',
                  minWidth: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </VStack>
          </AspectRatio>
          <Text
            textAlign={
              'center'
            }>{`${item.title} (${item.totalProducts})`}</Text>
        </Link>
      ))}
      {emptyBoxes}
    </SimpleGrid>
  )
}

export const ShopCategoryLayout = (props: {
  title: string
  path: string
  category: React.ComponentProps<typeof CategoryGrid>
  productGrid: React.ComponentProps<typeof ProductGrid>
}) => {
  return (
    <BaseLayout withSearch={true} activePath={props.path}>
      <Header path={props.path} title={props.title} />
      <ShopLayout>
        <VStack spacing={16} align="left">
          <CategoryGrid {...props.category} />
          <ProductGrid {...props.productGrid} minChildWidth={200} />
        </VStack>
      </ShopLayout>
    </BaseLayout>
  )
}
