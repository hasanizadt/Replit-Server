const fetch = require('node-fetch');

async function testSignup() {
  const signupInput = {
    name: "تست کاربر",
    email: "test@example.com",
    phone: "09123456789",
    password: "123456"
  };

  const signupQuery = `
    mutation Signup($signupInput: SignupInput!) {
      signup(signupInput: $signupInput) {
        token
        user {
          id
          name
          email
          phone
        }
      }
    }
  `;

  try {
    const response = await fetch('http://0.0.0.0:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: signupQuery,
        variables: { signupInput },
      }),
    });

    const data = await response.json();
    console.log('Signup Response:', JSON.stringify(data, null, 2));

    if (data.data && data.data.signup && data.data.signup.token) {
      return data.data.signup.token;
    } else {
      console.error('Failed to get token from signup');
      return null;
    }
  } catch (error) {
    console.error('Error during signup:', error);
    return null;
  }
}

async function testLogin() {
  const loginInput = {
    phone: "09123456789",
    password: "123456"
  };

  const loginQuery = `
    mutation Login($loginInput: LoginInput!) {
      login(loginInput: $loginInput) {
        token
        user {
          id
          name
          email
          phone
          role
        }
      }
    }
  `;

  try {
    const response = await fetch('http://0.0.0.0:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: loginQuery,
        variables: { loginInput },
      }),
    });

    const data = await response.json();
    console.log('Login Response:', JSON.stringify(data, null, 2));

    if (data.data && data.data.login && data.data.login.token) {
      return data.data.login.token;
    } else {
      console.error('Failed to get token from login');
      return null;
    }
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
}

async function testBrandQuery(token) {
  const brandQuery = `
    query {
      getBrandById(id: "1") {
        id
        name
        logo
      }
    }
  `;

  try {
    const response = await fetch('http://0.0.0.0:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        query: brandQuery
      }),
    });

    const data = await response.json();
    console.log('Brand Query Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error during brand query:', error);
  }
}

async function runTests() {
  console.log('Starting auth tests...');

  // Try to signup
  console.log('Testing signup...');
  const signupToken = await testSignup();

  if (signupToken) {
    console.log('Signup successful, testing brand query with signup token...');
    await testBrandQuery(signupToken);
  }

  // Try to login
  console.log('Testing login...');
  const loginToken = await testLogin();

  if (loginToken) {
    console.log('Login successful, testing brand query with login token...');
    await testBrandQuery(loginToken);
  }
}

// Run the tests
runTests();