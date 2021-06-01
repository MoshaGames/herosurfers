//variables de canvas
var fps = 60,
    ctx,
    canvas,
    ancho = 1000,
    alto = 500,
    x = 100,
    y = 200,
    anchoP = 50,
    altoP = 50,
    sueloM = 200,
    suelo = 150,
    suelo2 = 250,
    suelo3 = 350,
    sueloP = 200,
    carril = 0,
    cont = 0,
    velocA = 1,
    ataque1 = false,
    ataque2 = false,
    ataque3 = false,
    saltoPC = false,
    ataquePC = false,
    Ry = 0,
    Rx = 0,
    sec = 0,
    time = 0,
    muns = 0,
    movil = false,
    pInicio = true,
    Tuto = false,
    btnDesTuto = true,
    btnDesJuego = true,
    user_id = 0,
    golpeB = 0,
    arribaT = false,
    abajoT = false,
    vidas = 3,
    ajS1 = false,
    ajS2 = false,
    ajS3 = false,
    saltoAJ1 = 0,
    saltoAJ2 = 0,
    saltoAJ3 = 0,
    arribaH = false,
    abajoH = false,
    izqH = false,
    derH = false;

//variables imágenes del juego
var personaje, agua, obstaculo, tortuga, fondo, tabla, magia, ajolote;
var btnArriba, btnAbajo, btnSalto, btnAtaque, cReinicio, boss, vida, herida, magiaOs;

//Imagénes correspondientes a la pantalla de inicio
var panIn, btnJ, btnT, btnJ2, btnT2, tutorial, tutorialMovil;

//función que busca y carga las imágenes al juego
function imagenes() {
    personaje = new Image();
    agua = new Image();
    obstaculo = new Image();
    tortuga = new Image();
    ajolote = new Image();
    magia = new Image();
    tabla = new Image();
    fondo = new Image();
    btnArriba = new Image();
    btnAbajo = new Image();
    btnSalto = new Image();
    btnAtaque = new Image();
    cReinicio = new Image();
    panIn = new Image();
    btnJ = new Image();
    btnT = new Image();
    btnJ2 = new Image();
    btnT2 = new Image();
    tutorial = new Image();
    tutorialMovil = new Image();
    boss = new Image();
    vida = new Image();
    herida = new Image();
    magiaOs = new Image();

    personaje.src = 'img/hero1.png';
    if (user_id > 1) {
        personaje = avatar;
    }

    agua.src = 'img/agua.png';
    obstaculo.src = 'img/roca.png';
    tortuga.src = 'img/enemigo.png';
    ajolote.src = 'img/enemigo2.png';
    magia.src = 'img/magia.png';
    tabla.src = 'img/tabla.png';
    fondo.src = 'img/fondo.png';
    btnArriba.src = 'img/Arriba.png';
    btnAbajo.src = 'img/Abajo.png';
    btnSalto.src = 'img/Salto.png';
    btnAtaque.src = 'img/Ataque.png';
    cReinicio.src = 'img/cuadro.png';
    panIn.src = 'img/MoshaSurf.png';
    btnJ.src = 'img/BtnJ.png';
    btnT.src = 'img/BtnT.png';
    btnJ2.src = 'img/BtnJ2.png';
    btnT2.src = 'img/BtnT2.png';
    tutorial.src = 'img/Tutorial.png';
    tutorialMovil.src = 'img/TutorialMovil.png';
    boss.src = 'img/bossfinal.png';
    vida.src = 'img/vida.png';
    herida.src = 'img/herida.png';
    magiaOs.src = 'img/magiaOscura.png';

}

//ajustes del heroe, objetos y enemigos
var heroe = { x: 100, y: sueloP, vy: 0, vx: 0, velocidad: 0, gravedad: 2, salto: 28, vymax: 9, saltando: false };
var tablaR = { x: 100, y: sueloP + 15, vy: 0, vx: 0, velocidad: 0, gravedad: 2, salto: 28, vymax: 9, saltando: false };
var orbe1 = { x: ancho + 1000, y: suelo };
var orbe2 = { x: ancho + 1000, y: suelo2 };
var orbe3 = { x: ancho + 1000, y: suelo3 };
var magOs = { x: ancho + 1000, y: suelo };
var magOs2 = { x: ancho + 1000, y: suelo2 };
var magOs3 = { x: ancho + 1000, y: suelo3 };
var roca1 = { x: ancho + 500, y: suelo + 50, velE: 0 };
var roca2 = { x: ancho + 500, y: suelo2 + 50, velE: 0 };
var roca3 = { x: ancho + 500, y: suelo3 + 50, velE: 0 };
var mar = { x: 0, y: sueloM };
var fondo = { x: 0, y: 0 };
var tortuga1 = { x: ancho + 100, y: suelo, velE: 0 };
var tortuga2 = { x: ancho + 100, y: suelo2, velE: 0 };
var tortuga3 = { x: ancho + 100, y: suelo3, velE: 0 };
var ajolote1 = { x: ancho + 100, y: suelo, velE: 0, vy: 0, gravedad: 2, salto: 28, vymax: 9, saltoE: false };
var ajolote2 = { x: ancho + 100, y: suelo2, velE: 0, vy: 0, gravedad: 2, salto: 28, vymax: 9, saltoE: false };
var ajolote3 = { x: ancho + 100, y: suelo3, velE: 0, vy: 0, gravedad: 2, salto: 28, vymax: 9, saltoE: false };
var bossF = { x: ancho + 1000, y: suelo };
//ajustes de la velocidad del nivel y los enemigos
var nivel = { velocidad: 9, muerte: false, velocidadEnemi: 8, velocidadBoss: 0, final: false };

