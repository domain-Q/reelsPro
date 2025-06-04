"use client"
import { ImageKitProvider } from 'imagekitio-next'
import { SessionProvider } from 'next-auth/react'
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY

export default function Provider({ children }: { children: React.ReactNode }) {
  const authenticator = async () => {
    try {
      const response = await fetch('/api/imagekit-auth');
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`request failed with status ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      console.error('Error fetching authentication parameters:', error);
      throw new Error('Failed to fetch authentication parameters for ImageKit');
    }
  }; 

  return (
    <SessionProvider>
    <ImageKitProvider
      publicKey={publicKey!}
      urlEndpoint={urlEndpoint!}
      authenticator={authenticator}
    >
      {children}
    </ImageKitProvider>
    </SessionProvider>
  )
}
