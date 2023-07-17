import z from "zod";


export const UserSchema = z.object({

   firstName: z.string({
        required_error: "Firstname is required"
   }).nonempty({
        message: "Firstname is required"
    }),
    lastName: z.string({
        required_error: "Lastname is required"
    }).nonempty({
        message: "Lastname is required"
    }),
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "The email supplied is not valid"
    }).nonempty({
        message: "Email is required"
    }),
    gender: z.string({
        required_error: "Gender is required"
    }).nonempty({
        message: "Gender is required"
    }),
    password: z.string({
        required_error: "Password is required"
    }).nonempty({
        message: "Password is required"
    })
});

export const LoginSchema = z.object({
  
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "The email supplied is not valid"
    }).nonempty({
        message: "Email is required"
    }),
    password: z.string({
        required_error: "Password is required"
    }).nonempty({
        message: "Password is required"
    })
});


export const LibrarySchema = z.object({
    
   Title: z.string({
        required_error: "Title is required"
   }).nonempty({
        message: "Title is required"
    }),
    Author: z.string({
        required_error: "Author is required"
    }).nonempty({
        message: "Author is required"
    }),
    datePublished: z.string({
        required_error: "datePublished is required"
    }).nonempty({
        message: "datePublished is required"
    }),
    Description: z.string({
        required_error: "Description is required"
    }).nonempty({
        message: "Description is required"
    }),
    pageCount: z.number({
        required_error: "pageCount is required"
    }),
    Genre: z.string({
        required_error: "Genre is required"
    }).nonempty({
        message: "Genre is required"
    }),
    Publisher: z.string({
        required_error: "Publisher is required"
    }).nonempty({
        message: "Publisher is required"
    })
});