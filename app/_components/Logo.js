import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

// Image from next.js , it is optimized
// benfits 1) serves correctly sized images in modern format (ex: webp) when it is neccessary
// 2) prevents layout shift beacuse it forces us to specify the exact height and width
// 3) lazy load the images only when they enter the viewport

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* import logo from "@/public/logo.png";
      <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}

      <Image
        src={logo}
        quality={100}
        height="60"
        width="60"
        alt="The Wild Oasis logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
