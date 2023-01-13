document.getElementById('forget').addEventListener('click',forgetpassword);
async function forgetpassword(e){
    e.preventDefault();
    const email=document.querySelector('#email');
    const data={
       
        "email":email.value,
       
    }
    try{
        let response=await axios.post('http://localhost:3000/forget-password',data)
        console.log(response.data[0]);
     if(response.data[0].status==1){
        document.getElementById('msg').textContent=response.data[0].message;
       
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