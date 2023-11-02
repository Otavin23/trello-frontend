import { extendTheme } from '@chakra-ui/react'

const themeChakra = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#F8F9FD',
      },
    },
  },

  fonts: {
    heading: `Noto Sans, sans-serif`,
    body: `Noto Sans, sans-serif`,
  },

  components: {
    Container: {
      baseStyle: {
        maxW: '1400px',
        w: '95%',
      },

      variants: {
        mainLine: {
          m: '0',
          p: '0',
        },
      },
    },
  },

  breakpoint: {
    sm: '480px',
    md: '725px',
    lg: '990px',
    xl: '1250px',
  },
})

export { themeChakra }
