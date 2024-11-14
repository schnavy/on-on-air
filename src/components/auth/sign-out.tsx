import {signOut} from '@/auth';

export default function SignOut() {
    return (
        <form
            action={async () => {
                'use server';
                await signOut();
            }}>
            <button>
                <div className="hidden md:block">Sign Out</div>
            </button>
        </form>

    );
}