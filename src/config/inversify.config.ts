import { Container } from "inversify";
import { TYPES } from "../types/types";

import { AuthorRepository } from '../repositories/Author.repository';
import { AuthorService } from '../services/Author.service';
import { AuthorController } from '../controllers/author.controller'

import { BookRepository } from "../repositories/Book.repository";
import { BookService } from '../services/book.service'
import { BookController } from '../controllers/book.controller';

const container = new Container();

// Author
container.bind<AuthorRepository>(TYPES.AuthorRepository).to(AuthorRepository);
container.bind<AuthorService>(TYPES.AuthorService).to(AuthorService);
container.bind<AuthorController>(TYPES.AuthorController).to(AuthorController);

// Book
container.bind<BookRepository>(TYPES.BookRepository).to(BookRepository);
container.bind<BookService>(TYPES.BookService).to(BookService);
container.bind<BookController>(TYPES.BookController).to(BookController);

export { container };
