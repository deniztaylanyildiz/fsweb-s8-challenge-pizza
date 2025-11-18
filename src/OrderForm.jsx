// src/OrderForm.jsx
import React, { useState, useEffect } from 'react'; // useEffect'i import ettik
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Formun başlangıç değerlerini tanımlayalım.
const initialForm = {
  isim: '', 
  boyut: '', 
  malzemeler: [], 
  özelNot: '', 
  adet: 1, 
};

// Malzeme seçeneklerini ayrı bir dizi olarak tanımlayalım
const malzemeSecenekleri = [
  "Pepperoni",
  "Sosis",
  "Tavuk Izgara",
  "Mantar",
  "Soğan",
  "Biber",
  "Zeytin",
  "Ananas", 
  "Mısır",
];

function OrderForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false); 
  
  const history = useHistory(); 

  // --- VALIDASYON FONKSİYONU ---
  const validateForm = (data) => {
    const newErrors = {};
    let isValid = true;

    // Kural 1: İsim Alanı Kontrolü (En az 3 karakter)
    if (data.isim.length < 3) {
      newErrors.isim = "Adınız en az 3 karakter olmalıdır.";
      isValid = false;
    }

    // Kural 2: Boyut Seçimi Kontrolü
    if (!data.boyut) {
      newErrors.boyut = "Lütfen pizza boyutunu seçiniz.";
      isValid = false;
    }

    // Kural 3: Malzemeler Kontrolü (En az 4, En fazla 10)
    if (data.malzemeler.length < 4 || data.malzemeler.length > 10) {
      newErrors.malzemeler = "En az 4, en fazla 10 adet ek malzeme seçebilirsiniz. (Seçiminiz: " + data.malzemeler.length + ")";
      isValid = false;
    }

    // Hata state'ini güncelle
    setErrors(newErrors);
    
    // Form geçerlilik state'ini güncelle
    setIsFormValid(isValid); 
    
    return isValid;
  };

  // --- COMPONENT YÜKLENDİĞİNDE VALIDASYONU ÇALIŞTIR ---
  useEffect(() => {
    // İlk yüklemede butonu disabled yapmak için çalışır
    validateForm(formData); 
  }, []); 
  
  // --- CHANGE HANDLER (DEĞİŞİKLİK YÖNETİCİSİ) ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let newFormData = { ...formData };

    if (type === 'checkbox') {
        if (checked) {
            newFormData = {
                ...newFormData,
                malzemeler: [...newFormData.malzemeler, value],
            };
        } else {
            newFormData = {
                ...newFormData,
                malzemeler: newFormData.malzemeler.filter((m) => m !== value),
            };
        }
    } else {
        newFormData = {
            ...newFormData,
            [name]: value,
        };
    }

    setFormData(newFormData);
    validateForm(newFormData); // Her değişiklikte validasyonu kontrol et
  };

  // --- SUBMIT HANDLER (GÖNDERİM YÖNETİCİSİ) ---
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Formun gerçekten geçerli olup olmadığını son kez kontrol et
    if (validateForm(formData)) {
        console.log("Form verisi sunucuya gönderiliyor:", formData); 
        
        // --- BURAYA AXIOS POST İŞLEMİ GELECEK ---
        // IT1 Gerekliliği: Axios ile POST isteği atılmalı
        axios.post('https://reqres.in/api/pizza', formData)
            .then(response => {
                // IT1 Gerekliliği: Sunucudan gelen yanıtı console'a yazdır
                console.log("Sunucudan Gelen Yanıt (Sipariş Özeti):", response.data); 
                
                // Sipariş başarılı ise Success sayfasına yönlendir (response.data'yı taşıyarak)
                history.push('/success', { orderData: response.data, customerData: formData });
            })
            .catch(error => { 
                // IT2 Gerekliliği: Hata Yönetimi
                console.error("Sipariş gönderme hatası:", error); 
                alert("Siparişinizi gönderirken bir hata oluştu! Lütfen tekrar deneyin.");
            });
    } else {
        alert("Lütfen formdaki tüm zorunlu alanları doğru şekilde doldurunuz.");
    }
  };

  return (
    <div className="order-form-container">
      <h2>Sipariş Oluştur</h2>
      
      <form onSubmit={handleSubmit}>
        
        {/* 1. İsim Input'u (Text Input) */}
        <div className="form-group">
            <label htmlFor="isim">Adınız:</label>
            <input
                type="text"
                id="isim"
                name="isim"
                value={formData.isim}
                onChange={handleChange}
                data-cy="input-isim"
            />
            {errors.isim && <p className="error">{errors.isim}</p>} {/* Hata Mesajı */}
        </div>
        
        <hr/>

        {/* 2. Pizza Boyutu (Radio Button) */}
        <div className="form-group">
            <label>Boyut Seçin:</label>
            <div className="radio-group">
                {['Küçük', 'Orta', 'Büyük'].map((boyut) => (
                    <label key={boyut}>
                        <input
                            type="radio"
                            name="boyut"
                            value={boyut.toLowerCase()}
                            checked={formData.boyut === boyut.toLowerCase()}
                            onChange={handleChange}
                        />
                        {boyut}
                    </label>
                ))}
            </div>
            {errors.boyut && <p className="error">{errors.boyut}</p>} {/* Hata Mesajı */}
        </div>

        <hr/>

        {/* 3. Malzemeler (Checkbox Grubu) */}
        <div className="form-group">
            <label>Ek Malzemeler (En Az 4, En Fazla 10):</label>
            <div className="checkbox-group">
                {malzemeSecenekleri.map((malzeme) => (
                    <label key={malzeme}>
                        <input
                            type="checkbox"
                            name="malzemeler"
                            value={malzeme}
                            checked={formData.malzemeler.includes(malzeme)}
                            onChange={handleChange}
                            data-cy={`checkbox-${malzeme.toLowerCase().replace(/\s/g, '')}`} 
                        />
                        {malzeme}
                    </label>
                ))}
            </div>
            {errors.malzemeler && <p className="error">{errors.malzemeler}</p>} {/* Hata Mesajı */}
        </div>

        <hr/>

        {/* 4. Notlar (Text Area) */}
        <div className="form-group">
            <label htmlFor="özelNot">Sipariş Notu:</label>
            <textarea
                id="özelNot"
                name="özelNot"
                value={formData.özelNot}
                onChange={handleChange}
            />
        </div>

        {/* Submit Butonu */}
        <button type="submit" disabled={!isFormValid} data-cy="submit-button">
            Sipariş Ver
        </button>
      </form>
    </div>
  );
}

export default OrderForm;