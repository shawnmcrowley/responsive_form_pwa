"use client"
import { useEffect } from "react"

export const FormGenerator = ({
  config,
  handleSubmit,
  children,
  formData,
  setFormData
}) => {
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const initialData = {}
    config.fields.forEach(field => {
      initialData[field.name] = field.defaultValue || ""
    })
    setFormData(initialData)
  }, [])  // Removed [config] from useEffect dependency array

 

  // Map input types to corresponding components
  const fieldRenderers = {
    text: field => (
      <div key={field.name} className="flex flex-col space-y-2 w-full">
        <label htmlFor={field.name} className="font-medium">
          {field.label}
        </label>
        <input
          type="text"
          name={field.name}
          id={field.name}
          placeholder={field.placeholder}
          required={field.required}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
      </div>
    ),
    password: field => (
      <div key={field.name} className="flex flex-col space-y-2 w-full">
        <label htmlFor={field.name} className="font-medium">
          {field.label}
        </label>
        <input
          type="password"
          name={field.name}
          id={field.name}
          placeholder={field.placeholder}
          required={field.required}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
      </div>
    ),
    email: field => (
      <div key={field.name} className="flex flex-col space-y-2  w-full">
        <label htmlFor={field.name} className="font-medium">
          {field.label}
        </label>
        <input
          type="email"
          name={field.name}
          id={field.name}
          placeholder={field.placeholder}
          required={field.required}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
      </div>
    ),
    file: field => (
      <div key={field.name} className="flex flex-col space-y-2 w-full">
        <label htmlFor={field.name} className="font-medium">
          {field.label}
        </label>
        <input
          type="file"
          name={field.name}
          id={field.name}
          required={field.required}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
      </div>
    ),
    textarea: field => (
      <div key={field.name} className="flex flex-col space-y-2 w-full">
        <label htmlFor={field.name} className="font-medium">
          {field.label}
        </label>
        <textarea
          name={field.name}
          id={field.name}
          placeholder={field.placeholder}
          required={field.required}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className="p-2 border rounded w-full resize-none"
        ></textarea>
      </div>
    ),
    select: field => (
      <div key={field.name} className="flex flex-col space-y-2 w-full">
        <label htmlFor={field.name} className="font-medium">
          {field.label}
        </label>
        <select
          name={field.name}
          id={field.name}
          required={field.required}
          // Use defaultValue if no value is set
          value={formData[field.name] || field.defaultValue || ""}
          onChange={handleChange}
          className="p-2 border rounded w-full bg-white"
        >
          <option value="">Select an option</option>
          {field.options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
      {config.fields.map(field =>
        fieldRenderers[field.type] ? fieldRenderers[field.type](field) : null
      )}
      {children}
    </form>
  )
}