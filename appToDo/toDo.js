

class Tarefa{
    constructor(tituloTarefa, dataTarefa){
        this.tituloTarefa = tituloTarefa
        this.dataTarefa = dataTarefa
        this.feita = false
    }

    validarDados(){
        for(let i in this){
            if(this[i]=='' || this[i] == undefined || this[i] == null){
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
}

let bd = new Bd();

function cadastrarTarefa(){
    let tituloTarefa = document.getElementById('tarefa').value
    let dataTarefa = document.getElementById('dataTarefa').value


    let tarefa = new Tarefa(tituloTarefa, dataTarefa)

    console.log(tarefa.validarDados())
    if(tarefa.validarDados()){
        bd.gravar(tarefa)
        //modal
        limpaCampos()
    }else{
        //modal
    }
}

function carregarListaTarefas(tarefas = Array(), concluida = false){

    if(tarefas.length == 0){
        tarefas = bd.recuperarTodosOsRegistros()
    }

    listaTarefas = document.getElementById('listaTarefas')

    //listaTarefas.innerHTML = ""

    tarefas.forEach(t => {
        
        //criação da div
        let div = document.createElement('div')
        div.className = 'task-organizer'

        //correct button
        let a1 = document.createElement('a')
        a1.className = 'btnDone'
        a1.innerHTML = '<img src="correctIcon.png"/>'
        a1.id = `correct_${t.id}`
        a1.onclick = function(){
            let id = this.id.replace('correct_','')
            let tarefa = localStorage.getItem(id)
            tarefa.feita = true
        }

        //delete button
        let a2 = document.createElement('a')
        a2.className = 'btnDelete'
        a2.innerHTML = '<img src="wrongIcon.png"/>'
        a2.id = `wrong_${t.id}`
        a2.onclick = function(){
            let id = this.id.replace('wrong_','')
            //bd.deletar(t)
            //window.location.reload()
        }
        

        div.innerHTML = `
        <div class="task-item">
            <span>${t.tituloTarefa}</span>
            <span> ${t.dataTarefa} </span>
            <span class="spanBtn">
                ${a1}
                ${a2}
            </span>
        </div>
        `
        
        listaTarefas.appendChild(div)
    })

}

function limpaCampos(){
    document.getElementById('tarefa').value = ""
    document.getElementById('dataTarefa').value=""
}