//Función que define la velocidad de salto y caída del heroe.
function gravedad() {
    //Heroe ajustes de gravedad al saltar
    if (heroe.saltando == true && tablaR.saltando == true) {
        if (heroe.y - heroe.vy - heroe.gravedad > sueloP) {
            heroe.saltando = false;
            heroe.vy = 0;
            heroe.y = sueloP;
            tablaR.saltando = false;
            tablaR.vy = 0;
            tablaR.y = sueloP + 15
        } else {
            heroe.vy -= heroe.gravedad;
            heroe.y -= heroe.vy;
            tablaR.vy -= tablaR.gravedad;
            tablaR.y -= tablaR.vy;
        }
    }
}

//Gravedad enemigos
function gravedadEn() {
    //Ajolote ajustes de gravedad para el salto
    //Ajolote 1
    if (ajolote1.saltoE == true) {
        if (ajolote1.y - ajolote1.vy - ajolote1.gravedad > ajolote1.y) {
            ajolote1.saltoE = false;
            ajolote1.vy = 0;
            ajolote1.y = suelo;
            ajolote1.velE = nivel.velocidadEnemi;
        } else {
            if (saltoAJ1 == 0) {
                ajolote1.vy -= ajolote1.gravedad;
                ajolote1.y -= ajolote1.vy;
                ajolote1.x -= 5;
                if(ajolote1.y == suelo){
                    saltoAJ1 = 1;
                }
            }
        }
    }
    //Ajolote 2
    if (ajolote2.saltoE == true) {
        if (ajolote2.y - ajolote2.vy - ajolote2.gravedad > ajolote2.y) {
            ajolote2.saltoE = false;
            ajolote2.vy = 0;
            ajolote2.y = suelo2;
            ajolote2.velE = 5;
        } else {
            if (saltoAJ2 == 0) {
                ajolote2.vy -= ajolote2.gravedad;
                ajolote2.y -= ajolote2.vy;
                ajolote2.x -= 5;
                if(ajolote2.y == suelo){
                    saltoAJ2 = 1;
                }
            }
        }
    }
    //Ajolote 3
    if (ajolote3.saltoE == true) {
        if (ajolote3.y - ajolote3.vy - ajolote3.gravedad > ajolote3.y) {
            ajolote3.saltoE = false;
            ajolote3.vy = 0;
            ajolote3.y = suelo3;
            ajolote3.velE = nivel.velocidadEnemi;
        } else {
            if (saltoAJ3 == 0) {
                ajolote3.vy -= ajolote3.gravedad;
                ajolote3.y -= ajolote3.vy;
                ajolote3.x -= nivel.velocidadEnemi;
                if(ajolote3.y == suelo){
                    saltoAJ3 = 1;
                }
            }
        }
    }
}

//Ratón
/* Función que toma encuenta la posición del ratón 
en caso de que se lleve a cabo algun evento.*/
function posicionRaton(a) {
    Rx = a.pageX;
    Ry = a.pageY;
    //console.log("x: " + Rx + " y: " + Ry);
    if (Ry >= 350 && Rx >= 820 && pInicio == true && Tuto == false) {
        btnDesJuego = false;
    } else {
        btnDesJuego = true;
    }
    if (Ry >= 350 && Rx <= 450 && pInicio == true && Tuto == false) {
        btnDesTuto = false;
    } else {
        btnDesTuto = true;
    }
}

//Función que reacciona al momento en el que el usuario haga click sobre el canvas
function clicRaton(a) {
    Rx = a.pageX;
    Ry = a.pageY;
    ataque1 = false;
    ataque2 = false;
    ataque3 = false;
    atacar();
    saltar();
    carrilTactil();
    Reinicio();

/* Condiciones para la pantalla de inicio, aquí se configuran los 
botones para iniciar el juego, seleccionar o cerrar el tutorial. */
    if (Ry >= 350 && Rx >= 800 && pInicio == true && Tuto == false) {
        pInicio = false;
    } else if (Ry >= 350 && Rx <= 450 && pInicio == true && Tuto == false) {
        Tuto = true;
    } else if (Ry <= 150 && Rx >= 800 && Tuto == true) {
        Tuto = false;
    }
}

//Eventos al soltar el botón, en este caso no se necesita
function sueltaRaton(a) {
}

