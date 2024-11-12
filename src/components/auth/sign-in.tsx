// src/components/auth/sign-in.tsx

'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { signIn } from 'next-auth/react';

export default function SignIn() {
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const result = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false, // Set to false to handle redirect manually
        });

        if (result?.ok) {
            router.push('/admin');
        } else {
            console.error('Failed to sign in', result?.error);
            // Optionally display an error message to the user
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="credentials-email">Email</label>
            <input type="email" id="credentials-email" name="email" required />
            <label htmlFor="credentials-password">Password</label>
            <input type="password" id="credentials-password" name="password" required />
            <button type="submit">Sign In</button>
        </form>
    );
}
