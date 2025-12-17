'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (       
<>
<nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Architecture Console</span>
        </Link>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="tel:3022676928" className="hidden md:inline text-sm text-gray-500 dark:text-white hover:underline">(302) 267-6928</a>
            <a href="#" className="hidden md:inline text-sm text-blue-600 dark:text-blue-500 hover:underline">Login</a>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                <svg className="w-6 h-6 text-gray-500 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
        </div>
    </div>
</nav>
<nav className="bg-gray-50 dark:bg-gray-700">
    <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center">
            <ul className="hidden md:flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                    <Link href="/" className="text-gray-500 dark:text-white hover:underline" aria-current="page">Home</Link>
                </li>
                <li>
                    <a href="https://dev.azure.com/LYCRADevOps/NextJS%20PWA%20FrontEnd%20and%20Integration%20with%20SnowFlake" className="text-gray-500 dark:text-white hover:underline" target="_blank" rel="noopener noreferrer">Project Repository</a>
                </li>
                <li>
                    <Link href="/api-docs" className="text-gray-500 dark:text-white hover:underline">API Documentation</Link>
                </li>
                <li>
                    <Link href="/api/v1/persons" className="text-gray-500 dark:text-white hover:underline">Public API(Get) Endpoints</Link>
                </li>
                <li>
                    <Link href="/ui/forms" className="text-gray-500 dark:text-white hover:underline">Data Entry</Link>
                </li>
                <li>
                    <Link href="/ui/console" className="text-gray-500 dark:text-white hover:underline">Data View</Link>
                </li>
            </ul>
            {isOpen && (
                <ul className="md:hidden flex flex-col space-y-2 w-full">
                    <li>
                        <Link href="/" className="block py-2 text-gray-500 dark:text-white hover:underline" onClick={() => setIsOpen(false)}>Home</Link>
                    </li>
                    <li>
                        <a href="https://dev.azure.com/LYCRADevOps/NextJS%20PWA%20FrontEnd%20and%20Integration%20with%20SnowFlake" className="block py-2 text-gray-500 dark:text-white hover:underline" target="_blank" rel="noopener noreferrer">Project Repository</a>
                    </li>
                    <li>
                        <Link href="/api-docs" className="block py-2 text-gray-500 dark:text-white hover:underline" onClick={() => setIsOpen(false)}>API Documentation</Link>
                    </li>
                    <li>
                        <Link href="/api/v1/persons" className="block py-2 text-gray-500 dark:text-white hover:underline" onClick={() => setIsOpen(false)}>Public API(Get) Endpoints</Link>
                    </li>
                    <li>
                        <Link href="/ui/forms" className="block py-2 text-gray-500 dark:text-white hover:underline" onClick={() => setIsOpen(false)}>Data Entry</Link>
                    </li>
                    <li>
                        <Link href="/ui/console" className="block py-2 text-gray-500 dark:text-white hover:underline" onClick={() => setIsOpen(false)}>Data View</Link>
                    </li>
                </ul>
            )}
        </div>
    </div>
</nav>
</>

    )
}