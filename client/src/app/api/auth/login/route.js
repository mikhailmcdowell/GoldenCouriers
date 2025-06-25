import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const { email, password, rememberMe } = await req.json();
  
  try {
    // 1. Call your backend auth endpoint
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include' // Important for cookies
    });

    // 2. Handle non-OK responses
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await res.json();
    
    // 3. Create response and set secure cookie
    const response = NextResponse.json({
      user: {
        id: data.user.user_id,
        email: data.user.email,
        role: data.user.role
      }
    });

    // Set HttpOnly cookie
    response.cookies.set('token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : undefined, // 30 days or session
      sameSite: 'lax',
      path: '/',
    });

    return response;

  } catch (error) {
    // 4. Enhanced error handling
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Authentication failed',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}