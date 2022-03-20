import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Drawer,
  DrawerContent,
  Flex,
  Heading,
  Icon,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Spacer,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
  VStack
} from '@chakra-ui/react'

import {FaFilter, FaSort} from 'react-icons/fa'
import React from 'react'
import {Breadcrumbs, ShopLayout} from '../ShopLayout'
import {ProductGrid} from '../ProductGridLayout'
import {BaseLayout} from '../BaseLayout'
import {BannerLayout} from '../BannerLayout'

// tag builder => input tag output type:content

export const Header = (props: {
  title: string
  path: string
  sortOptions: Array<string>
  onSortChange: (option: string) => void
  isMobile?: boolean
  onMobileFilterClick?: () => void
}) => {
  return (
    <>
      {/* <Breadcrumbs path={props.path} />
      <Heading size="2xl">{props.title}</Heading> */}
      <Box
        my="2"
        position={'sticky'}
        top="0"
        alignSelf={'flex-start'}
        zIndex="1"
        bg={useColorModeValue('white', 'gray.700')}>
        <Flex>
          {props.isMobile ? (
            <Button
              variant="unstyled"
              leftIcon={<Icon as={FaFilter} />}
              onClick={props.onMobileFilterClick}>
              Filter
            </Button>
          ) : (
            <Button
              leftIcon={<Icon as={FaFilter} />}
              variant="unstyled"
              cursor={'default'}
              _focus={{boxShadow: 'none'}}>
              Filter
            </Button>
          )}

          <Spacer />
          <Box>
            <Select
              placeholder="Sortieren"
              variant={'unstyled'}
              my="2"
              icon={<Icon as={FaSort} mb="1" />}
              onChange={e => props.onSortChange(e.target.value)}>
              {props.sortOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>
        <Divider />
      </Box>
    </>
  )
}

const PriceRangeFilter = (props: {
  minPrice: number
  maxPrice: number
  onPriceChange: (min: number, max: number) => void
}) => {
  const [value, setValue] = React.useState([props.minPrice, props.maxPrice])

  const handlePriceChange = (value: [number, number]) => {
    setValue(value)
  }

  return (
    <Box>
      <Text fontWeight={'bold'}>
        {`Preisklasse (${value[0]} - ${value[1]}€)`}
      </Text>

      <Box px="4">
        <RangeSlider
          min={props.minPrice}
          max={props.maxPrice}
          value={value}
          onChange={handlePriceChange}
          onChangeEnd={value => props.onPriceChange(value[0], value[1])}>
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={6} index={0} />
          <RangeSliderThumb boxSize={6} index={1} />
        </RangeSlider>
      </Box>
    </Box>
  )
}

interface FilterProps {
  allTags: Array<string> // ["category:test",...]
  activeTags: Array<string>
  onActiveTagsChange: (tags: FilterProps['activeTags']) => void
  priceFilter: React.ComponentProps<typeof PriceRangeFilter>
}

const Filter = (props: FilterProps) => {
  const [activeTags, setActiveTags] = React.useState(props.activeTags)

  const groupedFilter = React.useMemo(() => {
    const grouped: {
      [group: string]: Array<string>
    } = {}

    for (const tag of Object.values(props.allTags)) {
      const [group, tagName] = tag.split(':')

      grouped[group] = grouped[group] || []
      grouped[group].push(tagName)
    }

    return grouped
  }, [props.allTags])

  const handleActiveTabsChange = (tag: string) => {
    let newActiveTags

    if (activeTags.includes(tag)) {
      newActiveTags = activeTags.filter(t => t !== tag)
    } else {
      newActiveTags = [...activeTags, tag]
    }

    setActiveTags(newActiveTags)

    props.onActiveTagsChange(newActiveTags)
  }

  return (
    <VStack px="2" spacing={4} divider={<Divider />} align="stretch">
      <>
        {Object.entries(groupedFilter).map(([tagType, values]) => (
          <Box pb="2">
            <Text fontWeight={'bold'}>{tagType}</Text>
            <Stack>
              {values.map((tagName, key) => {
                const fullTag = `${tagType}:${tagName}`
                const isChecked = activeTags.includes(fullTag)

                return (
                  <Checkbox
                    key={key}
                    defaultChecked={isChecked}
                    onChange={() => handleActiveTabsChange(fullTag)}>
                    {tagName}
                  </Checkbox>
                )
              })}
            </Stack>
          </Box>
        ))}
      </>
      <PriceRangeFilter {...props.priceFilter} />
    </VStack>
  )
}

export const ShopCatalogLayout = (props: {
  filter: React.ComponentProps<typeof Filter>
  products: React.ComponentProps<typeof ProductGrid>
  header: React.ComponentProps<typeof Header>
  onLoadMore: () => void // return true if more products are available
  loading: boolean
  activePath: string
}) => {
  const mobile = useDisclosure()
  const [isDesktop] = useMediaQuery('(min-width: 1268px)')

  const gridRef = React.useRef<HTMLDivElement>(null)

  const fetchMore = React.useCallback(() => {
    //alert(`fetch more loading ${props.loading}`)
    props.onLoadMore()
  }, [props.loading, props.onLoadMore()])

  React.useEffect(() => {
    const handleScroll = () => {
      if (gridRef.current) {
        const yOfDivEnd = gridRef.current.getBoundingClientRect().bottom

        const currentScroll = window.pageYOffset + window.innerHeight

        if (yOfDivEnd < currentScroll) {
          fetchMore()
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <BaseLayout withSearch={false} activePath={props.activePath}>
      <BannerLayout {...props.header} />
      <ShopLayout>
        <Header
          {...props.header}
          isMobile={!isDesktop}
          onMobileFilterClick={mobile.onToggle}
        />
        <Flex>
          <>
            {!isDesktop ? (
              <Drawer
                isOpen={mobile.isOpen}
                onClose={mobile.onClose}
                placement="left"
                blockScrollOnMount={false}>
                <DrawerContent p="4">
                  <Heading as="h3" mb="4">
                    Filter
                  </Heading>
                  <Filter {...props.filter} />
                </DrawerContent>
              </Drawer>
            ) : (
              <Box
                w="30%"
                position={'sticky'}
                top="12"
                alignSelf={'flex-start'}>
                <Filter {...props.filter} />
              </Box>
            )}
          </>

          <Box w="100%" ref={gridRef}>
            <ProductGrid {...props.products} />
            <Center w="100%">{props.loading && <Spinner />}</Center>
          </Box>
        </Flex>
      </ShopLayout>
    </BaseLayout>
  )
}
