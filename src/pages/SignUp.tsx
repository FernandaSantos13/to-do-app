import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { auth } from '../apiClient.ts';


type SignUpData = {
    name: string;
    email: string;
};

export function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpData>();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data: SignUpData) => {
        setErrorMessage('');

        try {
            const result = await auth.signup(data.name, data.email);
            localStorage.setItem('userId', result.userId);
            navigate('/todos');
        } catch (error: any) {
            setErrorMessage(error.message || 'An error occurred');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Enter your full name"
                    {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="error">{errors.name.message}</p>}

                <input
                    type="email"
                    placeholder="Enter your email"
                    {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}

                <button type="submit">Sign Up</button>
            </form>

            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
}