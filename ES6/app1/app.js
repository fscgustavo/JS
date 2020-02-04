
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
            console.log(i, id)
            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))
            
            //verificar itens vazios
            if(despesa === null){
                continue
            }

            despesas.push(despesa)  
        }
        return despesas
        
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

function carregaListaDespesas(){

    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()

    //selecionando o elemento tbody da tabela
    var listaDespesas = document.getElementById('listaDespesas')

    //percorrer o array despesas, listando cada
    //despesa de forma dinâmica

    despesas.forEach(function(d){

        //criando a linha (tr)
        let linha = listaDespesas.insertRow()

        //criar as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        linha.insertCell(1).innerHTML = `${d.tipo}`
        linha.insertCell(2).innerHTML = `${d.descricao}`
        linha.insertCell(2).innerHTML = `${d.valor}`

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

function pesquisaDespesas(){
    
}
