import Image from "next/image";
import Link from "next/link";

import bg from "@/public/bg.png";

export default function Page() {
  return (
    <main className="mt-24">
      {/* fill will fill the entire page both side. like as we use background image in css we use here fill to use backgorund image , for this we need to give position relative to the parent */}
      {/* placeholder="blur" when we load or realod website it will se blur unless it is loaded when it is loaded it will display the actual image */}
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
