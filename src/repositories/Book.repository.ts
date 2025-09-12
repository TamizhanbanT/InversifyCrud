import { injectable } from "inversify";
import prisma from "../config/prisma";
import { BookDto } from "../dto/book.dto";

@injectable()

export class BookRepository{
    //create
    async create(book:BookDto){
        return prisma.book.create({
            data:book
        })
    }
    //findAll
    async findAll(){
        return prisma.book.findMany({
            include:{
                author:true
            }
        })
    }
    //findById

    async findById(id:number){
        return prisma.book.findUnique({
            where:{
                bookId:id
            },
            include:{
                author:true
            }
        })
    }

    //delete
    async delete(id:number){
        return prisma.book.delete({
            where:{
                bookId:id
            }
        })
    }
}
