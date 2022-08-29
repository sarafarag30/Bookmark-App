var bookmarkName = document.getElementById("bookmarkName");
var bookmarkNameAlert = document.getElementById("bookmarkNameAlert");
var bookmarkUrl = document.getElementById("bookmarkUrl");
var bookmarkUrlAlert = document.getElementById("bookmarkUrlAlert")
var fillMsg = document.getElementById("fillMsg");
var bookmarkCardHref = document.getElementById("bookmarkCardHref");
var addBtn = document.getElementById("addBtn");
var formInputs = document.getElementsByClassName("form-control");
var search = document.getElementById("search");

var bookmarkContainer = [];
var currentIndex;

if(localStorage.getItem('ourBookmark') != null){
    bookmarkContainer = JSON.parse(localStorage.getItem('ourBookmark'));
    displayBookmark();
};

addBtn.onclick = function(){
    if(bookmarkName.value == "" || bookmarkUrl.value == ""){
        bookmarkCardHref.removeAttribute("href");
        fillMsg.classList.replace("d-none","d-block");
    }else if(addBtn.innerHTML == "Add Bookmark"){
        bookmarkCardHref.setAttribute("href","#bookmark-card");
        fillMsg.classList.replace("d-block","d-none");
        addBookmark();
    }else{
        bookmarkCardHref.setAttribute("href","#bookmark-card");
        fillMsg.classList.replace("d-block","d-none");
        submitUpdate(currentIndex);
    }
    localStorage.setItem("ourBookmark",JSON.stringify(bookmarkContainer));
    displayBookmark();
    clearForm();
};

function addBookmark(){
    if(bookmarkNameValidation() == true && bookmarkUrlValidation() == true){
        var bookmark ={
            name : bookmarkName.value,
            url : bookmarkUrl.value
        }
        bookmarkContainer.push(bookmark);
    }
};

function displayBookmark(){
    var cartoona = ``;
    for(var i=0; i <bookmarkContainer.length; i++){
        cartoona += `
            <div class="container">
                <div class="row mb-3">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="bookmark-card-name text-center">
                          <h3 class="text-white">${bookmarkContainer[i].name}</h3>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="card-btn text-center">
                            <button class="btn btn-success ">
                               <a href="https://${bookmarkContainer[i].url}" target="_blank" class="visit-btn text-decoration-none text-white">Visit</a> 
                            </button>
                            <button class="btn btn-secondary " onclick="getBookmarkInfo(${i})">
                                <a class="update-btn text-decoration-none text-white" href="#to-top">Update</a> 
                            </button>
                            <button class="btn btn-danger" onclick="deleteBookmark(${i})">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    document.getElementById("bookmarkCards").innerHTML=cartoona;
};

function clearForm(){
    for(var i=0; i<formInputs.length ;i++){
        formInputs[i].value = "";
        formInputs[i].classList.remove("is-valid");
    };
};

function getBookmarkInfo(index){
    bookmarkName.value = bookmarkContainer[index].name;
    bookmarkUrl.value = bookmarkContainer[index].url;
    addBtn.innerHTML = "Update Bookmark";
    currentIndex = index;
};

function submitUpdate(currentIndex){
    var bookmark = {
        name : bookmarkName.value,
        url : bookmarkUrl.value
    };
    bookmarkContainer[currentIndex] = bookmark ;
    localStorage.setItem('ourBookmark' , JSON.stringify(bookmarkContainer));
    addBtn.innerHTML = "Add Bookmark";
};

function deleteBookmark(index){
    bookmarkContainer.splice(index,1);
    localStorage.setItem('ourBookmark' , JSON.stringify(bookmarkContainer));
    displayBookmark();
};

search.onkeyup = function(){
    var term = search.value;
    var cartoona = ``;
    for( i = 0 ; i < bookmarkContainer.length ; i++ ){
        if(bookmarkContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true){
         cartoona += `
            <div class="container">
                <div class="row mb-3">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="bookmark-card-name text-center">
                           <h3 class="text-white">${bookmarkContainer[i].name}</h3>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="card-btn text-center">
                            <button class="btn btn-success ">
                                <a href="https://${bookmarkContainer[i].url}" target="_blank" class="visit-btn text-decoration-none text-white">Visit</a> 
                            </button>
                            <button class="btn btn-secondary " onclick="getBookmarkInfo(${i})">
                                <a class="update-btn text-decoration-none text-white" href="#to-top">Update</a> 
                            </button>
                            <button class="btn btn-danger" onclick="deleteBookmark(${i})">Delete</button>
                        </div>
                    </div>
                </div>
        </div>
         `;
        };
    };
    document.getElementById('bookmarkCards').innerHTML = cartoona;
};

bookmarkName.addEventListener("keyup", bookmarkNameValidation);
function bookmarkNameValidation(){
    var regexName = /^[A-Z][a-z A-Z 0-9]{5,10}$/;
    if(regexName.test(bookmarkName.value) == true){
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");
        bookmarkNameAlert.classList.add("d-none");
        bookmarkNameAlert.classList.remove("d-block");
        addBtn.disabled = false;
        return true;
    }else{
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");
        bookmarkNameAlert.classList.add("d-block");
        bookmarkNameAlert.classList.remove("d-none");
        addBtn.disabled = true;
        return false;
    };
};

bookmarkUrl.addEventListener("keyup" , bookmarkUrlValidation);
function bookmarkUrlValidation(){
    var regexUrl = /^(www)\.[a-z0-9\-\.]+\.(com|net|org)$/;
    if(regexUrl.test(bookmarkUrl.value) == true){
        bookmarkUrl.classList.add("is-valid");
        bookmarkUrl.classList.remove("is-invalid");
        bookmarkUrlAlert.classList.add("d-none");
        bookmarkUrlAlert.classList.remove("d-block");
        addBtn.disabled = false;
        return true;
    }else{
        bookmarkUrl.classList.add("is-invalid");
        bookmarkUrl.classList.remove("is-valid");
        bookmarkUrlAlert.classList.add("d-block");
        bookmarkUrlAlert.classList.remove("d-none");
        addBtn.disabled = true;
        return false;
    };
};

bookmarkName.addEventListener("blur",duplicatedBookmark);
function duplicatedBookmark(){
    for(var i=0; i<bookmarkContainer.length; i++){
        if(bookmarkName.value == bookmarkContainer[i].name){
            bookmarkNameAlert.classList.add("d-block");
            bookmarkNameAlert.classList.remove("d-none");
            bookmarkName.classList.add("is-invalid");
            bookmarkName.classList.remove("is-valid");
            bookmarkNameAlert.innerHTML = "The Bookmark name already exists.";
            addBtn.disabled = true;
        }
    }
}
