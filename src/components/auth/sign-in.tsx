'use client';

import { useActionState } from 'react';
import { authenticate } from "@/lib/actions";

export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <form action={formAction}>
            <div>
                <div>
                    <label htmlFor="username">Username</label>
                    <div className="relative">
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <div className="relative">
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            required
                            minLength={4}
                        />
                    </div>
                </div>
            </div>
            <button type="submit" aria-disabled={isPending}>Log in</button>
            <div aria-live="polite" aria-atomic="true">
                {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
            </div>
        </form>
    );
}
