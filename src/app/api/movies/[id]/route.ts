import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Movie } from '@/models/movie';
import mongoose from 'mongoose';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET single movie
export async function GET(request: Request, { params }: RouteParams) {
  try {
    await connectDB();
    
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid movie ID' },
        { status: 400 }
      );
    }

    const movie = await Movie.findById(params.id);
    
    if (!movie) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(movie);
  } catch (error) {
    console.error('Failed to fetch movie:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movie' },
      { status: 500 }
    );
  }
}

// PUT/UPDATE movie
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid movie ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const movie = await Movie.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!movie) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(movie);
  } catch (error) {
    console.error('Failed to update movie:', error);
    return NextResponse.json(
      { error: 'Failed to update movie' },
      { status: 400 }
    );
  }
}

// DELETE movie
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid movie ID' },
        { status: 400 }
      );
    }

    const movie = await Movie.findByIdAndDelete(params.id);
    
    if (!movie) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(movie);
  } catch (error) {
    console.error('Failed to delete movie:', error);
    return NextResponse.json(
      { error: 'Failed to delete movie' },
      { status: 500 }
    );
  }
} 