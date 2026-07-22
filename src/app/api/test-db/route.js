import connectDB from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    return Response.json(
      {
        success: true,
        message: "MongoDB connected successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("MongoDB Connection Error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to connect to MongoDB.",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}