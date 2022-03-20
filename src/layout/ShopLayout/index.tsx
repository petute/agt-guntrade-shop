import {ChevronRightIcon} from '@chakra-ui/icons'
import {
  Box,
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import {FaHome} from 'react-icons/fa'

import {RouteComponentProps} from '@reach/router'
import {Link} from 'gatsby'
import NavTop from '../../components/organisms/NavTop'

export const Breadcrumbs = (props: {path: string}) => {
  const pathParts = props.path.split('/').filter(Boolean)
  const pathLength = pathParts.length

  const breadcrumbs = pathParts.map((item, index) => {
    const isLast = index === pathLength - 1

    return (
      <BreadcrumbItem key={item}>
        {isLast ? (
          <Text>{item}</Text>
        ) : (
          <BreadcrumbLink
            as={Link}
            to={`/${pathParts.slice(0, index + 1).join('/')}`}>
            {item}
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    )
  })

  return (
    <Breadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
      my={4}>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/">
          <Icon as={FaHome} />
        </BreadcrumbLink>
      </BreadcrumbItem>
      {breadcrumbs}
    </Breadcrumb>
  )
}

export const ShopLayout: React.FC = ({children}) => {
  return (
    <>
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
        <Box>{children}</Box>
      </Container>
    </>
  )
}
