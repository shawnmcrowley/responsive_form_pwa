export default function Footer() {
    return (
        <footer className="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="/" className="hover:underline">The Lycra Company™</a> All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="https://github.com/shawnmcrowley/responsive_form_pwa" className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="/api-docs" className="hover:underline me-4 md:me-6">API Documentation</a>
                    </li>
                    <li>
                        <a href="/ui/console" className="hover:underline me-4 md:me-6">View Data</a>
                    </li>
                    <li>
                        <a href="mailto:shawn.crowley@lycra.com" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>

    )
}