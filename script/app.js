let listDOM = document.querySelector('#list')   // Bilgi eklenecek listenin seçim işlemi
let localTask = {id:"", task:"", check:false}   // Localstorage de bilgileri tutmak için object
let arrayTask =[]                               // Localstorage için array
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