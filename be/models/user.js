// Define User entity
export class User {
    constructor(id, name, email, password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Method to convert User entity to JSON
    toJson(){
        return {
            name : this.name,
            email : this.email, 
            password : this.password, 
        }
    }
}