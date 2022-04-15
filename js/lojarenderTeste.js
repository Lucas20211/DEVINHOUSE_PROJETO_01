'use strict';

document.getElementById('cadastrarProduto').addEventListener('click', mostrarModal)
document.getElementById('meu_preco').addEventListener('click', precoNovo)
document.getElementById('modalClose').addEventListener('click', closeModal);



//----------------------------------------------------------------------------------------------------------------------
const valorTotalprodutos = document.getElementById('valorTotalprodutos');// criando uma const com ID da div 
const storeDinheiro = JSON.parse(localStorage.getItem('banco_produto'));// recebe os valores dos objetos

function somenteNumeros(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    console.log(charCode)
    // charCode 8 = backspace   
    // charCode 9 = tab
    if (charCode != 8 && charCode != 9) {
        // charCode 48 equivale a 0   
        // charCode 57 equivale a 9
        if (charCode < 46 || charCode > 57) {
            return false;
        }
    }else if(charCode == 46){
        return true;
    }
}

function atualizarValor(){ 
    const soma = storeDinheiro.map(item => parseFloat(item.valor)).reduce((a, b) => a + b, 0); 
    let dinheiro = soma.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    criarDinheiro(dinheiro)  
}
function limparvalorTotal(){
    const allLinhas = valorTotalprodutos
    allLinhas.forEach(linha => linha.classList.removeChild(linha))
}
//------------------------------------------------------------------------------------------------------
function criarDinheiro(total){
    const newElemento = document.createElement('span')
    newElemento.innerHTML = `
    <span id="inputMoney" type="text" class="inputMoney col-6 display-4">${total}</span>`;
    document.querySelector('#valorTotalprodutos').appendChild(newElemento)
}
function precoNovo(){
    const el = document.getElementById('meu_preco');
    const meuPreco = new bootstrap.Modal(el);
    meuPreco.show();
}
function closeModal(){
    clearFields();
    document.getElementById('meu_preco').classList.remove('show')
}

function mostrarModal(){
    const el = document.getElementById('minha_caixa');
    const minha_modal = new bootstrap.Modal(el);
    minha_modal.show();
}//mostar modal bootstrap com a função de bootstrap
function closeModal(){
    clearFields();
    document.getElementById('minha_caixa').classList.remove('show')
}// função de limpar os inputs

const setLocalS = (banco_produtos) => localStorage.setItem("banco_produto", JSON.stringify(banco_produtos))//transformando em JSON string
const getLocalS = () => JSON.parse(localStorage.getItem("banco_produto")) ?? [] //transformando em objeto
const lerProduto = () => JSON.parse(localStorage.getItem("banco_produto")) ?? [] //transformando em objeto
//-----------------------------------------------------------------------------------------------------------------------------------------------

//add produtos pelo modal

const deletarProduto = (indice) => {
    const banco_produtos = lerProduto()
    banco_produtos.splice(indice, 1)
    setLocalS(banco_produtos)
    location.reload();
}// deletar produto do localStore

const atualizarProduto = (indice, produtos) =>{
    const banco_produtos = lerProduto()
    banco_produtos[indice] = produtos;
    setLocalS(banco_produtos)
}// Atualizar o produto do localStore

//adicionando banco de dados
const createProduto = (produtos) => {
    const banco_produtos =  getLocalS();
    banco_produtos.push(produtos)
    localStorage.setItem("banco_produto", JSON.stringify(banco_produtos))
    atualizarTabela();
}// adicionando os produtos no localStore

const isValidfields = () => document.getElementById('form').reportValidity()// evitar deixa caixa de texto em branco

    function clearFields(){
        const camposfields = document.querySelectorAll('.formodal')
        camposfields.forEach(camposfield => camposfield.value ="")
    }// limpa os inputs do modal

    function salvarProduto (){
    if(isValidfields()){
        const produto = {
            nome: document.getElementById('nomeProduto').value,
            valor: document.getElementById('preco').value,
        }// Pega o que foi digitado no modal 
        
        createProduto(produto);
        atualizarTabela();
        
        closeModal();
        location.reload();
    }// salva o produto dentro do localStore e atualiza a tabela do HTML
    
}

function criarLinha(produto, indice){
    const newLinha = document.createElement('tr')
    newLinha.innerHTML = `
        <input class="checado form-check-input form-switch" type="checkbox" role="switch" id="checke-${indice}">

        <th>${produto.nome}</th>
        <th id="produtoValortela">${produto.valor}</th>

        <th>
            <button type="button" class="btn btn-danger" id="excluir-${indice}">Excluir</button>
        </th>  
    `
    document.querySelector('#tableProduto>thead').appendChild(newLinha)
}// Criar elementos HTML 

function limparTabela(){
    const allLinhas = document.querySelectorAll('#tableProduto>thead tr')
    allLinhas.forEach(linha => linha.parentNode.removeChild(linha))
}// remover tabelado HTML

function atualizarTabela(){
    const bcDados = lerProduto();
    limparTabela()
    bcDados.forEach(criarLinha)
    atualizarValor()
}// atualiza os dados do localStore e adiciona no HTML

// FUNÇÃO DOS Button E Checkbox
function editDelete(event){
    if(event.target.type === 'button' || 'checke'){
        const [action, indice] = event.target.id.split('-')
         if(action == 'excluir'){
        deletarProduto(indice)
        atualizarTabela();
        }else if(action === 'checke'){
            
        }
    }
}
function checar() {
    const checked = document.querySelectorAll('#theadIten>tr th')
    checked.style = 'color: red;';
}
atualizarTabela();
//evento
document.getElementById('salvar').addEventListener('click', salvarProduto);
document.getElementById('fecharmodalTop').addEventListener('click', closeModal);
document.querySelector('#tableProduto>thead').addEventListener('click', editDelete);



