"use client"

import { useState } from "react";
import { FormGenerator } from "../components/form_generator";



const formConfig = {
    fields: [
        {
            type: 'text',
            label: 'Name',
            name: 'name',
            placeholder: 'Enter your name',
            required: true,
            defaultValue: 'John Doe', // Default value for the text input
        },
        {
            type: 'email',
            label: 'Email',
            name: 'email',
            placeholder: 'Enter your email',
            required: true,
            defaultValue: 'john.doe@example.com', // Default value for the email input
        },
        {
            type: 'textarea',
            label: 'Message',
            name: 'message',
            placeholder: 'Enter your message',
            defaultValue: 'Hello! This is a default message.', // Default value for the textarea
        },
        {
            type: 'select',
            label: 'Gender',
            name: 'gender',
            options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
            ],
            required: true,
            defaultValue: 'male', // Default selected value for the dropdown
        },
        {
            type: 'file',
            label: 'Upload File',
            name: 'file',
            required: true,
            // Default values for file inputs are generally not supported for security reasons
        },
    ],
};

export default function Home() {
    const [formData, setFormData] = useState({})

    // Function to reset form to initial state based on formConfig
    const resetForm = () => {
        const initialState = formConfig.fields.reduce((acc, field) => {
            if (field.defaultValue !== undefined) {
                acc[field.name] = field.defaultValue;
            }
            return acc;
        }, {});
        setFormData(initialState);
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Form Data:", formData)


        try {
            // Create FormData object
            const formDataToSend = new FormData()
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key])
            })

            const response = await fetch('/api/v1/postData', {
                method: 'POST',
                body: formDataToSend,
                // DO NOT set Content-Type header when sending FormData
                // the browser will automatically set the correct multipart/form-data boundary
            });

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const result = await response.json();
            console.log(result);
            // Reset the form after successful submission
            resetForm();

        } catch (error) {
            console.error("Submission error:", error);
        }
    }


    return (
        <>

            <div className="min-h-screen flex items-center justify-center">
                <FormGenerator
                    config={formConfig}
                    handleSubmit={handleSubmit}
                    formData={formData}
                    setFormData={setFormData}>
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">
                        Submit
                    </button>
                </FormGenerator>
            </div>
        </>
    )

}