import {SignIn} from '@clerk/nextjs'

const Login = () => {
    return (
        <div className={"flex w-full min-h-screen items-center justify-center"}>
            <SignIn path={"/login"} redirectUrl={"/dashboard"} routing={"path"}/>
        </div>
    )
}


export default Login