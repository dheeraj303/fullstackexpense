const btn=document.getElementsByClassName('btn');
const list=document.getElementsByClassName('users');
btn[0].addEventListener('click',adddata);
console.log(document.getElementsByClassName('btn'));
async function adddata(e){
    var id=document.getElementById('id').value;
    var amount=document.getElementById('amount').value;
var desc=document.getElementById('desc').value;
var type=document.getElementById('type').value;
    e.preventDefault();
//    alert(id);
   
    if(amount!=0 && desc!='' &&type!=''){
        console.log(`${amount} ${desc} ${type}`);
    //     class Obj{
    //         constructor(amount,desc,type){
    //             this.amount=amount;
    //             this.desc=desc;
    //             this.type=type;
    //         }

    //    }
       let obj1={
                "amount":amount,
                "desc":desc,
                "type":type
       }
        // let obj =new Obj(`${amount}, ${desc}, ${type}`);
            const token=localStorage.getItem('token');
            if(id==''){
                try{
                    console.log(token);
           let response= await axios.post('http://localhost:3000/save',obj1,{headers:{"Authorization":token}})
           viewuser(response.data);
        }
            catch(err){console.log(err)};
        }else{
                try{
               let response=await axios.post(`http://localhost:3000/update/${id}`,obj1)
               console.log(response);
               getuserbyid(id);
            }
                catch(err){console.log(err)};
        }
           
        
        document.getElementById('amount').value="";
        document.getElementById('desc').value="";
        

    }
    
}
window.addEventListener('DOMContentLoaded',getuser);
window.addEventListener('DOMContentLoaded',checkpremium);

function checkpremium(){
    const token=localStorage.getItem('token'); 
    let premium=JSON.parse(atob(token.split('.')[1]));
    console.log(premium);
    if(premium.ispremium){
        const childhtml='<h1>You are a premium User </h1> <button id="leaderboard" onclick="getleaderboard()" class="btn btn-lg btn-primary">Show Leaderboard</button>';
        document.querySelector('#premium').innerHTML=childhtml;
    }
}
async function getuserbyid(id){
   try{
    let userbyid=await axios.get(`http://localhost:3000/getbyid/${id}`)
    viewuser(userbyid.data);
}
    
    catch(err){console.log(err)};
}
async function getuser(){
    const token=localStorage.getItem('token');
    try{
    let response=await axios.get('http://localhost:3000/get-expense',{headers:{"Authorization":token}})
    for (let i = 0; i < response.data.length; i++){
        // nextValue = localStorage.getItem(localStorage.key(i));
    //    console.log(nextValue);
    //    let data=JSON.parse(value);
        viewuser(response.data[i]);
    
    
    }   
    }
    catch(err){
        console.log(err)
    };
}

// let nextValue;
// for (let i = 0; i < localStorage.length; i++){
//     nextValue = localStorage.getItem(localStorage.key(i));
//    console.log(nextValue);
//    let data=JSON.parse(value);
//     viewuser(data);


// }
 async function editexpense(amount){
//     // console.log('clicked');
//    let detail= localStorage.getItem(amount);
//    let data=JSON.parse(detail);
//    console.log(data);
try{
let response=await axios.get(`http://localhost:3000/getbyid/${amount}`)
// console.log(response.data);
document.getElementById('id').value=response.data.id;
document.getElementById('amount').value=response.data.amount;
document.getElementById('desc').value=response.data.desc;
document.getElementById('type').value=response.data.type;
deletefromlist(response.data.id);
}
catch(err){
    console.log(err);
}
//    var amount=document.getElementById('amount').value=data.amount;
//    var desc=document.getElementById('desc').value=data.desc;
//    var type=document.getElementById('type').value=data.type;
   
}
function viewuser(data){
    // const li=document.createElement('li');
    
   
   
    const childhtml=`<li id=${data.id}> ${data.amount} ${data.desc} ${data.type} <button onclick="editexpense('${data.id}');">Edit</button><button onclick="deleteexpense('${data.id}');">Delete</button>`;
    
    const parentnode=document.querySelector('.users');
    parentnode.innerHTML=parentnode.innerHTML+childhtml;
    // console.log(list);

}

async function deleteexpense(id){
    const token=localStorage.getItem('token');
        // localStorage.removeItem(amount);
      try{
        axios.get(`http://localhost:3000/delete/${id}`,{headers:{"Authorization":token}})
        deletefromlist(id);
    }
       
        catch(err){console.log(err)};
       
}
function deletefromlist(amount){
    const parentnode=document.getElementById('user');
    const nodedelete=document.getElementById(amount);
    if(nodedelete){
        parentnode.removeChild(nodedelete);
    }
   }


   document.getElementById('rzp-button1').onclick=async function(e){
    const token=localStorage.getItem('token');
    let response=await axios.get('http://localhost:3000/purchase/premiummembership',{headers:{"Authorization":token}});
    console.log(response);
    var options={
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        "handler":async function(response){
            await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id
            },{headers:{"Authorization":token}})
            alert("You are a Premium User");
            const childhtml='<h1>You are a premium User </h1> <button id="leaderboard" onclick="getleaderboard()" class="btn btn-lg btn-primary">Show Leaderboard</button>';
            document.querySelector('#premium').innerHTML=childhtml;
        }
    }
    var rzp1 = new Razorpay(options);
 
      rzp1.open();
      e.preventDefault();
    rzp1.on('payment.failed',function(response){
        console.log(response);
        alert('Something Went Wrong');
    })
   }
  
//    window.addEventListener('DOMContentLoaded',getuser);
   async function getleaderboard(){
    const parentnode=document.querySelector('#leaderboard1');
    parentnode.innerHTML="";
    // alert("aaya")
    const token=localStorage.getItem('token');
    try{
    let response=await axios.get('http://localhost:3000/premium/get-leadership',{headers:{"Authorization":token}})
    for (let i = 0; i < response.data.length; i++){
        // nextValue = localStorage.getItem(localStorage.key(i));
    //    console.log(nextValue);
    //    let data=JSON.parse(value);
    viewleaderboard(response.data[i]);
    
    
    }   
    }
    catch(err){
        console.log(err)
    };
}

   function viewleaderboard(data){
    // const li=document.createElement('li');
    
   
   
    const childhtml=`<li id=${data.id}> ${data.name} ${data.total}  `;
    
    const parentnode=document.querySelector('#leaderboard1');
    console.log(parentnode);
    parentnode.innerHTML=parentnode.innerHTML+childhtml;
    // console.log(list);

}