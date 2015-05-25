
window.requestAnimationFrame(function () {
    doStuff();






});


function doStuff(){
    var sel,
        x,
        y,
        selettore;

        sel = document.querySelector(".tile-position-1-4");
        sel.addEventListener("click", function(){

            x = Math.floor(Math.random() * 4 ) + 1;
            y = Math.floor(Math.random() * 4 ) + 1;
            selettore = "tile-position-" + x + "-" + y;
            window.requestAnimationFrame(function () {
                sel.setAttribute("class", "piece piece-black piece-new " + selettore);
            });

        });



}