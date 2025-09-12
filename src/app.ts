import "reflect-metadata";
import express from 'express';

import authorRoutes from '../src/routes/author.route';
import bookRoutes from '../src/routes/book.route';
const app=express();

const port=4500;

app.use(express.json());


app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

app.listen(port,()=>{
    console.log("server running on port",port)
})