//Acciones
//Mecánicas del salto del personaje y enemigo ajolote.
function saltar() {
    //Salto heroe
    if (heroe.y == sueloP && nivel.muerte == false && Rx <= 879 && Rx >= 700 && Ry >= 300 && movil == true && nivel.final == false) {
        heroe.saltando = true;
        heroe.vy = heroe.salto;
        tablaR.saltando = true;
        tablaR.vy = tablaR.salto;
    }
    if (heroe.y == sueloP && nivel.muerte == false && saltoPC == true && nivel.final == false) {
        heroe.saltando = true;
        heroe.vy = heroe.salto;
        tablaR.saltando = true;
        tablaR.vy = tablaR.salto;
        saltoPC = false;
    }

    //Salto de ajolote
    //Ajolote 1
    if (ajS1 == true && ajolote1.y == suelo && nivel.muerte == false && nivel.final == false) {
        ajolote1.saltoE = true;
        ajolote1.vy = ajolote1.salto;
        ajS1 = false;
    }
    //Ajolote 2
    if (ajS2 == true && ajolote2.y == suelo2 && nivel.muerte == false && nivel.final == false) {
        ajolote2.saltoE = true;
        ajolote2.vy = ajolote2.salto;
        ajS2 = false;
    }
    //Ajolote 3
    if (ajS3 == true && ajolote3.y == suelo3 && nivel.muerte == false && nivel.final == false) {
        ajolote3.saltoE = true;
        ajolote3.vy = ajolote3.salto;
        ajS3 = false;
    }
}

//Mecánicas de ataque para soltar magia por parte del jugador
function atacar() {
    var disparo = carril;

    if (nivel.muerte == false && Rx >= 880 && Ry >= 300 && movil == true && nivel.final == false) {
        if (carril == 0 && orbe1.x >= ancho + 100 && disparo == 0) {
            orbe1.x = 150;
        } else if (carril == 1 && orbe2.x >= ancho + 100 && disparo == 1) {
            orbe2.x = 150;
        } else if (carril == 2 && orbe3.x >= ancho + 100 && disparo == 2) {
            orbe3.x = 150;
        }
    }

    if (nivel.muerte == false && ataquePC == true && nivel.final == false) {
        if (carril == 0 && orbe1.x >= ancho + 100 && disparo == 0) {
            orbe1.x = heroe.x;
        } else if (carril == 1 && orbe2.x >= ancho + 100 && disparo == 1) {
            orbe2.x = heroe.x;
        } else if (carril == 2 && orbe3.x >= ancho + 100 && disparo == 2) {
            orbe3.x = heroe.x;
        }
        ataquePC = false;
    }
}

//Función que se encarga de reiniciar los valores de los enemigos y el usuario una vez que la partida termina
function Reinicio() {
    if (nivel.muerte == true || nivel.final == true) {
        if (Rx >= 700 || Rx <= 600) {
            if (Rx <= 600) {
                //Al seleccionar la opción de "NO" el juego regresa a la pantalla principal y se reinician los valores.
                pInicio = true;
            }
            nivel.puntuacion = 0;
            nivel.muerte = false;
            nivel.final = false;
            roca1.x = ancho + 500;
            roca2.x = ancho + 500;
            roca3.x = ancho + 500;
            tortuga1.x = ancho + 100;
            tortuga2.x = ancho + 100;
            tortuga3.x = ancho + 100;
            ajolote1.x = ancho + 100;
            ajolote2.x = ancho + 100;
            ajolote3.x = ancho + 100;
            orbe1.x = ancho + 1000;
            orbe2.x = ancho + 1000;
            orbe3.x = ancho + 1000;
            roca1.velE = 0;
            roca2.velE = 0;
            roca3.velE = 0;
            tortuga1.velE = 0;
            tortuga2.velE = 0;
            tortuga3.velE = 0;
            ajolote1.velE = 0;
            ajolote2.velE = 0;
            ajolote3.velE = 0;
            nivel.velocidad = 9;
            nivel.velocidadEnemi = 8;
            nivel.puntuacion = 0;
            velocA = 1;
            sueloP = 200;
            heroe.y = sueloP;
            tablaR.y = sueloP + 15;
            carril = 0;
            sec = 0;
            time = 0;
            muns = 0;
            golpeB = 0;
            nivel.velocidadBoss = 0;
            bossF.x = 1000;
            heroe.x = 100;
            tablaR.x = 100;
            vidas = 3;
            saltoAJ1 = 0;
            saltoAJ2 = 0;
            saltoAJ3 = 0;
            magOs = ancho + 1000;
            magOs2 = ancho + 1000;
            magOs3 = ancho + 1000;
        }
    }
}

