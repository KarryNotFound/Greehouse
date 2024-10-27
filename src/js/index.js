(function(){
window.onload = function () {
var t = null;
t = setTimeout(time,1000);
function time(){
    clearTimeout(t);
    dt = new Date();
    var y = dt.getFullYear();
    var mt = dt.getMonth()+1;
    var day = dt.getDate();
    var h = dt.getHours();
    var m = dt.getMinutes();
    var s = dt.getSeconds();
    let a = document.querySelector(".showtime");
    if(a){
    a.innerHTML = y + "-" + mt + "-" + day + "  " + h + ":" + m + ":" + s;
    t = setTimeout(time,1000);
    }
}
}
})();