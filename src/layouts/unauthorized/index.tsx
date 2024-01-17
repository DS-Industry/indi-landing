import Logo from './../../assets/Logo.png';

export default function UnAuthLayout ({ children } : { children: React.ReactNode }) {
    return (
        <div className=' h-screen w-screen fixed top-0'>
            <header className=' pt-4 pl-2 w-full h-fit flex sm:justify-center md:justify-start fixed top-0'>
                <img src={Logo} alt="logo" className=' px-5' />
            </header>
            <main className=' px-6 h-full w-full'>
                { children }
            </main>
{/*             <footer className=' h-fit mt-5 text-black'>
                © All rights reserved.
            </footer> */}
        </div>
    )
}