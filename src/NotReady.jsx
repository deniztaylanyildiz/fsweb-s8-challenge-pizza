// src/NotReady.jsx (Düzeltilmiş Hali)

import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer'; // YENİ IMPORT

function NotReady() {
    return (
        <>
            {/* ÜST BAŞLIK */}
            <header className="hero">
                <div className="container">
                    <h1 className="logo">Teknolojik Yemekler</h1>
                    <p className="tagline">Geri Dönüş</p>
                    <h2 className="main-title">BU SAYFA <br/> HENÜZ PİŞMEDİ</h2>
                    <Link to="/" className="cta-btn">ANASAYFAYA DÖN</Link>
                </div>
            </header>

            {/* ORTA KISIM */}
            <section style={{ padding: '100px 20px', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: '#CE2829', fontSize: '36px', marginBottom: '20px' }}>
                        Beklediğiniz İçerik Hazırlanıyor...
                    </h2>
                    <p style={{ fontSize: '18px', color: '#5F5F5F' }}>
                        Bu pizza tarifi henüz kodlanma aşamasında. Lütfen anasayfadan devam edin.
                    </p>
                </div>
            </section>

            {/* ALT BİLGİ */}
            <Footer /> {/* Import edilen bileşen kullanılıyor */}
        </>
    );
}

export default NotReady;