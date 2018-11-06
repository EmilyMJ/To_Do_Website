function deleteTask(task) {
    console.log(task);
}

document.getElementById("deleteButton").addEventListener("onclick", (ev)=> {
    ev.preventDefault();
   
    fetch('/tasks/' + taskID, {
        method: 'delete'
    })
    
    document.location.href = '/viewall.html'  
});