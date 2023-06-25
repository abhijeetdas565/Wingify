const loginURL = 'https://sakshingp.github.io/assignment/login.html';
const homeURL = 'https://sakshingp.github.io/assignment/home.html';
const indexURL = 'https://sakshingp.github.io/assignment/index.html';
describe('Login Page', () => {
  beforeEach(() => {
    cy.visit(loginURL);
  });

  it('Should be able to login into with any provided login id and password', () => {
    cy.get('input#username.form-control').type('validuser');
    cy.get('input#password.form-control').type('validpassword');
    cy.get('button#log-in.btn.btn-primary').click();
    cy.url().should('include', homeURL);
  });
  it('Should not be able to login if Username and password is not provided', () => {
    cy.get('button#log-in.btn.btn-primary').click();
    cy.url().should('include', loginURL);
    cy.get('[id^="random_id_"]').should('contain', 'Both Username and Password must be present');
  });
  it('Should not be able to login if Username is not provided', () => {
    cy.get('input#password.form-control').type('validpassword');
    cy.get('button#log-in.btn.btn-primary').click();
    cy.url().should('include', loginURL);
    cy.get('[id^="random_id_"]').should('contain', 'Username must be present');
  });
  it('Should not be able to login if password is not provided', () => {
    cy.get('input#username.form-control').type('validuser');
    cy.get('button#log-in.btn.btn-primary').click();
    cy.url().should('include', loginURL);
    cy.get('[id^="random_id_"]').should('contain', 'Password must be present');
  });
  it('Should be able to move to index page if user clicks on logo', () => {
    cy.get('img[src="img/logo-big.png"]').click().then(() => {
      cy.url().should('include', indexURL);
    });
  });
  it('Should be able to remember the username if Remember me is selected', () => {
    cy.get('input#username.form-control').type('validusername');
    cy.get('input#password.form-control').type('validpassword');
    cy.get('input.form-check-input').click();
    cy.get('button#log-in.btn.btn-primary').click();
    cy.url().should('include', homeURL);
    cy.go('back');
    cy.get('input#username.form-control').should('have.value','validusername');
  });
});

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit(loginURL);
  });

  it('Should be able to sort all the table rows in decreasing order of amount on clicking Amount thread', () => {
    const mockData = ['- 320.00 USD', '- 244.00 USD', '+ 17.99 USD', '+ 340.00 USD', '+ 952.23 USD', '+ 1,250.00 USD'];
    var i = 0;
    cy.get('input#username.form-control').type('validusername');
    cy.get('input#password.form-control').type('validpassword');
    cy.get('button#log-in.btn.btn-primary').click();
    cy.url().should('include', homeURL);
    cy.get('th#amount.text-right').click();
    cy.get('tbody')
    .find('tr')
    .each((row) => {
      cy.wrap(row).get('span[class^="text-"]').should('contain', mockData[i++]);
  });
});
});
