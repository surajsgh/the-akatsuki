import express, { Request, Response, NextFunction } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello, world!" });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
