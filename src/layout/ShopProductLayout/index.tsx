import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  Icon,
  Divider,
  Center,
  WrapItem,
  Wrap,
  useClipboard,
  useDisclosure
} from '@chakra-ui/react'
import React from 'react'
import {Breadcrumbs, ShopLayout} from '../ShopLayout'

import {MdMessage} from 'react-icons/md'
import {FaHeart, FaShare} from 'react-icons/fa'
import {GatsbyImage, IGatsbyImageData} from 'gatsby-plugin-image'
import {ProductSliderLayout} from '../ProductSliderLayout'
import {BaseLayout} from '../BaseLayout'
import {BannerLayout} from '../BannerLayout'
import ContactModal from '../../components/organisms/ContactModal'

const Header = (props: {title: string; path: string}) => {
  return (
    <VStack align="left" my="2">
      <Breadcrumbs path={props.path} />
      <Heading size="xl" fontWeight={'semibold'}>
        {props.title}
      </Heading>
    </VStack>
  )
}

function Price(props: {price: string; discountPrice?: string}) {
  const price = `${parseFloat(props.price).toFixed(2)} €`
  if (props.discountPrice) {
    const discountPrice = `${parseFloat(props.discountPrice).toFixed(2)} €`
    // strike through price and put discount price on the right side
    return (
      <Flex
        direction="row"
        wrap="wrap"
        justifyContent={{
          base: 'center',
          md: 'flex-start'
        }}>
        <Text
          fontSize="xl"
          fontWeight="semibold"
          color="gray.600"
          textDecoration={'line-through'}>
          {price}
        </Text>

        <Heading
          size="3xl"
          mt={{
            base: 0,
            md: 4
          }}
          fontWeight={'semibold'}
          color="red.500">
          {discountPrice}
        </Heading>
      </Flex>
    )
  }

  return (
    <Heading size="3xl" fontWeight={'semibold'}>
      {price}
    </Heading>
  )
}

type SliderImage = {
  alt: string
  gatsbyImageData: IGatsbyImageData
}

const ImageThumbnailWrapItem = (props: {
  image: SliderImage
  active: boolean
  onClick: () => void
}) => {
  const {alt, gatsbyImageData} = props.image
  return (
    <WrapItem
      boxSize={{base: '16', md: '20'}}
      onClick={props.onClick}
      cursor="pointer"
      boxShadow={props.active ? 'inset 0px 4px 0px 0px #eb1933' : 'none'}
      p={2}
      mr={2}
      mb={2}
      _hover={{
        bg: useColorModeValue('gray.300', 'gray.800')
      }}
      transition="ease-out">
      <GatsbyImage image={gatsbyImageData} alt={alt} />
    </WrapItem>
  )
}

const ImageSlider = (props: {
  featuredImage: SliderImage
  images: Array<SliderImage>
  productMoreDetail?: React.ComponentProps<typeof ProductMoreDetail>
}) => {
  // null is featured image
  const [currentImage, setCurrentImage] = React.useState<SliderImage>(
    props.featuredImage
  )

  return (
    <Box my="4" w={'100%'}>
      <AspectRatio ratio={16 / 9}>
        <Box>
          <GatsbyImage
            image={currentImage.gatsbyImageData}
            alt={currentImage.alt}
          />
        </Box>
      </AspectRatio>
      <Wrap
        bg={useColorModeValue('gray.200', 'gray.700')}
        spacing={0}
        justify="center">
        <ImageThumbnailWrapItem
          image={props.featuredImage}
          active={currentImage === props.featuredImage}
          onClick={() => setCurrentImage(props.featuredImage)}
        />

        {props.images.map((image, index) => (
          <ImageThumbnailWrapItem
            key={index}
            image={image}
            active={currentImage === image}
            onClick={() => setCurrentImage(image)}
          />
        ))}
      </Wrap>

      <Box display={{base: 'none', md: 'block'}}>
        <ProductMoreDetail {...props.productMoreDetail!} />
      </Box>
    </Box>
  )
}

