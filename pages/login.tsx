import axios from "axios";
import { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import Router from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = await axios.post("/api/login", {
      email,
      password,
    });
    Cookies.set("isAdmin", user.data, { expires: 30 });
    await Router.push("/dashboard");
  };

  return (
    <div className={"flex w-full min-h-screen items-center justify-center"}>
      <form
        className="bg-white max-w-[400px] w-full p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
