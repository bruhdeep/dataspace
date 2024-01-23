import Link from "next/link";

export default function Home() {
  return (
      <div className="text-black">
        Home page test demo
        <img src="" alt="" />
        <br />
        <Link href="/login">Login page</Link>
      </div>
  );
}
