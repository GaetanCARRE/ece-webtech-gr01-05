import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState } from "react";

export default function LoginControlled() {
    const [data, setData] = useState({})
    const [message, setMessage] = useState(null)
    const onSubmit = function (e) {
        e.preventDefault()
        setMessage(
            <div>
                <h2 className="text-center mt-3">Form data</h2>
                <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
            </div>
        )
    }
    return (
        <>
            <Header />
            <div className='text-black'>
                <h1 className='wt-title'>
                    Login with native elements
                </h1>
                <form className="[&_span]:block [&_div]:py-3" onSubmit={onSubmit}>
                    <div>
                        <label>
                            <span>Username</span>
                            <input
                                type="text"
                                name="username"
                                value={data.username}
                                onChange={e => setData({ username: e.target.value, password: data.password })}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Password</span>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={e => setData({ username: data.username, password: e.target.value })}
                            />
                        </label>
                    </div>
                    <div>
                        <button className="bg-slate-500 hover:bg-blue-500 text-white px-3 py-2 rounded">
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
            <Footer />
        </>
    )
}