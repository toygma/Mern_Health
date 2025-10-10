import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error & { status?: number },  
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[Error] ${status} - ${message}`);
  console.error(err.stack);

  res.status(status).json({
    success: false,
    message,
    status,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
