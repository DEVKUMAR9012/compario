import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('your_atlas_connection_string')) {
    console.warn('⚠️  MONGODB_URI not set in server/.env — please add your Atlas connection string.');
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    });
    const host = uri.includes('@') ? uri.split('@')[1]?.split('/')[0] : uri;
    console.log('✅ MongoDB connected:', host);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err instanceof Error ? err.message : err);
    console.error('   👉 Check your MONGODB_URI in server/.env');
    // Don't exit — let server keep running so you can update .env
  }
}
