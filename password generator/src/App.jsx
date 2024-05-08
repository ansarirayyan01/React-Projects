import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charactersAllowed) str += "@!$&_`~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charactersAllowed, setPassword]);

  const copypasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charactersAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-600  my-10 ">
        <h1 className="text-[25px] text-orange-500 text-center my-3">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            className="outline-none w-full py-1 px-3"
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copypasswordToClipboard}
            className="bg-orange-500 mx-2 w-[70px] rounded-md text-white shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 text-orange-500">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInputt"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label className="text-orange-500" htmlFor="numberInput">
              Numbers
            </label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charactersAllowed}
              id="charactersInput"
              onChange={() => {
                setCharactersAllowed((prev) => !prev);
              }}
            />
            <label className="text-orange-500" htmlFor="charactersInput">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
