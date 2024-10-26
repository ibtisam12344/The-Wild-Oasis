import SignInButton from "@/app/_components/SignInButton";

export const metadata = {
  title: "login",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold">Sign in to access your guest area</h1>

      <SignInButton />
    </div>
  );
}
