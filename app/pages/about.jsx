import Link from "next/link"
export function About() {
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
        ici c est la page about 
        cool non ?
      </h1></>
  )
}

export default About