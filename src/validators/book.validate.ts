import {z} from 'zod';

export const BookSchema=z.object({
    bookName:z.string().min(1,"Book name os reqiured"),
    price:z.number().positive("price must be greater than 0"),
    authorId:z.number().int().positive("AuthorId must be positive")

});