const ProductDetail = (props: {
  id: string
  title: string
  price: string
  discountPrice?: string
  status: string
  isOnWishList?: boolean
  onWishlistAdd: (id: string) => void
}) => {
  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <>
      <ContactModal
        wishlist={[
          {
            title: props.title,
            quantity: 1
          }
        ]}
        isOpen={isOpen}
        heading={<p>Kaufanfrage (unverbindlich)</p>}
        text={''}
        onClose={() => onClose()}
      />

      <Box
        w={{base: '100%', md: '40%'}}
        minW="300px"
        pl={{base: 0, md: 4}}
        position={'sticky'}
        top="15"
        alignSelf={'flex-start'}>
        <VStack align={'left'} spacing="4">
          <Price price={props.price} discountPrice={props.discountPrice} />
          <Text size="xs" fontWeight={'thin'}>
            inkl. MwSt.
          </Text>
          <Text color={useColorModeValue('green.500', 'green.300')}>
            {props.status}
          </Text>
          <Button
            fontSize={'2xl'}
            fontWeight={'semibold'}
            textTransform="uppercase"
            leftIcon={<Icon as={MdMessage} />}
            borderRadius={'full'}
            bg={'agt.gray'}
            color={'white'}
            _hover={{
              bg: 'agt.blue'
            }}
            size="lg"
            onClick={onOpen}>
            <Text>Jetzt anfragen</Text>
          </Button>
          <Divider />
          <Flex alignItems={'center'} justifyContent="center" fontSize={'xl'}>
            <Box mx="auto" onClick={() => props.onWishlistAdd(props.id)}>
              <Text
                fontWeight={'semibold'}
                color={props.isOnWishList ? 'red.500' : undefined}
                _hover={{
                  color: props.isOnWishList ? 'red.400' : 'red.300'
                }}
                cursor="pointer">
                <Center>
                  <Icon as={FaHeart} mr="2" />
                  Merken
                </Center>
              </Text>
            </Box>
            <Box mx="auto">
              <ShareText />
            </Box>
          </Flex>
          <Divider />
        </VStack>
      </Box>
    </>
  )
}

function ShareText() {
  const value = typeof window !== 'undefined' ? window.location.href : ''

  const {hasCopied, onCopy} = useClipboard(value)

  return (
    <Text
      fontWeight={'semibold'}
      verticalAlign="center"
      color={hasCopied ? 'red.500' : undefined}
      _hover={{
        color: hasCopied ? 'red.400' : 'red.300'
      }}
      cursor="pointer"
      onClick={onCopy}>
      <Center>
        <Icon as={FaShare} mr="2" />
        Teilen
        {hasCopied && (
          <Text ml="2" fontWeight={'thin'}>
            (Kopiert!)
          </Text>
        )}
      </Center>
    </Text>
  )
}

function replaceHexColorsInHTML(
  html: string,
  coloraHex: string,
  colorbHex: string
) {
  return html.replaceAll(coloraHex, colorbHex)
}

const ProductMoreDetail = (props: {description: string}) => {
  const color = useColorModeValue('#000000', '#ffffff')

  const html = replaceHexColorsInHTML(props.description, '#000000', color)

  return (
    <Box py="8">
      <Box dangerouslySetInnerHTML={{__html: html}} />
    </Box>
  )
}

export const ShopProductLayout = (props: {
  header: React.ComponentProps<typeof BannerLayout>
  imageSlider: React.ComponentProps<typeof ImageSlider>
  productDetail: React.ComponentProps<typeof ProductDetail>
  productMoreDetail: React.ComponentProps<typeof ProductMoreDetail>
  featuredProducts: {
    products: Array<any>
  }
}) => {
  return (
    <BaseLayout withSearch={true} activePath={props.header.path}>
      <BannerLayout {...props.header} />
      <ShopLayout>
        {/* <Header {...props.header} /> */}
        <VStack spacing={12} w="100%">
          <Box w="100%">
            <Flex direction={{base: 'column', lg: 'row'}}>
              <ImageSlider
                {...props.imageSlider}
                productMoreDetail={props.productMoreDetail}
              />
              <ProductDetail {...props.productDetail} />
            </Flex>
            <Box display={{base: 'block', md: 'none'}}>
              <ProductMoreDetail {...props.productMoreDetail} />
            </Box>
          </Box>
          <ProductSliderLayout
            title="Unsere Empfehlungen"
            {...props.featuredProducts}
          />
          <Box h="14"></Box>
        </VStack>
      </ShopLayout>
    </BaseLayout>
  )
}
