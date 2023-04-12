import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";



export default function LoginNative() {
  const [message, setMessage] = useState(null)
  const onSubmit = function(e){
    e.preventDefault()
    const data = new FormData(e.target)
    setMessage(
      <div>
        <h2 className="text-center mt-3">Form data</h2>
        <pre><code>{JSON.stringify(Object.fromEntries(data.entries()), null, 2)}</code></pre>
      </div>
    )
  }
  return (
    <>
        <Header />
      <div className="text-black">
        <h1 className='wt-title'>
          Login with native elements
        </h1>
        <form onSubmit={onSubmit}>
          <div>
            <label>
              <span>Username</span>
              <input type="text" name="username" />
            </label>
          </div>
          <div>
            <label>
              <span>Password</span>
              <input type="password" name="password" />
            </label>
          </div>
          <div>
            <button type="submit" className = "bg-slate-500 hover:bg-blue-500 text-white px-3 py-2 rounded">
              Login
            </button>
          </div>
        </form>
      </div>
      {message &&
        <div className="text-black" onClick={() => setMessage(null)} role="dialog">
          <div>
            {message}
          </div>
        </div>
      }
    <Footer/>
    </>
  )
}

