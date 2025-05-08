const fetch = require('node-fetch');

const GRAPHQL_ENDPOINT = 'http://0.0.0.0:3000/graphql';

// کوئری GraphQL برای دریافت محصولات
const productsQuery = `
query GetProducts($searchInput: SearchProductInput!) {
  products(searchInput: $searchInput) {
    id
    name
    slug
    price
    description
    images
    stock
    reviewRating
    totalReviews
    isFeatured
    category {
      id
      name
    }
    brand {
      id
      name
    }
  }
}
`;

// تابع اجرای کوئری
async function fetchProducts() {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: productsQuery,
        variables: {
          searchInput: {
            page: 1,
            limit: 10,
            productSortBy: "NEWEST"
          }
        }
      })
    });

    const data = await response.json();
    console.log('Products:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// اجرای کوئری
fetchProducts();


// کوئری GraphQL برای دریافت دسته‌بندی‌ها
const categoriesQuery = `
query {
  categories {
    id
    name
    slug
    description
    image
  }
}
`;

// کوئری GraphQL برای دریافت برندها
const brandsQuery = `
query {
  brands {
    id
    name
    slug
    logo
  }
}
`;

// نمایش کوئری‌های GraphQL برای تست
console.log('=== GraphQL Query for Products ===');
console.log(productsQuery);
console.log('\n=== GraphQL Query for Categories ===');
console.log(categoriesQuery);
console.log('\n=== GraphQL Query for Brands ===');
console.log(brandsQuery);

/*
// برای اجرای واقعی کوئری‌ها، کامنت‌ها را بردارید
async function runQueries() {
  console.log('Fetching products...');
  const productsResult = await executeGraphQLQuery(productsQuery);
  console.log(JSON.stringify(productsResult, null, 2));

  console.log('\nFetching categories...');
  const categoriesResult = await executeGraphQLQuery(categoriesQuery);
  console.log(JSON.stringify(categoriesResult, null, 2));

  console.log('\nFetching brands...');
  const brandsResult = await executeGraphQLQuery(brandsQuery);
  console.log(JSON.stringify(brandsResult, null, 2));
}

runQueries();
*/