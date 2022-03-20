import {Box, Heading, Text, Link, BoxProps} from '@chakra-ui/react'
import {useCookieState} from '../../services/cookiemodal'


export const GoogleMaps = (props: BoxProps) => {
  const cookieState = useCookieState()

  const handleAccept = () => {
    cookieState.updateCookie('analytics', true)
    cookieState.accept(true)
  }

  if (!cookieState.cookie.analytics) {
    return (
      <Box bg="gray.200">
        <Heading as="h1" size="xl">
          Google Maps is nicht verfügbar
        </Heading>
        <Text as="h2" size="lg">
          Durch Ihre Cookie Einstellungen können wir Google Maps nicht anzeigen.
        </Text>
        <Text as="h2" size="lg">
          Bitte aktivieren Sie Cookies, um Google Maps anzuzeigen.{' '}
          <Link onClick={handleAccept}>Analytics Cookie aktivieren</Link>
        </Text>
      </Box>
    )
  }

  return (
    <Box {...props}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10977.908361298725!2d14.2921416!3d46.5382484!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf0d0d69eedf5cb7d!2sWaffenhandel%20T%C3%BCrk!5e0!3m2!1sen!2sat!4v1647540212169!5m2!1sen!2sat"
        width="100%"
        height="600"
        style={{
          border: 1
        }}
        loading="lazy"
      />
    </Box>
  )
}

export default GoogleMaps
