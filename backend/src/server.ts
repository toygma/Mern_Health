import "dotenv/config";
import app from "./app";
import { connectDatabase, disconnectDatabase } from "./config/database";

const port = process.env.PORT;

let server: ReturnType<typeof app.listen>;

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    server = app.listen(port, () => {
      console.log(`✓ Server started on port ${port}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || "development"}`);
    });

    // Graceful shutdown
    process.on("SIGTERM", shutdownServer);
    process.on("SIGINT", shutdownServer);
  } catch (error) {
    console.error("✗ Failed to start server:", error);
    await disconnectDatabase();
    process.exit(1);
  }
};

const shutdownServer = async (): Promise<void> => {
  console.log("\n✓ Shutting down server gracefully...");

  if (server) {
    server.close(async () => {
      console.log("✓ Server closed");
      await disconnectDatabase();
      console.log("✓ Database disconnected");
      process.exit(0); // success close
    });
  }

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error("✗ Forced shutdown due to timeout");
    process.exit(1); // error close
  }, 10000);
};

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("✗ Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("✗ Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

startServer()