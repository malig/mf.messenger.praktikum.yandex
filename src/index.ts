const el = document.getElementById("content");

class User{
    name : string;
    age : number;
    constructor(_name:string, _age: number){

        this.name = _name;
        this.age = _age;
    }
}
const tom : User = new User("Том", 29);

if (el) {
    el.innerHTML="Имя24: " + tom.name + " возраст: " + tom.age;
}