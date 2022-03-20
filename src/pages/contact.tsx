import React from 'react'
import {graphql, PageProps} from 'gatsby'
import {ContactLayout} from '../layout/ContactLayout'
import {connectPage, Field} from '@jaenjs/jaen'

const ImprintPage = connectPage(
  ({}: PageProps) => {
    return (
      <>
        <ContactLayout
          activePath='/Kontakt'
          email={
            <Field.Text name="email" defaultValue={'info@agt-guntrade.at'} />
          }
          phone={<Field.Text name="phone" defaultValue={'+43 676 3232 12'} />}
          address={
            <Field.Text
              name="address"
              defaultValue={'Reßnig 20, 9170 Ferlach'}
            />
          }
        />
      </>
    )
  },
  {
    displayName: 'ContactPage'
  }
)

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
  }
`

export default ImprintPage
