export default function Footer() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-gradient-to-br from-indigo-50 to-blue-100 p-6">

            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-white-200 border-teal-400 hover:text-teal hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <a href="/" className="block mt-4 lg:inline-block lg:mt-0 text-white-600 hover:text-teal-600 mr-4">
                        Home
                    </a>
                    <a href="/api-docs" className="block mt-4 lg:inline-block lg:mt-0 text-white-600 hover:text-teal-600 mr-4">
                        API Documentation
                    </a>
                    <a href="/forms" className="block mt-4 lg:inline-block lg:mt-0 text-white-600 hover:text-teal-600 mr-4">
                        Sample Form
                    </a>
                    <a href="#mailto:shawn.crowley@lycra.com" className="block mt-4 lg:inline-block lg:mt-0 text-white-600 hover:text-teal-600">
                        Contact Me
                    </a>
                </div>
            </div>
        </nav>

    )
}