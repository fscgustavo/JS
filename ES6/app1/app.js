
//localStorage.clear()
class Despesa {
    constructor(ano,mes,dia,tipo,descricao,valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    //verifica se algum campo está invalidado
    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}

class Bd{

    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id',0)
        } 
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId)+1
    }
    
    gravar(d){
        let id = this.getProximoId()
        localStorage.setItem('id',id)
        localStorage.setItem(id,JSON.stringify(d))
    }

    recuperarTodosRegistros(){
        let id = parseInt(localStorage.getItem('id'))

        //array de despesas
        let despesas = Array()

        //recuperar todas as despesas cadastradas em localStorage
        for(let i = 1; i <= id; i++){
            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))
            
            //verificar itens vazios
            if(despesa === null){
                continue
            }
            despesa.id = i
            despesas.push(despesa)  
        }
        return despesas
        
    }

    pesquisar(despesa){

        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()

        //ano
        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        //mes
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        //dia
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        //tipo
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        //descricao
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        return despesasFiltradas
    }

    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

function cadastrarDespesa(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )
    
    if(despesa.validarDados()){
        bd.gravar(despesa)
        fdModal(true)
        limpaCampos()

    }else{
        //dialog de erro
        fdModal(false)
    }
    
}




function fdModal(feedback){
    if(feedback){
        document.getElementById('titulo').innerHTML = "Registro inserido com sucesso"
        document.getElementById('titulo').className = "text text-success"

        document.getElementById('descricaoModal').innerHTML = "Despesa foi cadastrada com sucesso!"
        
        document.getElementById('btnModal').className = "btn btn-success"

        
    }else{
        document.getElementById('titulo').innerHTML = "Erro na gravação"
        document.getElementById('titulo').className = "text text-danger"

        document.getElementById('descricaoModal').innerHTML = "Existem campos obrigatórios que não foram preenchidos"
        
        document.getElementById('btnModal').className = "btn btn-danger"
    }

    $("#feedbackGravacao").modal('show')
}

function carregaListaDespesas(despesas = Array(), filtro = false){

    
    if(despesas.length == 0 && filtro == false){
        despesas = bd.recuperarTodosRegistros()
    }

    //selecionando o elemento tbody da tabela
    var listaDespesas = document.getElementById('listaDespesas')

    //limpa os itens da consulta anterior
    listaDespesas.innerHTML = ``

    //percorrer o array despesas, listando cada
    //despesa de forma dinâmica

    despesas.forEach(function(d){

        //criando a linha (tr)
        let linha = listaDespesas.insertRow()

        //criar as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        linha.insertCell(1).innerHTML = `${d.tipo}`
        linha.insertCell(2).innerHTML = `${d.descricao}`
        linha.insertCell(3).innerHTML = `${d.valor}`

        //criar botão de exclusão
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
            let id = this.id.replace('id_despesa_','')
            bd.remover(id)
            window.location.reload()
        }

        linha.insertCell(4).append(btn)

    })
}


function limpaCampos(){
    ano.value = ""
    mes.value = ""
    dia.value = ""
    tipo.value = ""
    descricao.value = ""
    valor.value = ""
}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(
        ano,
        mes,
        dia,
        tipo,
        descricao,
        valor
    )

    let despesas = bd.pesquisar(despesa)

    carregaListaDespesas(despesas, true)
    
}
