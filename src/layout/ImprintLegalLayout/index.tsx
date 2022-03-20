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

export interface ImprintLegalLayoutProps {
  heading: React.ReactNode
  legal: React.ReactNode
  // vat_number: React.ReactNode
  // tax_id: React.ReactNode
  // court_of_registry: React.ReactNode
  // place_of_registry: React.ReactNode
  // trade_register_number: React.ReactNode
  // ownership: React.ReactNode
}


export const ImprintLegalLayout = (props: ImprintLegalLayoutProps) => {

  return (
    <>
      <Heading as="h4" size="md" mt="4" mb="2">
        {props.heading}
      </Heading>
      {props.legal}
      {/*
      {props.vat_number}
      {props.tax_id}
      {props.court_of_registry}
      {props.place_of_registry}
      {props.trade_register_number}
      {props.ownership}
      */}
    </>
  )
}
