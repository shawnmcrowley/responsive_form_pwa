"use client"

import { useState } from "react";
import { FormGenerator } from "../components/form_generator";
import formConfig from "../configs/formConfig";


export default function Home() {
    const [formData, setFormData] = useState({})
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
                    config={config}
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