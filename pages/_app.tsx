import { AppProps } from 'next/app'

// Chakra
import { ChakraProvider } from '@chakra-ui/react'
import theme  from '../styles/theme';
import RootLayout from '@/layouts/RootLayout';

// Plantilla

export default function App({ Component, pageProps }: AppProps ) {
  return(
    <ChakraProvider theme={theme}>
      <RootLayout pageProps={ pageProps }>
        <Component { ...pageProps } />
      </RootLayout>
    </ChakraProvider>
  )
}

