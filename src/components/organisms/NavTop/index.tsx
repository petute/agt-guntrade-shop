import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  VStack,
  Center,
  Text,
  Collapse,
  Icon,
  Divider
} from '@chakra-ui/react'
import {HamburgerIcon, CloseIcon, ChevronDownIcon} from '@chakra-ui/icons'
import {FiShoppingCart} from '@react-icons/all-files/fi/FiShoppingCart'
import {Logo} from '../../../common/assets'
import * as style from './style'
import {FaHeart} from 'react-icons/fa'
import Searchbar from '../Searchbar'

import {Link as GatsbyLink} from 'gatsby'

export interface NavTopProps {
  links: {
    name: string
    path: string
  }[]
  search: {
    searchProducts: (term: string) => void
    resultProducts: Array<any>
  }
  activePath?: string
}

const MobileNavItem = ({name, children, path}: NavItem) => {
  const {isOpen, onToggle} = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={GatsbyLink}
        to={!children ? path : '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none'
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {name}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{marginTop: '0!important'}}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map(child => (
              <Link key={child.name} as={GatsbyLink} to={child.path} py={2}>
                {child.name}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

interface NavItem {
  name: string
  path: string
  children?: Array<NavItem>
}

const NavTop = ({links, activePath, search}: NavTopProps) => {
  const {isOpen, onOpen, onClose, onToggle} = useDisclosure()

  const cleanedActivePath = activePath?.split('/')[1]

  const searchbar = (
    <Searchbar
      searchResultProducts={search.resultProducts}
      onSearch={term => search.searchProducts(term)}
    />
  )

  return (
    <>
      <Box
        bg={['agt.gray', 'agt.gray', 'agt.gray', 'agt.gray']}
        color={['white', 'white', 'primary.700', 'primary.700']}
        w="full"
        px={{base: '4', md: '8'}}>
        <Flex
          py={4}
          alignItems={'center'}
          justifyContent={'space-between'}
          maxW="8xl"
          mx="auto">
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
            display={{base: 'flex', md: 'none'}}
          />
          <HStack
            as={GatsbyLink}
            to="/"
            cursor={'pointer'}
            spacing={{base: '10', md: '20'}}
            alignItems={'center'}
            maxW="2xl"
            css={style.Logo}>
            <Logo />
          </HStack>
          <Box display={{base: 'none', md: 'block'}} w="100%">
            <Center>{searchbar}</Center>
          </Box>
          <HStack spacing={8} alignItems={'center'} justifyContent={'flex-end'}>
            <Link
              as={GatsbyLink}
              to="/contact"
              display={{
                base: 'none',
                md: 'block'
              }}>
              Kontakt
            </Link>
            <Button
              as={GatsbyLink}
              to="/wishlist"
              display={{
                base: 'none',
                sm: 'flex'
              }}
              size="sm"
              rounded="md"
              color={['white']}
              colorScheme="agt.redScheme"
              leftIcon={<FaHeart />}>
              Wunschliste
            </Button>
            <IconButton
              as={GatsbyLink}
              to="/wishlist"
              display={{
                base: 'flex',
                sm: 'none'
              }}
              icon={<FaHeart />}
              aria-label="Open wishlist"
              colorScheme={'agt.redScheme'}
            />
          </HStack>
        </Flex>

        <Box>
          <Collapse in={isOpen} animateOpacity>
            <Box py="4">
              <Box
                display={{base: 'flex', md: 'none'}}
                w="100%"
                bg="white"
                color="black">
                <Flex direction={'column'} w="100%" py="2">
                  {searchbar}

                  <VStack spacing={4} py={4} align="left" mx={4}>
                    {cleanedActivePath && (
                      <MobileNavItem name="Hauptseite" path="/" />
                    )}
                    <MobileNavItem
                      name="Kategorien"
                      path="/"
                      children={links}
                    />
                    <Divider />
                    <MobileNavItem name="Kontakt" path="/contact" />
                  </VStack>
                </Flex>
              </Box>
            </Box>
          </Collapse>
        </Box>
      </Box>
      <Box
        as="nav"
        bg={useColorModeValue('white', 'gray.700')}
        role="navigation"
        display={{base: 'none', md: 'flex'}}>
        <Flex
          h={12}
          alignItems={'center'}
          justifyContent={'space-between'}
          maxW="8xl"
          mx="auto">
          <HStack
            w="100%"
            as={'nav'}
            spacing={4}
            justifyContent={'space-between'}>
            {links.map((link, i) => (
              <Link
                key={i}
                as={GatsbyLink}
                to={link.path}
                px={2}
                py={1}
                rounded={'md'}
                bg={
                  link.path === `/${cleanedActivePath}`
                    ? useColorModeValue('gray.200', 'gray.600')
                    : 'transparent'
                }
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.600')
                }}
                _focus={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.600')
                }}>
                <Text fontSize="lg">{link.name}</Text>
              </Link>
            ))}
          </HStack>
        </Flex>
      </Box>
    </>
  )
}

export default NavTop
