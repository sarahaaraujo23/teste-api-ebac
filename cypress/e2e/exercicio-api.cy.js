/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
    return contrato.validateAsync(response.body)
  })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.listarUsuario().then((usuarios) => {
      // Validações no corpo retornado pela requisição
      expect(usuarios).to.have.property('usuarios'); // Verifica a propriedade 'usuarios'
      expect(usuarios.usuarios).to.be.an('array'); // Verifica se 'usuarios' é um array
      expect(usuarios.usuarios.length).to.be.greaterThan(0); // Verifica se há usuários cadastrados
    });
  });

  it('Deve cadastrar um usuário com sucesso - POST', () => {
    const timestamp = Date.now();
    const novoUsuario = {
        nome: "Fulano da Silva 3",
        email: `beltrano${timestamp}@qa.com.br`,
        password: "teste",
        administrador: "true"
    };

    cy.criarUsuario(novoUsuario).then((body) => {
        // Agora as asserções estão aqui, no teste
        expect(body.message).to.eq('Cadastro realizado com sucesso');
        expect(body._id).to.exist;
    });
});

  it('Deve validar um usuário com email inválido', () => {
    const usuarioInvalido = {
      nome: "Fulano Teste",
      email: "emailinvalido",
      password: "teste",
      administrador: "true",
  };

  cy.validarEmail(usuarioInvalido).then((body) => {
  });
});

  it('Deve editar um usuário previamente cadastrado', () => {
    const timestamp = Date.now();
    const novoUsuario = {
        nome: "Fulano da Silva",
        email: `fulano${timestamp}@qa.com.br`,
        password: "teste",
        administrador: "true",
    };

    cy.criarUsuario(novoUsuario).then((bodyCriacao) => {
        expect(bodyCriacao.message).to.eq('Cadastro realizado com sucesso');
        expect(bodyCriacao._id).to.exist;

        const idUsuario = bodyCriacao._id;

        const dadosAtualizados = {
            nome: "Fulano Atualizado",
            email: `fulano_atualizado${timestamp}@qa.com.br`,
            password: "12345",
            administrador: "false",
        };

        cy.editarUsuario(idUsuario, dadosAtualizados).then((bodyEdicao) => {
            expect(bodyEdicao.message).to.eq('Registro alterado com sucesso');
        });
    });
});

it('Deve deletar um usuário previamente cadastrado', () => {
  const timestamp = Date.now();
  const novoUsuario = {
    nome: "Fulano para Deletar",
    email: `fulano_deletar${timestamp}@qa.com.br`,
    password: "teste",
    administrador: "false",
  };

  cy.criarUsuario(novoUsuario).then((bodyCriacao) => {
    expect(bodyCriacao.message).to.eq('Cadastro realizado com sucesso');
    expect(bodyCriacao._id).to.exist;

    const idUsuario = bodyCriacao._id;

    cy.excluirUsuario(idUsuario).then((response) => {
      if (response.status === 200) {
        expect(response.body.message).to.eq('Registro excluído com sucesso');
      } else if (response.status === 400) {
        expect(response.body.message).to.eq('Não é permitido excluir usuário com carrinho cadastrado');
        expect(response.body).to.have.property('idCarrinho');
      } else {
        throw new Error(`Status inesperado: ${response.status}`);
      }
    });
  });
});
});
