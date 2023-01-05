const name=document.querySelector('#name');
const email=document.querySelector('#email');
const phone=document.querySelector('#phone');

document.getElementById('signup').addEventListener('click',signup);

async function signup(e){
    e.preventDefault();
    const data={
        "name":name.value,
        "email":email.value,
        "phone":phone.value
    }

    axios.post('')
}
