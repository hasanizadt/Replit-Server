
'use client';

import { FacebookLoginButton } from '@greatsumini/react-facebook-login';

export default function FacebookLogin() {
  const handleFacebookLogin = async (response: any) => {
    try {
      console.log('Facebook login response:', response);
      // TODO: Implement Facebook login logic
    } catch (error) {
      console.error('Facebook login error:', error);
    }
  };

  return (
    <FacebookLoginButton
      appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || ''}
      onSuccess={handleFacebookLogin}
      onFail={(error) => {
        console.log('Facebook Login Failed!', error);
      }}
      className="w-full bg-[#1877F2] text-white py-2 px-4 rounded-md flex items-center justify-center gap-2"
    >
      <span>ورود با فیسبوک</span>
    </FacebookLoginButton>
  );
}
