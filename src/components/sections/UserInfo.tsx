"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { mockProfile } from "../../mocks/mockProfile";

const UserInfo: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const data = window.localStorage.getItem("info");
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData({
        name: parsedData.Username,
        email: parsedData.Email,
      });
    }
  }, []);

  const handleLogout = () => {
    // ローカルストレージからユーザー情報を削除
    window.localStorage.removeItem("info");

    // ログイン画面にリダイレクト
    router.push("/");
  };

  // 日付のフォーマット
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Container maxW="sm" p={4}>
      <Box p={10} boxShadow="md" borderRadius="md">
        <Heading as="h1" size="lg" mb={4}>
          アカウント
        </Heading>
        <Divider my={4} />
        <Box mb={4}>
          <Heading as="h2" size="md" mb={2}>
            メンバーシップとお支払い
          </Heading>
          <Text>
            メンバー登録年月日:{" "}
            {formatDate(new Date(mockProfile.membershipDate))}
          </Text>
        </Box>
        <Divider my={4} />
        <Box mb={4}>
          <Heading as="h2" size="md" mb={2}>
            連絡先情報
          </Heading>
          <Text>ユーザーネーム: {userData?.name}</Text>
          <Text>メールアドレス: {userData?.email}</Text>
        </Box>
        <Divider my={4} />
        <Box mb={4}>
          <Heading as="h2" size="md" mb={2}>
            プランの詳細情報
          </Heading>
          <Text>プラン: {mockProfile.plan}</Text>
        </Box>
        <Divider my={4} />
        <Box mb={4} textAlign="center">
          <Button onClick={handleLogout}>ログアウト</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UserInfo;
