

class Tarefa{
    constructor(tituloTarefa, dataTarefa, feita){
        this.tituloTarefa = tituloTarefa
        this.dataTarefa = dataTarefa
        this.feita = feita
    }

    validarDados(){
        for(let i in this){

            //se verifica o "feita", sempre dará false
            if(i == 'feita'){
                continue
            }
            if(this[i]=='' || this[i] == undefined || this[i] == null){
                console.log(i)
                return false
            }
        }
        return true
    }
}

class Bd{
    constructor(){
        let id = localStorage.getItem('id')
        if(id == null){
            id = localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let id = localStorage.getItem('id')
        return parseInt(id)+1
    }

    gravar(t){
        let id = this.getProximoId()
        localStorage.setItem('id', id)
        localStorage.setItem(id, JSON.stringify(t))
    }

    recuperarTodosOsRegistros(){

        let id = parseInt(localStorage.getItem('id'))

        let tarefas = new Array();

        for(let i = 1; i <= id; i++){
            //recupera tarefa
            let tarefa = JSON.parse(localStorage.getItem(i))

            if(tarefa === null){
                continue
            } 

            tarefa.id = i
            tarefas.push(tarefa)
        }

        return tarefas
    }


    deletar(id){
        localStorage.removeItem(id)
    }
}

let bd = new Bd();

function cadastrarTarefa(){
    let tituloTarefa = document.getElementById('tarefa').value
    let dataTarefa = document.getElementById('dataTarefa').value


    let tarefa = new Tarefa(tituloTarefa, dataTarefa, false)

    console.log(tarefa.validarDados())
    if(tarefa.validarDados()){
        bd.gravar(tarefa)
        window.location.reload()
    }else{
        alert('Dados inválidos.')
    }
}

function carregarListaTarefas(concluida = false){

    //recupera tarefas e vê se elas estão concluídas
    tarefas = bd.recuperarTodosOsRegistros()
    tarefas = tarefas.filter(t => t.feita == concluida)

    listaTarefas = document.getElementById('listaTarefas')

    //listaTarefas.innerHTML = ""

    tarefas.forEach(t => {
        
        //div listaTarefas
        let divLT = document.createElement('div')
        divLT.className = 'task-organizer'

        //div listaTarefas
        let divTI = document.createElement('div')
        divTI.className = 'task-item'
        divTI.innerHTML = `
        <span class="spanTitulo">${t.tituloTarefa}</span>
        <span> ${t.dataTarefa} </span>
        `
        if(!concluida){
            //correct button
            let a1 = document.createElement('a')
            a1.className = 'btnDone'
            a1.innerHTML = '<img src="correctIcon.png"/>'
            a1.id = `correct_${t.id}`
            a1.onclick = function(){
                let id = this.id.replace('correct_','')
                let tarefa = JSON.parse(localStorage.getItem(id))
                tarefa.feita = true
                localStorage.setItem(id,JSON.stringify(tarefa))
                window.location.reload()
                
            }

            //delete button
            let a2 = document.createElement('a')
            a2.className = 'btnDelete'
            a2.innerHTML = '<img src="wrongIcon.png"/>'
            a2.id = `wrong_${t.id}`
            a2.onclick = function(){
                let id = this.id.replace('wrong_','')
                bd.deletar(id)
                window.location.reload()
            }
            
            let span = document.createElement('span')
            span.className= "spanBtn"
            span.appendChild(a1)
            span.appendChild(a2)

            divTI.appendChild(span)
        }
        divLT.appendChild(divTI)

        listaTarefas.appendChild(divLT)
    })

}

function limpaCampos(){
    document.getElementById('tarefa').value = ""
    document.getElementById('dataTarefa').value=""
}

