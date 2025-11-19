import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Footer from './Footer';

function Success() {
    
    const location = useLocation();
   
    const { order, price, adet } = location.state || {};

    if (!location.state) {
        return (
            <div className="container" style={{textAlign: 'center', padding: '50px'}}>
                <h2>Hata: Sipariş verisi bulunamadı.</h2>
                <Link to="/">Anasayfaya Dön</Link>
            </div>
        );
    }

    return (
        <>
            <header className="hero">
                <div className="container">
                    <h1 className="logo">Teknolojik Yemekler</h1>
                    <p className="tagline">TEBRİKLER!</p>
                    <h2 className="main-title">SİPARİŞİNİZ ALINDI!</h2>
                </div>
            </header>

            <section className="success-section" style={{ padding: '40px 0', textAlign: 'center', color: 'white' }}>
                <div className="container">
                    <div style={{ borderBottom: '1px solid white', paddingBottom: '20px', marginBottom: '20px' }}>
                        <h3>{order.pizzaName}</h3>
                    </div>

                    <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
                        <p><strong>Boyut:</strong> {order.size === 'S' ? 'Küçük' : order.size === 'M' ? 'Orta' : 'Büyük'}</p>
                        <p><strong>Hamur:</strong> {order.hamur}</p>
                        <p><strong>Ek Malzemeler:</strong> {order.ekMalzemeler.length > 0 ? order.ekMalzemeler.join(', ') : 'Yok'}</p>
                        {order.ozelNot && <p><strong>Sipariş Notu:</strong> {order.ozelNot}</p>}
                    </div>

                    <div style={{ border: '1px solid white', padding: '20px', marginTop: '30px', borderRadius: '4px', maxWidth: '400px', margin: '30px auto' }}>
                        <h3 style={{ margin: 0 }}>Sipariş Toplamı</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            <span>Tutar:</span>
                   
                            <span>{price}₺</span>
                        </div>
                    </div>
                    
                    <Link to="/" className="cta-btn" style={{display: 'inline-block', marginTop: '20px'}}>YENİ SİPARİŞ</Link>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Success;