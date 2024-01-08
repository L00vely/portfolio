// Header.tsx
import { GridItem } from '@chakra-ui/react';
import React from 'react';
import useTranslation from 'next-translate/useTranslation'

interface FooterProps {

}

const Footer: React.FC<FooterProps> = () => {

  // Traducir el label del botón de idiomas
  const { t } = useTranslation('common')
  const label = t('footer');

  return (
    <GridItem
      as='footer'
      area="footer"
      w="100vw"
      bg="brand.primary"
      color="colors.white"
      p="2rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      { label }

    </GridItem>
  );
};

export default Footer;
