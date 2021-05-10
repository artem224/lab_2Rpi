let array=[
"Cupiditate ipsam delectus molestias debitis nisi maxime vero odio aperiam Sapiente distinctio accusamus libero.Ipsum dolor sit amet consectetur adipisicing elit laborum sunt consequatur cupiditate perspiciatis obcaecati atqu optio voluptate reiciendis vel accusamus nam maxime vero odiobero."    ,

    "Facilis nulla tempore dolores, tempora, cum eum aliquam nam odio mollitia repellat. Fuga tempore sapiente, quisquam doloribus mciatis obcaecati atqu optio voluptate reiciendis vel accusamus nam cum doloremque consectetur cupiditate ipsam delectus molestias debitis nisi maxime vero odio apnctio accusamus libero."
    ,
    'Nisi minus atque aperiam, tempora natus eos voluptas accusantium quia id facere. Ducimus molestiae aperiam elige officia quas dolor sit amet consectetur adipisicing elit laborum sunt consequatur cupiditate perspiciatis obcaecati atqu optio voluptate reiciendis vel accusamus nam delectus .'
    ,
    'Dicta nobis illo quo quasi nisi minus atque aperiam, tempora natus eos voluptas accusantium quia id facere. Ducimus molesti Reiciendis eveniet tempora magnam fugit ratione aperiam, consequuntur rerum nostrum iure placeat tenetur odit officia quasi qui molestiquis fugiat.'
    ,
    'Reiciendis eveniet tempora magnam fugit ratione aperiam, consequuntur rerum nostrum iure placeat tenetur odit officia quasi qui molestias commodi veritatis repellendus ad cum aliquid at quis fugiat deleniti molestiae. e reiciendis ate perspiciatate reiciendis vel accusamus nam cum doloremque.'
    ,
    'Cupiditate ipsam delectus molestias debitis nisi maxime vero odio aperiam Sapiente distinctio accusamus libero.Ipsum dolor sit amet consectetur adipisicing elit laborum sunt consequatur cupiditate perspiciatis obcaecati atqu optio voluptate reiciendis vel accusamus nam maxime vero odiobero.'
    ,
    "Reiciendis eveniet tempora magnam fugit ratione aperiam, consequuntur rerum nostrum iure placeat tenetur odit officia quasi qui molestias commodi veritatis repellendus ad cum aliquid at quis fugiat deleniti molestiae. e reiciendis ate perspiciatate reiciendis vel accusamus nam cum doloremque.",

    "Adipisicing elit laborum sunt consequatur cupiditate perspiciatis obcaecati atqu optio voluptate reiciendis vel accusamus.Dicta icia quasi qui molestias commodi veritatis repellendus ad cum aliquid at quis fugiat deleniti molestiae.  Nam cum dro odio aperiam Sapiente distinctio accusamus libero."
]

let tip = document.querySelector('.tip');
window.onload=function(){
    //Если в локальном хранилище нет ключа "disabled"
    if(!localStorage.getItem('disabled')){
        let radioItem;
        //Создаем фрагмент
        setTimeout(()=> {
            var fragment = document.createDocumentFragment();
            for (let i = 0; i < array.length; i++) {
                //Создаем тег i
                radioItem = document.createElement('i');
                //Добавляем класс
                radioItem.classList.add('radio-item');
                //Устанавливаем атрибут
                radioItem.setAttribute('name', i + 1);
                //Добавляем тег во фрагмент
                fragment.appendChild(radioItem);
            }
            //Добавляем фрагмент в блок radio-wrapper
            document.querySelector('.radio-wrapper').appendChild(fragment);
            //Добавляем класс curretn первому radio-item
            document.querySelector('.radio-item:first-child').classList.add('current');
            //Изменяем значение тега с классом innerHTML
            tip.innerHTML = array[0];
            document.querySelector('.notification').classList.remove('close');
        },5000)
    }
}

//Ссылка значок закрытия
let closer = document.querySelector('.icon-cancel');
function close(){
    document.querySelector('.notification').classList.add('close');
}
//При нажатии закрываем
closer.addEventListener('click',close);

//Устанавливаем ключ в локальное хранилище при нажатии чекбокса
let checkbox = document.querySelector('input[type=checkbox]');
function toStorage(){
    if (checkbox.checked)
        localStorage.setItem('disabled', true);
    else localStorage.removeItem('disabled', true);
}
//Добавляем слушателя на чекбокс
checkbox.addEventListener('click',toStorage);


//Используем псевдомассив
let leftArrow = document.querySelector('.icon-left-circled2');
leftArrow.addEventListener('click', ()=>{move('toLeft')});

let rightArrow = document.querySelector('.icon-right-circled2');
rightArrow.addEventListener('click', ()=>{move('toRight')});

//Навигация по radio-item
let radioWrapper = document.querySelector('.radio-wrapper');
function navigate(){
    //Нажалтый элемент
    let target = event.target;
    if (target.tagName !== 'I') return;
    let current = document.querySelector('.current');
    current.classList.remove('current');
    target.classList.add('current');
    let targetIndex=target.getAttribute('name');
    tip.innerHTML=array[targetIndex-1];
}
radioWrapper.addEventListener('click', navigate);

//Нажатие кнопок
document.addEventListener("keydown", e =>{
    if (e.keyCode === 27) close();
    if (e.keyCode === 39) move('toRight');
    if (e.keyCode === 37) move('toLeft');
    return;
});

function move(){

    //Получение текущего чекбокса
    let current = document.querySelector('.current');
    //Получение атрибута
    let currentIndex = current.getAttribute('name');
    //Удаление класса current у чекбокса
    current.classList.remove('current');
    //При нажатии на правую кнопку
    if(arguments[0]==='toRight'){
        if (+currentIndex === array.length) currentIndex=0;
        document.querySelector(`.radio-item:nth-child(${++currentIndex})`).classList.add('current');
    }
    //При нажатии на левую кнопку
    if(arguments[0]==='toLeft'){
        if (+currentIndex === 1) currentIndex=array.length+1;
        document.querySelector(`.radio-item:nth-child(${--currentIndex})`).classList.add('current');
    }
    //Устанавливаем текст из массива
    tip.innerHTML=array[currentIndex-1];
}