function golpe() {
    //Tortugas
    if (orbe1.x >= tortuga1.x && orbe1.x <= ancho) {
        tortuga1.x = ancho + 500;
        tortuga1.velE = 0;
        //nivel.puntuacion += 50;
        muns += 1;
        ataque1 = true;
    }
    if (orbe2.x >= tortuga2.x && orbe2.x <= ancho) {
        tortuga2.x = ancho + 500;
        //nivel.puntuacion += 50;
        tortuga2.velE = 0;
        muns += 1;
        ataque2 = true;
    }
    if (orbe3.x >= tortuga3.x && orbe3.x <= ancho) {
        tortuga3.x = ancho + 500;
        //nivel.puntuacion += 50;
        tortuga3.velE = 0;
        muns += 1;
        ataque3 = true;
    }

    //Ajolotes
    if (orbe1.x >= ajolote1.x && orbe1.x <= ancho && ajolote1.y == suelo) {
        ajolote1.x = ancho + 1500;
        //nivel.puntuacion += 50;
        ajolote1.velE = 0;
        muns += 1;
        ataque1 = true;
        saltoAJ1 = 0;
    }
    if (orbe2.x >= ajolote2.x && orbe2.x <= ancho && ajolote2.y == suelo2) {
        ajolote2.x = ancho + 1500;
        //nivel.puntuacion += 50;
        ajolote2.velE = 0;
        muns += 1;
        ataque2 = true;
        saltoAJ2 = 0;
    }
    if (orbe3.x >= ajolote3.x && orbe3.x <= ancho && ajolote3.y == suelo3) {
        ajolote3.x = ancho + 1500;
        //nivel.puntuacion += 50;
        ajolote3.velE = 0;
        muns += 1;
        ataque3 = true;
        saltoAJ3 = 0;
    }

    //Boss Final
    if (orbe1.x >= bossF.x && orbe1.x <= ancho) {
        golpeB += 1;
        //nivel.puntuacion += 100;
        muns += 1;
        ataque1 = true;
    } else if (orbe2.x >= bossF.x && orbe2.x <= ancho) {
        golpeB += 1;
        //nivel.puntuacion += 100;
        muns += 1;
        ataque2 = true;
    } else if (orbe3.x >= bossF.x && orbe3.x <= ancho) {
        golpeB += 1;
        //nivel.puntuacion += 100;
        muns += 1;
        ataque3 = true;
    }

    //Magia Oscura
    if (orbe1.x >= magOs.x && orbe1.x <= ancho) {
        magOs.x = ancho + 1000;
        muns += 1;
        ataque1 = true;
    }
    if (orbe2.x >= magOs2.x && orbe2.x <= ancho) {
        magOs2.x = ancho + 1500;
        muns += 1;
        ataque2 = true;
    }
    if (orbe3.x >= magOs3.x && orbe3.x <= ancho) {
        magOs3.x = ancho + 1500;
        muns += 1;
        ataque3 = true;
    }


}

//carriles flechas de teclado
function arriba() {
    if (movil == false) {
        if (sueloP <= 400 && sueloP > 200 && nivel.muerte == false && nivel.final == false && arribaH == true) {
            sueloP -= 5;
            if (sueloP >= 200 && sueloP <= 274) {
                carril = 0;
            } else if (sueloP >= 275 && sueloP <= 345) {
                carril = 1;
            } else if (sueloP >= 346 && sueloP <= 400) {
                carril = 2;
            }
            if (heroe.saltando == false) {
                heroe.y = sueloP;
                tablaR.y = sueloP + 15;
            }
        }
    }
}

function abajo() {
    if (movil == false) {
        if (sueloP >= 200 && nivel.muerte == false && sueloP < 400 && nivel.final == false && abajoH == true) {
            sueloP += 5;
            if (sueloP >= 200 && sueloP <= 274) {
                carril = 0;
            } else if (sueloP >= 275 && sueloP <= 345) {
                carril = 1;
            } else if (sueloP >= 346 && sueloP <= 400) {
                carril = 2;
            }
            if (heroe.saltando == false) {
                heroe.y = sueloP;
                tablaR.y = sueloP + 15;
            }
        }
    }
}

function izquierda() {
    if (movil == false) {
        if (heroe.x > 100 && nivel.muerte == false && heroe.x <= 700 && nivel.final == false && izqH == true) {
            heroe.x -= 5;
            tablaR.x -= 5;

        }
    }
}

function derecha() {
    if (movil == false) {
        if (heroe.x >= 100 && nivel.muerte == false && heroe.x < 700 && nivel.final == false && derH == true) {
            heroe.x += 5;
            tablaR.x += 5;

        }
    }
}

//Utilizado para jugar en celulares
function carrilTactil() {
    if (movil == true) {
        if (nivel.muerte == false && nivel.final == false) {
            //Botón arriba
            if (Ry <= 300 && Rx <= 200) {
                if (sueloP >= 200 && sueloP < 400) {
                    sueloP -= 5;
                    if (sueloP >= 200 && sueloP <= 274) {
                        carril = 0;
                    } else if (sueloP >= 275 && sueloP <= 345) {
                        carril = 1;
                    } else if (sueloP >= 346 && sueloP <= 400) {
                        carril = 2;
                    }
                    if (heroe.saltando == false) {
                        heroe.y = sueloP;
                        tablaR.y = sueloP + 15;
                    }
                }
            }
            //Botón abajo
            else if (Ry >= 320 && Rx <= 200) {
                if (sueloP >= 200 && sueloP < 400) {
                    sueloP += 5;
                    if (sueloP >= 200 && sueloP <= 274) {
                        carril = 0;
                    } else if (sueloP >= 275 && sueloP <= 345) {
                        carril = 1;
                    } else if (sueloP >= 346 && sueloP <= 400) {
                        carril = 2;
                    }
                    if (heroe.saltando == false) {
                        heroe.y = sueloP;
                        tablaR.y = sueloP + 15;
                    }
                }
            }
        }
    }
}

