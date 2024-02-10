// Header.tsx
import { VStack, Image, Text, Link as ChakraLink, UnorderedList, Avatar, useMediaQuery, useBreakpointValue, Show, HStack, Button, Menu, MenuButton, IconButton, MenuList, MenuItem, Collapse, useDisclosure, Tooltip, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React, { memo, useState } from 'react';
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router';
import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import { ExternalLinkIcon, HamburgerIcon } from '@chakra-ui/icons';
import useGetLinks from '@/hooks/useGetLinks';
import ColorModeToggle from './ColorModeToggle';

interface DrawerProps {
  pageProps: {
    slug?: string;
    altSlug?: string;
    locale: string;
    locales: string[];
    altLocale: string;
  }
}

const Drawer: React.FC<DrawerProps> = ({ pageProps }) => {
  const { locales, locale, slug, altSlug, altLocale } = pageProps;
  const { t } = useTranslation();

  const bg = useColorModeValue("brand.secondary", "brand.primary")

  const colorModeTitle = useColorModeValue(t('common:darkMode'), t('common:lightMode'))

  const { memorizedLinks } = useGetLinks(locale)

  const route = useRouter()

  const sites: { name: string; link: string }[] = [
    { name: t('routes:home'), link: '/'},
    { name: t('routes:about'), link: '/about'},
    { name: t('routes:projects'), link: '/projects'},
  ];

  const { isOpen, onToggle } = useDisclosure()

  const isMobile = useBreakpointValue({
    base: true,

    md: false,
    
    lg: false,

    xl:  false
  })

  return (
    <VStack
      p="1rem"
      h="100%"
      gridArea="drawer"
      bg= { bg }
      color= "colors.white"
    >
      
      <Show below="md">
        <IconButton aria-label='Menu' icon={<HamburgerIcon />} onClick={onToggle}/>
      </Show>

    
      <Collapse in={isOpen || !isMobile} animateOpacity>
        <VStack w="100%" spacing="2rem" >
          <Link href='/' locale={locale}>
            <Text as='h2' >David Perales</Text>
          </Link>
          
          <Avatar bg="colors.white" size='2xl' name='David Perales Avatar' src='https://images.ctfassets.net/29rp0bxqbuvh/1LN6pyw9NzC4pDPiBAYTEF/98f2982d922a677f24f583354b5f157e/OIG.2RhaA95CR4v-removebg-preview.png' />{' '}
          
          <HStack w="100%" p="1rem">
            {
              memorizedLinks.map((link, index) =>{ 
                const { tooltip, link: url, iconLink: icon } = link

                const openExternalLink = () => {
                  window.open(url, '_blank');
                };

                return (
                  <Tooltip label={ tooltip } aria-label={ tooltip } key={ index }>
                    <Image 
                      h="8"
                      w="8"
                      src={ icon } 
                      alt={ tooltip } 
                      cursor="pointer" 
                      onClick={openExternalLink}
                    />         
                  </Tooltip>
                )
              })
            }
          </HStack>

          <UnorderedList 
            listStyleType="none"
            display="flex"
            flexDirection="column"
            gap="1rem"
            w="100%"
            alignSelf="flex-start"
          >
            {
              sites.map((site, index) =>{ 
                const isActive = route.pathname === site.link;

                return(
                  <Link 
                    key={index} 
                    href={site.link} 
                    locale={ locale }
                  >
                    
                    <ChakraLink
                      as="li"
                      color="colors.white"
                      fontWeight="b"
                      borderBottom="2px"
                      borderColor={isActive ? 'colors.white' : 'transparent'}
                      transition="border-color 0.25 s ease-in-out"
                      _hover={{ borderColor: 'colors.white' }}  
                    >
                      {site.name}
                    </ChakraLink>
                    
                  </Link>
                )
            })
            }
          </UnorderedList>

          <VStack w="100%" h="100%" spacing="1rem">
           
            <LanguageToggle 
              locale={ locale } 
              slug={ slug } 
              altSlug={ altSlug } 
              altLocale={ altLocale } 
            />

            <Text>{ colorModeTitle }</Text>
            <ColorModeToggle />
          </VStack>
        </VStack>
      </Collapse>
    </VStack>
  );
};

export default Drawer;
