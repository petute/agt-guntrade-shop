//#region > Imports
import {
  Box,
  BoxProps,
  Flex,
  Link,
  Text,
  Spacer,
  HStack,
  VStack,
  StackDivider
} from '@chakra-ui/layout'
import {Avatar, IconButton} from '@chakra-ui/react'
import React from 'react'
import {IconContext} from '@react-icons/all-files'
import {AiFillStar} from '@react-icons/all-files/ai/AiFillStar'
import {AiFillRead} from '@react-icons/all-files/ai/AiFillRead'
import {Modal, ModalContent, ModalOverlay} from '@chakra-ui/modal'
import {Button} from '@chakra-ui/button'

import * as style from './style'
//#endregion

//#region > Interfaces
export interface ReviewCardProps {
  reviewText: string
  reviewImage: string
  reviewRating: string
  reviewName: string
  reviewId: string
}
//#endregion

//#region > Functions
const ReviewCard = ({
  reviewRating,
  reviewImage,
  reviewText,
  reviewName,
  reviewId
}: ReviewCardProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
 
  React.useEffect(() => {
    const queryString = window.location.search.substring(1)
    if (reviewId === queryString) {
      setIsOpen(true)
    }
  }, [])

  const onOpen = () => {
    setIsOpen(true)
    history.pushState('AGT-Guntrade Reviews', '', `/?${reviewId}`)
  }
  const onClose = () => {
    setIsOpen(false)
    history.pushState('AGT-Guntrade-Shop', '', '/')
  }

  const createReviewStars = (rating: number) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      const color = rating <= i ? '#E2E8F0' : '#ef3340'

      stars.push(
        <IconContext.Provider value={{color: color, size: '20px'}}>
          <AiFillStar />
        </IconContext.Provider>
      )
    }
    return stars
  }

  const stars = createReviewStars(parseInt(reviewRating))
  return (
    <>
      <VStack
        bg="white"
        // minH="200px"
        borderRadius="5px"
        boxShadow="lg"
        p="5"
        onClick={() => onOpen()}
        divider={<StackDivider />}>
        <Text noOfLines={4} minH="100px" mb="1">
          {reviewText}
        </Text>
        <HStack w="100%">
          <Avatar src={reviewImage} boxSize="48px" />
          <Box my="auto">
            <Text fontWeight="bold" isTruncated maxW="100%">
              {reviewName}
            </Text>
            <Flex>{stars.map(star => star)}</Flex>
          </Box>
        </HStack>
      </VStack>
      <Modal isOpen={isOpen} onClose={() => onClose()} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="5px" width="40vw" maxH="60vh" p="8">
          <Text mb="3" overflowY="auto" pr="3" css={style.Modal}>
            {reviewText}
          </Text>
          <Flex mt="3" pt="3" borderTop="1px" borderColor="gray.200">
            <Avatar src={reviewImage} boxSize="48px" />
            <Box ml="3" my="auto">
              <Text textAlign="center" fontWeight="bold" mt="1">
                {reviewName}
              </Text>
              <Flex>{stars.map(star => star)}</Flex>
            </Box>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  )
}
//#endregion

//#region > Exports
export default ReviewCard
//#endregion
