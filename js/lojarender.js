'use strict';
//evento
document.getElementById('salvar').addEventListener('click', salvarProduto);
document.getElementById('fecharmodalTop').addEventListener('click', closeModal);
document.querySelector('#tableProduto>thead').addEventListener('click', editDelete);
document.getElementById('cadastrarProduto').addEventListener('click', mostrarModal)
document.getElementById('modalClose').addEventListener('click', closeModal);
//----------------------------------------------------------------------------------------------------------------------
const setLocalS = (banco_produtos) => localStorage.setItem("banco_produto", JSON.stringify(banco_produtos))//transformando em JSON string
const getLocalS = () => JSON.parse(localStorage.getItem("banco_produto")) ?? [] //transformando em objeto
const lerProduto = () => JSON.parse(localStorage.getItem("banco_produto")) ?? [] //transformando em objeto
const valorTotalprodutos = document.getElementById('valorTotalprodutos');// criando uma const com ID da div 
const storeDinheiro = JSON.parse(localStorage.getItem('banco_produto'));// recebe os valores dos objetos
//----------------------------------------------------------------------------------------------------------------------
function somenteNumeros(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    if (charCode != 8 && charCode != 9) {
        if (charCode < 46 || charCode > 57) {
            return false;
        }
    }else if(charCode == 46){
        return true;
    }
}// faz com que apenas numeros sejam digitados
function atualizarValor(){ 
    const soma = storeDinheiro.map(item => parseFloat(item.valor)).reduce((a, b) => a + b, 0); 
    let dinheiro = soma.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    criarDinheiro(dinheiro) // atualiza o valor com reais automatico 
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
}// mostra o dinheiro total na tela
function mostrarModal(){
    const el = document.getElementById('minha_caixa');
    const minha_modal = new bootstrap.Modal(el);
    minha_modal.show();
}//mostar modal bootstrap com a função de bootstrap
function closeModal(){
    clearFields();
    document.getElementById('minha_caixa').classList.remove('show')
}// função de limpar os inputs
//-----------------------------------------------------------------------------------------------------------------------------------------------
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
        </th>`
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
    if(event.target.type === 'button' || 'checked'){
        const [action, indice] = event.target.id.split('-')
         if(action == 'excluir'){
        deletarProduto(indice)
        atualizarTabela();
        }else if(action == 'checke'){
            //document.querySelector('#tableProduto>thead').classList.add('text-decoration-line-through')
            console.log("Checked produto");
        }else if(action != 'checke'){
            //document.querySelector('#tableProduto>thead').classList.remove('text-decoration-line-through')
            console.log("Checked removido");
        }
    }
}
atualizarTabela();

