const form = document.getElementById("form")//form
const input = document.getElementById("input")//form input field
const todos = document.getElementById("todos")//ul

const todoslocal = JSON.parse(localStorage.getItem('todoslocal')) //if todo are already present in localstorage display them
if(todoslocal){                                                 
    todoslocal.forEach(todo => addTodo(todo))
}

form.addEventListener("submit",(e) =>{
    e.preventDefault();
    addTodo()
})


function addTodo(todo){
    let text = input.value  // value from form input

    if(todo)
        text = todo.text    

    if(text){
        const todoele = document.createElement("li")
        
        todoele.innerText = text
        const delbtn = document.createElement("i");         //font awesome icon
        delbtn.classList.add("fas","fa-check");             // check mark icon
        todoele.appendChild(delbtn);                        //append to li
        const delbtn1 = document.createElement("i");
        delbtn1.classList.add("fas","fa-trash");            //delete icon
        todoele.appendChild(delbtn1);                       //append to li
        todos.appendChild(todoele)                          //append li to ul

        input.value = ""                                    //after todo is entered make input field empty again
        updateLS()                                          //store inside local storage

        const chck = document.getElementsByClassName("fa-check")    //to cross line
        for(var i=0;i<chck.length;i++)
        chck[i].addEventListener("click",checkLiElement);

        const del = document.getElementsByClassName("fa-trash")     //to delete from ul
        for(var i=0;i<del.length;i++)
        del[i].addEventListener("click",deleteLiElement);

        updateLIquery()
    }
}

function updateLS(){
    todosele = document.querySelectorAll('li')
    const todos = []
    todosele.forEach(e =>{
        todos.push({
            text: e.innerText,
            completed: e.classList.contains('completed')
        })
    })
    localStorage.setItem('todoslocal',JSON.stringify(todos)) 
}

function checkLiElement(){
    this.parentElement.classList.toggle("completed");
    updateLS()
    updateLIquery()
}

function deleteLiElement(){
    this.parentElement.remove();
    updateLS();
    updateLIquery()
}

function updateLIquery(){
    var x;
    const active = document.querySelectorAll("li")
    // console.log(active.length)
    const complete = document.querySelectorAll(".completed")
    // console.log(complete.length)
    if(complete.length>0)
    x = active.length - complete.length
    else
    x = active.length
    document.querySelector("small").innerHTML = `Total Active - ${x}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total Completed - ${complete.length}`;
    
}