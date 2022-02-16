const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@snek-at/storybook-addon-chakra-ui',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-gatsby'
  ],
  framework: '@storybook/react',
  core: {builder: 'webpack5'}
}
