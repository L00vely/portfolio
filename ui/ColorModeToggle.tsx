
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Icon, useColorMode, useColorModeValue } from '@chakra-ui/react';


interface ColorModeToggleProps {
   
  }

const ColorModeToggle: React.FC<ColorModeToggleProps> = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    const bg =  useColorModeValue("brand.primary", "brand.secondary")

    const color = useColorModeValue("colors.white", "colors.white")

    const hover = useColorModeValue(
        { 
            backgroundColor: { bg },
            color: 'colors.white'
        }, 
        { 
            backgroundColor: { bg },
            color: 'colors.white'
        }
    )

    const buttonIcon = useColorModeValue(<MoonIcon />, <SunIcon />);

    return (
        <Button 
            transition="background-color 0.3s ease"
            leftIcon={ buttonIcon }
            w="100%"
            color={ color }
            backgroundColor= { bg }
            variant='ghost'
            _hover={ hover }
            onClick={ toggleColorMode }
        >
            
        </Button>
    )
}

export default ColorModeToggle