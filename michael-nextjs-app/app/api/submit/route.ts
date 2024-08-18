import { NextRequest, NextResponse } from 'next/server';
import { schema } from '../../../utils/validationSchema';

export async function POST(req: NextRequest) {
  const data = await req.json();
  
  try {
    await schema.validate(data, { abortEarly: false });
    return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ errors: error.errors }, { status: 400 });
  }
}