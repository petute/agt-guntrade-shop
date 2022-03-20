import React from 'react'
import {navigate, PageProps} from 'gatsby'
import {ImprintLayout} from '../layout/ImprintLayout'

const ImprintPage = ({}: PageProps) => {
  return (
    <>
      <ImprintLayout activePath="/Impressum" />
    </>
  )
}

export default ImprintPage
