let slides = document.querySelectorAll(".slide");
let current = 0;
let chart;

function showSlide(i){
    slides.forEach(s=>s.classList.remove("active"));
    slides[i].classList.add("active");
}

function nextSlide(){
    current = (current+1)%slides.length;
    showSlide(current);
}

function prevSlide(){
    current = (current-1+slides.length)%slides.length;
    showSlide(current);
}

function hitung(){
    let arr = document.getElementById("data").value.split(",").map(Number).sort((a,b)=>a-b);

    let mean = arr.reduce((a,b)=>a+b,0)/arr.length;
    let median = arr[Math.floor(arr.length/2)];

    let freq = {};
    arr.forEach(x=>freq[x]=(freq[x]||0)+1);
    let modus = Object.keys(freq).reduce((a,b)=> freq[a]>freq[b]?a:b);

    let range = arr[arr.length-1] - arr[0];

    document.getElementById("hasil").innerHTML =
        "Mean: "+mean.toFixed(2)+"<br>"+
        "Median: "+median+"<br>"+
        "Modus: "+modus+"<br>"+
        "Range: "+range;

    if(chart) chart.destroy();

    chart = new Chart(document.getElementById("chart"),{
        type:'bar',
        data:{
            labels: arr,
            datasets:[{
                label:'Data',
                data: arr
            }]
        }
    });
}

document.addEventListener("keydown",(e)=>{
    if(e.key==="ArrowRight") nextSlide();
    if(e.key==="ArrowLeft") prevSlide();
});