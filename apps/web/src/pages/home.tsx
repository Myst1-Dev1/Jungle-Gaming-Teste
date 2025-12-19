import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";

export function Home() {
    const [signType, setSignType] = useState('signIn');

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="m-auto w-full lg:w-1/2 p-10 h-screen flex flex-col justify-center items-center">
                   {signType === 'signIn' && <LoginForm setSignType={setSignType} /> }
                   {signType === 'signUp' && <RegisterForm setSignType={setSignType} /> }
                </div>
                <div className="w-1/2 min-h-screen hidden lg:flex justify-center items-centerr bg-[#122020]">
                    <img src="/images/Accept tasks-bro.png" alt="Login Image" className="w-md m-auto object-cover" />
                </div>
            </div>
        </>
    )
}