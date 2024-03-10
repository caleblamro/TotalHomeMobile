// Utility function to validate password strength
const isPasswordStrong = (password: string): boolean => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasUpper = /[A-Z]/;
    const hasLower = /[a-z]/;
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/;

    return (
        password.length >= minLength &&
        hasNumber.test(password) &&
        hasUpper.test(password) &&
        hasLower.test(password) &&
        hasSpecial.test(password)
    );
};

// Simulate a login function
export const login = (username: string, password: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        setTimeout(() => {
            // Simulate login logic, assuming login is successful if username and password are not empty
            if (username !== '' && password !== '') {
                resolve(true); // Resolve promise with true indicating success
            } else {
                reject(new Error('Login failed: Username or password cannot be empty')); // Reject promise on failure
            }
        }, 500); // Simulate a 500ms network delay
    });
};

// Simulate a signup function with password strength validation
export const signup = (username: string, password: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        setTimeout(() => {
            // Check for non-empty username and basic password length
            if (username === '') {
                reject(new Error('Signup failed: Username cannot be empty'));
            } else if (password.length < 6) {
                reject(new Error('Signup failed: Password must be at least 6 characters'));
            } else if (!isPasswordStrong(password)) {
                // Use the utility function to validate password strength
                reject(new Error('Signup failed: Password does not meet strength requirements'));
            } else {
                resolve(true); // Resolve promise with true indicating success
            }
        }, 500); // Simulate a 500ms network delay
    });
};

export const isLoggedIn = () => {
    return true;
}