//dibuja elementos
function dibujaPer() {
    //tabla surf
    ctx.drawImage(tabla, 0, 0, 200, 50, tablaR.x, tablaR.y, 200, 50);
    //personaje
    ctx.drawImage(personaje, 0, 0, 200, 200, heroe.x, heroe.y - 150, 200, 200);

    //vidas del heroe
    ctx.drawImage(herida, 0, 0, 50, 50, 200, 20, 50, 50);

    if (vidas > 0) {
        ctx.drawImage(vida, 0, 0, 50, 50, 200, 20, 50, 50);
        ctx.drawImage(vida, 0, 0, 50, 50, 250, 20, 50, 50);
        ctx.drawImage(vida, 0, 0, 50, 50, 300, 20, 50, 50);
    }
    if (vidas <= 2) {
        ctx.drawImage(herida, 0, 0, 50, 50, 300, 20, 50, 50);
    }
    if (vidas <= 1) {
        ctx.drawImage(herida, 0, 0, 50, 50, 250, 20, 50, 50);
    }

}

function dibujaBoton() {
    if (movil == true) {
        ctx.drawImage(btnArriba, 0, 0, 100, 100, 30, 250, 100, 100);
        ctx.drawImage(btnAbajo, 0, 0, 100, 100, 30, 380, 100, 100);
        ctx.drawImage(btnSalto, 0, 0, 100, 100, 700, 380, 100, 100);
        ctx.drawImage(btnAtaque, 0, 0, 100, 100, 830, 380, 100, 100);
    }
}

function carril1() {
    ctx.drawImage(tortuga, 0, 0, 150, 100, tortuga1.x, tortuga1.y, 150, 100);
    ctx.drawImage(obstaculo, 0, 0, 180, 150, roca1.x, roca1.y, 180, 150);
    ctx.drawImage(ajolote, 0, 0, 150, 150, ajolote1.x, ajolote1.y, 150, 150);
    ctx.drawImage(magia, 0, 0, 100, 100, orbe1.x, orbe1.y, 100, 100);
    ctx.drawImage(magiaOs, 0, 0, 100, 100, magOs.x, magOs.y, 100, 100);
    if (carril == 0) {
        dibujaPer();
    }
}
function carril2() {
    ctx.drawImage(tortuga, 0, 0, 150, 100, tortuga2.x, tortuga2.y, 150, 100);
    ctx.drawImage(obstaculo, 0, 0, 180, 150, roca2.x, roca2.y, 180, 150);
    ctx.drawImage(ajolote, 0, 0, 150, 150, ajolote2.x, ajolote2.y, 150, 150);
    ctx.drawImage(magia, 0, 0, 100, 100, orbe2.x, orbe2.y, 100, 100);
    ctx.drawImage(magiaOs, 0, 0, 100, 100, magOs2.x, magOs2.y, 100, 100);
    if (carril == 1) {
        dibujaPer();
    }
}
function carril3() {
    ctx.drawImage(tortuga, 0, 0, 150, 100, tortuga3.x, tortuga3.y, 150, 100);
    ctx.drawImage(obstaculo, 0, 0, 180, 150, roca3.x, roca3.y, 180, 150);
    ctx.drawImage(ajolote, 0, 0, 150, 150, ajolote3.x, ajolote3.y, 150, 150);
    ctx.drawImage(magia, 0, 0, 100, 100, orbe3.x, orbe3.y, 100, 100);
    ctx.drawImage(magiaOs, 0, 0, 100, 100, magOs3.x, magOs3.y, 100, 100);
    ctx.drawImage(boss, 0, 0, 400, 400, bossF.x, bossF.y, 400, 400);
    if (carril == 2) {
        dibujaPer();
    }
}

function dibujaFondo() {
    ctx.drawImage(fondo, 0, 0, 1000, 450, fondo.x, fondo.y, 1000, 450);
}

function dibujaMar() {
    ctx.drawImage(agua, mar.x, 0, 3000, 350, 0, mar.y - 50, 3000, 350);
}

//Logicas
function logicaRoca() {
    var random = 0;
    if (roca1.x < -100) {
        random = Math.floor(Math.random() * 10);
        roca1.x = ancho + random * 1000;
    } else {
        roca1.x -= nivel.velocidad;
    }
    if (roca2.x < -100) {
        random = Math.floor(Math.random() * 10);
        roca2.x = ancho + random * 1000;
    } else {
        roca2.x -= nivel.velocidad;
    }
    if (roca3.x < -100) {
        random = Math.floor(Math.random() * 10);
        roca3.x = ancho + random * 1000;
    } else {
        roca3.x -= nivel.velocidad;
    }

    if(time == 30 || (roca1.x > ancho + 100 || roca1.x < 0) && (roca2.x > ancho + 100 || roca2.x < 0) && (roca3.x > ancho + 100 || roca3.x < 0)){
        roca1.x == ancho + 100;
        roca3.x == ancho + 100;
        roca2.x == ancho + 100;
    }
}

