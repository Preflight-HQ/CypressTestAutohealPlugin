export default class checkoutExampleBootstrap {
  /**
   "Your cart 3" Box  > Form > "Promo code" Input
   placeholder: Promo code | inputType: text | tag: input | class: form-control
   */
  enterPromoCode(promoCode) {
    cy.get('.card>div>[type="text"]', 'pomAE6JDWkuj1dO')
      .clear()
      .type(promoCode)
    return this
  }

  /**
   "Your cart 3" Box  > Form > "Redeem" Button
   purpose: submit | tag: button | class: btn-secondary, btn
   */
  clickRedeem() {
    cy.get('//form/div/div/*[normalize-space(.)="Redeem"]', 'pomPHuwAqgeg3xb')
      .click()
    return this
  }

  /**
   "Billing address" Box  > Form > "First name" Input
   purpose: firstName | id: firstName | inputType: text | tag: input | class: form-control
   */
  enterFirstName(firstName) {
    cy.get('#firstName', 'pomoMLGQj7jwTA7')
      .clear()
      .type(firstName)
    return this
  }

  /**
   "Billing address" Box  > Form > "Last name" Input
   purpose: lastName | id: lastName | inputType: text | tag: input | class: form-control
   */
  enterLastName(lastName) {
    cy.get('#lastName', 'pomNgYlrHQIhdlM')
      .clear()
      .type(lastName)
    return this
  }

  /**
   "Billing address" Box  > Form > "Username" Input
   placeholder: Username | id: username | inputType: text | tag: input | class: form-control
   */
  enterUsername(username) {
    cy.get('#username', 'pomBXyyIIrzLns4')
      .clear()
      .type(username)
    return this
  }

  /**
   "Billing address" Box  > Form > "Email (Optional)" Input
   purpose: email | placeholder: you@example.com | id: email | inputType: email | tag: input | class: form-control
   */
  enterEmailOptional(emailOptional) {
    cy.get('#email', 'pomz4VqEQk3P1Np')
      .clear()
      .type(emailOptional)
    return this
  }

  /**
   "Billing address" Box  > Form > "Address" Input
   purpose: address | placeholder: 1234 Main St | id: address | inputType: text | tag: input | class: form-control
   */
  enterAddress(address) {
    cy.get('#dd', 'pomfdYNSvoo2vnp')
      .clear()
      .type(address)
    return this
  }

  /**
   "Billing address" Box  > Form > "Address 2 (Optional)" Input
   purpose: address | placeholder: Apartment or suite | id: address2 | inputType: text | tag: input | class: form-control
   */
  enterAddress2Optional(address2Optional) {
    cy.get('#address2', 'pomM8PnQLtgvtxi')
      .clear()
      .type(address2Optional)
    return this
  }

  /**
   "Billing address" Box  > Form > "Zip" Input
   purpose: zip | id: zip | inputType: text | tag: input | class: form-control
   */
  enterZip(zip) {
    cy.get('#zip', 'pommYvHp3axZmGT')
      .clear()
      .type(zip)
    return this
  }

  /**
   "Billing address" Box  > Form > Checkbox
   id: same-address | tag: input
   */
  clickCheckboxOption() {
    cy.get('#same-address', 'pomYDKcW7nhQGOR')
      .click()
    return this
  }

  /**
   "Billing address" Box  > Form > "Shipping address is the same as my billi..." Checkbox
   id: save-info | tag: input
   */
  clickShippingAddressIsTheSameAsMyBillingAddressOption() {
    cy.get('#save-info', 'pomjIhCZeNmJ7An')
      .click()
    return this
  }

  /**
   "Billing address" Box  > Form > RadioButton
   id: credit | tag: input
   */
  clickRadiobuttonOption() {
    cy.get('//*[normalize-space(.)="Credit card"]/ancestor-or-self::div/input', 'pomWDTX9ULxhcXp')
      .click()
    return this
  }

  /**
   "Billing address" Box  > Form > "Credit card" RadioButton
   id: debit | tag: input
   */
  clickCreditCardOption() {
    cy.get('//*[normalize-space(.)="Debit card"]/ancestor-or-self::div/input', 'pom2fCf1GeFiZ3M')
      .click()
    return this
  }

  /**
   "Billing address" Box  > Form > "Debit card" RadioButton
   id: paypal | tag: input
   */
  clickDebitCardOption() {
    cy.get('//*[normalize-space(.)="PayPal"]/ancestor-or-self::div/input', 'pomdbYDbztshnN6')
      .click()
    return this
  }

  /**
   "Billing address" Box  > Form > "Name on card" Input
   id: cc-name | inputType: text | tag: input | class: form-control
   */
  enterNameOnCard(nameOnCard) {
    cy.get('#cc-name', 'pom7NaZrttwoJ61')
      .clear()
      .type(nameOnCard)
    return this
  }

  /**
   "Billing address" Box  > Form > "Credit card number" Input
   id: cc-number | inputType: text | tag: input | class: form-control
   */
  enterCreditCardNumber(creditCardNumber) {
    cy.get('#cc-number', 'pomtx7GLhGWnkAX')
      .clear()
      .type(creditCardNumber)
    return this
  }

  /**
   "Billing address" Box  > Form > "Expiration" Input
   id: cc-expiration | inputType: text | tag: input | class: form-control
   */
  enterExpiration(expiration) {
    cy.get('#cc-expiration', 'pomyPJptUUwz8qq')
      .clear()
      .type(expiration)
    return this
  }

  /**
   "Billing address" Box  > Form > "CVV" Input
   id: cc-cvv | inputType: text | tag: input | class: form-control
   */
  enterCvv(cvv) {
    cy.get('#cc-cvv', 'pomjTrY9btzT5Su')
      .clear()
      .type(cvv)
    return this
  }

  /**
   "Billing address" Box  > Form > "Continue to checkout" Button
   purpose: submit | tag: button | class: btn-block, btn, btn-primary, btn-lg
   */
  clickContinueToCheckout() {
    cy.get('//*[normalize-space(.)="Continue to checkout"]', 'pomYGSf9Ii3Yv2U')
      .click()
    return this
  }

}
