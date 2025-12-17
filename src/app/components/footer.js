import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <Link href="/" className="hover:underline">The Lycra Company™</Link> All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="https://dev.azure.com/LYCRADevOps/NextJS%20PWA%20FrontEnd%20and%20Integration%20with%20SnowFlake" className="hover:underline me-4 md:me-6" target="_blank" rel="noopener noreferrer">Project Repository</a>
                    </li>
                    <li>
                        <Link href="/api-docs" className="hover:underline me-4 md:me-6">API Documentation</Link>
                    </li>
                    <li>
                        <Link href="/ui/console" className="hover:underline me-4 md:me-6">Data View</Link>
                    </li>
                    <li>
                        <a href="mailto:shawn.crowley@lycra.com" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>

    )
}