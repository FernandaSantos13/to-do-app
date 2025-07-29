import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { auth } from '../apiClient';

type FormData = {
    email: string;  
};

export function Login() {
    const { register, handleSubmit, formState: {errors} } = useForm<FormData>();
    const [ errorMessage, setErrorMessage ] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        setErrorMessage('');
        console.log("Submitting login with:", data);
        try {
            const result = await auth.login(data.email);
            localStorage.setItem('userId', result.userId);
            navigate('/todos');
        } catch (error: any) {
            if (error.message.toLowerCase().includes('not found')) {
                navigate('/signup');
                return;
            }
            setErrorMessage(error.message || 'An error occurred');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
};
    
    