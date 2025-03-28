"use client";

import { api } from "@/trpc/react";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const CreateInvoiceForm = () => {
  const router = useRouter();
  const [price, setPrice] = useState("");
  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  const mutation = api.invoice.createInvoice.useMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numPrice = Number(price);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(numPrice)) {
      toast.error("Price must be a number");
      return;
    }

    if (numPrice < 0.1) {
      toast.error("Price must be greater than 0");
      return;
    }

    mutation.mutate(
      {
        amount: numPrice,
      },
      {
        onSuccess(data) {
          const { id } = data;
          router.push(`/invoice/${id}`);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        variant="bordered"
        label="Enter Amount in TRX"
        onInput={handleOnInput}
        value={String(price)}
      />
      <Button isLoading={mutation.isPending} type="submit">
        Submit
      </Button>
    </form>
  );
};
