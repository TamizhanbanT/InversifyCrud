import { injectable,inject } from "inversify";
import { BookRepository } from "../repositories/Book.repository";
import { BookDto } from "../dto/book.dto";
import {TYPES} from '../types/types';

@injectable()
export class BookService {
    constructor (
        @inject(TYPES.BookRepository)private bookRepo:BookRepository
    ){}

    //createBook

async createBook(data:BookDto){

    return this.bookRepo.create(data);
}

 //getBooks

 async getBooks(){
    return this.bookRepo.findAll();
 }

 //async getBookById

 async getBookById(id:number){
    return this.bookRepo.findById(id);
 }

 //delete

 async deleteBook(id:number){
    return this.bookRepo.delete(id)
 }
}