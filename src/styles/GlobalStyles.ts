import { extendTheme } from '@chakra-ui/react';

const customTheme = {
  styles: {
    global: {
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      html: {
        fontSize: { base: "87.5%", md: "93.75%", lg: "100%" },
      },
      input: {
        paddingLeft: "25px",
      },
      'html, body': {
        '-webkit-font-smoothing': 'antialiased',
        'font-family': `'Poppins','sans-serif'`,
      },
    },
  },
}

const theme = extendTheme(customTheme);

export default theme;