import Form from 'next/form'

export default function PostForm() {
  return (
    <div>My Sample Form
      <form className="w-full max-w-sm" action="/api/postData">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" name="first_name" type="text" placeholder="Jane" aria-label="first name"></input>
            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" name="last_name" type="text" placeholder="Doe" aria-label="last name"></input>
            <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
              Send Data
            </button>
            <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
              Cancel
            </button>
        </div>
      </form>
    </div>
  )
}