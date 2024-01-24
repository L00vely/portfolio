import Link from "next/link";
import { useRouter } from "next/router";
import { Image, Button, Icon, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from '@chakra-ui/react';
import { GrLanguage } from "react-icons/gr"
import useTranslation from 'next-translate/useTranslation'

interface LanguageToggleProps {
    slug?: string;
    altSlug?: string;
    altLocale: string;
    locale: string,
  }

const LanguageToggle: React.FC<LanguageToggleProps> = ({ slug, altSlug, locale, altLocale }) => {

    const router = useRouter();

    // Obtener el path completo
    const fullPath = router.asPath;

    // Comprobar si el path contiene "category"
    // const hasCategorySubroute = fullPath.includes('/category/');
    
    // Comprobar si el path contiene "author"
    // const hasAuthorSubroute = fullPath.includes('/author/');

    // Creamos la estructura del link
    // const linkPath = slug ? ( hasCategorySubroute ? `/blog/category/${ altSlug }` :  hasAuthorSubroute ? `/blog/author/${ altSlug }` : `/blog/${ altSlug }`) : "/blog"

    // Traducir el label del botón de idiomas
    const { t } = useTranslation('common')

    const languageMapping: Record<string, string> = {
        'en-US': t('englishLabel'),
        'es': t('spanishLabel'),
    }

    // Get the localized language from the mapping object or return the original language code if not mapped
    const localizedLanguage = languageMapping[locale] || locale;

    return (
        <Menu>
           
            <MenuButton as={Button} w="100%" rightIcon={<GrLanguage/>}>
                { localizedLanguage  }
            </MenuButton>
            <MenuList width="fit-content" bg="brand.secondary" p="0rem">
                {   
                    Object.entries(languageMapping).map(([key, value]) => (
                        <Link 
                            href={ fullPath } 
                            locale={ key } 
                            key={ value }
                        >
                            <MenuItem
                                fontWeight="bold"
                                bg="colors.white"
                                color="colors.gray"
                                h="100%"
                                _hover={{ 
                                    backgroundColor: 'colors.white',
                                    color: 'brand.secondary'
                                }}
                            >
                                <Text as="p" fontSize="sm"> { value } </Text>
                            </MenuItem>
                    
                        </Link>
                    ))
                            
                    //     )
                    // })
                }
               
            </MenuList>
            
            {/* <Link href={ fullPath } locale={ altLocale }>
                <Button 
                    leftIcon={<GrLanguage />} 
                    w="100%"
                    color="colors.gray" 
                    backgroundColor="colors.white" 
                    variant='ghost'
                    _hover={{ 
                        backgroundColor: 'colors.white',
                        color: 'brand.secondary'
                    }}
                >
                    <Text as="p" fontSize="sm"> { label } </Text>
                </Button>
        
            </Link> */}
        </Menu>
        
    
    )
}

export default LanguageToggle