/*Class que vai receber a despesa*/
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        //Validando campos do objeot
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}

/*Classe para receber objetos instanciados */
class BD {

    constructor(){
        let id = localStorage.getItem('id')
        if(id === null) {
            localStorage.setItem('id',0)
        }
    }

    getProximoId(){
        /*Método para alterar o Id */
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
         let id = this.getProximoId()
         localStorage.setItem('id',id)
        /*Usando steItem para passar o nome do objeto e prodprio 
        objeton em JSON*/
        /*Usando JSON.stringfy para transformar objeito em um JSOSN valido */
        localStorage.setItem(id, JSON.stringify(d))
        console.log(d)
    }

    recuperarTodosRegistros(){
        //array de despesas
        let despesas = Array()

        
        let id = localStorage.getItem('id')
        //Recuperar todas as despesas em LocalStorage
        for(let i = 1; i <= id; i++){

            //recuperar a despesa
            //transformando JSON em objeto JavaScript
            let despesa = JSON.parse(localStorage.getItem(i))
           
            //pular indices que foram removidos
            if(despesa === null){
                continue
            }

            //adicionando objeito no array 
            despesas.push(despesa)

        }
        return despesas
    }
    //método pesquisar
    pesquisar(despesa){

        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()
        console.log(despesasFiltradas)

        //Filtros
        //Ano
        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        //Mês
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        //Dia
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        //Tipo
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        //Descrição
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        //Valor
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        console.log(despesasFiltradas)
    }
}

/*Gravando objeto no Local Storage */ 
let bd = new BD  

/*Função para cadastro de despesas*/
function cadastrarDespesa(){
    /*recuperando elementos e setando em variaveis para recuperar seus respectivos valores. */
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    /*console.log(ano.value)
    console.log(mes.value)
    console.log(dia.value)
    console.log(tipo.value)
    console.log(descricao.value)
    console.log(valor.value)*/

    /*Passando parametros para construção do objeto */
    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )


    //Recuperando elementos da Janela de resposta do registro
    let modal = document.getElementById('modal')
    let titleModal = document.getElementById('exampleModalLabel')
    let textModal = document.getElementById('text')
    let btnModal = document.getElementById('btn_modal')

    //Caso a validação retorne true os dados serão gravados
    if(despesa.validarDados()){
        bd.gravar(despesa)

        //Editando atributos da tela de resposta do registro
        modal.className = 'modal-header text-success'
        titleModal.textContent = 'Registro inserido com sucesso.'
        textModal.textContent = 'Despesa gravada.'
        btnModal.className = 'btn btn-success'
        btnModal.textContent = 'Voltar'

        
        //Função JQUERY com BootStrap para exibir elemento usando ID
        $('#record').modal('show')

        //limpando os campos após a gravação
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    }else {
        modal.className = 'modal-header text-danger'
        titleModal.textContent = 'Erro na gravação.'
        textModal.textContent = 'Existem campos obrigatórios que não foram preenchidos.'
        btnModal.className = 'btn btn-danger'
        btnModal.textContent = 'Voltar e corrigir'

        $('#record').modal('show')
    }
    
}

//Exibir registros gravados na pagina consulta
//Função serar chamada pelo onload do elemento body na pagina consiltas(assim que a pagina for aberta no navegador)
function carregaListaDespesa(params) {
    //recebendo array criado pelo método
    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()
    //console.log(despesas)

    //selecionando elemento onde vamos exibir a lista
    let listaDespesas = document.getElementById('listaDespesas')

    /*Estrutura que vai receber os dados
    <tr>
        <td>Data</td>
        <td>Tipo</td>
        <td>Descrição</td>
        <td>Valor</td>
    </tr>
    */
   //Pecorre o array listando as despesas
   despesas.forEach(function (d) {
    //console.log(d)

    //Criando linha (tr)
    let linha = listaDespesas.insertRow()

    //Criando as colunas (td)
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
    
    //Ajuste do tipo
    switch (parseInt(d.tipo)) {
        case 1:
            d.tipo = `Alimentação`            
            break;
        case 2:
            d.tipo = `Educação`            
            break;
        case 3:
            d.tipo = `Lazer`            
            break;
        case 4:
            d.tipo = `Saúde`            
            break; 
        case 5:
            d.tipo = `Transporte`            
            break;   

    }
    linha.insertCell(1).innerHTML = `${d.tipo}`
    linha.insertCell(2).innerHTML = `${d.descricao}`
    linha.insertCell(3).innerHTML = `${d.valor}`
   })
}

//função pesquisar 
function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes  = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)
    
    bd.pesquisar(despesa)
}




