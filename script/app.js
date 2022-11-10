let listDOM = document.querySelector('#list')   // Bilgi eklenecek listenin seçim işlemi
let localTask = {id:"", task:"", check:false}   // Localstorage de bilgileri tutmak için object
let arrayTask = []                              // Localstorage için array
let i=0;                                        // Id ataması için değişken

// Localstorage bilgi eklemek için 
if(localStorage.getItem('load'))
{
    arrayTask =JSON.parse(localStorage.getItem('load'))
    arrayTask.forEach(function (element) 
    {
        i++;
        element.id = `id${i}`;
        localStorage.setItem('load', JSON.stringify(arrayTask))
        
        let liDOM = document.createElement(`li`)
        liDOM.setAttribute('id', `id${i}`)
        liDOM.innerHTML =
        `
        ${element.task}
        <button class="close" style="width: 50px; height:50px; text-align: center;"
        onclick="removeFunc(${i})">x</button>
        `
        listDOM.append(liDOM)
        if(arrayTask[i-1].check)
        {
            let changeLi =document.querySelector(`#id${i}`)
            changeLi.classList.add("checked")
        }
    });
}

// Ekle btonu tipini değiştirme
let elem = document.querySelector('#liveToastBtn')
elem.outerHTML = `<button type="submit" onclick="newElement()" id="liveToastBtn" class="button" style="border-width: 0px">${elem.innerHTML}</button>`;

// Input bilgisini alma
let userTaskDOM = document.querySelector('#userTask')
userTaskDOM.addEventListener('submit', formHandler)

//Kutu içi işlemler
function formHandler(event) {
    event.preventDefault()                          //Sayfanın yenilenmesini engelleme
    const TASK = document.querySelector("#task")    //Kutudaki bilginin atanması
    
    if (TASK.value.trim() == ""){    //input değeri boş ise "toast" bildirimini göster
        $(".error").toast("show");
    }
    else {
        addItem(TASK.value)                 //Bilgi ekleme fonksiyonu çalışır
        TASK.value = ""                     //Gönderdikten sonra input sıfırlama
        $(".succes").toast("show");         //toast bildirimi
    }

}

//Bilgi ekleme 
const addItem = (task) => {
    i++;
    localTask.task = task;
    localTask.id = `id${i}`;
    arrayTask.push(localTask)
    localStorage.setItem('load',JSON.stringify(arrayTask))
    arrayTask = JSON.parse(localStorage.getItem('load'))

    let liDOM = document.createElement(`li`)
    liDOM.setAttribute('id',`id${i}`)
    liDOM.innerHTML =
    `
    ${task}
    <button class="close"
    style="width:50px; height:50px; text-align:center;"
    onclick="removeFunc(${i})">x</button>
    `
    listDOM.append(liDOM)
}

//Silme Fonksiyonu
function removeFunc(j) {
    const element = document.querySelector(`#id${j}`);

    let index = arrayTask.findIndex(function(aTask) {
        return JSON.stringify(aTask).indexOf(`id${j}`) >=0
    });
        arrayTask.splice(index, 1)
        localStorage.setItem('load', JSON.stringify(arrayTask))
        arrayTask = JSON.parse( localStorage.getItem('load'))
        element.remove(); 
}

//Checked işlemi
document.addEventListener('click', (element) => 
{
    if(element.target.matches('li'))
    {
        let elementId = element.target.id;
        let index = arrayTask.findIndex(function (aTask) {
            return JSON.stringify(aTask).indexOf(`${elementId}`) >= 0
        })

        arrayTask[index].check = !(arrayTask[index].check)
        localStorage.setItem('load', JSON.stringify(arrayTask))
        arrayTask = JSON.parse( localStorage.getItem('load'))

        let changeLi = document.querySelector(`#${elementId}`)
        changeLi.classList.toggle("checked")
    }
});