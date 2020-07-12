
alert('teste')

var canvas, ctx, ALTURA, LARGURA, frame = 0, maxPulos = 3,velocidade = 15,estadoAtual,score = 0,


estados = {
    jogar:3,
    jogando:4,
    perdeu:5

},


chao = {
    altura:50,
    x:0,
    y: 550,
    cor: 'rgb(175, 85, 1)',

    desenho: function(){
        ctx.fillStyle = this.cor
        ctx.fillRect (this.x, this.y, LARGURA, this.altura)

    }



},

bloco = {
    altura:50,
    largura:50,
    y:0,
    x: 20,
    cor: 'rgb(56, 206, 163)',
    gravidade: 1.5,
    velocidade: 10,
    forcaPulo:25,
    qntpulos:0,

    desenho: function(){
        ctx.fillStyle = this.cor
        ctx.fillRect (this.x, this.y, this.largura, this.altura)

    },
    atualiza: function() {
        this.velocidade = this.velocidade + this.gravidade
        this.y += this.velocidade
        if(this.y >= chao.y - this.altura && estadoAtual != estados.perdeu){ // quando estou no chão
            this.y = chao.y -this.altura
            this.velocidade = 0
            this.qntpulos = 0
        }



    },
    pula: function() {
        if( this.qntpulos - maxPulos){
            this.velocidade = -this.forcaPulo
            this.qntpulos++
}
    }
},







obstaculos = {
    _obs:[], //armazena nosso obstaculos
    cores: ['black', 'red', 'blue', 'pink', 'yellow'],
    tempoInsere: 0,

    inseri: function(){ //inseri nosso obstaculos em obs
        this._obs.push({
            x: LARGURA, //informaçoes dos nossos obstaculos
            largura:30 + Math.floor(21*Math.random()),
            altura: 30 + Math.floor(100*Math.random()),
            cor:this.cores[Math.floor(Math.random() * 5)]
        })
        this.tempoInsere = 30 + Math.floor(Math.random() * 31)
    },
    atualiza: function(){
        if(this.tempoInsere == 0 ){
            this.inseri()
        }else {
            this.tempoInsere --
        }

        var tam = this._obs.length
        var i = 0
        while(i < tam){

            this._obs[i].x -= velocidade
            if(bloco.x + bloco.largura > this._obs[i].x && bloco.x < this._obs[i].x + this._obs[i].largura
                && bloco.y + bloco.largura > chao.y - this._obs[i].altura){
                    estadoAtual = estados.perdeu

            }else if(this._obs[i].x <= -this._obs[i].largura ) {
                this._obs.splice(i,1)
                score++
                console.log(score)
                tam --
                i --

            }
            i++ //
        }

    },
    limpa: function(){
        this._obs = []
    },
    desenho: function(){
        var tam = this._obs.length
        var i = 0

        while( i < tam  ) { //percorre o obs que esta armazenando nossos obstaculos e desenha cada objeto
            //var obs = this.obs[i] // sempre que usarmos o obs estaremos usando o this.obs[i]

            ctx.fillStyle = this._obs[i].cor //esta acessando o obstaculo que esta em obs, mais especificamente suas propriedade
            ctx.fillRect(this._obs[i].x, chao.y - this._obs[i].altura, this._obs[i].largura, this._obs[i].altura)
            i++

        }
    }


};





function clique(evento){
    if(estadoAtual == estados.jogando){
        bloco.pula()
    }else if (estadoAtual == estados.jogar){
        estadoAtual = estados.jogando

    }else if (estadoAtual == estados.perdeu && bloco.y > ALTURA *2){
        estadoAtual = estados.jogar
        bloco.velocidade = 0
        bloco.y = 0

    }
}


function main(){ //nosso jogo aqui dentro
    ALTURA = window.innerHeight
    LARGURA = window.innerWidth //largura e altura igual a tela do jogador
    if(LARGURA > 500){ //mas se for maior que 500 fica esse tamanho
        LARGURA  = 600
         ALTURA = 600
    }
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d')
    canvas.width = LARGURA
    canvas.height = ALTURA
    canvas.style.border = '1px solid black'
    document.body.appendChild(canvas)
    document.addEventListener('mousedown', clique) //adciona um evento do tipo mouse down, e executa o clique
    estadoAtual = estados.jogar
    roda()



}




function roda(){ //loop que atualiza constantemente nossos desenhos e açoes
    atualiza()
    desenha()
    window.requestAnimationFrame(roda)
}

function atualiza(){
    frame++

    bloco.atualiza() //no continuamos a atualizar o bloco pois iremos animalo quando perder e resetar o jogo
    if (estadoAtual == estados.jogando){

    obstaculos.atualiza() //so iremos atualizar o nosso bloco quando estivermos jogando
        } else if (estadoAtual == estados.perdeu){
            score = 0
            obstaculos.limpa()
        }



}

function desenha(){
    ctx.fillStyle = 'rgb(124, 107, 218)'
    ctx.fillRect (0, 0, LARGURA, ALTURA) //background
    if(estadoAtual == estados.jogar){ //se estado atual for jogar
        ctx.fillStyle = 'green'
        ctx.fillRect (LARGURA / 2 -50 , ALTURA / 2 -50, 100, 100)

    }else if(estadoAtual == estados.perdeu){ //se estado atual for perdeu
        ctx.fillStyle = 'red'
        ctx.fillRect (LARGURA / 2 -50 , ALTURA / 2 -50, 100, 100)
    }else if(estadoAtual == estados.jogando){//se estado atual for jogando

        obstaculos.desenho()
    }

    ctx.fillText(score, 35, 35 , 500);

    chao.desenho()
    bloco.desenho()

}

main()
