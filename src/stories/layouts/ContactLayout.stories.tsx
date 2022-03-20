import {Story, Meta} from '@storybook/react'
import {ContactLayout} from '../../layout/ContactLayout'

export default {
  title: 'Layouts/ContactLayout',
  component: ContactLayout
} as Meta

export const Page = () => (
  <ContactLayout
    phone="+43 676 3232 12"
    email="test@test.com"
    address="Hausergasse 5, 9940 Villach"
  />
)
