import {Story, Meta} from '@storybook/react'

import IndexPage, {IndexPageProps} from '../pages/index'

export default {
  title: 'Stories/IndexPage',
  component: IndexPage
} as Meta

const Template: Story<IndexPageProps> = args => <IndexPage {...args} />

export const Page = Template.bind({})
Page.args = {}