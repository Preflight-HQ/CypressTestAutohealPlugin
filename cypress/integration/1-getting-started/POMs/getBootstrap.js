export default class CheckoutExampleBootstrapPOM {

  visit() {
    cy.visit('https://getbootstrap.com/docs/4.5/examples/checkout/')
  }

  /**
   "Your cart 3" Box  > Form > "Promo code" Input
   placeholder: Promo code | inputType: text | tag: input | class: form-control
   */
  typePromoCode(PromoCode) {
    return cy.get('//*[@placeholder="Promo code"]', 'pom5674cf52-5b98-45b1-9883-c6945e9cdb80')
      .clear()
      .type(PromoCode);
  }

  /**
   "Your cart 3" Box  > Form > "Redeem" Button
   purpose: submit | tag: button | class: btn-secondary, btn
   */
  clickRedeem() {
    return cy.get('div>.btn', 'poma4d6f3c0-67b4-4d4e-b523-c858b407e6aa')
      .click();
  }

  /**
   "Billing address" Box  > Form > "First name" Input
   purpose: firstName | id: firstName | inputType: text | tag: input | class: form-control
   */
  typeFirstName(FirstName) {
    return cy.get('#firstName', 'pom26039e58-88f6-4f3f-819f-73f904d8abd0')
      .clear()
      .type(FirstName);
  }

  /**
   "Billing address" Box  > Form > "Last name" Input
   purpose: lastName | id: lastName | inputType: text | tag: input | class: form-control
   */
  typeLastName(LastName) {
    return cy.get('#lastName', 'pomde40ac11-0197-4e1c-8bc2-621a7693267d')
      .clear()
      .type(LastName);
  }

  /**
   "Billing address" Box  > Form > "Username" Input
   placeholder: Username | id: username | inputType: text | tag: input | class: form-control
   */
  typeUsername(Username) {
    return cy.get('#username', 'pomaa43cf99-39e8-4a7d-b550-71f6a70d143c')
      .clear()
      .type(Username);
  }

  /**
   "Billing address" Box  > Form > "Email (Optional)" Input
   purpose: email | placeholder: you@example.com | id: email | inputType: email | tag: input | class: form-control
   */
  typeEmailOptional(EmailOptional) {
    return cy.get('#email', 'pom82ae16cd-1f5a-4588-9fe7-73ffb8e4442c')
      .clear()
      .type(EmailOptional);
  }

  /**
   "Billing address" Box  > Form > "Address" Input
   purpose: address | placeholder: 1234 Main St | id: address | inputType: text | tag: input | class: form-control
   */
  typeAddress(Address) {
    return cy.get('#address', 'pom4f8e2a30-a2ac-47ab-8f06-5cf426ed1062')
      .clear()
      .type(Address);
  }

  /**
   "Billing address" Box  > Form > "Address 2 (Optional)" Input
   purpose: address | placeholder: Apartment or suite | id: address2 | inputType: text | tag: input | class: form-control
   */
  typeAddress2Optional(Address2Optional) {
    return cy.get('#address2', 'pom25fad0f8-fdd7-4c86-86da-a588841bd8a7')
      .clear()
      .type(Address2Optional);
  }

  /**
   "Billing address" Box  > Form > "Zip" Input
   purpose: zip | id: zip | inputType: text | tag: input | class: form-control
   */
  typeZip(Zip) {
    return cy.get('#zip', 'pom18b7c2c1-0ca3-4cc1-a3ef-d3595ccfdd26')
      .clear()
      .type(Zip);
  }

  /**
   "Billing address" Box  > Form > Checkbox
   id: same-address | tag: input
   */
  clickCheckboxOption() {
    return cy.get('#same-address', 'pom9b308946-403f-4d03-85fc-d1c5420d88ef')
      .click();
  }

  /**
   "Billing address" Box  > Form > "Shipping address is the same as my billi..." Checkbox
   id: save-info | tag: input
   */
  clickShippingAddressIsTheSameAsMyBillingAddressOption() {
    return cy.get('#save-info', 'pom2ceeb2a0-2dd7-49d5-acc8-96ee9cfbd10b')
      .click();
  }

  /**
   "Billing address" Box  > Form > RadioButton
   id: credit | tag: input
   */
  clickRadioButtonOption() {
    return cy.get('#credit', 'pomdc68091a-cdef-4861-894f-ba71ffb15f8a')
      .click();
  }

  /**
   "Billing address" Box  > Form > "Credit card" RadioButton
   id: debit | tag: input
   */
  clickCreditCardOption() {
    return cy.get('#debit', 'pom48cd87b9-2cf0-49ae-a196-907320f46388')
      .click();
  }

  /**
   "Billing address" Box  > Form > "Debit card" RadioButton
   id: paypal | tag: input
   */
  clickDebitCardOption() {
    return cy.get('#paypal', 'pom91cfd8e3-8290-4af2-b073-5ace63801ec3')
      .click();
  }

  /**
   "Billing address" Box  > Form > "Name on card" Input
   id: cc-name | inputType: text | tag: input | class: form-control
   */
  typeNameOnCard(NameOnCard) {
    return cy.get('#cc-name', 'pombf68534b-6993-446c-b906-4bd911681db8')
      .clear()
      .type(NameOnCard);
  }

  /**
   "Billing address" Box  > Form > "Credit card number" Input
   id: cc-number | inputType: text | tag: input | class: form-control
   */
  typeCreditCardNumber(CreditCardNumber) {
    return cy.get('#cc-number', 'pombe70f266-6640-4dc4-9f52-bddd6d676018')
      .clear()
      .type(CreditCardNumber);
  }

  /**
   "Billing address" Box  > Form > "Expiration" Input
   id: cc-expiration | inputType: text | tag: input | class: form-control
   */
  typeExpiration(Expiration) {
    return cy.get('#cc-expiration', 'pom6d3eb5ac-9287-4872-b876-e8a37c492782')
      .clear()
      .type(Expiration);
  }

  /**
   "Billing address" Box  > Form > "CVV" Input
   id: cc-cvv | inputType: text | tag: input | class: form-control
   */
  typeCVV(CVV) {
    return cy.get('#cc-cvv', 'pomed1062ef-245b-4b72-9b85-95a9a07adab8')
      .clear()
      .type(CVV);
  }

  /**
   "Billing address" Box  > Form > "Continue to checkout" Button
   purpose: submit | tag: button | class: btn-block, btn, btn-primary, btn-lg
   */
  clickContinueToCheckout() {
    return cy.get('.btn-lg', 'pom5c49a624-7d85-4b3b-9891-3a3049dd07bf')
      .click();
  }


  getLabel() {
    return cy.get('[for="lastName"]', 'pom65c85b8c-7d70-4f7a-8f0e-90be27a990b5')
  }

}
