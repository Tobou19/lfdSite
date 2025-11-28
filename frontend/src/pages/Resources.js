import React, { useState, useEffect } from "react";
import { Calendar, Clock, User, Search, Filter, ArrowRight, BookOpen, Download } from "lucide-react";
import { mockData } from "../data/mockData";
import { useNavigate } from "react-router-dom";

const Resources = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'Tous les articles' },
    { value: 'Nutrition', label: 'Nutrition' },
    { value: 'Protocoles', label: 'Protocoles thérapeutiques' },
    { value: 'Santé digestive', label: 'Santé digestive' },
    { value: 'Maladies chroniques', label: 'Maladies chroniques' }
  ];

  const products = [
    {
      id: 1,
      name: "Superfood Mix Détox",
      description: "Mélange 100% naturel – spiruline, moringa, gingembre et curcuma.",
      price: 8500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8NsS0nlgjgOUMCHXF1VuerX09oE9fKvCCXg&s"
    },
    {
      id: 2,
      name: "Thé Minceur Métabolique",
      description: "Accélère la combustion, régule l'appétit & réduit la rétention d’eau.",
      price: 6500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfkOlyZyrSDD8ZzWSkXcF3q3OLMaYYGc8SYw&s"
    },
    {
      id: 3,
      name: "Huile de Nigelle Premium",
      description: "Anti-inflammatoire puissant – excellente pour le diabète & l’immunité.",
      price: 9500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSju8v1p1_krQqji7uh3IWrTQdFjC7FxgZUgA&s"
    },
    {
      id: 4,
      name: "Superfood Mix Détox",
      description: "Mélange 100% naturel – spiruline, moringa, gingembre et curcuma.",
      price: 8500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8NsS0nlgjgOUMCHXF1VuerX09oE9fKvCCXg&s"
    },
    {
      id: 5,
      name: "Thé Minceur Métabolique",
      description: "Accélère la combustion, régule l'appétit & réduit la rétention d’eau.",
      price: 6500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfkOlyZyrSDD8ZzWSkXcF3q3OLMaYYGc8SYw&s"
    },
    {
      id: 6,
      name: "Huile de Nigelle Premium",
      description: "Anti-inflammatoire puissant – excellente pour le diabète & l’immunité.",
      price: 9500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSju8v1p1_krQqji7uh3IWrTQdFjC7FxgZUgA&s"
    }
  ];
  

  const guides = [
    {
      id: 1,
      title: "Guide Complet de l'Alimentation Vivante",
      description: "Manuel pratique de 50 pages avec recettes, techniques de préparation et plans de menus",
      pages: 50,
      downloadCount: 1247,
      type: "PDF"
    },
    {
      id: 2,
      title: "Protocole Détox 21 Jours",
      description: "Programme complet de détoxification avec guide jour par jour et recettes de jus",
      pages: 35,
      downloadCount: 890,
      type: "PDF"
    },
    {
      id: 3,
      title: "Guide des Super-Aliments Thérapeutiques",
      description: "Encyclopédie illustrée de 80 aliments aux propriétés curatives exceptionnelles",
      pages: 75,
      downloadCount: 1456,
      type: "PDF"
    }
  ];
  

  useEffect(() => {
    fetch("http://localhost:5000/articles")
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur récupération articles :", err);
        setLoading(false);
      });
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.subtitle && article.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (article.content && article.content.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || (article.tags && JSON.parse(article.tags).includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  if (loading) return <p>Chargement des articles...</p>;

  return (
    <div className="resources-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="display-medium">Ressources & Blog</h1>
          <p className="body-large">
            Découvrez nos articles et guides pour approfondir vos connaissances.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="search-section">
        <div className="container">
          <div className="search-controls">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-bar">
              <Filter size={20} />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {filteredArticles.length > 0 && (
        <section className="featured-section">
          <div className="container">
            <div className="featured-article">
              <div className="featured-content">
                <div className="featured-badge">Article vedette</div>
                <h2 className="heading-1">{filteredArticles[0].title}</h2>
                <p className="body-large">{filteredArticles[0].subtitle}</p>
                <div className="article-meta">
                  <div className="meta-item">
                    <User size={16} /> <span>{filteredArticles[0].author}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={16} /> <span>{new Date(filteredArticles[0].published_date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={16} /> <span>{filteredArticles[0].read_time}</span>
                  </div>
                </div>
                <button className="btn-primary featured-cta">
                  Lire l'article complet <ArrowRight size={20} />
                </button>
              </div>
              <div className="featured-image">
                <div className="image-placeholder">
                  {filteredArticles[0].image ? <img src={filteredArticles[0].image} alt={filteredArticles[0].title} /> : <BookOpen size={64} />}
                  {filteredArticles[0].tags && JSON.parse(filteredArticles[0].tags).map((tag, idx) => (
                    <div key={idx} className="category-tag">{tag}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="articles-section">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-1">Tous nos Articles</h2>
            <p className="body-large">
              {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}
            </p>
          </div>
          <div className="articles-grid">
            {filteredArticles.map(article => (
              <article key={article.id} className="article-card">
                <div className="article-image">
                  <div className="article-image-placeholder">
                    {article.image ? <img src={article.image} alt={article.title} /> : <BookOpen size={32} />}
                  </div>
                  {article.tags && JSON.parse(article.tags).map((tag, idx) => (
                    <div key={idx} className="article-category">{tag}</div>
                  ))}
                </div>
                <div className="article-content">
                  <h3 className="heading-3">{article.title}</h3>
                  <p className="body-medium">{article.subtitle}</p>
                  <div className="article-footer">
                    <div className="article-meta">
                      <span className="author">{article.author}</span>
                      <span className="date">{new Date(article.published_date).toLocaleDateString('fr-FR')}</span>
                      <span className="read-time">{article.read_time}</span>
                    </div>
                    <button className="read-more-btn">
                      Lire plus <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      
      {/* Products Section */}
<section className="products-section">
  <div className="container">
    <div className="section-header">
      <h2 className="heading-1">Nos Produits Naturels</h2>
      <p className="body-large">Compléments, thés, poudres nutritionnelles & extraits thérapeutiques</p>
    </div>

    <div className="products-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-content">
            <h3 className="heading-3">{product.name}</h3>
            <p className="body-medium">{product.description}</p>

            <div className="product-footer">
              <div className="price">{product.price} FCFA</div>
              <button onClick={() => navigate(`/produit/${product.id}`)} className="btn-primary product-btn">Voir le produit</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  <style jsx>{`
    .products-section { padding: var(--spacing-giant) 0; background: var(--bg-subtle); }
    .products-grid {
      display: grid; gap: var(--spacing-large);
      grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
    }
    .product-card {
      background: var(--bg-card); border-radius: 24px;
      overflow: hidden; box-shadow: 0 6px 14px rgba(0,0,0,0.08);
      display: flex; flex-direction: column;
      transition: .3s;
    }
    .product-card:hover { transform: translateY(-4px); }
    .product-image img { width:100%; height:260px; object-fit:cover; }
    .product-content { padding: var(--spacing-large); flex:1; display:flex; flex-direction:column; }
    .product-content p { flex:1; margin-bottom:var(--spacing-medium); }
    .product-footer { display:flex; justify-content:space-between; align-items:center; }
    .price { font-size:1.4rem; font-weight:700; color:var(--brand-primary); }
    .product-btn { padding:10px 16px; border-radius:12px; }
  `}</style>
</section>


      {/* Downloadable Guides */}
      <section className="guides-section">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-1">Guides Téléchargeables</h2>
            <p className="body-large">
              Ressources complètes et pratiques pour approfondir vos connaissances
            </p>
          </div>
          
          <div className="guides-grid">
            {guides.map((guide) => (
              <div key={guide.id} className="guide-card">
                <div className="guide-header">
                  <div className="guide-icon">
                    <Download size={32} />
                  </div>
                  <div className="guide-type">{guide.type}</div>
                </div>
                
                <div className="guide-content">
                  <h3 className="heading-3">{guide.title}</h3>
                  <p className="body-medium">{guide.description}</p>
                  
                  <div className="guide-stats">
                    <div className="stat">
                      <span className="stat-number">{guide.pages}</span>
                      <span className="stat-label">pages</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">{guide.downloadCount.toLocaleString()}</span>
                      <span className="stat-label">téléchargements</span>
                    </div>
                  </div>
                </div>
                
                <div className="guide-footer">
                  <button className="btn-primary guide-download">
                    <Download size={16} />
                    Télécharger gratuitement
                  </button>
                  <p className="download-note body-small">
                    * Gratuit - Inscription newsletter requise
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2 className="heading-1">Restez Informé</h2>
              <p className="body-large">
                Recevez nos derniers articles, conseils santé et guides exclusifs directement dans votre boîte mail.
              </p>
              
              <ul className="newsletter-benefits">
                <li>✓ Articles exclusifs chaque semaine</li>
                <li>✓ Guides pratiques gratuits</li>
                <li>✓ Conseils personnalisés</li>
                <li>✓ Invitations aux événements</li>
              </ul>
            </div>
            
            <div className="newsletter-form">
              <h3 className="heading-3">S'abonner à la Newsletter</h3>
              <form className="subscribe-form">
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Votre prénom"
                    className="newsletter-input"
                  />
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="newsletter-input"
                    required
                  />
                </div>
                <button type="submit" className="btn-cta newsletter-btn">
                  S'abonner maintenant
                </button>
                <p className="newsletter-disclaimer body-small">
                  Pas de spam, désabonnement en un clic. Vos données restent confidentielles.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .resources-page {
          padding-top: 120px;
        }

        .page-hero {
          padding: var(--spacing-giant) 0;
          background: var(--bg-page);
          text-align: center;
        }

        .page-hero h1 {
          margin-bottom: var(--spacing-medium);
        }

        .search-section {
          padding: var(--spacing-large) 0;
          background: var(--bg-subtle);
        }

        .search-controls {
          display: flex;
          gap: var(--spacing-medium);
          max-width: 800px;
          margin: 0 auto;
        }

        .search-bar,
        .filter-bar {
          flex: 1;
          display: flex;
          align-items: center;
          gap: var(--spacing-small);
          background: var(--bg-card);
          padding: 12px 16px;
          border-radius: 12px;
          border: 2px solid var(--border-light);
        }

        .search-bar svg,
        .filter-bar svg {
          color: var(--text-light);
        }

        .search-input,
        .filter-select {
          border: none;
          background: none;
          font-size: 1rem;
          flex: 1;
          outline: none;
        }

        .featured-section {
          padding: var(--spacing-giant) 0;
        }

        .featured-article {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-giant);
          align-items: center;
          background: var(--bg-card);
          border-radius: 32px;
          padding: var(--spacing-large);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .featured-badge {
          display: inline-block;
          background: var(--brand-primary);
          color: white;
          padding: var(--spacing-xs) var(--spacing-small);
          border-radius: 16px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: var(--spacing-medium);
        }

        .featured-content h2 {
          margin-bottom: var(--spacing-medium);
        }

        .featured-content p {
          margin-bottom: var(--spacing-large);
        }

        .article-meta {
          display: flex;
          gap: var(--spacing-medium);
          margin-bottom: var(--spacing-large);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .meta-item svg {
          color: var(--brand-primary);
        }

        .featured-cta {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .featured-image {
          position: relative;
        }

        .image-placeholder {
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-dark) 100%);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          position: relative;
        }

        .category-tag {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.9);
          color: var(--brand-dark);
          padding: var(--spacing-xs) var(--spacing-small);
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .articles-section {
          padding: var(--spacing-giant) 0;
          background: var(--bg-section);
        }

        .section-header {
          text-align: center;
          margin-bottom: var(--spacing-giant);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .section-header h2 {
          margin-bottom: var(--spacing-medium);
        }

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--spacing-large);
        }

        .article-card {
          background: var(--bg-card);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .article-card:hover {
          transform: translateY(-4px);
        }

        .article-image {
          position: relative;
        }

        .article-image-placeholder {
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, var(--bg-subtle) 0%, var(--border-light) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-light);
        }

        .article-category {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--brand-primary);
          color: white;
          padding: var(--spacing-xs) var(--spacing-small);
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .article-content {
          padding: var(--spacing-medium);
        }

        .article-content h3 {
          margin-bottom: var(--spacing-small);
        }

        .article-content p {
          margin-bottom: var(--spacing-medium);
        }

        .article-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .article-meta {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          font-size: 0.8rem;
          color: var(--text-light);
        }

        .author {
          font-weight: 600;
          color: var(--brand-primary);
        }

        .read-more-btn {
          background: none;
          border: none;
          color: var(--brand-dark);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .read-more-btn:hover {
          color: var(--brand-primary);
        }

        .guides-section {
          padding: var(--spacing-giant) 0;
        }

        .guides-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-large);
        }

        .guide-card {
          background: var(--bg-card);
          border-radius: 24px;
          padding: var(--spacing-large);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
        }

        .guide-card:hover {
          transform: translateY(-4px);
        }

        .guide-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-medium);
        }

        .guide-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--bg-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .guide-icon svg {
          color: var(--brand-primary);
        }

        .guide-type {
          background: var(--brand-dark);
          color: white;
          padding: var(--spacing-xs) var(--spacing-small);
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .guide-content {
          flex: 1;
          margin-bottom: var(--spacing-large);
        }

        .guide-content h3 {
          margin-bottom: var(--spacing-medium);
        }

        .guide-content p {
          margin-bottom: var(--spacing-medium);
        }

        .guide-stats {
          display: flex;
          gap: var(--spacing-large);
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--brand-primary);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-light);
        }

        .guide-footer {
          text-align: center;
        }

        .guide-download {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          justify-content: center;
          width: 100%;
          margin-bottom: var(--spacing-small);
        }

        .download-note {
          color: var(--text-light);
        }

        .newsletter-section {
          padding: var(--spacing-giant) 0;
          background: var(--bg-subtle);
        }

        .newsletter-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-giant);
          align-items: center;
        }

        .newsletter-text h2 {
          margin-bottom: var(--spacing-medium);
        }

        .newsletter-text p {
          margin-bottom: var(--spacing-large);
        }

        .newsletter-benefits {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-small);
        }

        .newsletter-benefits li {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .newsletter-form {
          background: var(--bg-card);
          border-radius: 24px;
          padding: var(--spacing-large);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .newsletter-form h3 {
          margin-bottom: var(--spacing-large);
          text-align: center;
        }

        .subscribe-form .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-medium);
          margin-bottom: var(--spacing-medium);
        }

        .newsletter-input {
          padding: 14px 16px;
          border: 2px solid var(--border-medium);
          border-radius: 12px;
          font-size: 1rem;
          transition: border-color 0.2s ease;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: var(--brand-primary);
        }

        .newsletter-btn {
          width: 100%;
          margin-bottom: var(--spacing-medium);
        }

        .newsletter-disclaimer {
          text-align: center;
          color: var(--text-light);
        }

        @media (max-width: 781px) {
          .resources-page {
            padding-top: 80px;
          }
          
          .search-controls {
            flex-direction: column;
          }
          
          .featured-article {
            grid-template-columns: 1fr;
          }
          
          .articles-grid {
            grid-template-columns: 1fr;
          }
          
          .newsletter-content {
            grid-template-columns: 1fr;
          }
          
          .subscribe-form .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Resources;