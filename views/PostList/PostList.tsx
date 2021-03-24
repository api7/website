import React from "react";
import { NextPage } from "next";
import { TFunction } from "next-i18next";
import { NextSeo } from "next-seo";
import { Box, Heading, SimpleGrid, Text, useColorModeValue as mode } from '@chakra-ui/react'

import { withTranslation } from "../../i18n";
import { SWrapper } from "./style";
import blogData from "../../data/blog.json"
import usercaseData from "../../data/usercase.json"
import { BlogCard } from "./components/PostListCard/BlogCard";

type Props = {
  t: TFunction;
  type: "usercases" | "blog";
  list: Post[];
};

const PostList: NextPage<Props, any> = ({ t, type, list = [] }) => {
  return (
    <SWrapper>
      <NextSeo title={t(`common:${type}`)} />
      <Box as="section" py="24" borderTop="2px solid #F7FAFC">
        <Box maxW={{ base: 'xl', md: '2xl', lg: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
          <Box textAlign="center" maxW="600px" mx="auto">
            <Heading size="2xl" fontWeight="extrabold" letterSpacing="tight">
              {t(`common:${type}`)}
            </Heading>
            <Text mt="4" fontSize="lg" color={mode('gray.600', 'gray.400')}>
              {t("about:about-box-desc4")}
            </Text>
          </Box>
          <SimpleGrid mt="14" columns={{ base: 1, lg: 3 }} spacing="14">
            {list.map((item, index) => (
              <BlogCard boxShadow="base" rounded="md" key={index} data={item} />
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </SWrapper>
  );
};

PostList.getInitialProps = async (context) => {
  const { pathname } = context;
  let type = pathname.slice(1);

  if (type === "usercases") {
    type = "usercase";
  }

  const { lng = "zh-CN" } = (context.req as any) || {};

  const posts = type === "blog" ? blogData[lng] : usercaseData[lng];

  return {
    namespacesRequired: ["common", "about"],
    type,
    list: posts,
  };
};

export default withTranslation("postlist")(PostList as any);
