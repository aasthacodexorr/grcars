import { Footer, Header } from '@/components/layout';
import Link from 'next/link';

export default async function ThankYou() {
    return (
        <>
            <Header />
             <div className='lg:mt-20 pt-14 lg:pt-28 lg:pb-20 px-4 pb-10 lg:px-44 mb-10 w-full flex flex-col justify-center items-center gap-2  '>
                <h1 className='lg:text-[40px] text-[26px] text-center font-semibold'>Thank you for submitting your form!</h1>
                <h3 className='lg:text-[24px] text-[24px] text-center font-medium'>We respond within 2 Business Hours.</h3>
                <div className='mt-8'>
                  <Link href={"/"} className='text-white cursor-pointer text-base w-full hover:opacity-90 transition-opacity rounded-full py-3 px-[30px] block text-center bg-brand-btn-gradient'>
                    Go Back to Home Page
                  </Link>
                </div>
            </div>           
            <Footer />
        </>
    );
}
