// src/app/api/user/register/route.js

import { hash } from 'bcryptjs';
import connectDB from '@/connect/mongo';
import User from '@/modal/usermodal';

export async function POST(req, res) {
  try {
    const { name, email, password } = await req.json();

    if (!name, !email, !password) {
       
      return res.status(400).JSON({ message: 'Please fill in all fields' })
    }
    console.log(name)

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'Email already registered' }), { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error', error: error.message }), { status: 500 });
  }
}
