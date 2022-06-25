export default class LoginYourwebappPOM {

  visit() {
    cy.visit('https://yourweb.app/#/login')
  }

  /**
   "Sign in to your account" Box  > "Signup" Button
   href: ? | tag: a | purpose: navigation | class: font-medium
   */
  clickSignup() {
    return cy.get('.max-w>a', 'pomMP9DSKcon5EZ')
      .click();
  }

  /**
   "Sign in to your account" Form  > "Email address" Input
   purpose: email | id: pf-lesson-login-0 | inputType: email | tag: input | class: shadow-sm, appearance-none, block, w-full, border, rounded-md
   */
  typeEmailAddress(emailAddress) {
    return cy.get('[type="eml"]', 'pomruUbfBySJagN')
      .clear()
      .type(emailAddress);
  }

  /**
   "Sign in to your account" Form  > "Password" Input
   purpose: password | id: pf-lesson-login-1 | inputType: password | tag: input | class: shadow-sm, appearance-none, block, w-full, border, rounded-md
   */
  typePassword(password) {
    return cy.get('[type="password"]', 'pomEkEgjPifxuPZ')
      .clear()
      .type(password);
  }

  /**
   "Sign in to your account" Form  > Checkbox
   id: remember_me | tag: input | class: rounded
   */
  clickCheckboxOption() {
    return cy.get('.rounded', 'pomQ99kh5y7ve8l')
      .click();
  }

  /**
   "Sign in to your account" Form  > "Forgot your password?" Button
   href: ? | tag: a | purpose: navigation | class: font-medium
   */
  clickForgotYourPassword() {
    return cy.get('//*[contains(text(),"Forgot your password?")]', 'pom9IorOJeKbOW1')
      .click();
  }

  /**
   "Sign in to your account" Form  > "Sign in" Button
   purpose: submit | id: pf-lesson-login-2 | tag: button | class: text-white, flex, justify-center, border, border-transparent, rounded-md, shadow-sm, text-sm, font-medium
   */
  clickSignIn() {
    return cy.get('.text-white', 'pomBSMom1fBxf3O')
      .click();
  }

}
