

const allProtudos = [
    {id: 01,name: 'Spider-Man',img: '/imagens/spiderman.png',price: 0, quantidade: 0,},
    {id: 02,name: 'Demons Souls',img: '/imagens/demonssouls.png',price: 0,quantidade: 0,},
    {id: 03,name: 'Grand Theft Auto 5',img: '/imagens/gta5.png',price: 250.00,quantidade: 0,},
    {id: 04,name: 'Assassins Creed Valhalla',img: '/imagens/valhalla.png',price: 250.00,quantidade: 0, },
    {id: 05,name: 'far Cry 6',img: '/imagens/farcry6.png',price: 250.00,quantidade: 0, },
    {id: 06,name: 'REd Dead Redemption 2',img: '/imagens/rdp2.png',price: 250.00,quantidade: 0, },
    {id: 07,name: 'The Last os Us 2',img: '/imagens/tlofp2.png',price: 250.00,quantidade: 0, },
    {id: 08,name: 'Horizon Forbidden West',img: '/imagens/horizon.png',price: 250.00,quantidade: 0, },
    {id: 09,name: 'Elder Ring',img: '/imagens/elderring.png',price: 250.00,quantidade: 0, },
    {id: 10,name: 'Grand Turismo 7',img: '/imagens/grandturismo7.png',price: 250.00,quantidade: 0, },
    {id: 11,name: 'Headset Sem Fio Sony',img: '/imagens/headsetps5.png',price: 250.00,quantidade: 0, },
    {id: 12,name: 'PlayStation®5 Câmera Sony',img: '/imagens/webcamps5.png',price: 250.00,quantidade: 0, },
    {id: 13,name: 'Controle PS5',img: '/imagens/controleps5.png',price: 250.00,quantidade: 0, },
];

inicializarLoja = ()=>{
        const containerProdutos = document.getElementById("produto")
          allProtudos.map((val)=>{
            containerProdutos.innerHTML += `
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 d-flex align-items-lg-stretch">
                    <div class="card text-center bg-light">
                        <img src="`+val.img+`" class="card-img-top">
                            <div class="card-text bg-info mt-2">
                                R$ `+val.price+`
                            </div>
                            <div class="card-body">
                                <h5>`+val.name+`</h5>                       
                            </div>
                            <div class="card-footer">
                                <form class="d-block">
                                <input type="checkbox" key="` + val.id + `"  class="form-check-input" value="" id="chkPromocoes">                                                     
                                </form>
                            </div>
                    </div>
                </div>             
            `;
        });     
    }
inicializarLoja();








