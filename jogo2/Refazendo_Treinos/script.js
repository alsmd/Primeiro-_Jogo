//Refazendo para treino


var canvas,ctx,ALTURA,LARGURA,frame = 0,maxPulos = 3,


chao = { 
    altura: 50,
    y:550,
    x:0,
    cor:'rgb(116, 3, 106)',
    desenho: function (){
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x , this.y, LARGURA, this.altura);
        
        
    }

},

bloco = {
    altura:50,
    largura:50,
    x:20,
    y:0,
    cor:'rgb(74, 201, 36)',
    velocidade: 12,
    gravidade: 1.5,
    forcaPulo:25,
    qntPulos:0,
    desenho: function() {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)

    },
    atualiza: function(){
        this.velocidade = this.velocidade + this.gravidade
        this.y = this.y + this.velocidade
        if (this.y > chao.y- this.altura){
            this.y = chao.y - this.altura
            this.qntPulos = 0
        }
    },
    pulo: function() {
        if(this.qntPulos < maxPulos){
        this.velocidade = -this.forcaPulo
        this.qntPulos ++}
    }

},


obstaculo = {
    obs: [],
    cores: ['black','red', 'green','yellow','pink'],
    inseri: function() {
        this.obs.push({
            x:100 + Math.floor(Math.random()*300 ),
            largura: 30 + Math.floor(Math.random()*21 ),
            altura: 30 + Math.floor(Math.random()*100),
            cor: this.cores[Math.floor(Math.random()*5)]
        })
        console.log(this.obs)
    },
    atualiza: function(){

    },
    desenha(){
        var tam = this.obs.length
        var i = 0
        while(i < tam ) {
            ctx.fillStyle = this.obs[i].cor
            ctx.fillRect(this.obs[i].x,chao.y -this.obs[i].altura,this.obs[i].largura,this.obs[i].altura)
            i++
        }
    }
    


}




function clique(){
    bloco.pulo()
}

function main(){
    LARGURA = window.innerWidth
    ALTURA = window.innerHeight
    if(LARGURA > 500){
        LARGURA = 600
        ALTURA = 600
    }
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d')
    canvas.width = LARGURA
    canvas.height = ALTURA
    canvas.style.border= '1px solid black'
    document.addEventListener('mousedown', clique)
    document.body.appendChild(canvas)


    roda()



}

main()

function roda(){
    atualiza()
    desenha()
    window.requestAnimationFrame(roda)

}

function atualiza(){
    frame++
    bloco.atualiza()

}

function desenha(){
    ctx.fillStyle = 'rgb(117, 236, 245)'
    ctx.fillRect (0, 0, LARGURA, ALTURA)
    chao.desenho()
    obstaculo.desenha()
    bloco.desenho()

}









/*
colisao: function(){
    
    var tam = obstaculos._obs.length
    var i = 0
    while(i < tam){
        var obstaculos_y = chao.y - obstaculos._obs[i].altura
    if(this.x + this.largura > obstaculos._obs[i].x && this.x < obstaculos._obs[i].x + obstaculos._obs[i].
largura && this.y + this.altura > obstaculos_y){
        estadoAtual =  estados.perdeu
        
    }
    i++
}
},
*/ //adcionei do bloco e chamei no atualizar do bloco