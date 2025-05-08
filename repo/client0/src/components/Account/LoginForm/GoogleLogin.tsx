
'use client';

import { useGoogleLogin } from '@react-oauth/google';

export default function GoogleLogin() {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        console.log('Google login response:', response);
        // TODO: Implement Google login logic
      } catch (error) {
        console.error('Google login error:', error);
      }
    },
    onError: (error) => console.log('Google Login Failed:', error)
  });

  return (
    <button
      onClick={() => login()}
      className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center gap-2"
    >
      <img src="/google.png" alt="Google" className="w-5 h-5" />
      <span>ورود با گوگل</span>
    </button>
  );
}