function logicaEnemi() {

    //Tortugas
    if (tortuga1.x < 500) {
        tortuga1.velE = 0;
    } else {
        tortuga1.x -= tortuga1.velE;
    }
    if (tortuga2.x < 500) {
        tortuga2.velE = 0;
    } else {
        tortuga2.x -= tortuga2.velE;
    }
    if (tortuga3.x < 500) {
        tortuga3.velE = 0;
    } else {
        tortuga3.x -= tortuga3.velE;
    }

    //Ajolotes
    //Ajolote 1
    if (ajolote1.x < -500) {
        ajolote1.x = ancho + 500;
        ajolote1.velE = 0;
        ajolote1.y = suelo;
        saltoAJ1 = 0;
    } else {
        ajolote1.x -= ajolote1.velE;
        if (ajolote1.x < 800 && ajolote1.x > 790) {
            ajS1 = true;
        }
    }
    //Ajolote 2
    if (ajolote2.x < -500) {
        ajolote2.x = ancho + 500;
        ajolote2.velE = 0;
        ajolote2.y = suelo2;
        saltoAJ2 = 0;
    } else {
        ajolote2.x -= ajolote2.velE;
        if (ajolote2.x < 800 && ajolote2.x > 790) {
            ajS2 = true;
        }
    }
    //Ajolote 3
    if (ajolote3.x < -500) {
        ajolote3.x = ancho + 500;
        ajolote3.velE = 0;
        ajolote3.y = suelo3
        saltoAJ3 = 0;
    } else {
        ajolote3.x -= ajolote3.velE;
        if (ajolote3.x < 800 && ajolote3.x > 790) {
            ajS3 = true;
        }
    }
}

function logicaMagia() {
    //ataque de heroe golpea a enemigos
    if (ataque1 == true || orbe1.x >= ancho) {
        orbe1.x = ancho + 1000;
        ataque1 = false;
    } else {
        orbe1.x += nivel.velocidad;
    }
    if (ataque2 == true || orbe2.x >= ancho) {
        orbe2.x = ancho + 1000;
        ataque2 = false;
    } else {
        orbe2.x += nivel.velocidad;
    }
    if (ataque3 == true || orbe3.x >= ancho) {
        orbe3.x = ancho + 1000;
        ataque3 = false;
    } else {
        orbe3.x += nivel.velocidad;
    }


}

function logicaMar() {
    if (mar.x > 1500) {
        mar.x = 0;
    } else {
        mar.x += nivel.velocidad;
    }
}

//Colisiones
function colision() {
    if (roca1.x >= (heroe.x - 50) && roca1.x <= (heroe.x + 100) && carril == 0) {
        if (heroe.y >= sueloP - 25) {
            vidas -= 1;
            if (vidas >= 1) {
                roca1.x = 1000;
            }
        }
    }
    if (roca2.x >= (heroe.x - 50) && roca2.x <= (heroe.x + 100) && carril == 1) {
        if (heroe.y >= sueloP - 25) {
            vidas -= 1;
            if (vidas >= 1) {
                roca2.x = 1000;
            }
        }
    }
    if (roca3.x >= (heroe.x - 50) && roca3.x <= (heroe.x + 100) && carril == 2) {
        if (heroe.y >= sueloP - 25) {
            vidas -= 1;
            if (vidas >= 1) {
                roca3.x = 1000;
            }
        }
    }
    if (tortuga1.x >= (heroe.x - 50) && tortuga1.x <= (heroe.x + 100) && carril == 0) {
        if (heroe.y >= sueloP - 25) {
            vidas -= 1;
            if (vidas >= 1) {
                tortuga1.x = 1000;
            }
        }
    }
    if (tortuga2.x >= (heroe.x - 50) && tortuga2.x <= (heroe.x + 100) && carril == 1) {
        if (heroe.y >= sueloP - 25) {
            vidas -= 1;
            if (vidas >= 1) {
                tortuga2.x = 1000;
            }
        }
    }
    if (tortuga3.x >= (heroe.x - 50) && tortuga3.x <= (heroe.x + 100) && carril == 2) {
        if (heroe.y >= sueloP - 25) {
            vidas -= 1;
            if (vidas >= 1) {
                tortuga3.x = 1000;
            }
        }
    }
    if (ajolote1.x >= (heroe.x - 50) && ajolote1.x <= (heroe.x + 100) && carril == 0) {
        if (heroe.y >= sueloP - 25) {
            vidas -= 1;
            if (vidas >= 1) {
                ajolote1.x = 1000;
            }
        }
    }
    if (ajolote2.x >= (heroe.x - 50) && ajolote2.x <= (heroe.x + 100) && carril == 1) {
        if (heroe.y >= sueloP - 25) {
            vidas -= 1;
            if (vidas >= 1) {
                ajolote2.x = 1000;
            }
        }
    }
    if (ajolote3.x >= (heroe.x - 50) && ajolote3.x <= (heroe.x + 100) && carril == 2) {
        if (heroe.y >= sueloP - 25) {
            vidas -= 1;
            if (vidas >= 1) {
                ajolote3.x = 1000;
            }
        }
    }

    if (magOs.x <= heroe.x && carril == 0) {
        vidas -= 1;
    }
    if (magOs2.x <= heroe.x && carril == 1) {
        vidas -= 1;
    }
    if (magOs3.x <= heroe.x && carril == 2) {
        vidas -= 1;
    }

    if (vidas == 0) {
        nivel.muerte = true;
        nivel.velocidad = 0;
        nivel.velocidadEnemi = 0;
    }
}

