// Form Configuration - Controls Data Fields, Data Types, and Display
// Modify to match your needs and map these to your Database/API, etc.

export default function formConfig() {

    const formConfig = {
        fields: [
            {
                type: 'text',
                label: 'First Name',
                name: 'firstname',
                placeholder: 'Firt Name',
                required: true,
                defaultValue: 'John', // Default value for the text input
            },
            {
                type: 'text',
                label: 'Last Name',
                name: 'lastname',
                placeholder: 'Last Name',
                required: true,
                defaultValue: 'Doe', // Default value for the text input
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
                type: 'password',
                label: 'Password',
                name: 'password',
                placeholder: 'Password',
                required: true,
                defaultValue: '**********', // Default value for the password input
            },
            /*  To be Used for Other Form Needs
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
            */
        ],
    };
    
return formConfig

}