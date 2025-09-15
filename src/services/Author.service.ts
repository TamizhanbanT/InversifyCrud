import { inject,injectable } from "inversify";
import { AuthorRepository } from "../repositories/Author.repository";
import {TYPES} from '../types/types';
import { AuthorDto } from "../dto/author.dto";

@injectable()

export class AuthorService {
    constructor(
        @inject(TYPES.AuthorRepository) private authorRepo:AuthorRepository
    ){}

    //create

    async createAuthor(author:AuthorDto){
        return this.authorRepo.create(author)
    }

    //getall
    async getAuthors(){
        return this.authorRepo.findAll();
    }

    //getById
    async getById(id:number){
        return this.authorRepo.findById(id)
    }

    //update

    async updateAuthor(id:number , author:Partial<AuthorDto>){
        return this.authorRepo.update(id,author)

    }

//delete

async deleteAuthor(id:number){
    return this.authorRepo.delete(id)
}

}