//tiempos de aparición de los enemigos
function TiempoAp() {
    //Tortugas tiempo aparición
    if (time == 6 && nivel.final == false && nivel.muerte == false) {
        tortuga3.velE = nivel.velocidadEnemi;
    }
    if (time == 10 && nivel.final == false && nivel.muerte == false) {
        tortuga1.velE = nivel.velocidadEnemi;
    }
    if (time == 13 && nivel.final == false && nivel.muerte == false) {
        tortuga2.velE = nivel.velocidadEnemi;
    }
    if (time == 15 && nivel.final == false && nivel.muerte == false && tortuga3.x > ancho) {
        tortuga3.velE = nivel.velocidadEnemi;
    }
    if (time == 18 && nivel.final == false && nivel.muerte == false && tortuga2.x > ancho) {
        tortuga2.velE = nivel.velocidadEnemi;
    }
    if (time == 20 && nivel.final == false && nivel.muerte == false && tortuga1.x > ancho) {
        tortuga1.velE = nivel.velocidadEnemi;
    }
    if (time == 22 && nivel.final == false && nivel.muerte == false && tortuga3.x > ancho) {
        tortuga3.velE = nivel.velocidadEnemi;
    }
    if (time == 25 && nivel.final == false && nivel.muerte == false && tortuga1.x > ancho) {
        tortuga1.velE = nivel.velocidadEnemi;
    }
    if (time == 30 && nivel.final == false && nivel.muerte == false && tortuga2.x > ancho) {
        tortuga2.velE = nivel.velocidadEnemi;
    }
    if (time == 35 && nivel.final == false && nivel.muerte == false && tortuga1.x > ancho) {
        tortuga1.velE = nivel.velocidadEnemi;
    }
    if (time == 45 && nivel.final == false && nivel.muerte == false && tortuga3.x > ancho) {
        tortuga3.velE = nivel.velocidadEnemi;
    }

    //Ajolotes tiempo aparición
    if (time == 27 && nivel.final == false && nivel.muerte == false) {
        ajolote1.velE = nivel.velocidadEnemi;
    }
    if (time == 28 && nivel.final == false && nivel.muerte == false) {
        ajolote3.velE = nivel.velocidadEnemi;
    }
    if (time == 30 && nivel.final == false && nivel.muerte == false) {
        ajolote2.velE = nivel.velocidadEnemi;
    }
    if (time == 33 && nivel.final == false && nivel.muerte == false && ajolote1.x > ancho) {
        ajolote1.velE = nivel.velocidadEnemi;
    }
    if (time == 35 && nivel.final == false && nivel.muerte == false && ajolote3.x > ancho) {
        ajolote3.velE = nivel.velocidadEnemi;
    }
    if (time == 38 && nivel.final == false && nivel.muerte == false && ajolote2.x > ancho) {
        ajolote2.velE = nivel.velocidadEnemi;
    }
    if (time == 40 && nivel.final == false && nivel.muerte == false && ajolote1.x > ancho) {
        ajolote1.velE = nivel.velocidadEnemi;
    }
    if (time == 45 && nivel.final == false && nivel.muerte == false && ajolote2.x > ancho) {
        ajolote2.velE = nivel.velocidadEnemi;
    }
}

function BossFinal() {
    if (bossF.x > 500 && nivel.muerte == false && time >= 50 && nivel.final == false) {
        nivel.velocidadBoss = 8;
        bossF.x -= nivel.velocidadBoss;
    }
    if (golpeB >= 3 && nivel.muerte == false && nivel.final == false) {
        if (magOs.x <= -10) {
            magOs.x = ancho + 1000;
        } else {
            magOs.x -= nivel.velocidad;
        }
    }

    if (golpeB >= 8 && nivel.muerte == false && nivel.final == false) {
        if (magOs3.x <= -10) {
            magOs3.x = ancho + 1000;
        } else {
            magOs3.x -= nivel.velocidad;
        }
    }

    if (golpeB >= 15 && nivel.muerte == false && nivel.final == false) {
        if (magOs2.x <= -10) {
            magOs2.x = ancho + 1000;
        } else {
            magOs2.x -= nivel.velocidad;
        }
    }

    if (golpeB >= 25) {
        bossF.x = ancho + 1000;
        nivel.final = true;
        nivel.velocidad = 0;
    }
}

