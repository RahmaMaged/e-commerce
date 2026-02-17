"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUpDataType, signUpSchema } from "@/schema/signUpschema";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { signUpAction } from "../_actions/signUp.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function page() {
  const route = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  async function handleSignUp(values: signUpDataType) {
    const x = await signUpAction(values);
    console.log(x);

    if (x) {
      toast.success("SignedUp successfully", { position: "top-center" });
      route.push("/login");
    } else {
      toast.error("Error");
    }
  }
  return (
    <>
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl text-center my-5 font-bold text-emerald-600">
          Sign Up
        </h1>

        <div>
          <form onSubmit={form.handleSubmit(handleSignUp)}>
            <div className="mt-10 mb-6">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>User Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your name"
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
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>User Phone</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="tel"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your phone"
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

            <div className="my-6">
              <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Passowrd Confirmation
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter password again to confirm"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Button className="mx-auto my-5 w-50 bg-emerald-300 hover:bg-emerald-500 text-black cursor-pointer">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
