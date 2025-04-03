'use client';

import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: string;
  category: string;
}

export default function Products() {
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Enterprise Suite",
      description: "Complete business management solution",
      features: [
        "Resource Planning",
        "Customer Management",
        "Analytics Dashboard",
        "Cloud Integration"
      ],
      image: "/products/enterprise-suite.jpg",
      category: "Business Solutions"
    },
    {
      id: "2",
      name: "Security Shield",
      description: "Advanced cybersecurity platform",
      features: [
        "Threat Detection",
        "Real-time Monitoring",
        "Automated Response",
        "Compliance Management"
      ],
      image: "/products/security-shield.jpg",
      category: "Security"
    },
    {
      id: "3",
      name: "Data Insights Pro",
      description: "AI-powered data analytics tool",
      features: [
        "Predictive Analytics",
        "Custom Reporting",
        "Data Visualization",
        "Machine Learning Models"
      ],
      image: "/products/data-insights.jpg",
      category: "Analytics"
    }
  ]);

  const categories = [...new Set(products.map(product => product.category))];

  return (
    <main className="products">
      <section className="products__hero">
        <div className="products__hero-content">
          <h1 className="products__title">Our Products</h1>
          <p className="products__subtitle">
            Innovative Solutions for Modern Businesses
          </p>
        </div>
      </section>

      <section className="products__categories">
        {categories.map((category) => (
          <div key={category} className="products__category">
            <h2 className="products__category-title">{category}</h2>
            <div className="products__grid">
              {products
                .filter(product => product.category === category)
                .map((product) => (
                  <div key={product.id} className="products__card">
                    <div className="products__card-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="products__card-content">
                      <h3 className="products__card-title">{product.name}</h3>
                      <p className="products__card-description">
                        {product.description}
                      </p>
                      <ul className="products__features-list">
                        {product.features.map((feature, index) => (
                          <li key={index} className="products__feature-item">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