//puntuación y texto mostrado en la pantalla
function puntuacion() {
    ctx.font = "30px impact";
    ctx.fillStyle = '#555555';
    ctx.fillText(`muns: ${muns}`, 50, 50);

    //Texto que se muestra al morir contra un obstáculo o un enemigo en la partida.
    if (nivel.muerte == true) {
        ctx.drawImage(cReinicio, 0, 0, 450, 450, 280, 10, 450, 450);
        ctx.font = "50px impact";
        ctx.fillStyle = '#000000';
        ctx.fillText('Game Over', 390, 120);
        ctx.fillText('¿Reiniciar?', 380, 200);
        ctx.fillText('NO                    SI', 365, 270);
        ctx.fillText(`Muns: ${muns}`, 420, 350);
        //ctx.fillText(`Puntuación: ${nivel.puntuacion}`, 340, 380);
        nivel.velocidadEnemi = 0;
        nivel.velocidadBoss = 0;
    }

    if (nivel.final == true) {
        ctx.drawImage(cReinicio, 0, 0, 450, 450, 280, 10, 450, 450);
        ctx.font = "50px impact";
        ctx.fillStyle = '#000000';
        ctx.fillText('¡Ganaste!', 390, 120);
        ctx.fillText('¿Reiniciar?', 380, 200);
        ctx.fillText('NO                    SI', 365, 270);
        ctx.fillText(`Muns: ${muns}`, 420, 350);
        //ctx.fillText(`Puntuación: ${nivel.puntuacion}`, 340, 380);
        nivel.velocidadEnemi = 0;
        nivel.velocidadBoss = 0;
    }
}
//Carga la pantalla principal donde el usuario puede elegir empezar la partida o ver el tutorial.
function pantallaInicio() {
    ctx.drawImage(panIn, 0, 0, 1000, 500, 0, 0, 1000, 500);

    //selección y efecto de cambio de color de los botones de inicio
    ctx.drawImage(btnJ, 0, 0, 250, 125, 650, 370, 250, 125);
    ctx.drawImage(btnT, 0, 0, 250, 125, 0, 370, 250, 125);
    if (btnDesJuego == false) {
        ctx.drawImage(btnJ2, 0, 0, 250, 125, 650, 370, 250, 125);
    } else if (btnDesTuto == false) {
        ctx.drawImage(btnT2, 0, 0, 250, 125, 0, 370, 250, 125);
    }
    if (sec == 60) {
        time += 1;
        sec = 0;
    }

    //Muestra el tutorial
    if (Tuto == true) {
        if (movil == true) {
            ctx.drawImage(tutorialMovil, 0, 0, 800, 400, 50, 50, 800, 400);
        } else {
            ctx.drawImage(tutorial, 0, 0, 800, 400, 50, 50, 800, 400);
        }
    }
}

//bucle principal que permite cargar el juego y sus mecánicas
function inicio() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    imagenes();

    document.addEventListener('keydown', function (evento) {
        //Espacio
        if (evento.keyCode == 32) {
            if (movil == false) {
                saltoPC = true;
                saltar();
            }
        }
        //tecla Z para atacar
        if (evento.keyCode == 90) {
            if (movil == false) {
                ataquePC = true;
                atacar();
            }
        }
        //Flechas arriba y abajo
        if (evento.keyCode == 38) {
            arribaH = true;
        }
        if (evento.keyCode == 40) {
            abajoH = true;
        }

        //Flechas izquierda y derecha
        if (evento.keyCode == 37) {
            izqH = true;
        }
        if (evento.keyCode == 39) {
            derH = true;
        }

    });

    document.addEventListener('keyup', function (evento) {
        //Flechas arriba y abajo
        if (evento.keyCode == 38) {
            arribaH = false;
        }
        if (evento.keyCode == 40) {
            abajoH = false;
        }

        //Flechas izquierda y derecha
        if (evento.keyCode == 37) {
            izqH = false;
        }
        if (evento.keyCode == 39) {
            derH = false;
        }
    });

    //Cargar avatar del usuario
    /* var idM = $.user_id();
     if(idM > 1){
         user_id = $.user_id();
     }
     var avatar = $.mAvatar(user_id, 'avatar'); */

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log('Juego en un dispositivo móvil');
        movil = true;

    } else {
        console.log('Juego en pc');
        movil = false;
    }

    canvas.addEventListener('mousedown', clicRaton, false);
    canvas.addEventListener('mouseup', sueltaRaton, false);
    canvas.addEventListener('mousemove', posicionRaton, false);

    setInterval(function () {
        principal();
    }, 1000 / fps);

}

function borraCanvas() {
    canvas.width = ancho;
    canvas.height = alto;
}

function principal() {
    pantallaInicio();
    if (pInicio == false) {
        if (nivel.muerte == false && nivel.final == false) {
            sec += 1;
        }
        borraCanvas();
        gravedad();
        TiempoAp();
        logicaRoca();
        logicaEnemi();
        logicaMar();
        logicaMagia();
        dibujaFondo();
        dibujaMar();
        carril1();
        carril2();
        carril3();
        carrilTactil();
        colision();
        puntuacion();
        golpe();
        dibujaBoton();
        arriba();
        abajo();
        izquierda();
        derecha();
        saltar();
        gravedadEn();
        BossFinal();
    }
}
