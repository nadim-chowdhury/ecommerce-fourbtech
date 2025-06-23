import MainHeader from "@/components/common/main-header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainHeader />
      {children}
    </div>
  );
}
