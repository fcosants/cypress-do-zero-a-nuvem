describe('Central de atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
  });
    it("verifica o título da aplicação", () => {
      cy.title().should("be.equal","Central de Atendimento ao Cliente TAT");
    });

    it("preenche os campos obrigatórios e envia o formulário", () => {
      cy.get("#firstName").type("Francisco", { delay: 0 })
      cy.get("#lastName").type("Santos", { delay: 0 })
      cy.get("#email").type("francisco@example.com", { delay: 0 })
      cy.get("#open-text-area").type("O Samuel e o Vitor, são ótimos amigos para se contar!!", { delay: 0 })
      cy.contains("button", "Enviar").click()
      // cy.get("button").click()

      cy.get(".success").should("be.visible",);
    });

    it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
      cy.get("#firstName").type("Francisco",)
      cy.get("#lastName").type("Santos",)
      cy.get("#email").type("franciscoexample.com")
      cy.get("#open-text-area").type("O Samuel e o Vitor, são ótimos amigos para se contar!!")
      cy.contains("button", "Enviar").click()
      
      cy.get(".error").should("be.visible")
    });

    it("campo telefone continua vazio quando preenchido com um valor não numérico", () => {
      cy.get("#phone")
      .type("aabbcc")
      .should("have.value", "")
    })

    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
      cy.get("#firstName").type("Francisco")
      cy.get("#lastName").type("Santos")
      cy.get("#email").type("francisco@example.com")
      cy.get("#phone-checkbox").click()
      cy.get("#open-text-area").type("O Samuel e o Vitor, são ótimos amigos para se contar!!", { delay: 0 })
      cy.contains("button", "Enviar").click()
      
      cy.get(".error").should("be.visible")
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
      cy.get("button").click()
      
      cy.get(".error").should("be.visible")
    });

    it("envia o formulário com sucesso usando um comando customizado", () => {
      const data = {
        firstName: "Francisco",
        lastName: "Santos",
        email: "francisco@example.com",
        text: "O Samuel e o Vitor, são ótimos amigos para se contar!!"
      }

      cy.fillMandatoryFieldsAndSubmit(data)

      cy.get(".success").should("be.visible");
    }); 
});