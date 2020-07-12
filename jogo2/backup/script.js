
//CODIGO COM ERRO, NAO ESTOU CONSEGUINDO PUSHAR MEU OBJETO PARA A ARRAY _OBS

var canvas, ctx, ALTURA, LARGURA, frame = 0, maxPulos = 3,velocidade = 6,


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
        if(this.y > chao.y - this.altura){
            this.y = chao.y -this.altura
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
        if(this.tempoInsere == 0){
            this.inseri()
        }else {
            this.tempoInsere -- 
        }


        var tam = this._obs.length 
        var i = 0                   
        while(i < tam){     
            console.log(tam)
            this._obs[i].x -= velocidade
            if(this._obs[i].x <= -this._obs[i].largura ) {
                this._obs.splice(i,1) 
                console.log(this._obs)
                
                console.log(tam)
                tam --
                i --

            }
            i++ //
        }

    },
    desenho: function(){ 
        var tam = this._obs.length
        var i = 0
        
        while( i < tam  ) { //percorre o obs que esta armazenando nossos obstaculos e desenha cada objeto
            //var obs = this.obs[i] // sempre que usarmos o obs estaremos usando o this.obs[i]
            
            ctx.fillStyle = this._obs[i].cor //esta acessando o obstaculo que esta em obs, mais especificamente suas propriedade
            ctx.fillRect(this._obs[i].x, chao.y - this._obs[i].altura, this._obs[i].largura, this._obs[i].altura)
            i++
            console.log(this._obs)
        }
    }


}





function clique(evento){
    bloco.pula()
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

    roda()



}

function roda(){ //loop que atualiza constantemente nossos desenhos e açoes
    atualiza()
    desenha()
    window.requestAnimationFrame(roda)
}

function atualiza(){
    frame++
    
    bloco.atualiza()
    obstaculos.atualiza()
}

function desenha(){
    ctx.fillStyle = 'rgb(124, 107, 218)'
    ctx.fillRect (0, 0, LARGURA, ALTURA) //background
    chao.desenho()
    obstaculos.desenho()
    bloco.desenho()
}

main()