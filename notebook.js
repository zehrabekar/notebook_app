// form alanını seçme 
const yeniGorev = document.querySelector(".input-gorev");
// input alanındaki butonu seçme
const yeniGorevEkleBtn = document.querySelector(".btn-ekle");
// eklediğimiz görevlerin bulunduğu yeri seçme 
const gorevListesi = document.querySelector(".gorev-listesi");

yeniGorevEkleBtn.addEventListener("click", gorevEkle);

function gorevEkle(e){
    e.preventDefault();

    // input alanına girilen değeri görev listesi kısmına eklemek için html sayfasındaki yapıyı burada oluşturmalıyız

    //div oluşturma
    const gorevDiv = document.createElement("div");
    gorevDiv.classList.add("gorev-items");

    //li oluşturma
    const gorevLi = document.createElement("li");
    gorevLi.classList.add("gorev-tanim");
    gorevLi.innerText= yeniGorev.value;
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

    // input alanına yazdığımız notu not listesine ekledikten sonra input alanını temizler :
    yeniGorev.value = "";
};

gorevListesi.addEventListener("click",gorevSilTamamla);
    
function gorevSilTamamla(e){
    const tiklanilanEleman = e.target; // tıklanma olayının gerçekleştiği yeri verir

    if(tiklanilanEleman.classList.contains("btn-tamamlanan-gorev")){
        tiklanilanEleman.parentElement.classList.toggle("tamamlanan-gorev")
    }
    // burada tıklanılan elemanın parent elemanına gidilir ve tamamlanan-gorev sınıfı yoksa eklenir varsa silinir (toggle)

    if(tiklanilanEleman.classList.contains("btn-gorev-sil")){
        tiklanilanEleman.parentElement.classList.toggle("kaybol")
        tiklanilanEleman.parentElement.addEventListener("transitionend",function(){
            tiklanilanEleman.parentElement.remove();
        });
    }
};