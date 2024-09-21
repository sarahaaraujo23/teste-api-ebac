/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
     cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)
     })
    
  });

  it('Deve listar usuários cadastrados - GET', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should ((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso - POST', () => {
    cy.request ({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": "Fulano da Silva 3",
        "email": "beltrano3@qa.com.br",
        "password": "teste",
        "administrador": "true"
      }
    }).should((response) => {
      expect(response.status).equal(201)
      expect(response.body.message).equal('Cadastro realizado com sucesso')
    })

  });

  it('Deve validar um usuário com email inválido - POST', () => {
    cy.request ({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": "Fulano Teste",
        "email": "beltrano3@qa.com.br",
        "password": "teste",
        "administrador": "true"
      }, failOnStatusCode: false
    }).should((response) => {
      expect(response.status).equal(400)
      expect(response.body.message).equal('Este email já está sendo usado')
    })
  });

  it('Deve editar um usuário previamente cadastrado - PUT', () => {
    cy.request ({
      method:'PUT',
      url: 'usuarios' + '/0uxuPY0cbmQhpEz1',
      body: {
        "nome": "Fulano da Silva Editado",
        "email": "beltrano.editado@qa.com.br",
        "password": "teste",
        "administrador": "true"
      }
    }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body.message).equal('Registro alterado com sucesso')
    }) 
  });

  it('Deve deletar um usuário previamente cadastrado - DELETE', () => {
    cy.request ({
      method: 'DELETE',
      url: 'usuarios' + '/xmuAJTfxuaErefZS',
    }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body.message).equal('Registro excluído com sucesso')
    })
  });


});
