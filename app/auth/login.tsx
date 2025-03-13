// app/auth/login.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";

type FormData = {
  username: string;
  password: string;
};

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(validationSchema) });

  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    if (result && !result.error) {
      // Redirect to the home page after successful login
      router.push("/");
    } else {
      // Set error message on failure
      setLoginError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              {...register("username")}
              placeholder="Enter your username"
              className="mt-1 p-2 w-full border rounded"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="mt-1 p-2 w-full border rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {loginError && (
            <p className="text-red-500 text-center mb-4">{loginError}</p>
          )}

          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
