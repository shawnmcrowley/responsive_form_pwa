import Form from 'next/form'

export default function PostForm() {
  return (
    <div>Form Doing Get Operations to API Route
      <form className="w-full max-w-sm" action="/api/postData">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" name="first_name" type="text" placeholder="First Name" aria-label="first name"></input>
          <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" name="last_name" type="text" placeholder="Last Name" aria-label="last name"></input>
          <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
            Send Data
          </button>
        </div>
      </form>
    </div>
  )
}