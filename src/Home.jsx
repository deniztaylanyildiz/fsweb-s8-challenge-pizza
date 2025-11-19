import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Home() {
  return (
    <>
      {/* Header: Hero */}
      <header className="hero">
        <div className="container">
          <h1 className="logo">Teknolojik Yemekler</h1>
          <p className="tagline">Fırsatı kaçırma</p>
          <h2 className="main-title">
            KOD AÇIKTIRIR
            <br /> PIZZA, DOYURUR
          </h2>
          {/* AÇIKTIM butonu*/}
          <Link to="/order" className="cta-btn">
            AÇIKTIM
          </Link>
        </div>
      </header>

      {/* Category Bar*/}
      <section className="category-bar">
        <div className="container">
          <div className="categories">
            <Link to="/not-ready" className="category-item">
              <img src="icons/1.svg" alt="Ragmen" />
              <span>Ragmen</span>
            </Link>
            <Link to="/order" className="category-item active">
              {" "}
              {/* Pizza, Order sayfasına gitsin */}
              <img src="icons/2.svg" alt="Pizza" />
              <span>Pizza</span>
            </Link>
            <Link to="/not-ready" className="category-item">
              <img src="icons/3.svg" alt="Burger" />
              <span>Burger</span>
            </Link>
            <Link to="/not-ready" className="category-item">
              <img src="icons/4.svg" alt="Kızartmalar" />
              <span>Kızartmalar</span>
            </Link>
            <Link to="/not-ready" className="category-item">
              <img src="icons/5.svg" alt="Fast Food" />
              <span>Fast Food</span>
            </Link>
            <Link to="/not-ready" className="category-item">
              <img src="icons/6.svg" alt="Gazlı İçecek" />
              <span>Gazlı İçecek</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Specials */}
      <section className="specials">
        <div className="container specials-grid">
          <div className="special-card red-card">
            <div className="text">
              <h2>Özel Lezzetus</h2>
              <p>Position Absolute Acı Burger</p>

              <Link to="/not-ready" className="btn">
                Sipariş Ver
              </Link>
            </div>
          </div>
          <div className="special-right">
            <div className="special-card dark-card">
              <div className="dark-content">
                <h3>Hackathlon Burger Menü</h3>

                <Link to="/not-ready" className="btn small">
                  Sipariş Ver
                </Link>
              </div>
            </div>
            <div className="special-card light-card">
              <div className="light-content">
                <h3>Cooook hızlı, npm gibi kurye 🚴‍♂️</h3>

                <Link to="/not-ready" className="btn small">
                  Sipariş Ver
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu-section">
        <div className="container">
          <p className="section-subtitle">en çok paketlenen menüler</p>
          <h2 className="section-title">Acıktıran Kodlara Doyuran Lezzetler</h2>
          <div className="menu-categories">
            {/* Butonlar */}
            <button>
              <Link to="/not-ready">
                <img src="icons/1.svg" alt="Ragmen" />
                Ragmen
              </Link>
            </button>
            <button>
              <Link to="/order">
                <img src="icons/2.svg" alt="Pizza" />
                Pizza
              </Link>
            </button>{" "}
            {/* Pizza, Order sayfası*/}
            <button>
              <Link to="/not-ready">
                <img src="icons/3.svg" alt="Burger" />
                Burger
              </Link>
            </button>
            <button>
              <Link to="/not-ready">
                <img src="icons/4.svg" alt="French fries" />
                French fries
              </Link>
            </button>
            <button>
              <Link to="/not-ready">
                <img src="icons/5.svg" alt="Fast food" />
                Fast food
              </Link>
            </button>
            <button>
              <Link to="/not-ready">
                <img src="icons/6.svg" alt="Soft drinks" />
                Soft drinks
              </Link>
            </button>
          </div>
          <div className="menu-grid">
            <div className="menu-item">
              <img src="images/food-1.png" alt="Terminal Pizza" />
              <h3>Terminal Pizza</h3>
              <p className="price">80₺</p>
              <p className="rating">⭐ 4.8 (200)</p>
            </div>
            <div className="menu-item">
              <img src="images/food-2.png" alt="Position Absolute Acı Pizza" />
              <h3>Position Absolute Acı Pizza</h3>
              <p className="price">85.50₺</p>
              <p className="rating">⭐ 4.9 (200)</p>
            </div>
            <div className="menu-item">
              <img src="images/food-3.png" alt="useEffect Tavuklu Burger" />
              <h3>useEffect Tavuklu Burger</h3>
              <p className="price">80₺</p>
              <p className="rating">⭐ 4.9 (200)</p>
            </div>
          </div>
        </div>
      </section>

    
      <Footer />
    </>
  );
}

export default Home;
