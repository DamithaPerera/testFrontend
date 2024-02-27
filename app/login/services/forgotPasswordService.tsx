const forgotPassword = async (
        email: string,
        newPassword: string
    ) => {
    try {
        const response = await fetch('http://13.60.12.139:3000/v1/user/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, newPassword}),
        });

        if (!response.ok) {
            // Handle error response
            const errorData = await response.json();
            console.error('Error:', errorData);
            return errorData;
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
    }
}

export {
    forgotPassword
}