window.onload = function(){
    var box1;
    var box2;
    var box3;
    var box4;
    var box5;
    var box6;
    var box7;
    var box8;
    var box9;
    var form = document.querySelector('form[method="post"]');
    const jugadores = document.querySelector('.jugadores');
    const name1 = document.querySelector('.name1');
    const name2 = document.querySelector('.name2');
    const containerTateti = document.querySelector('.container');
    var containerBox = document.querySelector('.semiContainer');
    var turnoActual = 'player2';
    var msjGanador = document.querySelector('.ganador');
    var figCirculo = [];
    var figEquis = [];
    var ganador;


    localStorage.clear();

    function turnos(){
        if(turnoActual == player1){
            turnoActual = player2
        }else{
            turnoActual = player1;
        }

        return turnoActual;
    }

    function validar(){
        if(localStorage.length == 0){
            containerTateti.style.display = 'none';
        }
        form.addEventListener('change', function(event){
            for (let i = 0; i < form.length; i++) {
                const element = form[i];
                if(this.player1.value != 0){
                    this.player1.style.border = '2px solid green';
                }else{
                    this.player1.style.border = '2px solid red';
                }
                if(this.player2.value != 0){
                    this.player2.style.border = '2px solid green';
                }else{
                    this.player2.style.border = '2px solid red';
                }
                
                if(this.player1.style.border == '2px solid green' && this.player2.style.border == '2px solid green'){
                    localStorage.setItem('player1', this.player1.value);
                    localStorage.setItem('player2', this.player2.value);
                    form.style.display = 'none';
                    jugadores.style.display = 'flex';
                    name1.innerHTML = this.player1.value;
                    name2.innerHTML = this.player2.value;
                    containerTateti.style.display = 'flex';
                }   
            }
        });
    }

    function eventos(){
        let box = containerBox.children;
        for (let i = 0; i < box.length; i++) {
            const element = box[i];
            element.addEventListener('click', agregar);
            function agregar(){
                if(turnos() == player1 ){
                    element.children.circulo.style.display = 'inherit';
                    element.removeEventListener('click', agregar);
                    queFiguraHay(element);
                    console.log(figCirculo);
                    if(condiciones(figCirculo) == true){
                        terminarPartida('ciruclo');
                        containerBox.style.display = 'none';
                        msjGanador.style.display = 'inherit';  
                    };
                }else{
                    element.children.equis.style.display = 'inherit';
                    element.removeEventListener('click', agregar);
                    queFiguraHay(element);
                    if(condiciones(figEquis) == true){
                        terminarPartida('equis');
                        containerBox.style.display = 'none';
                        msjGanador.style.display = 'inherit';  
                    };
                }
            }
        }
        
    }

    function condiciones(array){
        
        if(horizontalUno(array) == true){
            ganador = true;
        }else if(horizontalDos(array) == true){
            ganador = true;
        }else if(horizontalTres(array) == true){
            ganador = true;
        }else if(verticalUno(array) == true){
            ganador = true;
        }else if(verticalDos(array) == true){
            ganador = true;
        }else if(verticalTres(array) == true){
            ganador = true;
        }else if(diagonalUno(array) == true){
            ganador = true;
        }else if(diagonalDos(array)== true){
            ganador = true;
        }else{
            ganador = false;
        }

        return ganador;
    }

    function horizontalUno(unArray){
        let respuesta;
        if(unArray.includes('box1') && unArray.includes('box2') && unArray.includes('box3')){
            respuesta = true;
        }else{
            respuesta = false;
        }
        return respuesta;
    }

    function horizontalDos(unArray){
        let respuesta;
        if(unArray.includes('box4') && unArray.includes('box5') && unArray.includes('box6')){
            respuesta = true;
        }else{
            respuesta = false;
        }
        return respuesta;
    }

    function horizontalTres(unArray){
        let respuesta;
        if(unArray.includes('box7') && unArray.includes('box8') && unArray.includes('box9')){
            respuesta = true;
        }else{
            respuesta = false;
        }
        return respuesta;
    }

    function verticalUno(unArray){
        let respuesta;
        if(unArray.includes('box1') && unArray.includes('box4') && unArray.includes('box7')){
            respuesta = true;
        }else{
            respuesta = false;
        }
        return respuesta;
    }

    function verticalDos(unArray){
        let respuesta;
        if(unArray.includes('box2') && unArray.includes('box5') && unArray.includes('box8')){
            respuesta = true;
        }else{
            respuesta = false;
        }
        return respuesta;
    }

    function verticalTres(unArray){
        let respuesta; 
        if(unArray.includes('box3') && unArray.includes('box6') && unArray.includes('box9')){
            respuesta = true;
        }else{
            respuesta = false;
        }
        return respuesta;
    }

    function diagonalUno(unArray){
        let respuesta;
        if(unArray.includes('box1') && unArray.includes('box5') && unArray.includes('box9')){
            respuesta = true;
        }else{
            respuesta = false;
        }
        return respuesta;
    }

    function diagonalDos(unArray){
        let respuesta;
        if(unArray.includes('box3') && unArray.includes('box5') && unArray.includes('box7')){
            respuesta = true;
        }else{
            respuesta = false;
        }
        return respuesta;
    }

    function terminarPartida(ganador){
        let player1 = name1.textContent;
        let player2 = name2.textContent;
        console.log(player1);
        console.log(player2);
        if(ganador == 'ciruclo'){
            alert('Felicidades '+ player1 +' ganaste la partida');
        }else{
            alert('Felicidades'+ player2 +' ganaste la partida');
        }
    }

    function queFiguraHay(figura){
        let circulo = figura.children.circulo;
        let equis = figura.children.equis;
        if(circulo.style.display == 'inherit'){
            figCirculo.push(figura.id);
        }else if(equis.style.display == 'inherit'){
            figEquis.push(figura.id);
        }
    }

    validar();
    eventos();
}