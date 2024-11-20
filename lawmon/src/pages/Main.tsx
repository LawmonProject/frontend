import React from 'react';

const categories = [
  { id: 1, name: '부동산 계약서' },
  { id: 2, name: '보험 계약서' },
  { id: 3, name: '근로 계약서' },
];

const Main: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>어떤 계약서가 궁금하신가요?</h1>
      <div style={styles.grid}>
        {categories.map((category) => (
          <div key={category.id} style={styles.card}>
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    margin: '0 auto',
    maxWidth: '800px',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center' as const,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    hover: {
      transform: 'scale(1.05)',
    },
  },
};

export default Main;
