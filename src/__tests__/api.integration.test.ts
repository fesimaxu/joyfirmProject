import supertest from "supertest";
import app from "../app";
import { bookDetails, ChinuaBook, activeUser, userDetails } from "../utils/testData";


describe("Integration test for the library API", () => {
    it("Get api/get-books - success - get all books", async () => {

        const { body, statusCode } = await supertest(app).get("/library/get-books");
     
        const { data } = body
     
        expect(data).toEqual(

            expect.arrayContaining([
                expect.objectContaining({
                    bookId: expect.any(String),
                    Title: expect.any(String),
                    Author: expect.any(String),
                    datePublished: expect.any(String),
                    Description: expect.any(String),
                    pageCount: expect.any(Number),
                    Genre: expect.any(String),
                    Publisher: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                })
            ])
        );

        expect(statusCode).toBe(200);
    })


    
    it('Post api/register - success - register a user', async () => {
            const user =  await supertest(app).post('/user/register')
            .send(userDetails)
    
            //test for success
            if( user.statusCode === 200){
            expect(user.body.message).toBe( `new user ${userDetails.email} registration successful`)
            }else if(!userDetails.email){
            expect(user.body.message).toBe( `user with email - ${userDetails.email} already exist`)
            }
            
    })
    
    
    it("Get api/get-books-id - success - get a book by ID", async () => {

        const user =  await supertest(app).post('/user/login').send(activeUser)

        const token = user.body.token

        

        const { body, statusCode } = await supertest(app).get("/library/get-book/a760dfc6-cad0-47aa-9d2d-bb5a6a88db86")
            .set('authorization', `Bearer ${token}`);
      
        const { data } = body
     
        expect(data).toEqual(

            expect.arrayContaining([
                expect.objectContaining({
                    bookId: expect.any(String),
                    Title: expect.any(String),
                    Author: expect.any(String),
                    datePublished: expect.any(String),
                    Description: expect.any(String),
                    pageCount: expect.any(Number),
                    Genre: expect.any(String),
                    Publisher: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                })
            ])
        );

        expect(statusCode).toBe(200);
    })



    it("Post api/create-book - success - create a book", async () => {

        const user =  await supertest(app).post('/user/login').send(activeUser)
        const token = user.body.token

        const response = await supertest(app).post("/library/create-book")
            .send(bookDetails).set('authorization', `Bearer ${token}`);
        if(response.statusCode === 200){
            expect(response.body.message).toBe(`new book ${bookDetails.Title} successfully added to the library`)
        }else{
            expect(response.body.message).toBe(`book with title - ${bookDetails.Title} already exist`)
        }

         expect(response.body.data).toMatchObject(bookDetails);
    })
   

    it("Post api/update-book - success - update a book", async () => {

        const user =  await supertest(app).post('/user/login').send(activeUser)

        const token = user.body.token

        const response = await supertest(app).put("/library/update-book")
            .send(ChinuaBook).set('authorization', `Bearer ${token}`);
     
        if(response.statusCode === 200){
            expect( response.body.message).toBe(`book ${ChinuaBook.Title} successfully updated in the library`)
        }
        
       expect(response.body.data).toMatchObject(ChinuaBook)
    })

    it("Post api/update-book - success - confirming the book updated", async () => {

        const user =  await supertest(app).post('/user/login').send(activeUser)

        const token = user.body.token

        const response = await supertest(app).put("/library/update-book")
            .send(ChinuaBook).set('authorization', `Bearer ${token}`);
        
       expect(response.body.data).toMatchObject(ChinuaBook)
    })



     it("Post api/delete - success - delete a book", async () => {

        const user =  await supertest(app).post('/user/login').send(activeUser)

        const token = user.body.token

        const response = await supertest(app).delete("/library/delete")
            .send(bookDetails).set('authorization', `Bearer ${token}`);
     
        if(response.statusCode === 200){
            expect( response.body.message).toBe(`book ${bookDetails.Title} successfully deleted from the library`)
        }
        expect(response.body.data).toMatchObject(bookDetails)
     })
    
    it("Post api/delete - success - confirming the book deleted", async () => {

        const user =  await supertest(app).post('/user/login').send(activeUser)

        const token = user.body.token

        const response = await supertest(app).delete("/library/delete")
            .send(bookDetails).set('authorization', `Bearer ${token}`);
        
        expect(response.body.data).toMatchObject(bookDetails)
     })
    
})


