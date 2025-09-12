import {injectable} from 'inversify';
import prisma from '../config/prisma';
import { AuthorDto } from '../dto/author.dto';

@injectable()
export class AuthorRepository{
    //create

    async create(author:AuthorDto){
        return prisma.author.create({
            data:author
        })
    }

    //findall

    async findAll(){
        return prisma.author.findMany({
            include:{
                books:true
            }
        })
    }

    //findById

    async findById(id:number){
        return prisma.author.findUnique({
            where:{authorId:id},
            include:{books:true}

        })
    }

    //delete

    async delete(id:number){
        return prisma.author.delete({
            where:{
                authorId:id
            }
        })
    }

}