export default class LoginYourwebappPOM {

  visit() {
    cy.visit('https://yourweb.app/#/login')
  }

  /**
   "Sign in to your account" Box  > "Signup" Button
   href: ? | tag: a | purpose: navigation | class: font-medium
   */
  clickSignup() {
    cy.get('.text-center>a', 'pomQQ2as8b77Cke')
      .click()
    return this
  }

  /**
   "Sign in to your account" Form  > "Email address" Input
   purpose: email | id: pf-lesson-login-0 | inputType: email | tag: input | class: shadow-sm, appearance-none, block, w-full, border, rounded-md
   */
  typeEmailAddress(emailAddress) {
    cy.get('t', 'pom7BRjleADI46y')
      .clear()
      .type(emailAddress)
    return this
  }

  /**
   "Sign in to your account" Form  > "Password" Input
   purpose: password | id: pf-lesson-login-1 | inputType: password | tag: input | class: shadow-sm, appearance-none, block, w-full, border, rounded-md
   */
  typePassword(password) {
    cy.get('//*[normalize-space(.)="Password"]/ancestor-or-self::div/*[contains(@class,"relative")]/input', 'pomtdNRStY7fHQr')
      .clear()
      .type(password)
    return this
  }

  /**
   "Sign in to your account" Form  > Checkbox
   id: remember_me | tag: input | class: rounded
   */
  clickCheckboxOption() {
    cy.get('.rounded', 'pomcKBNuviUwuA9')
      .click()
    return this
  }

  /**
   "Sign in to your account" Form  > "Forgot your password?" Button
   href: ? | tag: a | purpose: navigation | class: font-medium
   */
  clickForgotYourPassword() {
    cy.get('//*[contains(@class,"text-sm")]/*[normalize-space(.)="Forgot your password?"]', 'pom5Ejwjcb8MUdH')
      .click()
    return this
  }

  /**
   "Sign in to your account" Form  > "Sign in" Button
   purpose: submit | id: pf-lesson-login-2 | tag: button | class: text-white, flex, justify-center, border, border-transparent, rounded-md, shadow-sm, text-sm, font-medium
   */
  clickSignIn() {
    cy.get('.text-white', 'pomV69BI6qhfOgA')
      .click()
    return this
  }

}
