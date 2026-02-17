"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { paymentDataType, paymentSchema } from "@/schema/paymentSchema";
import { cashOrder, shippingAddress, visaOrder } from "./payment.action";
import { useContext } from "react";
import { cartContext } from "@/providers/cartContextProvider";

export default function page() {
  const route = useRouter();

  const form = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(paymentSchema),
  });

  const cart = useContext(cartContext);

  console.log("Cart Details", cart);

  async function handlePayment(values: paymentDataType) {
    console.log(values);

    const userData: shippingAddress = {
      shippingAddress: {
        phone: values.phone,
        details: values.details,
        city: values.city,
      },
    };

    if (values.type === "cash") {
      //   if (!cart.cardId) {
      //     console.log("Cart Id Noo");
      //   }
      const cashOrderData = await cashOrder(cart.cardId, userData);
      console.log("cashOrderData", cashOrderData);
    } else {
      const visaOrderData = await visaOrder(cart.cardId, userData);
      console.log("visaOrderData", visaOrderData);
      window.open(visaOrderData.session.url);
    }
  }
  return (
    <>
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl text-center my-5 font-bold text-emerald-600">
          Payment
        </h1>

        <div>
          <form onSubmit={form.handleSubmit(handlePayment)}>
            <div className="my-6">
              <Controller
                name="details"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="font-bold text-emerald-600"
                    >
                      Details
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your details"
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
                    <FieldLabel
                      htmlFor={field.name}
                      className="font-bold text-emerald-600"
                    >
                      Phone
                    </FieldLabel>
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
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="font-bold text-emerald-600"
                    >
                      City
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your city"
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
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="font-bold text-emerald-600"
                    >
                      Payment Method
                    </FieldLabel>
                    <div className="flex gap-6 mt-2">
                      <label className="flex items-center gap-2">
                        <input
                          {...field}
                          type="radio"
                          value="cash"
                          checked={field.value === "cash"}
                        />
                        Cash On Delivery
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          {...field}
                          type="radio"
                          value="credit"
                          checked={field.value === "credit"}
                        />
                        Credit Card
                      </label>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Button
              type="submit"
              className="mx-auto my-5 w-50 bg-emerald-300 hover:bg-emerald-500 text-black cursor-pointer"
            >
              Complete
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
