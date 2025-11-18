// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// 1. Componentleri içeri aktar
import Home from './Home';
import OrderForm from './OrderForm';
import Success from './Success';

// Proje İpucu: Sayfalar arası veri taşıma için state burada tanımlanacak (Prop-Lifting)
// IT2'de bu kısım önemli olacak.

function App() {
  return (
    // 2. Uygulamayı Router ile sarmala
    <Router>
      <div className="App">
        {/* Navigasyon çubuğu (Sayfalar arası gezinme linkleri) */}
        <nav>
          <Link to="/">Anasayfa</Link>
          <Link to="/order">Sipariş Ver</Link>
        </nav>

        {/* 3. Switch, tarayıcı URL'sine göre doğru Component'i render eder */}
        <Switch>
          
          {/* Sipariş Onay Sayfası */}
          <Route path="/success">
            <Success />
          </Route>

          {/* Sipariş Formu Sayfası */}
          <Route path="/order">
            <OrderForm />
          </Route>

          {/* Anasayfa (Route path="/" her zaman sona konur) */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;