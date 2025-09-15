import {z} from 'zod';

export const AuthorSchema=z.object({
    authorName:z.string().min(2,"Author name must be atleast 2 character ")
});

export type AuthorInput=z.infer<typeof AuthorSchema>