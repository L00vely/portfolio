import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Text } from '@chakra-ui/react';
import { GrLanguage } from "react-icons/gr"
import useTranslation from 'next-translate/useTranslation'

interface LanguageToggleProps {
    slug?: string;
    altSlug?: string;
    altLocale: string;
  }

const LanguageToggle: React.FC<LanguageToggleProps> = ({ slug, altSlug, altLocale }) => {

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
    const label = t('label');

    return (
        <Box w="100%">
            <Link href={ fullPath } locale={ altLocale }>
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
        
            </Link>
        </Box>
        
    
    )
}

export default LanguageToggle