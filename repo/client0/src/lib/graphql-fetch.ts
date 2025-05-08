'use client';

const GRAPHQL_ENDPOINT = 'https://37a855e9-cbad-47b1-aaee-e725b592ee4b-00-25qsdfa2j9uuc.spock.replit.dev/graphql';

export async function fetchGraphQL<T = any>(
  query: string,
  variables: Record<string, any> = {},
  headers: Record<string, string> = {}
): Promise<{ data?: T; errors?: any[] }> {
  try {
    console.log('Fetching GraphQL:', { query, variables });

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      mode: 'cors',
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('GraphQL network error:', response.status, response.statusText);
      return { errors: [{ message: `Network error: ${response.status} ${response.statusText}` }] };
    }

    const result = await response.json();
    console.log('GraphQL result:', result);
    
    return result;
  } catch (error) {
    console.error('GraphQL fetch error:', error);
    return { errors: [{ message: `Fetch error: ${error instanceof Error ? error.message : String(error)}` }] };
  }
}

export const featuredProductsQuery = `
  query {
    featuredProducts {
      id
      name
      slug
      price
      discount
      discountUnit
      quantity
      images {
        url
        id
      }
    }
  }
`;

export const loginMutation = `
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      user {
        id
        name
        email
        phone
        role
        avatarUrl
      }
    }
  }
`;

export const signupMutation = `
  mutation signup($signupInput: SignupInput!) {
    signup(signupInput: $signupInput) {
      token
      user {
        id
        name
        email
        phone
        role
        avatarUrl
      }
    }
  }
`;

export const addToCartMutation = `
  mutation addToCart($addToCartInput: AddToCartInput!) {
    addToCart(addToCartInput: $addToCartInput) {
      id
      reserved
      attributes
      productId
      sellerId
      createdAt
      updatedAt
    }
  }
`;

export const getCartSummaryQuery = `
  query {
    getCartSummary {
      totalItems
      subtotal
      discount
      tax
      shipping
      total
    }
  }
`;

export async function getFeaturedProducts() {
  return fetchGraphQL(featuredProductsQuery);
}

export async function login(phone: string, password: string) {
  return fetchGraphQL(loginMutation, {
    loginInput: { phone, password }
  });
}

export async function signup(name: string, email: string, phone: string, password: string) {
  return fetchGraphQL(signupMutation, {
    signupInput: { name, email, phone, password }
  });
}

export async function addToCart(productId: string, sellerId: string, reserved: number, attributes: string = '{}') {
  return fetchGraphQL(addToCartMutation, {
    addToCartInput: { productId, sellerId, reserved, attributes }
  });
}

export async function getCartSummary() {
  return fetchGraphQL(getCartSummaryQuery);
}