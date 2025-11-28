import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Smartphone, CreditCard } from "lucide-react";

export default function ProductDetails({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <h2 style={{ textAlign:"center", marginTop:100 }}>Produit introuvable ❌</h2>;

  return (
    <div className="product-page container">
      
      {/* Retour */}
      <button onClick={() => navigate(-1)} className="back-btn">
        <ArrowLeft size={20}/> Retour
      </button>

      {/* Produit */}
      <div className="product-wrapper">
        <img src={product.image} alt={product.name} className="product-img"/>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
          <h2 className="price">{product.price.toLocaleString()} FCFA</h2>

          <button className="btn-buy">Acheter maintenant</button>
        </div>
      </div>

      {/* Moyens de paiement */}
      <div className="payment-section">
        <h2>Moyens de Paiement Disponibles</h2>

        <div className="payment-grid">

          <div className="pay-card om">
            <Smartphone size={26}/>
            <h3>Orange Money</h3>
            <p>📞 699 00 00 00</p>
          </div>

          <div className="pay-card mtn">
            <Smartphone size={26}/>
            <h3>MTN Mobile Money</h3>
            <p>📞 677 00 00 00</p>
          </div>

          <div className="pay-card card">
            <CreditCard size={26}/>
            <h3>Paiement par carte (bientôt)</h3>
          </div>

        </div>
      </div>

      <style jsx>{`
        .product-page { padding-top:140px; }
        .back-btn{
          background:none; border:none; display:flex; align-items:center;
          gap:6px; margin-bottom:16px; cursor:pointer; font-weight:600;
          color:var(--brand-primary);
        }
        .product-wrapper{
          display:grid; grid-template-columns:1fr 1fr; gap:40px;
          align-items:center; margin-bottom:60px;
        }
        .product-img{
          width:100%; height:420px; object-fit:cover; border-radius:22px;
          box-shadow:0 8px 24px rgba(0,0,0,.12);
        }
        .product-info h1{ margin-bottom:12px; }
        .description{ color:#555; margin-bottom:18px; }
        .price{ color:var(--brand-primary); font-size:2rem; margin-bottom:24px; }
        .btn-buy{
          background:var(--brand-primary); color:white; padding:14px 28px;
          border-radius:14px; font-size:1.1rem; border:none; cursor:pointer;
          font-weight:600;
        }
        .payment-section{ margin-top:60px; }
        .payment-grid{
          display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
          gap:22px; margin-top:22px;
        }
        .pay-card{
          padding:20px; background:white; border-radius:18px;
          box-shadow:0 6px 16px rgba(0,0,0,.08);
          text-align:center; font-weight:600;
        }
        .pay-card p{ font-weight:400; opacity:.8; margin-top:6px; }
        .om{ border-left:6px solid #ff7a00; }
        .mtn{ border-left:6px solid #ffd200; }
        .card{ border-left:6px solid #222; }
      `}</style>
    </div>
  );
}
