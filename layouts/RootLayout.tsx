// RootLayout.tsx
import Footer from '@/ui/Footer';
import {  Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import Drawer from '@/ui/Drawer';

interface RootLayoutProps {
  children: ReactNode;
  pageProps: {
    locale: string;
    locales: string[];
    altLocale: string;
    slug: string;
    altSlug: string;
  };
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, pageProps }) => {

  const gridTemplateAreas = useBreakpointValue({
    base: `"drawer"
    "main"
    "footer"`,

    md: `"drawer main"
    "drawer footer"`,
    
    lg: `"drawer main"
    "drawer footer"`,

    xl: `"drawer main"
    "drawer footer"`
  });

  const gridTemplateRows = useBreakpointValue({
    base: ".25fr 4fr .25fr",

    md: "2fr .25fr",
    
    lg: "2fr .25fr",

    xl: "2fr .25fr"
  })

  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",

    md: "15rem 1fr",
    
    lg: "15rem 1fr",

    xl: "15rem 1fr"
  })

  return (
    <Grid
      templateRows= {gridTemplateRows}
      templateColumns={ gridTemplateColumns }
      templateAreas={ gridTemplateAreas } 
      w='100vw'
      h="100vh"
      overflowX="hidden"
    >
      <Drawer pageProps={ pageProps }/>

      <GridItem 
        as='main' 
        gridArea="main"
        
      > 
        { children }
      </GridItem>

      <Footer />
     
    </Grid>
  );
};

export default RootLayout;
