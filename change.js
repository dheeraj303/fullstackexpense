

document.getElementById('change').addEventListener('click',changepassword);
async function changepassword(e){
    e.preventDefault();
    const token=localStorage.getItem('token');
    let premium=JSON.parse(atob(token.split('.')[1]));
    // const id=document.querySelector('#id');
    const password=document.querySelector('#password');
    const data={
       
        "id":premium.userId,
        "password":password.value
       
    }
    try{
        let response=await axios.post('http://localhost:3000/change-password',data)
        console.log(response.data[0]);
     if(response.data[0].status==1){
        document.getElementById('msg').textContent=response.data[0].message;
        // email.value=response[0].data.email;
        window.location.href='login.html';
     }
     if(response.data[0].status==0){
        document.getElementById('msg').textContent=response.data[0].message;
     }
    }
    catch(err){
        console.log(err);
    }
}