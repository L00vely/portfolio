// Header.tsx
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { GridItem, HStack, UnorderedList, Link as ChakraLink, ListItem } from '@chakra-ui/react';


import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  pageProps: {
    slug?: string;
    altSlug?: string;
    locale: string;
    altLocale: string;
  }
}




const Header: React.FC<HeaderProps> = ({ pageProps }) => {
  const { locale, altLocale, slug, altSlug } = pageProps;

  const route = useRouter()

  const { t } = useTranslation('routes');

  const sites: { name: string; link: string }[] = [
    { name: t('home'), link: '/'},
    { name: t('about'), link: '/about'},
    { name: t('projects'), link: '/projects'},
  ];

  return (
    <GridItem
      as='header'
      area="header"
      w="100%"
      bg="brand.black"
      color="colors.white"
      p="2rem"
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
    >
      <LanguageToggle slug={ slug } altSlug={ altSlug } altLocale={ altLocale } />
    </GridItem>
  );
};

export default Header;
