const input=document.querySelector("#ürün");
const buton=document.querySelector("#ekle_buton");
const form=document.querySelector("#list_form");
const card_body= document.querySelector(".card-body");
const liste=document.querySelector(".list-group");
const temizle_buton=document.querySelector("#clearAll");

form.addEventListener("submit",urun_ekle);
card_body.addEventListener("click",sil);
document.addEventListener("DOMContentLoaded",depolamadan_ekle);
temizle_buton.addEventListener("click",temizle); 


function urun_ekle(e){
const yeni_urun=input.value.trim();
if(yeni_urun===""){
    alert("Ürün adı girin!");
}
else{
urun_ekle_arayüz(yeni_urun);
ekle_depolama(yeni_urun);
}
input.value="";
e.preventDefault();

}

function urun_ekle_arayüz(yeni_urun){

const listItem=document.createElement("li");
const link=document.createElement("a");
link.href="#";
link.className="delete-item";
link.innerHTML='<i class ="fa fa-remove"></i>';
listItem.className="list-group-item d-flex justify-content-between";
listItem.appendChild(document.createTextNode(yeni_urun));
listItem.appendChild(link);
liste.appendChild(listItem);

}

function sil(e){
if(e.target.className==="fa fa-remove"){
   e.target.parentElement.parentElement.remove();
   depolamadan_sil(e.target.parentElement.parentElement.textContent);

   if(liste.firstElementChild===null){
    localStorage.removeItem("urunler");
} 
}   
}

function getir_depolama(){
    let urunler;
    if(localStorage.getItem("urunler")===null){
        urunler=[];
    }
    else{
        urunler=JSON.parse(localStorage.getItem("urunler"));
    }
    return urunler;

}

function ekle_depolama(yeni_urun){
    let urunler=getir_depolama();
    urunler.push(yeni_urun);
    localStorage.setItem("urunler",JSON.stringify(urunler));
}

function depolamadan_ekle(){
    let urunler=getir_depolama();
    urunler.forEach(function(urun){
        urun_ekle_arayüz(urun);
    });
}

function depolamadan_sil(sil){
    let urunler=getir_depolama();
    urunler.forEach(function(urun,index){
        if(urun===sil){
            urunler.splice(index,1);
            localStorage.setItem("urunler",JSON.stringify(urunler));
        }
    })
}

function temizle(){
    while(liste.firstElementChild!=null){
        liste.removeChild(liste.firstChild);
    }
    localStorage.removeItem("urunler");
}

