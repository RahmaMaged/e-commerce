"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { resetCodeDataType, resetCodeSchema } from "@/schema/resetCodeSchema";
import { resetCode } from "../_actions/resetCode.action";

export default function page() {
  const form = useForm({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(resetCodeSchema),
  });

  async function handle(values: resetCodeDataType) {
    // toast.promise(forgetPassword(values.email), {
    //   loading: "Sending reset email...",
    //   success: "If this email exists, a reset link was sent.",
    //   error: "Something went wrong",
    // });

    const data = await resetCode(values.resetCode);
    console.log("Returned Data", data);
  }
  return (
    <>
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl my-5">Enter your verification code</h1>

        <div>
          <form onSubmit={form.handleSubmit(handle)}>
            <div className="my-6">
              <Controller
                name="resetCode"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your verification code"
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
              Verify
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
