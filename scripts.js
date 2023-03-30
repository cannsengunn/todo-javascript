let inputDOM = document.querySelector("#task");                             
let listDOM = document.querySelector("#list");
let allLiDOM = document.querySelectorAll("li");

function newElement(){
    if(!inputDOM.value || !inputDOM.value.trim()){
        $('.error').toast('show')
    }else{
        let liDOM = document.createElement("li")
        listDOM.append(liDOM)
        liDOM.innerHTML = inputDOM.value
        let closeButton = document.createElement("span");
        closeButton.innerHTML = "&times;";
        closeButton.classList.add("close");
        liDOM.appendChild(closeButton);
        $('.success').toast('show')
        setStorage()
    }
    inputDOM.value = ""           
}

function setStorage() {
    let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];
    toDoList.push(inputDOM.value); 
    localStorage.setItem('toDoList', JSON.stringify(toDoList)); 
}

function loadList() {
    const toDoList = JSON.parse(localStorage.getItem("toDoList")) || [];
    for (let i = 0; i < toDoList.length; i++) {
      const liDOM = document.createElement("li");
      liDOM.textContent = toDoList[i];
      listDOM.appendChild(liDOM);
      let closeButton = document.createElement("span");
      closeButton.innerHTML = "&times;";
      closeButton.classList.add("close");
      liDOM.appendChild(closeButton);
    }
}

function deleteTask() {
    let listItem = this.parentElement;
    let listArray = JSON.parse(localStorage.getItem("toDoList")) || [];
    let index = Array.prototype.indexOf.call(listDOM.children, listItem);
    listArray.splice(index, 1);
    localStorage.setItem("toDoList", JSON.stringify(listArray));
    listDOM.removeChild(listItem);
}

  // Add event listener to the list container to listen for click events on list items
listDOM.addEventListener('click', function(event) {
    // Check if the clicked element is a list item
    if (event.target.tagName === 'LI') {
      // Toggle the class to strike through the text of the clicked list item
      event.target.classList.toggle('checked');
    }else if (event.target.classList.contains("close")) {
        deleteTask.call(event.target);
        $('.delete').toast('show');
    }
  });
  

  loadList();