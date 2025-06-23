# eCommerce Backend Setup

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## Installation Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/fourbtech_ecommerce?schema=public"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server Configuration
PORT=8000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database with sample data
npx prisma db seed
```

### 4. Start the Development Server

```bash
npm run start:dev
```

The GraphQL playground will be available at: `http://localhost:8000/graphql`

## Available GraphQL Operations

### Authentication

- `login(input: LoginInput!): String!`
- `register(input: RegisterInput!): String!`
- `profile: User!`

### Products

- `products: [Product!]!`
- `product(id: String!): Product!`
- `searchProducts(query: String!): [Product!]!`
- `vendorProducts(vendorId: String!): [Product!]!`
- `createProduct(input: CreateProductInput!): Product!`
- `updateProduct(id: String!, input: UpdateProductInput!): Product!`
- `removeProduct(id: String!): Product!`

### Orders

- `orders: [Order!]!`
- `order(id: String!): Order!`
- `myOrders: [Order!]!`
- `vendorOrders(vendorId: String!): [Order!]!`
- `orderStats: Object!`
- `createOrder(input: CreateOrderInput!): Order!`
- `updateOrderStatus(id: String!, input: UpdateOrderStatusInput!): Order!`

## Sample Queries

### Login

```graphql
mutation Login($input: LoginInput!) {
  login(input: $input)
}
```

Variables:

```json
{
  "input": {
    "email": "seller@example.com",
    "password": "password123"
  }
}
```

### Get Products

```graphql
query GetProducts {
  products {
    id
    name
    description
    price
    stock
    isActive
    vendorId
    createdAt
  }
}
```

### Create Product (requires authentication)

```graphql
mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
    name
    description
    price
    stock
    isActive
    vendorId
    createdAt
  }
}
```

## Testing the API

1. Start the backend server
2. Open GraphQL playground at `http://localhost:8000/graphql`
3. Try the sample queries above
4. Use the authentication mutations to get a JWT token
5. Include the token in the Authorization header for protected operations

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Check your DATABASE_URL in the .env file
- Run `npx prisma db push` to sync schema changes

### JWT Issues

- Make sure JWT_SECRET is set in your .env file
- Check that the token is being sent in the Authorization header

### CORS Issues

- Ensure the frontend URL is correctly set in CORS configuration
- Check that the frontend is running on the expected port
