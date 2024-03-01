//Select everything
const list = document.querySelector('#todo-list');
const form = document.querySelector('#create-todo');
const input = document.querySelector('#new-todo');
let todoCount = 1;
let todo = [];


//Remove button to remove li
list.addEventListener('click', function(e){
    if (e.target.tagName === 'LI'){
        e.target.classList.toggle('done');
    } else if (e.target.tagName === 'BUTTON'){
        e.target.parentElement.remove();
    }
})
// creating a new todo
form.addEventListener('submit', function(e){
    //preventing refresh
    e.preventDefault();
   //adding array to local storage
    addToLocalStorage(todo)
    //creating and adding new li w/button to list
    createLi()

    console.log(localStorage)
})
//accessing local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('TODO_LIST')
    if (reference){
        // const todoItems = JSON.parse(reference) 
        // todoList = todoItems.map((item) => {
        //     const todoValue = Object.values(item)[0];
        //     return todoValue
        // })
        // todo = todoList
        todo = JSON.parse(reference)
        // renderTodo(todo)
        renderTodo(todo)
       console.log(todo)
    }
}
//new Li function
function createLi() {
    const newLi = document.createElement('li');
    const newBtn = document.createElement('button');

    newLi.innerText = input.value;
    list.append(newLi);
    
    newBtn.innerText = 'Remove';
    newLi.append(newBtn);
    input.value = '';
}
//add to local storage function
function addToLocalStorage(todo){
    // let obj = {}
    // let key = 'TODO_ITEM:' + todoCount
    // console.log(obj)
    // todoCount++
    // obj[key] = input.value
    // todo.push(obj)
    todo.push(input.value)
    localStorage.setItem('TODO_LIST', JSON.stringify(todo))
    
}
// keep todo list on refresh function
function renderTodo(){
    //erasing inside the ul to update from localStorage
    list.innerHTML = '';

   //iterating over the todo array to get values
    for (let i = 0; i < todo.length; i++) { 
        console.log(todo[i])
        let indx = todo[i]
        const newLi = document.createElement('li');
        const newBtn = document.createElement('button');
        newLi.innerText = indx;
        list.append(newLi);
        console.log(indx)
        newBtn.innerText = 'Remove';
        newLi.append(newBtn);
        
        
    }
        
}
getFromLocalStorage();

//I'm feeling much better about coding and using the resources I have to problem solve lately. In this project my main issue was retrieving from localStorage. I made a post on stackoverflow which can be found here https://stackoverflow.com/questions/78010640/making-a-basic-todo-list-on-refresh-when-accessing-local-storage-to-keep-todo-l/78010992#78010992  and got some help which was very insightful into how I essentialy made my own problem by overcomplicating the localStorage

//I also took some inspiration from this post about making a todo list https://thecodingpie.medium.com/how-to-build-a-todo-list-app-with-javascript-and-local-storage-a884f4ea3ec  I was over packing my eventlistener instead of just making seperate functions to call later on in that same eventlistener. 