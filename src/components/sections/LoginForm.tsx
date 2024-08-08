"use client";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema } from "../../lib/validators/loginSchema";

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = (data: LoginFormValues) => {
    const key = "info";
    const userInfo = {
      Username: data.username,
      Email: data.email,
      Password: data.password,
    };
    const val = JSON.stringify(userInfo);
    window.localStorage.setItem(key, val);

    // ログイン成功後に遷移
    router.push("user/Top");
  };

  return (
    <Container centerContent>
      <Box
        p={10}
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
        width={"full"}
      >
        <Text fontSize="large" textAlign="center" mb={10}>
          アカウントを作成
        </Text>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.username} maxW="100%">
            <FormLabel htmlFor="username" fontSize={"small"}>
              ユーザー名
            </FormLabel>
            <Input id="username" {...register("username")} />
            {errors.username ? (
              <Text color="red.500" display="block" m={2} textAlign={"center"}>
                {errors.username.message as string}
              </Text>
            ) : (
              <Text m={2}>{"　"}</Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.email} width="100%">
            <FormLabel htmlFor="email" fontSize={"small"}>
              メールアドレス
            </FormLabel>
            <Input id="email" type="email" {...register("email")} />
            {errors.email ? (
              <Text color="red.500" display="block" m={2} textAlign={"center"}>
                {errors.email.message as string}
              </Text>
            ) : (
              <Text m={2}>{"　"}</Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.password} width="100%">
            <FormLabel htmlFor="password" fontSize={"small"}>
              パスワード
            </FormLabel>
            <Input id="password" type="password" {...register("password")} />
            {errors.password ? (
              <Text color="red.500" display="block" m={2} textAlign={"center"}>
                {errors.password.message as string}
              </Text>
            ) : (
              <Text m={2}>{"　"}</Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.confirmPassword} width="100%">
            <FormLabel htmlFor="confirm-password" fontSize={"small"}>
              パスワード確認
            </FormLabel>
            <Input
              id="confirm-password"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword ? (
              <Text color="red.500" display="block" m={2} textAlign={"center"}>
                {errors.confirmPassword.message as string}
              </Text>
            ) : (
              <Text m={2}>{"　"}</Text>
            )}
          </FormControl>
          <Button onClick={handleSubmit(onSubmit)} mt={4} width="full">
            サインアップ
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default LoginForm;
