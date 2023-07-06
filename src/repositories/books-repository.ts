import { Book, CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";
import prisma from "../database";

export async function getBooks() {
  const books = await prisma.books.findMany();
  return books;  
}

export async function getBook(id: number){
  const book = await prisma.books.findFirst({where: {id}})
  return book;
}

export async function createBook(newBook:CreateBook){
  const book = await prisma.books.create({
    data: newBook
  })

  return book;
}

type GetBookReview = CreateReview & {
  read: boolean
};

export async function reviewBook(bookRev: CreateReview){
  const {grade, review, bookId} = bookRev
  const bookReview = await prisma.books.update({
    data: {
      grade,
      review,
      read: true
    }, 
    where: {id: bookId}
  })
  return bookReview;
}