"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { HomeIcon, AccountCircleIcon, MenuIcon } from "../../lib/mui/icons";
import { UserInfo } from "../../types/userInfo";
import { useRouter } from "next/navigation";
import GenreList from "../sections/GenreList";

const Header: React.FC = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const data = window.localStorage.getItem("info");
    if (data) {
      const parsedInfo = JSON.parse(data);
      setUserInfo(parsedInfo);
    }
  }, []);

  const {
    isOpen: isCategoriesOpen,
    onOpen: onCategoriesOpen,
    onClose: onCategoriesClose,
  } = useDisclosure();
  const {
    isOpen: isUserMenuOpen,
    onOpen: onUserMenuOpen,
    onClose: onUserMenuClose,
  } = useDisclosure();

  const handleHome = () => {
    router.push("/user/Top");
  };

  const handleProfile = () => {
    router.push("/user/Profile");
  };

  const handleLogout = () => {
    // ローカルストレージからユーザー情報を削除
    window.localStorage.removeItem("info");

    router.push("/");
  };

  return (
    <Box
      bg="blue.500"
      px={4}
      position="fixed"
      width="100%"
      zIndex="1000"
      top="0"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="lg"
          icon={<HomeIcon />}
          aria-label="home"
          onClick={handleHome}
          bg="blue.500"
          _hover={{ bg: "blue.600" }}
        />
        <Text fontSize="xl" color="white">
          ようこそ、{userInfo ? userInfo.Username : "ゲスト"}さん
        </Text>
        <Flex alignItems="center">
          <IconButton
            size="lg"
            icon={<MenuIcon />}
            aria-label="open menu"
            onClick={onCategoriesOpen}
            bg="blue.500"
            _hover={{ bg: "blue.600" }}
          />
          <Drawer
            isOpen={isCategoriesOpen}
            placement="right"
            onClose={onCategoriesClose}
            size="lg"
          >
            <DrawerOverlay>
              <DrawerContent textAlign={"center"}>
                <DrawerCloseButton />
                <DrawerHeader>ジャンル一覧</DrawerHeader>
                <DrawerBody textAlign={"center"}>
                  <GenreList />
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
          <IconButton
            size="lg"
            icon={<AccountCircleIcon />}
            aria-label="account"
            bg="blue.500"
            _hover={{ bg: "blue.600" }}
            onClick={onUserMenuOpen}
          />
          <Drawer
            isOpen={isUserMenuOpen}
            placement="right"
            onClose={onUserMenuClose}
          >
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>ユーザーメニュー</DrawerHeader>
                <DrawerBody>
                  <Button w="100%" onClick={handleProfile} mb={2}>
                    アカウント情報
                  </Button>
                  <Button w="100%" onClick={handleLogout}>
                    ログアウト
                  </Button>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
