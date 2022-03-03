import {
  Box,
  Heading,
  Img,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { TextLink } from "../text-link";
import { DividerWithText } from "./divider-with-text";
import { EmailSignIn } from "./email-sign-in";
import { OAuthSignIn } from "./oauth-sign-in";
import { SignInError } from "./sign-in-error";
import { useSignIn } from "./sign-in.context";

const BigLogo = () => (
  <NextLink href="/">
    <Img src="/static/img/ukr.svg" h="9" mb="10" mx="auto" cursor="pointer" />
  </NextLink>
);

const Header = () => (
  <Box mb="8" textAlign="center">
    <Heading
      size="lg"
      mb="2"
      fontWeight="bold"
      color={mode("gray.900", "white")}
    >
      Sign in to LabelFlow
    </Heading>
    <Text fontSize="lg" color={mode("gray.600", "gray.400")}>
      Get a free account. No credit card required
    </Text>
  </Box>
);

const Disclaimer = () => (
  <Text textAlign="center" my="6" fontSize="xs" color="gray.400">
    <Text>By continuing, you agree to LabelFlow</Text>
    <TextLink href="/legal/terms-and-conditions">
      Terms of Service and Privacy Policy
    </TextLink>
  </Text>
);

const Status = () => {
  const { error } = useSignIn();
  return error ? <SignInError /> : <Disclaimer />;
};

export const SignIn = () => (
  <Box w="full">
    <BigLogo />
    <Header />
    <OAuthSignIn />
    <DividerWithText>or sign in with email</DividerWithText>
    <EmailSignIn />
    <Status />
  </Box>
);
