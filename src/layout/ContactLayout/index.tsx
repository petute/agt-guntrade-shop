import React from 'react'
import {
  Container,
  Icon,
  Text,
  useColorModeValue,
  VStack,
  SimpleGrid,
  Center
} from '@chakra-ui/react'
import {BaseLayout} from '../BaseLayout'
import GoogleMaps from '../GoogleMapsLayout'
import {BannerLayout} from '../BannerLayout'
import {ContactForm} from '../../components/organisms/ContactForm'
import {FaAddressBook, FaEnvelopeSquare, FaPhoneSquare} from 'react-icons/fa'

export interface ContactLayoutProps {
  activePath: string
  phone: React.ReactNode
  email: React.ReactNode
  address: React.ReactNode
}

export const ContactLayout = (props: ContactLayoutProps) => {
  return (
    <BaseLayout activePath="/contact" withSearch={true}>
      <BannerLayout title='Kontakt' path={props.activePath} />
      <Container
        as="section"
        maxW="8xl"
        pt="6"
        id="featuredproducts"
        bg={useColorModeValue('white', 'gray.700')}
        borderWidth="1px"
        my={{base: 4, md: 8}}
        px={4}
        py={4}
        borderRadius="lg">
        <ContactForm requestOptions={[]} mb="5" />
        <GoogleMaps />
        <SimpleGrid
          spacing="40px"
          py={8}
          columns={[1, 1, 1, 3]}
          bg="agt.gray"
          color="white">
          <Center>
            <VStack spacing={6}>
              <Icon as={FaPhoneSquare} boxSize="16" />
              <Text fontSize="xl" fontWeight="semibold">
                {props.phone}
              </Text>
            </VStack>
          </Center>
          <Center>
            <VStack spacing={6}>
              <Icon as={FaAddressBook} boxSize="16" />
              <Text fontSize="xl" fontWeight="semibold">
                {props.address}
              </Text>
            </VStack>
          </Center>
          <Center>
            <VStack spacing={6}>
              <Icon as={FaEnvelopeSquare} boxSize="16" />
              <Text fontSize="xl" fontWeight="semibold">
                {props.email}
              </Text>
            </VStack>
          </Center>
        </SimpleGrid>
      </Container>
    </BaseLayout>
  )
}
