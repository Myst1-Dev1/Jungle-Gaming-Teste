
interface RegisterFormProps {
    setSignType: (type: 'signIn' | 'signUp') => void;
}

export function RegisterForm({ setSignType }:RegisterFormProps) {
    return (
        <>
            <h1 className="text-xl font-bold py-5">Crie sua conta</h1>
            <form action="" className="max-w-md w-full flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                    <label htmlFor="username" className="font-bold">Nome de usuário</label>
                    <input type="text" placeholder="john" className="outline-none w-full p-3 border border-gray-300 rounded-md" />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="email" className="font-bold">Email</label>
                    <input type="email" placeholder="john@gmail.com" className="outline-none w-full p-3 border border-gray-300 rounded-md" />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="password" className="font-bold">Senha</label>
                    <input type="password" placeholder="********" className="outline-none w-full p-3 border border-gray-300 rounded-md" />
                </div>
                <span className="text-center">Já possui uma conta? <span onClick={() => setSignType('signIn')} className="text-gray-600 font-bold cursor-pointer transition-all duration-500 hover:text-gray-800">Entrar</span></span>
                <button className="mt-3 p-3 bg-black text-white rounded-lg cursor-pointer font-semibold text-xl transition-all duration-500 hover:bg-gray-700">Entrar</button>
            </form>
        </>
    )
}