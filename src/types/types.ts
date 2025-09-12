const TYPES={
    //author
    AuthorRepository:Symbol.for("AuthorRepository"),
    AuthorService:Symbol.for("AuthorService"),
    AuthorController:Symbol.for("AuthorController"),

    //Books

    BookRepository:Symbol.for("BookRepository"),
    BookService:Symbol.for("BookService"),
    BookController:Symbol.for("BookController")

};
 
export {TYPES};