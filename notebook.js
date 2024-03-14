// form alanını seçme 
const yeniGorev = document.querySelector(".input-gorev");
// input alanındaki butonu seçme
const yeniGorevEkleBtn = document.querySelector(".btn-ekle");
// eklediğimiz görevlerin bulunduğu yeri seçme 
const gorevListesi = document.querySelector(".gorev-listesi");

yeniGorevEkleBtn.addEventListener("click", gorevEkle);
gorevListesi.addEventListener("click",gorevSilTamamla);
document.addEventListener("DOMContentLoaded",localStorageOku);

function gorevEkle(e){
    e.preventDefault();
    
    if(yeniGorev.value.trim() === "") { // Yeni eklenen görevin boş olup olmadığını kontrol ediyoruz
        alert("Boş not kaydedilemiyor.");
        return; // Boş not eklenirse işlemi sonlandırıyoruz
    }

    gorevItemOlustur(yeniGorev.value);
    //localstoragea kaydet
    localStorageKaydet(yeniGorev.value);
    yeniGorev.value = "";
};

function localStorageArrayDonustur(){
    let gorevler;

    if(localStorage.getItem("gorevler")=== null){
        gorevler = [];
    }else{
        gorevler= JSON.parse(localStorage.getItem("gorevler"))
    }

    return gorevler;
};

function gorevSilTamamla(e){
    const tiklanilanEleman = e.target; // tıklanma olayının gerçekleştiği yeri verir

    if(tiklanilanEleman.classList.contains("btn-tamamlanan-gorev")){
        tiklanilanEleman.parentElement.classList.toggle("tamamlanan-gorev")
    }
    // burada tıklanılan elemanın parent elemanına gidilir ve tamamlanan-gorev sınıfı yoksa eklenir varsa silinir (toggle)

    if(tiklanilanEleman.classList.contains("btn-gorev-sil")){
       if(confirm("silmek istediğinize emin misiniz?")){
        tiklanilanEleman.parentElement.classList.toggle("kaybol")
        const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
        localStorageSil(silinecekGorev);
        tiklanilanEleman.parentElement.addEventListener("transitionend",function(){
            tiklanilanEleman.parentElement.remove();
        });
    }
       }
};

function localStorageKaydet(yeniGorev){
    let gorevler = localStorageArrayDonustur();

    gorevler.push(yeniGorev);
    localStorage.setItem("gorevler", JSON.stringify(gorevler));
};

function localStorageOku(){
    let gorevler = localStorageArrayDonustur();

    gorevler.forEach(function(gorev){
        gorevItemOlustur(gorev);
    });
}

function gorevItemOlustur(gorev){
    //div oluşturma
    const gorevDiv = document.createElement("div");
    gorevDiv.classList.add("gorev-items");

    //li oluşturma
    const gorevLi = document.createElement("li");
    gorevLi.classList.add("gorev-tanim");
    gorevLi.innerText= gorev;
    gorevDiv.appendChild(gorevLi);

    //ul'ye oluşturduğumuz div'i ekleme
    gorevListesi.appendChild(gorevDiv);

    // tamamlandı butonu ekleme
    const gorevTamamBtn = document.createElement("button");
    gorevTamamBtn.classList.add("btn-gorev");
    gorevTamamBtn.classList.add("btn-tamamlanan-gorev");
    gorevTamamBtn.innerHTML= '<i class="fa-regular fa-square-check"></i>';
    gorevDiv.appendChild(gorevTamamBtn);

    // sil butonu ekleme
    const gorevSilBtn = document.createElement("button");
    gorevSilBtn.classList.add("btn-gorev");
    gorevSilBtn.classList.add("btn-gorev-sil");
    gorevSilBtn.innerHTML= '<i class="fa-regular fa-trash-can"></i>';
    gorevDiv.appendChild(gorevSilBtn);

};

function localStorageSil(gorev){
    let gorevler = localStorageArrayDonustur();

    //splice ile item sil
    const silinecekElemanIndex = gorevler.indexOf(gorev);
    console.log(silinecekElemanIndex);
    gorevler.splice(silinecekElemanIndex,1);

    localStorage.setItem("gorevler",JSON.stringify(gorevler));
};