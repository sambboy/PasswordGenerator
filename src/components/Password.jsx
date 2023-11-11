import { useState } from "react";

function Password() {
  const [length, setLength] = useState(0);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [generated, setGenerated] = useState("");
  const [copyPass, setCopyPass] = useState(false);
  const [check, setCheck] = useState(0);

  const handleProgressChange = (e) => {
    setLength(parseInt(e.target.value));
    if (e.target.checked) {
      setCheck(check + 1);
    } else {
      setCheck(check - 1);
    }
  };

  const handleUppercaseChange = (e) => {
    setUppercase(e.target.checked);
    if (e.target.checked) {
      setCheck(check + 1);
    } else {
      setCheck(check - 1);
    }
  };

  const handleLowercaseChange = (e) => {
    setLowercase(e.target.checked);
    if (e.target.checked) {
      setCheck(check + 1);
    } else {
      setCheck(check - 1);
    }
  };

  const handleNumbersChange = (e) => {
    setNumbers(e.target.checked);
    if (e.target.checked) {
      setCheck(check + 1);
    } else {
      setCheck(check - 1);
    }
  };

  const handleSymbolsChange = (e) => {
    setSymbols(e.target.checked);
    if (e.target.checked) {
      setCheck(check + 1);
    } else {
      setCheck(check - 1);
    }
  };

  const getRandomCharacter = (type) => {
    let characters = "";
    if (type === "uppercase") {
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    } else if (type === "lowercase") {
      characters = "abcdefghijklmnopqrstuvwxyz";
    } else if (type === "numbers") {
      characters = "0123456789";
    } else if (type === "symbols") {
      characters = "!@#$%^&*()-_=+[{]};:<>,.?/|";
    }

    return characters.charAt(Math.floor(Math.random() * characters.length));
  };

  const generatePassword = () => {
    let password = "";
    const typesCount = uppercase + lowercase + numbers + symbols;
    const typesArr = [
      { type: "uppercase", count: uppercase },
      { type: "lowercase", count: lowercase },
      { type: "numbers", count: numbers },
      { type: "symbols", count: symbols },
    ].filter((type) => type.count);

    if (typesCount === 0) {
      return "";
    }

    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        password += getRandomCharacter(type.type);
      });
    }

    password = password.slice(0, length);

    return password;
  };

  const setGeneratedEl = () => {
    setGenerated(generatePassword());
  };

  // copy button

  function copyPassword() {
    navigator.clipboard.writeText(generated);
    setCopyPass(true);
    setTimeout(() => {
      setCopyPass(false);
    }, 1500);
  }

  const passwordStrength = () => {
    if (!check) return 0;
    if (length <= 4) return 1;

    let min = 0;

    if (length <= 8) {
      min = 1;
    } else if (length > 8 && length <= 12) {
      min = 2;
    } else if (length > 12 && length <= 16) {
      min = 3;
    } else {
      min = 4;
    }

    return Math.max(check, min);
  };

  const setClass = (oass, i) => {
    const baseClass =
      oass === 1 && i <= 1
        ? "bg-red"
        : oass === 2 && i <= 2
        ? "bg-orange"
        : oass === 3 && i <= 3
        ? "bg-yellow"
        : oass === 4
        ? "bg-green"
        : "";

    return baseClass + " bar";
  };

  const setStrong = (oass) =>
    oass === 1
      ? "VERY WEAK"
      : oass === 2
      ? "WEAK"
      : oass === 3
      ? "MEDIUM"
      : oass === 4
      ? "STRONG"
      : "";

  const strengthValue = passwordStrength();

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 py-8">
        <h1 className="text-2xl text-center text-gray-darker">
          Password Generator
        </h1>
        <div className="flex items-center justify-between bg-mainBg-dark px-6 py-4 mt-8 mb-4">
          <span
            id="generatedPass"
            className="text-2xl text-gray-dark opacity-25"
          >
            {generated}
          </span>
          <button
            id="copyPass"
            className="text-green"
            onClick={() => copyPassword()}
          >
            <svg
              width="21"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current"
            >
              <path d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"></path>
            </svg>
          </button>
        </div>
        <div className="bg-mainBg-dark px-6 py-4 ">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-dark">Character Length</h2>
            <span id="length" className="text-green text-2xl">
              {length}
            </span>
          </div>
          <div className="py-4">
            <input
              type="range"
              value={length}
              min="0"
              max="20"
              step="1"
              className="progress w-full"
              onChange={handleProgressChange}
            />
          </div>
          <div className="flex flex-col gap-5 py-4">
            <div className="relative flex items-center gap-4">
              <input
                className="input-check"
                type="checkbox"
                id="uppercase"
                value="uppercase"
                checked={uppercase}
                onChange={handleUppercaseChange}
              />
              <label
                htmlFor="uppercase"
                className="text-gray-dark relative cursor-pointer label-check"
              >
                Include Uppercase Letters (A-Z)
              </label>
            </div>
            <div className="relative flex items-center gap-4">
              <input
                className="input-check"
                type="checkbox"
                id="lowercase"
                value="lowercase"
                checked={lowercase}
                onChange={handleLowercaseChange}
              />
              <label
                htmlFor="lowercase"
                className="text-gray-dark relative cursor-pointer label-check"
              >
                Include Lowercase Letters (a-z)
              </label>
            </div>
            <div className="relative flex items-center gap-4">
              <input
                className="input-check"
                type="checkbox"
                id="numbers"
                value="numbers"
                checked={numbers}
                onChange={handleNumbersChange}
              />
              <label
                htmlFor="numbers"
                className="text-gray-dark relative cursor-pointer label-check"
              >
                Include Numbers (0-9)
              </label>
            </div>
            <div className="relative flex items-center gap-4">
              <input
                className="input-check"
                type="checkbox"
                id="symbols"
                value="symbols"
                checked={symbols}
                onChange={handleSymbolsChange}
              />
              <label
                htmlFor="symbols"
                className="text-gray-dark relative cursor-pointer label-check"
              >
                Include Symbols (!?*; etc..)
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between bg-mainBg-darker px-6 py-4 my-8">
            <h2 className="text-xl text-gray-darker">STRENGTH</h2>
            <div id="strength" className="flex items-center gap-3">
              <h3 id="status" className="text-white text-2xl uppercase">
                {setStrong(strengthValue)}
              </h3>
              <div className="flex gap-1">
                {Array.from({ length: 4 }, (_, index) => (
                  <span
                    key={index}
                    className={setClass(strengthValue, index + 1)}
                  ></span>
                ))}
              </div>
            </div>
          </div>
          <button
            id="generator"
            className="bg-green w-full py-4 flex justify-center items-center gap-4 text-mainBg-darker hover:bg-mainBg-darker hover:text-green transition-all border border-green"
            onClick={setGeneratedEl}
          >
            <span className="font-bold uppercase">Generate</span>
            <svg
              width="12"
              height="12"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current"
            >
              <path d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"></path>
            </svg>
          </button>
          <p
            className={`${
              copyPass ? "top-2" : "-top-16"
            } fixed right-8 py-4 px-8 text-black transition-all bg-green`}
            id="message"
            role="alert"
          >
            copied
          </p>
        </div>
      </div>
    </div>
  );
}

export default Password;
