describe('Central de atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
  });
    it("verifica o título da aplicação", () => {
      cy.title().should("be.equal","Central de Atendimento ao Cliente TAT");
    });

    it("preenche os campos obrigatórios e envia o formulário", () => {
      cy.clock() // congela o relógio do navegador

      cy.get("#firstName").type("Francisco", { delay: 0 })
      cy.get("#lastName").type("Santos", { delay: 0 })
      cy.get("#email").type("francisco@example.com", { delay: 0 })
      cy.get("#open-text-area").type("O Samuel e o Vitor, são ótimos amigos para se contar!!", { delay: 0 })
      cy.contains("button", "Enviar").click()

      cy.get(".success").should("be.visible")

      cy.tick(3000) // avança o relógio do navegador três segundos (em milissegundos)

      cy.get(".success").should("not.be.visible")
    });

    it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
      cy.clock()

      cy.get("#firstName").type("Francisco")
      cy.get("#lastName").type("Santos")
      cy.get("#email").type("franciscoexample.com")
      cy.get("#open-text-area").type("O Samuel e o Vitor, são ótimos amigos para se contar!!")
      cy.contains("button", "Enviar").click()
      
      cy.get(".error").should("be.visible")

      cy.tick(3000)

      cy.get(".error").should("not.be.visible")
    });

    it("campo telefone continua vazio quando preenchido com um valor não numérico", () => {
      cy.get("#phone")
        .type("aabbcc")
        .should("have.value", "")
    })

    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
      cy.clock()
      
      cy.get("#firstName").type("Francisco")
      cy.get("#lastName").type("Santos")
      cy.get("#email").type("francisco@example.com")
      cy.get("#phone-checkbox").check()
      cy.get("#open-text-area").type("O Samuel e o Vitor, são ótimos amigos para se contar!!", { delay: 0 })
      cy.contains("button", "Enviar").click()
      
      cy.get(".error").should("be.visible")

      cy.tick(3000)

      cy.get(".error").should("not.be.visible")
    });

    it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
      cy.get("#firstName")
        .type("Francisco")
        .should("have.value", "Francisco" )
        .clear()
        .should("have.value", "")
      
      cy.get("#lastName")
        .type("Santos")
        .should("have.value", "Santos" )
        .clear()
        .should("have.value", "")

      cy.get("#email")
        .type("francisc@oexample.com")
        .should("have.value", "francisc@oexample.com" )
        .clear()
        .should("have.value", "")

      cy.get("#phone")
        .type("88999999999")
        .should("have.value", "88999999999" )
        .clear()
        .should("have.value", "")

    });

    it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
      cy.clock()
      
      cy.get("button").click()
      
      cy.get(".error").should("be.visible")

      cy.tick(3000)

      cy.get(".error").should("not.be.visible")
    });

    it("envia o formulário com sucesso usando um comando customizado", () => {
      cy.clock()
      
      const data = {
        firstName: "Francisco",
        lastName: "Santos",
        email: "francisco@example.com",
        text: "O Samuel e o Vitor, são ótimos amigos para se contar!!"
      }

      cy.fillMandatoryFieldsAndSubmit(data)

      cy.get(".success").should("be.visible");

      cy.tick(3000)

      cy.get(".success").should("not.be.visible")

    }); 

    it("seleciona um produto (Youtube) por seu texto", () => {
      cy.get("select")
        .select("YouTube")
        .should("have.value", "youtube")

    });

    it("seleciona um produto (Mentoria) por seu valor (value)", () => {
      cy.get("select")
        .select("mentoria")
        .should("have.value", "mentoria")

    });

    it("seleciona um produto (Blog) por seu índice", () => {
      cy.get("select")
        .select(1)
        .should("have.value", "blog")
    });

    it("marca o tipo de atendimento 'Feedback'", () => {
      cy.get("input[type='radio'][value='feedback']")
        .check()
        .should("be.checked")
    });

    
    it("marca cada tipo de atendimento", () => {
      cy.get("input[type='radio']")
        .each(tipoDeAtendimento => { // Utilizando o .each e cy.wrap para agrupar o tipo de atendimento
          cy.wrap(tipoDeAtendimento)
            .check()
            .should("be.checked")
        })

      // ***Forma mais simples de fazer ***
      // cy.get("input[type='radio'][value='ajuda']")
      // .check()
      // .should("be.checked")
      // cy.get("input[type='radio'][value='elogio']")
      // .check()
      // .should("be.checked")
      // cy.get("input[type='radio'][value='feedback']")
      // .check()
      // .should("be.checked")
    });

    it("marca ambos checkboxes, depois desmarca o último", () => {
      cy.get("input[type='checkbox']")
        .check()
        .should("be.checked")
        .last()
        .uncheck()
        .should("not.be.checked")
    });

    it("seleciona um arquivo da pasta fixtures", () => {
      cy.get('#file-upload')
        .selectFile("cypress/fixtures/example.json")
        .should(input => {
          expect(input[0].files[0].name).to.equal("example.json")
      });
    });

    it("seleciona um arquivo simulando um drag-and-drop", () => {
      cy.get('#file-upload')
        .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
        .should(input => {
          expect(input[0].files[0].name).to.equal("example.json")
      });
    });

    it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
      cy.fixture("example.json").as("arquivoExemplo")
      cy.get('#file-upload')
        .selectFile("@arquivoExemplo")
        .should(input => {
          expect(input[0].files[0].name).to.equal("example.json")
      });
    });
    
    it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
      cy.contains("a", "Política de Privacidade")
        .should("have.attr", "href", "privacy.html")
        .and("have.attr", "target", "_blank")
    });

    it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
      cy.contains("a", "Política de Privacidade")
        .invoke("removeAttr", "target")
        .click()

        cy.contains("h1", "CAC TAT - Política de Privacidade").should("be.visible")
    });

    it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})

    it("preenche o campo da área de texto usando o comando invoke", () => {
      cy.get('#open-text-area')
        .invoke("val", "Teste dos testes")
        .should("have.value", "Teste dos testes")
    })

    it("faz uma requisição HTTP", () => {
      cy.request("https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html")
        .as("getRequest")
        .its("status")
        .should("be.equal", 200)
      cy.get("@getRequest")
        .its("statusText")
        .should("be.equal", "OK")
      cy.get("@getRequest")
        .its("body")
        .should("include", "CAC TAT")
    })

});