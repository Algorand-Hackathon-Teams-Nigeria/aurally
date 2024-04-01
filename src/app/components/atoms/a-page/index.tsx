import { cn } from "@lib/styles/utils";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Page: React.FC<Props> = ({ children, className }) => {
  return (
    <main
      className={cn(
        "relative min-h-screen mt-24 px-6 flex flex-col gap-28 lg:gap-52 lg:px-36 py-10 lg:py-32",
        className,
      )}
    >
      {children}
    </main>
  );
};

export default Page;
