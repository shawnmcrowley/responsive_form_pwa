export default function Landing() {

    return (

        <div className="grid-container bg-white pt-8 rounded-2xl" style={{
            width: "90%",
            maxWidth: "1200px",
            margin: "0 auto",
            paddingBottom: "2rem",
            paddingLeft: "2rem",
            paddingRight: "2rem"

        }}>
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Architectural Principles</h1>
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Responsive Design</time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Application UI to support multi device types and deployments</h3>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        Responsive Design and Progressive Web Applications (PWA) provide design once/run everywhere capabilites so applications function equally as well on The Desktop, Web or Mobile Devices.  Using these concepts not only allows the UI to respond to different types and sizes of displays, but PWA provides installation/home screen access as well as offline (disconnected) caching.</p>
                    <a href="https://medium.com/@imvinojanv/the-complete-guide-to-building-progressive-web-apps-with-next-js-f37b4bb878cd" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Learn more <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg></a>
                </li>
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">API First</time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Application Integration via API's - Applications should be both a consumer and a producer of API's</h3>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        If possible all data consumption within an application should be with API's.  File transfers, folder trees, flat file consumption is costly and brittle. AVOID at all costs. If there is an API, USE it. Additionally, all reusable functionality within an application should be exposed as an API endpoint with an API KEY for security.</p>
                    <a href="https://nextjs.org/blog/building-apis-with-nextjs" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Learn more <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg></a>
                </li>
                  <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">AI Prompts, Agents, RAG, and Workflows</time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Zero retention, IP Protection, Validate and Verify Results, Local Models</h3>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        AI usage rule of thumb - Verify and Validate. Market Documents, Intellectural Property, Contracts or Proprietary Content should never be exposed to Public LLM's. AI applications that are developed should be tested and deployed on NON-PUBLIC facing infrastructure or deployed on Local LLM technology.</p>
                    <a href="https://medium.com/@chadhamoksh/build-a-fully-local-rag-app-with-postgresql-llama-3-2-and-ollama-b18cec13382d" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Learn more <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg></a>
                </li>
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">DevOps and Agile Development</time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Store, Secure, Manage, and Automate EVERYTHING</h3>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        Development rule of thumb - start in source code control, end in source code control.  All DevOps solutions have the ability to leverage a version of GIT for versioning and source code control.  Additionally available platforms have the ability to automate code testing, vulnerability scanning, and automated build/deploy workflows.</p>
                    <a href="https://medium.com/@vishwasacharya/how-to-set-up-a-ci-cd-pipeline-in-azure-devops-a-step-by-step-guide-9a6633422aa2" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Learn more <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg></a>
                </li>
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Deployment</time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cloud First; Containers Second; Kubernetes Third; VM's Fourth</h3>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        Net new or COTS applications should be operating system and deployment agnostic.  Deploy to the cloud first, preferably in containers/pods vs. instances running a specific OS.  Applications should NOT leverage functionality that is OS specfic.</p>
                    <a href="https://medium.com/@martin.hodges/starting-with-next-js-and-kubernetes-349cafdc2aa7" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Learn more <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg></a>
                </li>
                <li className="ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Design and Maintenance</time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Design, Document, and Log</h3>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        Always start with a functional design as well as wireframes for layout and component/functionality.  Provide flags for detailed logging as well as production logging. Document everything, especially API's and integration collaboration.</p>
                    <a href="https://swagger.io/resources/articles/documenting-apis-with-swagger/" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Learn more <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg></a>
                </li>
            </ol>
        </div>

    )
}