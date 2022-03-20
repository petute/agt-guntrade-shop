import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Container,
  HStack,
  Icon,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react'
import {BaseLayout} from '../BaseLayout'
import React, {useEffect, useState} from 'react'
import {CheckCircleIcon, EmailIcon, NotAllowedIcon} from '@chakra-ui/icons'
import {CookieModalService, useCookieState} from '../../services/cookiemodal'

export interface ImprintTermsLayoutProps {
  heading: React.ReactNode
  terms: React.ReactNode
  // about: React.ReactNode
  // privacy: React.ReactNode
  // shipping: React.ReactNode
  // gtc: React.ReactNode
  // cancellation_policy: React.ReactNode
}


export const ImprintTermsLayout = (props: ImprintTermsLayoutProps) => {

  return (
    <>
      <Heading as="h4" size="md" mt="4" mb="2">
        {props.heading}
      </Heading>
      {props.terms}
      {/*
      {props.about}
      {props.privacy}
      {props.shipping}
      {props.gtc}
      {props.cancellation_policy}
      */}
    </>
  )
}
