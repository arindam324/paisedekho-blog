import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import Router from "next/router";

const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")


    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        Router.push('/dashboard')
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const userInfo = await axios.post('/api/login', {email, password});
            localStorage.setItem('accessToken', userInfo.data.accessToken);

            if (userInfo.data.user) {
                Router.push('/dashboard')
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={"flex w-full min-h-screen items-center justify-center"}>
            <form onSubmit={handleSubmit}
                  className={"max-w-sm h-[250px] space-y-4 bg-zinc-800 w-full flex flex-col items-center"}>
                <div className={"flex flex-col flex-start mt-4"}>
                    <label htmlFor={"email"} className={"text-gray-300 text-sm"}>Email Address</label>
                    <input id={"email"} onChange={(e) => setEmail(e.target.value)}
                           className={"px-8 py-2 text-sm focus:outline-none rounded-md"}
                           placeholder={"email Address"}
                           type={"email"}
                           value={email}/>
                </div>
                <div className={"flex flex-col flex-start mt-2"}>
                    <label htmlFor={"password"} className={"text-gray-300 text-sm"}>Password</label>
                    <input id={"password"} value={password} onChange={(e) => setPassword(e.target.value)}
                           placeholder={"password"}
                           className={"px-8 py-2 text-sm focus:outline-none rounded-md"}
                           type={"password"}/>
                </div>
                <input className={" bg-blue-600 rounded-md px-20  text-white py-2"} type={"submit"} value={"submit"}/>
            </form>
        </div>
    )
}


export default Login