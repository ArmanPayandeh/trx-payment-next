"use client";

import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { CreateInvoiceForm } from "./invoice-form";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>Create TRX Payment</CardHeader>
        <Divider />
        <CardBody>
          <CreateInvoiceForm />
        </CardBody>
      </Card>
    </div>
  );
};

export default page;
