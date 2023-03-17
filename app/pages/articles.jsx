import Link from "next/link"

export function Articles() {
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
      </ul><ul>
      <li>
        <Link href="/articles/ps">Playstation 5</Link>
      </li>
      <li>
        <Link href="/articles/xbox">Xbox One </Link>
      </li>
      <li>
        <Link href="/articles/switch">Nintendo Switch </Link>
      </li>
        </ul></>
    )
  }
  
export default Articles
  