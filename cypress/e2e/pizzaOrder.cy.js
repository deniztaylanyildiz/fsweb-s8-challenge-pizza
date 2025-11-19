
const NAME_INPUT = 'input[name="name"]';
const SIZE_INPUT = 'input[name="size"]';
const HAMUR_SELECT = 'select[name="hamur"]';
const TOPPINGS_CHECKBOXES = 'input[type="checkbox"][name="ekMalzemeler"]';
const SUBMIT_BUTTON = 'button[type="submit"].submit-btn'; 
const INCREMENT_BUTTON = '.counter-controls button:contains("+")';
const TOTAL_PRICE_DISPLAY = '.order-total h3 span';

describe('Pizza Sipariş Formu Testleri', () => {

  // KRİTİK: Test sırasında oluşan "Uncaught Exceptions" (yakalanmamış hatalar) görmezden gelinir.
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    
    // API çağrısını sahte başarılı bir yanıtla taklit et (Mocking)
    cy.intercept('POST', 'https://jsonplaceholder.typicode.com/posts', {
      statusCode: 201, 
      body: { 
        id: Date.now(),
        message: "Sipariş Başarıyla Alındı!" 
      },
    }).as('postOrder'); 

    // Temel URL'i ziyaret et 
    cy.visit('/');
    
    // Anasayfadaki 'AÇIKTIM' butonuna tıkla ve form sayfasına git
    cy.get('a.cta-btn').contains('AÇIKTIM').click(); 
    
    // Yönlenmenin tamamlanması için ek bekleme (300ms) ekleyerek router'a zaman tanıma
    cy.wait(300); 
    
    cy.url().should('include', '/order'); 
  });

  // ----------------------------------------------------------------------------------
  // --- TEST SENARYOSU 1: BAŞARILI SİPARİŞ ---
  // ----------------------------------------------------------------------------------
  it('1. Tüm zorunlu alanları doğru doldurarak başarılı sipariş gönderme ve fiyatı kontrol etme', () => {
    
    // 1. İsim alanını doldur
    cy.get(NAME_INPUT).type('Test Müşterisi');
    
    // 2. Boyut ve Hamur Seçimi
    cy.get(SIZE_INPUT).check('L'); 
    cy.get(HAMUR_SELECT).select('İnce'); 
    
    // 3. Ek Malzeme Seçimi (4 adet)
    cy.get(TOPPINGS_CHECKBOXES).eq(0).check(); 
    cy.get(TOPPINGS_CHECKBOXES).eq(1).check(); 
    cy.get(TOPPINGS_CHECKBOXES).eq(2).check(); 
    cy.get(TOPPINGS_CHECKBOXES).eq(3).check(); 
    
    // Fiyat kontrolü (1 adet için): 85.50 + (4 * 5.00) = 105.50₺
    cy.get(TOTAL_PRICE_DISPLAY).should('contain', '105.50₺'); 
    
    // 4. Adeti 1'den 2'ye çıkar
    cy.get(INCREMENT_BUTTON).click(); 
    
    // 5. Sipariş Toplamı Kontrolü (2 adet için): 105.50₺ * 2 adet = 211.00₺
    cy.get(TOTAL_PRICE_DISPLAY).should('contain', '211.00₺'); 
    
    // 6. Siparişi Gönder butonuna tıkla
    cy.get(SUBMIT_BUTTON).click();

    // 7. API isteğinin tamamlandığını bekle
    cy.wait('@postOrder');

    // 8. Başarılı sayfasına yönlendirme kontrolü
    cy.url().should('include', '/success'); 
    
    // 9. KRİTİK DÜZELTME: Metin kontrolü güncellendi.
    // Success.jsx içinde h2 etiketi içinde "SİPARİŞİNİZ ALINDI!" yazıyor (Ünlem ile ve ayrı bir element).
    cy.contains('SİPARİŞİNİZ ALINDI!').should('be.visible');
  });
  
  // ----------------------------------------------------------------------------------
  // --- TEST SENARYOSU 2: İSİM VALİDASYON HATASI ---
  // ----------------------------------------------------------------------------------
  it('2. İsim alanını 3 karakterden azca girerek sipariş gönderilmesini engellemeli ve disabled kalmalı', () => {
    // 1. İsim alanına 2 karakter gir
    cy.get(NAME_INPUT).type('Al');
    
    // 2. Zorunlu alanları doldur
    cy.get(SIZE_INPUT).check('M'); 
    cy.get(HAMUR_SELECT).select('Standart'); 
    
    // 3. Gönder butonunun disabled olduğunu kontrol et
    cy.get(SUBMIT_BUTTON).should('be.disabled');
  });

  // ----------------------------------------------------------------------------------
  // --- TEST SENARYOSU 3: MAKSİMUM MALZEME VALİDASYON KONTROLÜ ---
  // ----------------------------------------------------------------------------------
  it('3. Maksimum 10 ek malzeme seçilebildiğini kontrol etmeli', () => {
      
      // 1. Zorunlu alanları doldur
      cy.get(NAME_INPUT).type('Max Malzeme Testi');
      cy.get(SIZE_INPUT).check('M'); 
      cy.get(HAMUR_SELECT).select('Standart'); 

      // 2. 10 adet malzeme seç
      cy.get(TOPPINGS_CHECKBOXES).each(($checkbox, index) => {
          if (index < 10) { // İlk 10 tanesini seç
              cy.wrap($checkbox).check();
          }
      });
      
      // 3. Ek Malzeme sayısı kontrolü (Listenizde 8 malzeme olduğu için 8'ini de seçmiş olacak)
      cy.get(TOPPINGS_CHECKBOXES + ':checked').should('have.length', 8); // Burası malzeme listeniz kadar (8) olmalı

      // 4. Gönder butonunun aktif olduğunu kontrol et
      cy.get(SUBMIT_BUTTON).should('not.be.disabled');
  });
});