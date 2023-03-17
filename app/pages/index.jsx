//tailwind UI,materielUI, tailwind next.js install
import Link from "next/link"

function HomePage() {
    return (
      <><ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/articles">Articles</Link>
        </li>
        <li>
          <Link href="/about">About Us</Link>
        </li>
        <li>
          <Link href="/contacts">Contact Us</Link>
        </li>
      </ul><h1 className="text-3xl font-bold underline">
          bawbaw!
        </h1></>
    )
}
  export default HomePage