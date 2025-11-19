import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

// Sabitler
const BASLANGIC_FIYATI = 85.5;

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const EK_MALZEMELER = [
  { name: "pepperoni", label: "Pepperoni" },
  { name: "sosis", label: "Sosis" },
  { name: "sucuk", label: "Sucuk" },
  { name: "salam", label: "Salam" },
  { name: "biber", label: "Biber" },
  { name: "mantar", label: "Mantar" },
  { name: "soğan", label: "Soğan" },
  { name: "domates", label: "Domates" },
];
const EK_MALZEME_UCRETİ = 5;

function OrderForm() {
  const history = useHistory();

  const [form, setForm] = useState({
    name: "",
    pizzaName: "Position Absolute Acı Pizza",
    size: "M",
    hamur: "Standart",
    ekMalzemeler: [],
    adet: 1,
    ozelNot: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fiyat Hesaplamaları
  const ekMalzemeUcreti = form.ekMalzemeler.length * EK_MALZEME_UCRETİ;
  const toplamFiyat = (
    (BASLANGIC_FIYATI + ekMalzemeUcreti) *
    form.adet
  ).toFixed(2);

  const handleChanges = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // Checkbox için maksimum 10 malzeme kontrolü
      if (form.ekMalzemeler.length >= 10 && checked) {
        // 10'dan fazla malzeme seçilmeye çalışılırsa bir şey yapma
        return;
      }
      setForm({
        ...form,
        ekMalzemeler: checked
          ? [...form.ekMalzemeler, value]
          : form.ekMalzemeler.filter((malzeme) => malzeme !== value),
      });
    } else if (name === "adet") {
      // Adet alanını kullanmıyoruz, bunu handleArtir/Azalt yapıyor
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleArtir = () => {
    if (form.adet < 10) {
      setForm({ ...form, adet: form.adet + 1 });
    }
  };
  const handleAzalt = () => {
    if (form.adet > 1) {
      setForm({ ...form, adet: form.adet - 1 });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Zorunlu Alan Kontrolleri
    if (form.name.length < 3) {
      alert("Kullanıcı adı en az 3 karakter olmalıdır.");
      return;
    }
    if (!form.size || !form.hamur) {
      alert("Lütfen Boyut ve Hamur Seçimini yapın.");
      return;
    }

    setIsLoading(true);

    const dataToSend = {
      customerName: form.name,
      ...form,
      toplamFiyat: toplamFiyat,
      timestamp: new Date().toISOString(), // API için ek veri
    };

    axios
      .post(API_URL, dataToSend)
      .then((res) => {
        console.log("Sipariş başarıyla gönderildi:", res.data);

        history.push({
          pathname: "/success",
          state: {
            order: form,
            price: toplamFiyat,
            adet: form.adet,
          },
        });
      })
      .catch((err) => {
        console.error("Sipariş gönderme hatası:", err);

        alert("Sipariş gönderilirken bir sorun oluştu.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <header className="header-order">
        <img
          src="/images/food-1.png"
          alt="Sol Dekoratif Pizza"
          className="pizza-dekor sol"
        />

        <div className="container">
          <p className="breadcrumb">
            <Link to="/">Anasayfa</Link> - Sipariş Oluştur
          </p>
          <h1 className="page-title">{form.pizzaName}</h1>

          <div className="pizza-info">
            <p className="price">{toplamFiyat}₺</p>
            <p className="rating">⭐ 4.9</p>
            <p className="comment-count">(200)</p>
          </div>

          <p className="description">
            Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı
            pizza tam sana göre. Pizza, domates, peynir ve geniş bir yelpazede
            taze malzemelerle hazırlanmıştır.
          </p>
        </div>

        <img
          src="/images/food-2.png"
          alt="Sağ Dekoratif Pizza"
          className="pizza-dekor sag"
        />
      </header>

      <section className="form-section">
        <form onSubmit={handleSubmit}>
          <div className="container form-grid">
            <div className="form-group user-name-group">
              <h3>
                Kullanıcı Adı <span className="required">*</span>
              </h3>
              <input
                type="text"
                name="name"
                placeholder="Adınızı girin"
                value={form.name}
                onChange={handleChanges}
                required
                minLength="3"
                autoComplete="name"
              />
            </div>

            <div className="form-group size-crust-group">
              <div className="input-group">
                <h3>
                  Boyut Seç <span className="required">*</span>
                </h3>
                <div className="radio-options">
                  <label>
                    <input
                      type="radio"
                      name="size"
                      value="S"
                      checked={form.size === "S"}
                      onChange={handleChanges}
                    />
                    Küçük
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="size"
                      value="M"
                      checked={form.size === "M"}
                      onChange={handleChanges}
                    />
                    Orta
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="size"
                      value="L"
                      checked={form.size === "L"}
                      onChange={handleChanges}
                    />
                    Büyük
                  </label>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="hamur-select">
                  <h3>
                    Hamur Seç <span className="required">*</span>
                  </h3>
                </label>
                <select
                  name="hamur"
                  id="hamur-select"
                  value={form.hamur}
                  onChange={handleChanges}
                  required
                >
                  <option value="">-- Hamur Seçiniz --</option>
                  <option value="Standart">Standart</option>
                  <option value="İnce">İnce</option>
                  <option value="Kalın">Kalın</option>
                </select>
              </div>
            </div>

            <div className="form-group toppings-group">
              <h3>
                Ek Malzemeler{" "}
                <span className="optional">
                  (Max 10, her biri +{EK_MALZEME_UCRETİ}₺)
                </span>
              </h3>
              <div className="checkbox-options">
                {EK_MALZEMELER.map((malzeme) => (
                  <label key={malzeme.name}>
                    <input
                      type="checkbox"
                      name="ekMalzemeler"
                      value={malzeme.name}
                      onChange={handleChanges}
                      disabled={
                        !form.ekMalzemeler.includes(malzeme.name) &&
                        form.ekMalzemeler.length >= 10
                      }
                    />
                    {malzeme.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group notes-summary-group">
              <div className="input-group">
                <h3>Sipariş Notu</h3>
                <textarea
                  name="ozelNot"
                  rows="4"
                  placeholder="Siparişine eklemek istediğin bir not var mı?"
                  value={form.ozelNot}
                  onChange={handleChanges}
                  autoComplete="off"
                ></textarea>
              </div>

              <div className="summary-section">
                <div className="counter-controls">
                  <button
                    className="counter-btn"
                    type="button"
                    onClick={handleAzalt}
                    disabled={form.adet <= 1}
                  >
                    -
                  </button>
                  <span className="count">{form.adet}</span>
                  <button
                    className="counter-btn"
                    type="button"
                    onClick={handleArtir}
                    disabled={form.adet >= 10}
                  >
                    +
                  </button>
                </div>

                <div className="order-total">
                  <h4>Sipariş Toplamı</h4>
                  <div className="total-lines">
                    <p>
                      Seçim Ücreti: <span>{ekMalzemeUcreti.toFixed(2)}₺</span>
                    </p>
                    <h3>
                      Toplam: <span>{toplamFiyat}₺</span>
                    </h3>
                  </div>

                  <button
                    type="submit"
                    className="cta-btn submit-btn"
                   
                    disabled={
                      form.name.length < 3 ||
                      !form.size ||
                      !form.hamur ||
                      isLoading
                    }
                  >
                    {isLoading ? "Sipariş İletiliyor..." : "Siparişi Tamamla"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default OrderForm;
