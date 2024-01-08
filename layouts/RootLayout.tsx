// RootLayout.tsx
import Footer from '@/ui/Footer';
import Header from '@/ui/Header';
import { Box, Grid, GridItem, VStack } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
  pageProps: {
    locale: string;
    altLocale: string;
    slug: string;
    altSlug: string;
  };
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, pageProps }) => {

  return (
    <Grid
      gridTemplateRows=".25fr 4fr .25fr"
      gridTemplateColumns="1fr 1fr"
      templateAreas={`"header header"
        "main main"
        "footer footer"`} 
      w='100vw'
      h="100vh"
      bg="brand.primary"
      
    >
      <Header logoAlt="hola" logoSrc='/logo.png' pageProps={ pageProps }/>

      <VStack as='main' gridArea="main" spacing="0">{children}</VStack>

      <Footer />
     
    </Grid>
  );
};

export default RootLayout;
