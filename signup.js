const name=document.querySelector('#name');
const email=document.querySelector('#email');
const password=document.querySelector('#password');

document.getElementById('signup').addEventListener('click',signup);

async function signup(e){
    e.preventDefault();
    const data={
        "name":name.value,
        "email":email.value,
        "password":password.value
    }
    try{
        let response=await axios.post('http://localhost:3000/signup',data)
        console.log(response.data[0]);
     if(response.data[0].status==1){
        document.getElementById('msg').textContent=response.data[0].message;
        // window.SharedArrayBuffer.location
     }
     if(response.data[0].status==0){
        document.getElementById('msg').textContent=response.data[0].message.name;
     }
    }
    catch(err){
        console.log(err);
    }
}
