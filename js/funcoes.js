
        
        atualizarCarrinho = () => {
            const renderCarrinho = document.getElementById('carrinhoCompra');
            renderCarrinho.innerHTML +=`
        
            `;
        }

        const adicionernoCarrinho = document.getElementsByClassName('btbotao');

        for (var i = 0; i < allProtudos.length; i++) {
            adicionernoCarrinho[i].addEventListener("click", function () {
                
                atualizarCarrinho();
            })
        }