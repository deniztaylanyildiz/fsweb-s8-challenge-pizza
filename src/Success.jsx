// src/Success.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

function Success() {
  // useLocation ile OrderForm'dan gönderilen state verisini al
  const location = useLocation();
  // state objesinden orderData (Axios yanıtı) ve customerData (formData) çıkar
  const { orderData, customerData } = location.state || {}; 

  // Eğer veri gelmediyse kullanıcıya bir hata mesajı göster
  if (!orderData || !customerData) {
    return (
      <div className="success-container">
        <h1>❌ Hata!</h1>
        <p>Sipariş detaylarına ulaşılamadı. Lütfen anasayfadan yeni bir sipariş oluşturun.</p>
      </div>
    );
  }

  // --- Fiyat Hesaplama (Basit bir yaklaşımla IT1 için) ---
  // IT1'de fiyat hesaplama zorunlu değil ama özet için gereklidir.
  const malzemeBirimFiyati = 5; 
  const pizzaTemelFiyati = 85.50; 
  const malzemeFiyati = customerData.malzemeler.length * malzemeBirimFiyati; 
  const toplamFiyat = pizzaTemelFiyati + malzemeFiyati;
  
  return (
    <div className="success-container">
      <h1>✅ Siparişiniz Alındı!</h1>
      <p className="success-message">Teknolojik Yemekler ailesi olarak siparişiniz için teşekkür ederiz.</p>
      
      <div className="order-summary">
        <h2>Sipariş Özeti</h2>
        
        {/* Kullanıcı Adı ve Sunucu ID'si */}
        <p><strong>Sipariş Veren:</strong> {customerData.isim}</p>
        <p><strong>Sunucu Onay ID:</strong> #{orderData.id || 'N/A'}</p>
        
        {/* Pizza Detayları */}
        <h3>Pizza Detayları:</h3>
        <ul>
          <li><strong>Boyut:</strong> {customerData.boyut.toUpperCase()}</li>
          <li><strong>Adet:</strong> {customerData.adet}</li>
          <li>
            <strong>Ek Malzemeler ({customerData.malzemeler.length} Adet):</strong> 
            {customerData.malzemeler.join(', ')}
          </li>
          {customerData.özelNot && <li><strong>Özel Not:</strong> {customerData.özelNot}</li>}
        </ul>

        {/* Fiyat Özeti */}
        <h3>Fiyat Detayları:</h3>
        <ul>
          <li><strong>Pizza Temel Fiyatı:</strong> {pizzaTemelFiyati.toFixed(2)} TL</li>
          <li><strong>Ek Malzeme Ücreti ({customerData.malzemeler.length} x {malzemeBirimFiyati} TL):</strong> {malzemeFiyati.toFixed(2)} TL</li>
          <li><strong>TOPLAM TUTAR:</strong> <strong style={{color: '#CE2829', fontSize: '1.2em'}}>{toplamFiyat.toFixed(2)} TL</strong></li>
        </ul>
      </div>
      
      {/* Anasayfaya dönmek için link */}
      <a href="/">
        <button className="back-button">Yeni Sipariş Oluştur</button>
      </a>
    </div>
  );
}

export default Success;