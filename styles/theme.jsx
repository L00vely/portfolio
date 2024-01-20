import { extendTheme } from "@chakra-ui/react";
import "@fontsource/raleway"; 

const colorConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}


const colors = {
    brand: {
      "primary": '#1D1D1D',
      "secondary": '#FB8D13'
    },
    
    colors: {
      "gray": '#414042',
      "white": '#F3F3F3'
    }
};
  
const globalStyles = {
    global: {
      body: {
        fontFamily: "Raleway, sans-serif",
      },

      h1: {
        fontSize: ["sm", "md", "lg", "3xl", "4xl"],
        fontWeight: "bold"
      },

      h2: {
        fontSize: ["md", "md", "lg", "xl", "2xl"],
        fontWeight: "bold"
      },

      h3: {
        fontSize: ["sm", "sm", "md", "lg", "xl"],
        fontWeight: "bold"
      },
      
      
      p:{
          fontSize: ["xs", "md", "md", "lg", "lg"],
      },

      li:{
        fontSize: ["xs", "md", "md", "lg", "lg"],
      },

      strong: {
        fontSize: ["xs", "md", "md", "lg", "lg"],
        fontWeight: "bold",
      },

      span: {
        fontSize: ["xs", "md", "md", "lg", "lg"],
      }
      
  }
}

const theme = extendTheme({
    colors,
    styles: globalStyles,
    ...colorConfig 
});

export default theme;