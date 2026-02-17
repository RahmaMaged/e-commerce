"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  forgetPasswordDataType,
  forgetPasswordSchema,
} from "@/schema/forgetPasswordSchema";
import { toast } from "sonner";
import { forgetPassword } from "../_actions/forgetPassword.action";
import { useRouter } from "next/navigation";

export default function page() {
  const route = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPasswordSchema),
  });

  async function handle(values: forgetPasswordDataType) {
    const data = await forgetPassword(values.email);
    console.log("Returned Data", data);

    if (data.statusMsg == "success") {
      toast.success(data.message);
      console.log("Success");

      route.push("/verify-code");
    } else {
      toast.error(data?.message);
      console.log("Failed");
    }
  }
  return (
    <>
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl my-5">Enter your email</h1>

        <div>
          <form onSubmit={form.handleSubmit(handle)}>
            <div className="my-6">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
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

            <Button className="mx-auto my-5 w-50 bg-emerald-300 hover:bg-emerald-500 text-black cursor-pointer">
              Send
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
