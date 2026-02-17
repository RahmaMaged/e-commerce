"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginDataType, loginSchema } from "@/schema/loginSchema";
import { signIn } from "next-auth/react";

export default function page() {
  const route = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: loginDataType) {
    signIn("credentials", { ...values, redirect: true, callbackUrl: "/" });
  }
  return (
    <>
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl text-center my-5 font-bold text-emerald-600">
          Login Up
        </h1>

        <div>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <div className="my-6">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>User Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="my-6">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>User Password</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div>
              <p
                className="cursor-pointer text-emerald-600"
                onClick={() => {
                  route.push("/forget-password");
                }}
              >
                Forget Password
              </p>
            </div>

            <Button className="mx-auto my-5 w-50 bg-emerald-300 hover:bg-emerald-500 text-black cursor-pointer">
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
