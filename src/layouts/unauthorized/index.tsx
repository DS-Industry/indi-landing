import Logo from './../../assets/Logo.png';
import ArrowBack from '../../assets/arrow_back.png';
import LogoSmall from '../../assets/logo_small.png'

export default function UnAuthLayout ({ children } : { children: React.ReactNode }) {
    return (
        <div className='w-screen h-auto'>
            <nav className='bg-[#FCFDFF] w-full flex relative justify-between items-center mx-auto h-20'>
                <div className='inline-flex'>
                    <img src={Logo} alt="logo" className='pl-5' height='150' width='200' />
                </div>
                <div className='flex items-center'>
                    <a href="https://dsmoyka.com/" target="_blank" rel="noopener noreferrer">
                        <img src={ArrowBack} alt="back" className='pr-5 ' height='48' width='48'/>
                    </a>
                </div>
            </nav>
            <main className='flex w-full h-full flex-col px-5 pt-5 mb-30'>
                {children}
            </main>
            <footer className="bg-[#9E9E9E] bg-opacity-20">
                <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="flex justify-center text-teal-600">
                        <img src={LogoSmall} className='object-contain' width='38' height='38'/>
                    </div>

                    <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-[#9E9E9E] font-thin">
                        © All Rights Reserved. Powered by DSMOYKA PRIVATE LIMITED
                    </p>
                </div>
            </footer>
        </div>
    )
}
