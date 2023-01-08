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
            if(id==''){
                try{
           let response= await axios.post('http://localhost:3000/save',obj1)
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

async function getuserbyid(id){
   try{
    let userbyid=await axios.get(`http://localhost:3000/getbyid/${id}`)
    viewuser(userbyid.data);
}
    
    catch(err){console.log(err)};
}
async function getuser(){
    try{
    let response=await axios.get('http://localhost:3000/get-expense')
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
        // localStorage.removeItem(amount);
      try{
        axios.get(`http://localhost:3000/delete/${id}`)
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