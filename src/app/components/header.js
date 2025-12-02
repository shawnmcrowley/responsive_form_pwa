export default function Header() {
    return (       
<>
<nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Architecture Console</span>
        </a>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="tel:3022676928" className="text-sm  text-gray-500 dark:text-white hover:underline">(302) 267-6928</a>
            <a href="#" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</a>
        </div>
    </div>
</nav>
<nav className="bg-gray-50 dark:bg-gray-700">
    <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                    <a href="/" className="text-gray-500 dark:text-white hover:underline" aria-current="page">Home</a>
                </li>
                <li>
                    <a href="https://github.com/shawnmcrowley/responsive_form_pwa/" className="text-gray-500 dark:text-white hover:underline">Project Repository</a>
                </li>
                <li>
                    <a href="/api-docs" className="text-gray-500 dark:text-white hover:underline">API Documentation</a>
                </li>
                <li>
                    <a href="/api/v1/persons" className="text-gray-500 dark:text-white hover:underline">Public API(Get) Endpoints</a>
                </li>
                <li>
                    <a href="/ui/forms" className="text-gray-500 dark:text-white hover:underline">Data Entry</a>
                </li>
                <li>
                    <a href="/ui/console" className="text-gray-500 dark:text-white hover:underline">Data View</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</>

    )
}