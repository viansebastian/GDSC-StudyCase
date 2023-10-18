import { User } from "./user.js";

// Define Blog entity
export class Blog {
    constructor(id, title, description, image, userRef){
        this.id = id; 
        this.title = title; 
        this.description = description; 
        this.image = image; 
        this.userRef = userRef; // Users Reference, to determine this blog belongs to which User
    }

    // Method to convert Blog entity to JSON 
    toJson() {
        return {
            title : this.title,
            description : this.description,
            image : this.image, 
            userRef : this.userRef,
        }
    }
}