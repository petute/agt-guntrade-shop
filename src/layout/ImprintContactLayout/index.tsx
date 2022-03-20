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

export interface ImprintContactLayoutProps {
  heading: React.ReactNode
  contact: React.ReactNode
  // city: React.ReactNode
  // zip_code: React.ReactNode
  // address: React.ReactNode
  // telephone: React.ReactNode
  // telefax: React.ReactNode
  // whatsapp_telephone: React.ReactNode
  // whatsapp_contactline: React.ReactNode
  // email: React.ReactNode
  // copyrightholder: React.ReactNode
}

export const ImprintContactLayout = (props: ImprintContactLayoutProps) => {

  return (
    <>
      <Heading as="h4" size="md" mt="4">
        {props.heading}
      </Heading>
      {props.contact}
      {/*
      {props.city}
      {props.zip_code}
      {props.address}
      {props.telephone}
      {props.telefax}
      {props.whatsapp_telephone}
      {props.whatsapp_contactline}
      {props.email}
      {props.copyrightholder}
      */}
    </>
  )
}