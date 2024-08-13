var form=document.getElementById("form")
var entry=document.getElementById("entry")
 var todo=document.getElementById("todo-list")
var al=document.querySelector(".alert")
var clear=document.querySelector(".clear-btn")
let main=document.querySelector("main")
let body=document.querySelector("body")
let cont=document.querySelector(".container")
let title=document.querySelector(".title");
let ul=document.querySelector("ul");
let ree=document.querySelector(".ree");
let cancelBtn = document.querySelector(".cancel-btn")
let editBtn = document.querySelector(".edit-btn")
let submitBtn = document.querySelector(".submit-btn")
let editElement = null 
// start code online or offline
 window.onload=function(){
  if(window.navigator.onLine){
    online()
   }else{
     offline()
  }
 }
window.addEventListener("online",function(){
  online();
});
window.addEventListener("offline",function(){
  offline();
});
//end code online or offline

function reeload(){
  window.location.reload();
}
function online(){
 body.style.height="";
  main.classList.remove("d-none")
  cont.classList.add("d-none")
title.classList.add("d-none")
title.style.color='green';
ul.classList.add("hit");
ree.classList.add("hit");
}
function offline(){
  body.style.height="100vh";
 main.classList.add("d-none")
 cont.classList.remove("d-none")
 title.classList.remove("d-none")
  title.innerText="No internet";
  title.style.color="black";
  ul.classList.remove("hit");
 ree.classList.remove("hit");
}
// end offlin or online

cancelBtn.addEventListener("click",()=>{
  entry.value=''
  editBtn.classList.add("d-none")
  cancelBtn.classList.add("d-none")
  submitBtn.classList.remove("d-none")
  let boxes = document.querySelectorAll(".bx")

  for (let box of boxes) {
      box.classList.remove("d-none")
  }
  clear.classList.remove("d-none")
  editElement= null
  alert("cancel","alert-success")
})

editBtn.addEventListener("click",()=>{
  editElement.innerText=entry.value
  entry.value = ""
  editBtn.classList.add("d-none")
  cancelBtn.classList.add("d-none")
  submitBtn.classList.remove("d-none")

  let boxes = document.querySelectorAll(".bx")

  for (let box of boxes) {
      box.classList.remove("d-none")
  }
  clear.classList.remove("d-none")
  editElement = null
  stor()
  alert("edit done","alert-success")
})

retriev()

function retriev() {
  let mynotes=localStorage.getItem("note")
  let notes=JSON.parse(mynotes)||[]
  notes.forEach(note => {
    var li=document.createElement("li")
    li.className="list-item"

    var p=document.createElement("p")
    p.className ="text"
    p.innerText=note.data;

    var edit=document.createElement("i")
    edit.className="bx bxs-edit bx-sm"
    edit.innerText="edit"
    edit.addEventListener("click" , ()=>{
      let p=edit.previousElementSibling
      let text=p.innerText
      entry.value=text
      submitBtn.classList.add("d-none")
      editBtn.classList.remove("d-none")
      cancelBtn.classList.remove("d-none")
   
      let boxs=document.querySelectorAll(".bx")
       for(let box of boxs){
         box.classList.add("d-none")
       }
       clear.classList.add("d-none")
   editElement=p
      
         alert("edit succis","alert-success");
     })
     var check=document.createElement("i")
     check.className="bx bx-check bx-sm"
     check.innerText="check"
     if (note.checked) {
      check.innerText= "Uncheck"
      li.classList.add("liChecked")
     }else{
        check.innerText= "check"
     }
     check.addEventListener("click" , ()=>{
       var ch=li.classList.toggle("liChecked")
       if(ch){
         check.innerText="uncheck"
       }else{
     check.innerText="check"
       }
       stor()
     })
    var delet=document.createElement("i")
    delet.className="bx bxs-trash bx-sm"
    delet.innerText="delete"
    delet.addEventListener("click" , ()=>{
     li.remove()
     if(todo.children.length){
      clear.classList.remove("d-none")
     }else{
      clear.classList.add("d-none")
     }
     stor()
     alert("deleted","alert-success");
    })
    li.append(p)
    li.append(edit)
    li.append(check)
    li.append(delet)
    todo.append(li)
    clear.classList.remove("d-none")
  })
}

function stor() {
  let lis=document.querySelectorAll(".list-item")
  let mynotes=Array.from(lis)
  let notesdata=mynotes.map((note)=>{
    let text=note.querySelector(".text").innerText
    let check=note.classList.contains("liChecked")
    let data={
      "data":text,
      "checked":check
    }
    return data
  })
 let notesdatastr=JSON.stringify(notesdata)
 localStorage.setItem("note",notesdatastr)
}
function alert(ma,claas) {
  al.innerText=ma
al.classList.add(claas)
setTimeout(() => {
  al.innerText=""
al.classList.remove(claas)
}, 2000);
}
clear.addEventListener("click" , ()=>{
  todo.innerText = ""
  clear.classList.add("d-none")
  alert("Items Cleared" , "alert-success")
  stor()
})


form.addEventListener("submit",(e)=>{
  e.preventDefault()
  var data=entry.value
  if(entry.value=="" ){
    alert("error","alert-danger");
  }
  else{
    clear.addEventListener("click",()=>{
      todo.innerHTML=""
      clear.classList.add("d-none")

      alert("items clered","alert-success")
    })
    var li=document.createElement("li")
    li.className="list-item"
    var p=document.createElement("p")
    p.className ="text"
    p.innerText=data;
    var edit=document.createElement("i")
    edit.className="bx bxs-edit bx-sm"
    edit.innerText="edit"
    edit.addEventListener("click" , (e)=>{
     let p=edit.previousElementSibling
   let text=p.innerText
   entry.value=text
   submitBtn.classList.add("d-none")
   editBtn.classList.remove("d-none")
   cancelBtn.classList.remove("d-none")

   let boxs=document.querySelectorAll(".bx")
    for(let box of boxs){
      box.classList.add("d-none")
    }
    clear.classList.add("d-none")
editElement=p
   
      alert("edit succis","alert-success");
     })
    var check=document.createElement("i")
    check.className="bx bx-check bx-sm"
    check.innerText="check"
    check.addEventListener("click" , ()=>{
      var ch=li.classList.toggle("liChecked")
      if(ch){
        check.innerText="uncheck"
      }else{
    check.innerText="check"
      }
      stor()
    })
    var delet=document.createElement("i")
    delet.className="bx bxs-trash bx-sm"
    delet.innerText="delete"
    delet.addEventListener("click" , ()=>{
     li.remove()
     if(todo.children.length){
      clear.classList.remove("d-none")
     }else{
      clear.classList.add("d-none")
     }
     stor()
     alert("deleted","alert-success");
    })
    li.append(p)
    li.append(edit)
    li.append(check)
    li.append(delet)
    todo.append(li)
    entry.value=''
    
    alert("done","alert-success");
   clear.classList.remove("d-none")
   
  stor()
  }
  
})
