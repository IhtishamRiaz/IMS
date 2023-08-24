import React from 'react'
import useTitle from '../hooks/useTitle';

const Error404 = () => {
    useTitle("404")
    return (
        <section className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 ">
            <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
                <div className="max-w-screen-xl mx-auto text-center">
                    <h1 className="mb-4 font-extrabold tracking-tight text-7xl lg:text-9xl text-brand-600 dark:text-brand-500">404</h1>
                    <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
                    <p className="mb-4 text-lg font-medium text-gray-600 dark:text-gray-400">Sorry, the page you are looking for can't be found. Please check your url for any mistake.</p>
                    <a href="#" className="inline-flex text-white bg-brand-600 hover:bg-brand-700 focus:ring-4 focus:outline-none focus:ring-brand-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-brand-900 my-4">Back to Homepage</a>
                </div>
            </div>
        </section>
    )
}

export default Error404;