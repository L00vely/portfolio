import { AppProps } from 'next/app'

// Chakra
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme  from '../styles/theme';
import RootLayout from '@/layouts/RootLayout';

// Plantilla

export default function App({ Component, pageProps }: AppProps ) {
  return(
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RootLayout pageProps={ pageProps }>
        <Component { ...pageProps } />
      </RootLayout>
    </ChakraProvider>
  )
}

