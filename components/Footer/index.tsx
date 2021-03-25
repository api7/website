import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { NextPage } from "next";
import { TFunction } from "next-i18next";
import { I18nContext } from "react-i18next";

import { Logo } from '../Logo'
import { SocialLink } from './SocialLink'
import { EN_US_links, ZH_CN_links, socialLinks } from './_data'
import { LinkGroup } from './LinkGroup'
import { SubscribeForm } from '../SubscribeForm'
import { withTranslation } from "../../i18n";

type Props = {
  t: TFunction;
};

const App: NextPage<Props, any> = ({ t }) => {
  const {
    i18n: { language },
  } = useContext(I18nContext);

  const links = language === "zh-CN" ? ZH_CN_links : EN_US_links

  return (
    <Box as="footer" bg={mode('gray.50', 'gray.800')}>
      <Box
        maxW={{ base: 'xl', md: '7xl' }}
        mx="auto"
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '20' }}
      >
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          justify="space-between"
          mb={{ base: '10', lg: '16' }}
          align="flex-start"
          id="top"
        >
          <SimpleGrid
            flex="1"
            w={{ base: 'full', lg: 'auto' }}
            maxW={{ lg: '3xl' }}
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={{ base: '12', md: '10' }}
            fontSize="sm"
            marginEnd={{ md: '4', lg: '16' }}
          >
            {links.map((group, idx) => (
              <LinkGroup key={idx} data={group} />
            ))}
          </SimpleGrid>
          <Box
            flex="2"
            maxW={{ lg: '420px' }}
            ml={{ lg: 'auto' }}
            fontSize="sm"
            mt={{ base: '12', lg: 0 }}
          >
            <Text casing="uppercase" mb={{ base: 6, lg: 10 }} fontWeight="bold" letterSpacing="wide">
              {
                language === 'zh-CN' ? '邮件订阅' : 'Subscribe'
              }
            </Text>
            <Text lineHeight="tall">
              {
                language === 'zh-CN' ? '订阅支流科技邮件列表，及时获得产品最新动态与相关资源。' : 'Get Overflow resources and curated content delivered straight into your inbox. Be the first to learn the news about new features and product updates.'
              }
            </Text>
            <SubscribeForm language={language} />
          </Box>
        </Flex>

        <Flex
          direction={{ base: 'column-reverse', lg: 'row' }}
          align={{ base: 'flex-start', lg: 'center' }}
          justify="space-between"
          fontSize="sm"
        >
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: '4', md: '12' }}
            mt={{ base: '8', lg: 0 }}
            w={{ base: 'full', lg: 'auto' }}
            justify={{ base: 'space-between', lg: 'flex-start' }}
            align={{ base: 'flex-start', md: 'center' }}
          >
            <Logo />
            <HStack spacing="2" mt={{ lg: '8' }} as="ul" listStyleType="none">
              {socialLinks.map((link, idx) => (
                <Box as="li" key={idx}>
                  <SocialLink href={link.href}>
                    <Box srOnly>{link.label}</Box>
                    {link.icon}
                  </SocialLink>
                </Box>
              ))}
            </HStack>
          </Stack>
          <Box>
            {
              language === 'zh-CN' ? (
                <Text>版权所有 &copy; {new Date().getFullYear()} 深圳支流科技有限公司 保留一切权利</Text>
              ) : (
                <Text>Copyright &copy;Shenzhen Zhiliu Technology Co.,Ltd {new Date().getFullYear()}. All rights reserved.</Text>
              )
            }
            {
              language === 'zh-CN' && (
                <Text mt="2">
                  <Box as="a" href="https://beian.miit.gov.cn/#/Integrated/index">粤ICP备19060840号</Box>
                </Text>
              )
            }
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

App.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default withTranslation("")(App);