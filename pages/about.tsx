/* eslint-disable react/no-children-prop */
import Head from 'next/head'
import { Card, Flex, Heading, Text, Image, Grid, HStack, Box, VStack, ScaleFade, useDisclosure, Button, Tooltip, Collapse, Divider, useColorModeValue } from '@chakra-ui/react'
import { CalendarIcon, DownloadIcon, ExternalLinkIcon } from '@chakra-ui/icons';

import useTranslation from 'next-translate/useTranslation';
import Section from '@/components/Section';
import useGetSkills from '@/hooks/useGetSkills';
import { ModificableCard } from '@/components';
import { transformDate } from '@/utils/transformDate';
import useGetCertificates from '@/hooks/useGetCertificates';

interface Props {
  locale: string;
  altLocale: string;
  locales: string[];
}

export default function Home(props: Props) {

  const { isOpen, onToggle } = useDisclosure()
  
  const { locale, locales, altLocale } = props;

  const { t } = useTranslation('pages')

  const title = t('home');
  const certificatesTitle = t('certificates');
  const skillsTitle = t('skills');

  const { memorizedSkills } = useGetSkills(locale, altLocale);

  const { memorizedCertificates } = useGetCertificates(locale);

  const color = useColorModeValue("colors.gray", "colors.white")


  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Personal Portfolio" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      {/* SKILLS SECTION */}
      <Section
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        children={
          <>
            <Heading 
              as='h2'
              color={color}
              p=".5rem"
              w="auto"
              textAlign="center"
            > 
              { skillsTitle }
            </Heading>

            <Grid
              templateColumns={["repeat(auto-fill, minmax(5rem, 1fr))", "repeat(auto-fill, minmax(10rem, 1fr))"]}
              gap="2rem"
              w="50vw"
              justifyContent="center"
              gridAutoRows="10rem"
            >
              {
                memorizedSkills.map((skill, index) => (
                  <ModificableCard
                    key={index} 
                    w="100%" 
                    h="10rem" 
                    flexDir={'column'} 
                    backGroundColor={'colors.white'} 
                    justifyContent={'center'} 
                    alignItems={'center'}  
                    borderRadius='10%'  
                    children={
                      <>
                        <Image 
                          src={skill.icon}
                          alt={skill.name}
                          width={50}
                          height={50}
                        />
                        
                        <Text
                          color="colors.gray"
                          fontSize="md"
                          fontWeight="bold"
                        >
                            {skill.name}  
                        </Text>

                      </>
                    }                 
                  />
                )
              )
             } 
            </Grid>
          </>
        }
      />

      {/* CERTIFICATES SECTION */}
      <Section
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        children={
          <>
            <Heading 
              as='h2'
              color={color}
              p=".5rem"
              textAlign="left"
            > 
              { certificatesTitle }
            </Heading>

            <Grid
              templateColumns="repeat(auto-fill, minmax(15rem, 1fr))"
              gap="2rem"
              w="50vw"
              justifyContent="center"
              gridAutoRows="fit-content"
              
            >
              {
                memorizedCertificates.map((certificate, index) => {
                  const { month } = transformDate( certificate.date, locale)
                  const { year } = transformDate( certificate.date)

                  return (
                    <ModificableCard
                      key={index} 
                      padding='1rem'
                      w="100%" 
                      h="100%" 
                      flexDir={'column'} 
                      backGroundColor={'colors.white'} 
                      justifyContent={'center'} 
                      alignItems={'center'}  
                      borderRadius='5%'     
                      children={
                        <>
                          <Image 
                            src={ certificate.certificate.url }
                            alt={ certificate.name }
                            width="10rem"
                            height="auto"
                          />
                          
                          <Divider />

                          <HStack
                            alignSelf='flex-start'
                          >
                            <CalendarIcon />

                            <Text 
                              opacity=".75" 
                              fontSize="md"
                              fontWeight="bold"
                              
                            >
                              { `${month} ${year}` }
                            </Text>
                          </HStack>

                          <Text
                            fontSize="md"
                            fontWeight="bold"
                            alignSelf='flex-start'
                            w="100%"
                          >
                              { certificate.name }  
                          </Text>

                        </>
                      
                      } 
             
                    />
                  )
                }
              )
             } 
            </Grid>
          </>
        }
      />
    
    </>
  )
}

export async function getStaticProps(props: Props){
  const { locale, locales } = props;

  const [ altLocale ] = locales.filter(lang => lang !== locale);

  return {
    props: {
      ...props,
      altLocale
    }
  }
}