import { AppLogo } from "@/components/app-logo";
import { ReceiptWrapper } from "./_components/receipt-wrapper";

type Props = {
  params: {
    id: string;
  };
};

const page = (props: Props) => {
  const { params } = props;
  const { id } = params;
  return (
    <div className="container mx-auto flex size-full w-full max-w-screen-lg flex-col justify-center gap-2 md:gap-4 lg:gap-8">
      <div className="flex justify-center">
        <AppLogo />
      </div>
      <ReceiptWrapper id={id} />
    </div>
  );
};

export default page;
