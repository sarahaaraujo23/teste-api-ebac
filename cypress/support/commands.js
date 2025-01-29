Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha 
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
  })
  
   Cypress.Commands.add('cadastrarProduto' , (token, produto, preco, descricao, quantidade) =>{
      cy.request({
          method: 'POST', 
          url: 'produtos',
          headers: {authorization: token}, 
          body: {
              "nome": produto,
              "preco": preco,
              "descricao": descricao,
              "quantidade": quantidade
            }, 
            failOnStatusCode: false
      })
   })
  
   Cypress.Commands.add('listarUsuario', () => {
    return cy.request({
      method: 'GET',
      url: 'usuarios',
  }).then((response) => {
      expect(response.status).to.eq(200); // Asserção aqui, no comando de listagem, faz sentido
      return response.body;
  });
  });
  
  
    Cypress.Commands.add('criarUsuario', (usuario) => {
      return cy.request({
        method: 'POST',
        url: 'usuarios',
        body: usuario,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.body; // Retorna APENAS o body
    });
  });
      
    Cypress.Commands.add('validarEmail', (usuario, mensagemEsperada) => {
      return cy.request({
        method: 'POST',
        url: 'usuarios',
        body: usuario,
        headers: {
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).equal(400);
        return response.body;
    });
  });
  
  
    Cypress.Commands.add('editarUsuario', (idUsuario, dadosAtualizados) => {
      return cy.request({
        method: 'PUT',
        url: `usuarios/${idUsuario}`,
        body: dadosAtualizados,
        headers: {
            'Content-Type': 'application/json',
        },
        failOnStatusCode: false,
    }).then((response) => {
        return response.body; // Retorna APENAS o body
    });
  });
  
  Cypress.Commands.add('excluirUsuario', (idUsuario) => {
    return cy.request({
      method: 'DELETE',
      url: `usuarios/${idUsuario}`,
      failOnStatusCode: false, // Para não falhar caso o usuário tenha carrinho associado
    }).then((response) => {
      return response; // Retorna o objeto completo da resposta para validação no teste
    });
  });
    
 