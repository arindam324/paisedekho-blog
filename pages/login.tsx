import { handleLogin } from "@auth0/nextjs-auth0";

const Login = () => {
  return (
    <div className={"flex w-full min-h-screen items-center justify-center"}>
      <button className="px-16 text-white bg-blue-600 shadow-lg rounded-lg shadow-blue-200 py-2">
        Log in
      </button>
    </div>
  );
};

export default Login;
