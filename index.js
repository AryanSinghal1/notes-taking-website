showNotes();
var addNote = document.querySelector(".note-div");
var createNote = document.querySelector(".create-container");
addNote.addEventListener("click", () => {
  createNote.style.display = "block";
});
function dispCreate() {
  createNote.style.display = "block";
}
var Exit = document.querySelector("#exit");
Exit.addEventListener("click", () => {
  createNote.style.display = "none";
  createContainer.style.display = "none";
});
var Create = document.querySelector("#create");
Create.addEventListener("click", () => {
  createNote.style.display = "none";
  var Title = document.querySelector("#title");
  var Desc = document.querySelector("#desc");
  let note = localStorage.getItem("notes");
  var notes = {
    noteTitle: "",
    noteDesc: "",
  };
  notes.noteTitle = Title.value;
  notes.noteDesc = Desc.value;
  if (note == null) {
    NoteObj = [];
  } else {
    NoteObj = JSON.parse(note);
  }
  NoteObj.push(notes);
  console.log(NoteObj);
  localStorage.setItem("notes", JSON.stringify(NoteObj));
  Title.value = "";
  Desc.value = "";
  showNotes();
});
function showNotes() {
  let note = localStorage.getItem("notes");
  if (note == null) {
    NoteObj = [];
  } else {
    NoteObj = JSON.parse(note);
  }
  console.log(NoteObj);
  let html = `<div onClick = "dispCreate()" class="note-div">
  <img src="./plus.png">
  </div>`;
  NoteObj.forEach((element, index) => {
    html =
    html +
    `<div class="note">
    <div class="in-note">
    <div class="input" onclick="showCreateContainer(${index})"><h2>${element.noteTitle}</h2></div>
    <div class="desc" onclick="showCreateContainer(${index})"><p>${element.noteDesc}</p></div>
    <div class="btn2"><button onclick="deleteNote(${index})" >Delete</button></div>
    </div>
    </div>`;
    
  });
  let allNotes = document.querySelector(".all-notes");
  if (NoteObj.length != 0) {
    allNotes.innerHTML = html;
  } else {
    allNotes.innerHTML = 
    `<div onClick = "dispCreate()" class="note-div">
    <img src="./plus.png">
    </div>`;
  }
}
var createContainer = document.querySelector('.create-container1');
function showCreateContainer(id){
  createContainer.style.display = 'block';
  var editInput = document.querySelector('#edit-title');
  var editDesc = document.querySelector('#edit-desc');
  var button = document.querySelector('.btns2');
  editInput.innerHTML = `<h3>${NoteObj[id].noteTitle}</h3>`;
  editDesc.innerHTML = `<p>${NoteObj[id].noteDesc}</p>`;
  button.innerHTML = `<button id="edit" onclick = "editit(${id})" class="btn1">Edit</button>
  <button onclick = "createContainer.style.display = 'none'" class="btn1">Cancel</button>`;
}
var createContainer2 = document.querySelector('.create-container2');
function editit(index){
  createContainer2.style.display = "block";
  var editInput = document.querySelector('#title-edit');
  var editDesc = document.querySelector('#desc-edit');
  var button2 = document.querySelector('.btns3');
  editInput.value = NoteObj[index].noteTitle;
  editDesc.value = NoteObj[index].noteDesc;
  button2.innerHTML = `  <button onclick = "saveit(${index})" class="btn1">Save</button>
  <button onclick = "createContainer2.style.display = 'none'" class="btn1">Cancel</button>`
}
function saveit(index){
  createContainer.style.display = 'none';
  createContainer2.style.display = 'none';
  let note = localStorage.getItem("notes");
  if (note == null) {
    NoteObj = [];
  } else {
    NoteObj = JSON.parse(note);
  }
  var editI = document.querySelector('#title-edit');
  var editD = document.querySelector('#desc-edit');
  NoteObj[index].noteTitle = editI.value;
  NoteObj[index].noteDesc = editD.value;
  localStorage.setItem("notes", JSON.stringify(NoteObj));
  showNotes();
}
var objects = [];
function deleteNote(id) {
  let note = localStorage.getItem("notes");
  if (note == null) {
    NoteObj = [];
  } else {
    NoteObj = JSON.parse(note);
  }
  let obj = NoteObj[id];
  objects.push(obj);
  NoteObj.splice(id, 1);
  localStorage.setItem("notes", JSON.stringify(NoteObj));
  showNotes();
  showDeleted(objects);
}
function restoreNotes(id){
  let note = localStorage.getItem("notes");
  if (note == null) {
    NoteObj = [];
  } else {
    NoteObj = JSON.parse(note);
  }
  NoteObj.push(objects[id]);
  localStorage.setItem("notes", JSON.stringify(NoteObj));
  objects.splice(id, 1);
  console.log(objects);
  showDeleted(objects);
  showNotes();
}
function showDeleted(obj){
  var deleted = document.querySelector('.all-notes1');
  let html1 = "";
  obj.forEach((ele, index)=>{
    html1 = html1+`<div class="note">
    <div class="in-note">
    <div class="input"><h2>${ele.noteTitle}</h2></div>
    <div class="desc"><p>${ele.noteDesc}</p></div>
    <div class="btn2"><button onclick = "restoreNotes(${index})">Restore</button></div>
    </div>
    </div>`;
  })
  if (obj.length != 0) {
    deleted.innerHTML = html1;
  } else {
    deleted.innerHTML = "";
  }
}
var main = document.querySelector('#main-content');
var contact = document.querySelector('#contact');
var body = document.querySelector('body');
var trash = document.querySelector('#trash');
var deleted = document.querySelector('#deleted-content');
trash.addEventListener("click" , ()=>{
  deleted.style.display = 'block';
  main.style.display = 'none';
  contact.style.display = 'none';
})
var exitBtn = document.querySelector('.exitBtn');
exitBtn.addEventListener("click" , ()=>{
  deleted.style.display = 'none';
  main.style.display = 'block';
  contact.style.display = 'block';
});
