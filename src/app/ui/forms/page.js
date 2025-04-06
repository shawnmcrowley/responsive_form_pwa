"use client"

import { useState } from "react";
import { FormGenerator } from "@/app/components/form_generator";
import formConfig from "@/app/configs/formConfig";


export default function Home() {
    const [formData, setFormData] = useState({})
    const [message, setMessage] = useState()
    const [error, setError] = useState()
    const config = formConfig();

    // Function to reset form to initial state based on formConfig
    const resetForm = () => {
        const initialState = config.fields.reduce((acc, field) => {
            if (field.defaultValue !== undefined) {
                acc[field.name] = field.defaultValue;
            }
            return acc;
        }, {});
        setFormData(initialState);
    }



    const handleSubmit = async (e) => {
        e.preventDefault()



        try {
            // Create FormData object
            const formDataToSend = new FormData()
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key])
            })
/*
            // Basic validation
            if (
                !formDataToSend.firstName ||
                !formDataToSend.lastName ||
                !formDataToSend.email ||
                !formDataToSend.password

            ) {
                setError("All fields are required.")
                return
            }


            if (formDataToSend.password.length < 8) {
                setError("Password must be at least 8 characters long.")
                return
            }
*/
            const response = await fetch('/api/v1/persons', {
                method: 'POST',
                body: formDataToSend,
                // DO NOT set Content-Type header when sending FormData
                // the browser will automatically set the correct multipart/form-data boundary
            });

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const result = await response.json();
            setMessage("Data Created Successfully!")
            setError("")
            // Reset the form after successful submission
            resetForm();

        } catch (error) {
            console.error("Submission error:", error);
        }
    }


    return (


        <div className="flex min-h-screen justify-center pt-10 bg-gradient-to-br from-indigo-50 to-blue-100">
            <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-2xl border border-gray-100 h-fit">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Create Personal Data
                    </h2>
                </div>
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
                        <p className="text-red-600 text-sm flex items-center">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {error}
                        </p>
                    </div>
                )}
                <FormGenerator
                    config={config}
                    handleSubmit={handleSubmit}
                    formData={formData}
                    setFormData={setFormData}>
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">
                        Create Data
                    </button>
                </FormGenerator>
                {message && <p className="mt-3">{message}</p>}
            </div>
        </div>
    )
}
