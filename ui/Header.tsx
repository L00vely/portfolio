// Header.tsx
import { GridItem } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  logoSrc: string;
  logoAlt: string;
  pageProps: {
    slug?: string;
    altSlug?: string;
    locale: string;
    altLocale: string;
  }
}

const Header: React.FC<HeaderProps> = ({ logoSrc, logoAlt, pageProps }) => {
  const { locale, altLocale, slug, altSlug } = pageProps;

  return (
    <GridItem
      as='header'
      area="header"
      w="100vw"
      bg="brand.black"
      color="colors.white"
      p="2rem"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Link href="/" locale={ locale}>
        <Image
          src={ logoSrc }
          alt={ logoAlt || 'logo' }
          width="64"
          height="64"
        />
      </Link>

      <LanguageToggle slug={ slug } altSlug={ altSlug } altLocale={ altLocale } />

    </GridItem>
  );
};

export default Header;
