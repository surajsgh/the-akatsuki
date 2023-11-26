import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";

declare global {
  namespace Express {
    interface Request {
      requestTime: number;
    }
  }
}

const app = express();

//  MIDDLEWARES
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("logging...");
  next();
});

app.use(morgan("dev"));

app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = Date.now();
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello, world!" });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
