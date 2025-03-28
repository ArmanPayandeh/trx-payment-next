import { Card } from "@nextui-org/react";
import { InvoiceCardWrapper } from "./_components/invoice-content-wrapper";

type Props = {
  params: {
    id: string;
  };
};

const page = (props: Props) => {
  const { params } = props;
  const { id } = params;
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Card className="w-full md:max-w-sm">
        <InvoiceCardWrapper id={id} />
      </Card>
    </div>
  );
};

export default page;
