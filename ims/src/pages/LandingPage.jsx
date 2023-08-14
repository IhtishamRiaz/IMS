import React from 'react';
import Button from '../components/Button'
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-[url(/images/landingBg.png)] bg-center bg-no-repeat bg-cover">
            <nav className='fixed top-0 w-full'>
                <div className='container flex items-center justify-between p-4 mx-auto max-w-7xl'>
                    <p className='text-4xl font-extrabold'><Link to={'/'}>StockUp</Link></p>
                    <section className='flex space-x-4'>
                        <Link to={'/login'}>
                            <Button secondary>Sign In</Button>
                        </Link>
                        <Link to={'/register'}>
                            <Button>Sign Up</Button>
                        </Link>
                    </section>
                </div>
            </nav>
            <main>
                <h1 className='font-extrabold leading-[4.5rem] text-gray-900 text-6xl text-center'>
                    Professional Inventory <span className='text-primary-600'>Management,</span><br />Made Efficient.
                </h1>
                {/* <p className='mt-5 text-xl leading-8 text-center'>
                    Experience the next level of inventory management with our advanced solution.<br />Elevate your resource and operational efficiency like never before.
                </p> */}
                <p className='mt-5 text-xl leading-8 text-center'>
                    Inventory system to control and manage proucts in the warehouse in real time and<br />integrated to make it easier to develop your business.
                </p>
                <section className='flex items-center justify-center mt-8'>
                    <Link to={'/register'}>
                        <Button className='px-6 py-3 text-xl rounded-full'>
                            Get Started
                        </Button>
                    </Link>
                </section>
            </main>
        </div>
    )
}

export default LandingPage;