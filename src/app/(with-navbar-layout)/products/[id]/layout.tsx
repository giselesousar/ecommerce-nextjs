import { Loading } from "@/app/components";
import { Suspense } from "react";

export const metadata = {
  title: "Detalhes do produto",
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <div>{children}</div>;
    </Suspense>
  );
}
