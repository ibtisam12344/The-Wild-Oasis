import { signInAction } from "../_lib/action";

export default async function SignInButton() {
  // Server action allows us to connect any interactivity in server component, especially in forms
  // We can't use onClick on server component

  return (
    <form action={signInAction}>
      <button
        type="submit"
        className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium"
      >
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}
