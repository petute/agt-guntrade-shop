import {
  Box,
  Icon,
  IconButton,
  IconButtonProps,
  HStack,
  VStack,
  StackProps,
  useBreakpointValue,
  SimpleGrid,
  Flex,
  BoxProps,
  Progress,
  ProgressProps,
  useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import {FaChevronRight, FaChevronLeft} from 'react-icons/fa'
import {motion, useMotionValue, useAnimation} from 'framer-motion'

import {useWindowWidth} from '../../common/utils'
import {CarouselStyle} from './style'

// #region Interfaces

interface ResponsiveNumber {
  base?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  '2xl'?: number
}

interface BaseProps {
  spacing: number
  itemWidth: number
  items: Array<React.ReactNode>
}

interface SliderProps extends BaseProps {
  containerPadding: number
  maxWidthInVW: number
  screenWidth: number | undefined
  progressProps: ProgressProps
  rows: number
}

interface GridProps extends BaseProps {
  maxWidth: number | undefined
  itemsPerRow: number
}

interface ResponsiveSliderProps {
  sliderRows?: ResponsiveNumber
  progressProps?: ProgressProps
  containerPadding?: ResponsiveNumber
  sliderSpacing?: ResponsiveNumber
  gridSpacing?: ResponsiveNumber
  maxWidthInVW?: ResponsiveNumber
  itemWidth?: ResponsiveNumber
  items: Array<React.ReactNode>
  itemsPerRow?: ResponsiveNumber
  breakpoint?: 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

// #endregion

// #region Functions
const SliderStack = motion<StackProps>(HStack)
const MotionBox = motion<BoxProps>(Box)

const Slider = (props: SliderProps) => {
  const animation = useAnimation()
  const [curPage, setCurPage] = React.useState(0)
  const [isDragging, setIsDragging] = React.useState(false)

  const maxW = (props.screenWidth || 0) * (props.maxWidthInVW / 100)
  let possibleCards = Math.floor(maxW / props.itemWidth)

  if (
    possibleCards * props.itemWidth + (possibleCards - 1) * props.spacing >
    maxW
  ) {
    possibleCards -= 1
  }

  const containerWidth = React.useMemo(
    () =>
      possibleCards * props.itemWidth +
      (possibleCards - 1) * props.spacing +
      props.containerPadding * 2,
    [props, possibleCards]
  )

  const pageCount = React.useMemo(
    () => Math.ceil(Math.ceil(props.items.length / possibleCards) / props.rows),
    [props, possibleCards]
  )

  const snapDistance = React.useMemo(() => 1 / possibleCards, [possibleCards])

  React.useEffect(() => {
    if (pageCount < curPage) {
      setCurPage(pageCount - 1)
    }
  }, [pageCount])

  const handlePageNavigate = (direction: 'left' | 'right') => {
    let targetPage: number = curPage
    if (direction === 'left') {
      if (curPage > 0) {
        targetPage = Math.floor(curPage - 1)
      }
    } else {
      if (curPage < pageCount - 1) {
        targetPage = Math.floor(curPage + 1)
      }
    }
    calculateDistanceAndAnimate(targetPage)
    setCurPage(targetPage)
  }

  const NavigationButton = (props: {direction: 'left' | 'right'}) => {
    const customProps: IconButtonProps = {
      'aria-label': `Slide to ${props.direction}`,
      position: 'absolute',
      display: {base: 'none', lg: 'block'},
      boxSize: '16',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      cursor: 'pointer',
      bgColor: 'black',
      _hover: {
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
      },
      className: 'button',
      isRound: true,
      onClick: () => handlePageNavigate(props.direction)
    }

    if (props.direction === 'left') {
      return (
        <IconButton
          {...customProps}
          left={5}
          icon={
            <Icon
              color={useColorModeValue('gray.200', 'gray.600')}
              boxSize="8"
              as={FaChevronLeft}
            />
          }
        />
      )
    } else {
      return (
        <IconButton
          {...customProps}
          right={5}
          icon={
            <Icon
              color={useColorModeValue('gray.200', 'gray.600')}
              boxSize="8"
              as={FaChevronRight}
            />
          }
        />
      )
    }
  }
  const x = useMotionValue(0)

  const calculateDistanceAndAnimate = (targetPage: number) => {
    const distance = -(
      containerWidth +
      props.spacing -
      2 * props.containerPadding
    )

    const position = x.get() === 0 ? curPage * distance : x.get()
    const targetPx = targetPage * distance
    const solution = targetPx / position

    animation.start({
      x:
        position % distance === 0 || targetPx === 0
          ? Math.ceil(targetPx)
          : position * solution > 0
          ? 0
          : Math.ceil(position * solution),
      transition: {duration: '0.2'}
    })
  }

  const handleDragEnd = () => {
    const position = x.get()
    const pageCandidateWithoutSnap = -(position / containerWidth)
    const pageCandidate =
      curPage +
      (pageCandidateWithoutSnap < curPage ? -snapDistance : snapDistance)

    calculateDistanceAndAnimate(
      pageCandidate > pageCount - 1
        ? pageCount - 1
        : pageCandidate < 0
        ? 0
        : (pageCandidateWithoutSnap < curPage
            ? Math.ceil(pageCandidate * 100000)
            : Math.floor(pageCandidate * 100000)) / 100000
    )

    if (pageCandidate > pageCount - 1) {
      setCurPage(pageCount - 1)
    } else if (pageCandidate < 0) {
      setCurPage(0)
    } else {
      setCurPage(
        (pageCandidateWithoutSnap < curPage
          ? Math.ceil(pageCandidate * 100000)
          : Math.floor(pageCandidate * 100000)) / 100000
      )
    }
  }

  const itemsInRows: Array<any> = []
  const cardsPerRow = Math.ceil(props.items.length / props.rows)
  let last = 0
  for (let i = 1; i <= props.rows; i++) {
    itemsInRows.push(props.items.slice(last, last + cardsPerRow))
    last += cardsPerRow
  }

  const rows = (
    <>
      {itemsInRows.map(rowitems => (
        <SliderStack
          align="start"
          spacing={`${props.spacing}px`}
          px={`${props.containerPadding}px`}>
          {rowitems.map((item: any) => (
            <MotionBox
              pointerEvents={isDragging ? 'none' : 'auto'}
              minWidth={`${props.itemWidth}px`}
              maxW={`${props.itemWidth}px`}>
              {item}
            </MotionBox>
          ))}
        </SliderStack>
      ))}
    </>
  )
  // product card slider with framer motion
  return (
    <Flex
      css={CarouselStyle()}
      justifyContent={'center'}
      alignItems={'center'}
      position="relative"
      direction={'column'}>
      <Box maxW={`${maxW}px`} position="relative" className="container">
        <Box
          maxW={`${containerWidth}px`}
          overflow={'hidden'}
          className="inner-container">
          <MotionBox
            style={{x}}
            drag="x"
            cursor={isDragging ? 'grabbing' : 'grab'}
            onDragStart={() => {
              setIsDragging(true)
            }}
            onDragEnd={() => {
              handleDragEnd()
              setIsDragging(false)
            }}
            w={`${containerWidth * pageCount}px`}
            dragConstraints={{
              left: -containerWidth * (pageCount - 1) - props.spacing,
              right: 0
            }}
            dragDirectionLock
            animate={animation}>
            <VStack align="start" spacing={`${props.spacing}px`}>
              {rows}
            </VStack>
          </MotionBox>
        </Box>
        {curPage > 0 && <NavigationButton direction="left" />}
        {curPage < pageCount - 1 && <NavigationButton direction="right" />}
      </Box>
      <Progress {...props.progressProps} max={pageCount - 1} value={curPage} />
    </Flex>
  )
}

const GridLayout = (props: GridProps) => {
  return (
    <Flex justifyContent={'center'}>
      <Box maxWidth={props.maxWidth}>
        <SimpleGrid columns={props.itemsPerRow} spacing={props.spacing / 2}>
          {props.items.map(item => {
            return <Box width={props.itemWidth}>{item}</Box>
          })}
        </SimpleGrid>
      </Box>
    </Flex>
  )
}

// #endregion

// #region Exports

/**
 * Wraps the provided items into an Slider or a Grid depending on the size of the device.
 *
 * @type ResponsiveNumber - A Chakra-UI responsive Value (object syntax).
 *
 * @param props.items - type:Array<React.ReactNode> array of items.
 * @param props.spacing - optional default:40 - type:ResponsiveNumber -  The spacing between the cards (in px).
 * @param props.maxWidthInVW - optional default:80 - type:ResponsiveNumber -  The maxWidth of the slider or grid (in vw).
 * @param props.itemWidth - optional default:280 - type:ResponsiveNumber -  The width of a single Item (in px).
 * @param props.itemsPerRow - optional default:1 - type:ResponsiveNumber - The items per row in the Grid.
 * @param props.containerPadding - optional default:0 - type:ResponsiveNumber - The paddingX on the container useful for hover animations with x effect (in px).
 * @param props.breakpoint - optional default:md - type:'base'|'sm'|'md'|'lg'|'xl'|'2xl' - The Chakra breakpoint at which the Grid changes into the Slider.
 * If the value is 'base' no Grid will be displayed.
 * @param props.progressProps - optional - type:ProgressProps - The styling of the Chakra-UI progress element.
 */
export const ResponsiveSlider = (props: ResponsiveSliderProps) => {
  const itemWidth = props.itemWidth ? useBreakpointValue(props.itemWidth) : 280
  const itemsPerRow = props.itemsPerRow
    ? useBreakpointValue(props.itemsPerRow)
    : 1
  const sliderSpacing = props.sliderSpacing
    ? useBreakpointValue(props.sliderSpacing)
    : 40
  const gridSpacing = props.gridSpacing
    ? useBreakpointValue(props.gridSpacing)
    : 20
  const maxWidthInVW = props.maxWidthInVW
    ? useBreakpointValue(props.maxWidthInVW)
    : 80
  const containerPadding = props.containerPadding
    ? useBreakpointValue(props.containerPadding)
    : 0
  const sliderRows = useBreakpointValue(props.sliderRows || {base: 1})
  const breakpoint = props.breakpoint || 'md'
  const screenWidth = useWindowWidth()
  const baseProgressProps: ProgressProps = {
    width: `${maxWidthInVW / 2}vw`,
    height: '5px',
    mt: 2,
    borderRadius: 'lg',
    colorScheme: 'gray'
  }
  const progressProps: ProgressProps = {
    ...baseProgressProps,
    ...props.progressProps
  }

  const sliderProps = {
    rows: sliderRows,
    progressProps: progressProps,
    containerPadding: containerPadding,
    items: props.items,
    maxWidthInVW: maxWidthInVW,
    screenWidth: screenWidth,
    itemWidth: itemWidth,
    spacing: sliderSpacing
  }

  const returnValue = useBreakpointValue({
    base: (
      <GridLayout
        items={props.items}
        maxWidth={(screenWidth || 0) * (maxWidthInVW / 100)}
        itemWidth={itemWidth}
        spacing={gridSpacing}
        itemsPerRow={itemsPerRow}
      />
    ),
    [breakpoint]: <Slider {...sliderProps} />
  })

  return <>{returnValue}</>
}
// #endregion
