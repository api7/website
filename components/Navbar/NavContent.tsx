import {
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  useDisclosure,
  VisuallyHidden,
  useColorModeValue as mode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Logo } from '@/components/Logo'
import { NavLink } from './NavLink'
import { NavMenu } from './NavMenu'
import { Submenu } from './Submenu'
import { ToggleButton } from './ToggleButton'
import { Link } from './_data'
import { getRequestDemoLink } from '../../helper'

type Props = FlexProps & {
  links: Link[];
  language?: string
}

const MobileNavContext = ({ links, language, ...props }: Props) => {
  const { isOpen, onToggle } = useDisclosure()

  const [zhLang, setZhLang] = useState("/zh");
  const [enLang, setEnLang] = useState("/en");

  useEffect(() => {
    setEnLang(location.pathname.replace("/zh", "/en"));
    setZhLang(location.pathname.replace("/en", "/zh"));
  }, []);

  return (
    <>
      <Flex align="center" justify="space-between" className="nav-content__mobile" {...props}>
        <Box flexBasis="6rem">
          <ToggleButton isOpen={isOpen} onClick={onToggle} />
        </Box>
        <Box as="a" rel="home" mx="auto">
          <Logo />
        </Box>
        <Box visibility={{ base: 'hidden', sm: 'visible' }}>
          <Button as="a" colorScheme="blue">
            {language === 'zh-CN' ? '立即开始' : 'Get Started'}
          </Button>
        </Box>
      </Flex>
      <NavMenu animate={isOpen ? 'open' : 'closed'}>
        {links.map((link, idx) =>
          link.children ? (
            <Submenu.Mobile key={idx} link={link} />
          ) : (
            <NavLink.Mobile key={idx} href={link.href}>
              {link.label}
            </NavLink.Mobile>
          ),
        )}
        <Button as="a" href={getRequestDemoLink(language)} target="_blank" colorScheme="blue" w="full" size="lg" mt="5" _hover={{ color: "var(--chakra-colors-white)", background: "var(--chakra-colors-blue-600)", textDecoration: "none" }}>
          {language === 'zh-CN' ? '申请试用' : 'Request Demo'}
        </Button>

        <Menu>
          <MenuButton width="full" as={Button} mt="2">
            {language === 'zh-CN' ? 'English' : '简体中文'}
          </MenuButton>
          <MenuList>
            <MenuItem as="a" href={zhLang}>简体中文</MenuItem>
            <MenuItem as="a" href={enLang}>English</MenuItem>
          </MenuList>
        </Menu>
      </NavMenu>
    </>
  )
}

const DesktopNavContent = ({ links, language, ...props }: Props) => {
  const [zhLang, setZhLang] = useState("/zh");
  const [enLang, setEnLang] = useState("/en");

  useEffect(() => {
    setEnLang(location.pathname.replace("/zh", "/en"));
    setZhLang(location.pathname.replace("/en", "/zh"));
  }, []);

  return (
    <Flex className="nav-content__desktop" align="center" justify="space-between" {...props}>
      <Box as="a" href="#" rel="home">
        <VisuallyHidden>API7</VisuallyHidden>
        <Logo />
      </Box>
      <HStack as="ul" id="nav__primary-menu" aria-label="Main Menu" listStyleType="none">
        {links.map((link, idx) => (
          <Box as="li" key={idx} id={`nav__menuitem-${idx}`}>
            {link.children ? (
              <Submenu.Desktop link={link} />
            ) : (
              <NavLink.Desktop href={link.href}>{link.label}</NavLink.Desktop>
            )}
          </Box>
        ))}
      </HStack>
      <HStack spacing="8" minW="240px" justify="space-between">
        <Button as="a" href={getRequestDemoLink(language)} target="_blank" colorScheme="blue" fontWeight="bold" _hover={{ color: "var(--chakra-colors-white)", background: "var(--chakra-colors-blue-600)", textDecoration: "none" }}>
          {language === 'zh-CN' ? '申请试用' : 'Request Demo'}
        </Button>

        <Menu>
          <MenuButton as={Button}>
            {language === 'zh-CN' ? 'Language' : '切换语言'}
          </MenuButton>
          <MenuList>
            <MenuItem as="a" href={zhLang}>简体中文</MenuItem>
            <MenuItem as="a" href={enLang}>English</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  )
}

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent,
}
