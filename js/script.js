import { getData, BASE_URL, postData, /* patchData */ } from "./http.js"

const box1 = document.querySelector('#twenty-five')
const box2 = document.querySelector('#fifty')
const box3 = document.querySelector('#others')
const form = document.querySelector('.form')

let forma_modal = document.querySelector('.forms')
let modal = document.querySelector('.modal')
let backgroun_modal = document.querySelector('.backgroun_modal')
let modal_button = document.querySelector('.change')
let modal_name = document.querySelector(".name_modal")
let modal_age = document.querySelector('.age_modal')
console.log(form);


/////global/////
let items


getData('/users')
    .then(res => reload(res))



form.onsubmit = (event) => {
    event.preventDefault()
    let user = {
        id: Math.random(),
        firstName: modal_name.value,
        age: modal_age.value

    }
    let fm = new FormData(event.target)

    fm.forEach((value, key) => {
        user[key] = value
    })

    event.target.reset()

    postData('/users', user)
        .then(() => {
            getData('/users')
                .then(res => reload(res))
        })
}






function reload(arr) {
    box1.innerHTML = ''
    box2.innerHTML = ''
    box3.innerHTML = ''
    let id = 0

    for (let item of arr) {
        let div = document.createElement('div')
        let name = document.createElement("div")
        let h3 = document.createElement('h3')
        let img = document.createElement('img')
        let p = document.createElement("p")

        name.classList.add("name")
        div.classList.add('box-item')
        img.classList.add('pop_img')

        h3.innerHTML = `${item.firstName} `
        img.src = "img/edit_black_24dp.svg"
        img.style.width = '30px'
        img.style.border = 0
        div.id = item.id
        p.innerHTML = `Age: ${item.age} `
        name.append(h3, img)
        div.append(name, p)

        if (item.age < 25) {
            box1.append(div)
        }
        else if (item.age > 25 && item.age <= 50) {
            box2.append(div)
        }
        else {
            box3.append(div)
        }
        div.ondblclick = async () => {
            const res = await fetch(BASE_URL + "/users/" + item.id, {
                method: "DELETE"
            })
        }



        img.onclick = (e) => {
            id = +e.target.parentNode.parentNode.id
            backgroun_modal.style.display = 'block'
            modal_name.value = item.firstName
            modal_age.value = item.age
            console.log(id);

            setTimeout(() => {
                backgroun_modal.style.scale = 1

            }, 1);
        }


        forma_modal.onsubmit = (evenet) => {
            evenet.preventDefault()
            let findet = arr.find(el => el.id === id)

            let user = {}
            let fm = new FormData(forma_modal)

            fm.forEach((value, key) => {
                user[key] = value
            })

            fetch(BASE_URL + "/users/" + findet.id, {
                method: "PATCH",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log('click');
reload(arr)
        }
    }

}

modal_button.onclick = () => {
    backgroun_modal.style.display = 'none'

}
console.log(items);
