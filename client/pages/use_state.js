import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ComponentState(key, initialValue) {
    const [value, setValue] = useState(0);

    const increment = () => {
        setValue(value + 1);
    };
    return (
        <>
          <Header />
          <div className="text-black text-center">
            <h1 className="text-3xl p-5">Use State</h1>
            <button onClick={increment} className="border border-black p-2">Increment</button>
            <p className="p-5">Value: {value}</p>
          </div>
          <Footer />
        </>
      );
}
