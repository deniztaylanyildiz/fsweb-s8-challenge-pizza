

import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-col">
                    <h4>İletişim</h4>
                    {/* Statik yollar */}
                    <p><img src="icons/icon-1.png" alt="Konum"/> 3434 Teknoloji Plaza, Türkiye</p>
                    <p><img src="icons/icon-2.png" alt="Email"/><a href="mailto:aciktim@teknolojikyemekler.com">aciktim@teknolojikyemekler.com</a></p>
                    <p><img src="icons/icon-3.png" alt="Telefon"/><a href="tel:+902181234567">+90 218 123 45 67</a></p>
                </div>

                <div className="footer-col">
                    <h4>Hot Menu</h4>
                    <ul>
                        {/* Tüm navigasyon linkleri Link to="/not-ready" kullanmalı */}
                        <li><Link to="/not-ready">Terminal Pizza</Link></li>
                        <li><Link to="/not-ready">Hackathlon Pizza</Link></li>
                        <li><Link to="/not-ready">useEffect Tavuklu Pizza</Link></li>
                        <li><Link to="/not-ready">Beyaz Console Frosty</Link></li>
                        <li><Link to="/not-ready">Tester Geçti Burger</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Instagram</h4>
                    <div className="insta-grid">
                        {/* Statik yollar */}
                        <img src="images/li-0.png" alt="Instagram Post"/>
                        <img src="images/li-1.png" alt="Instagram Post"/>
                        <img src="images/li-2.png" alt="Instagram Post"/>
                        <img src="images/li-3.png" alt="Instagram Post"/>
                        <img src="images/li-4.png" alt="Instagram Post"/>
                        <img src="images/li-5.png" alt="Instagram Post"/>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;