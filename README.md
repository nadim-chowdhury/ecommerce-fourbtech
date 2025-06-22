# 🛒 Multi-vendor E-commerce Platform

A comprehensive full-stack e-commerce solution built with **Next.js 15**, **NestJS**, **GraphQL**, and **PostgreSQL**. This project demonstrates a complete multi-vendor e-commerce platform with separate dashboards for customers and sellers.

## 🚀 Live Demo

- **Frontend**: [Coming Soon]
- **Backend API**: [Coming Soon]
- **GraphQL Playground**: [Coming Soon]

## 📋 Project Overview

This project was developed as **MERN Stack Developer**. The task involved building a fully functional multi-vendor e-commerce platform based on incomplete Figma designs, demonstrating problem-solving skills and technical proficiency.

### 🎯 Key Features Implemented

#### **Customer Features**

- ✅ **Authentication System**: Secure login/register with JWT
- ✅ **Product Browsing**: Search, filter, and view products
- ✅ **Shopping Cart**: Add/remove items, quantity management
- ✅ **Order Management**: Place orders, track status, view history
- ✅ **Wishlist**: Save favorite products
- ✅ **User Profile**: Account settings and preferences
- ✅ **Responsive Dashboard**: Mobile-first design

#### **Seller Features**

- ✅ **Vendor Dashboard**: Complete seller management interface
- ✅ **Product Management**: Create, edit, delete products
- ✅ **Inventory Control**: Stock management and pricing
- ✅ **Order Processing**: Order fulfillment and status updates
- ✅ **Analytics**: Sales reports and performance metrics
- ✅ **Payment Tracking**: Revenue monitoring

#### **Technical Features**

- ✅ **GraphQL API**: Type-safe API with real-time data
- ✅ **JWT Authentication**: Secure role-based access control
- ✅ **Database Integration**: PostgreSQL with Prisma ORM
- ✅ **Modern UI/UX**: Radix UI + Tailwind CSS
- ✅ **State Management**: Redux Toolkit
- ✅ **Responsive Design**: Mobile-first approach

## 🛠️ Tech Stack

### **Frontend**

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Library**: Radix UI + Tailwind CSS
- **State Management**: Redux Toolkit
- **GraphQL Client**: Apollo Client
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

### **Backend**

- **Framework**: NestJS with TypeScript
- **API**: GraphQL with Apollo Server
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport
- **Validation**: Class Validator
- **Password Hashing**: bcryptjs

### **Database Schema**

- **User**: Authentication & role management
- **Vendor**: Seller information
- **Product**: Product catalog with inventory
- **Order**: Order processing
- **OrderItem**: Order line items
- **Review**: Product reviews & ratings

## 📁 Project Structure

```code
ecommerce-fourbtech/
├── frontend/                 # Next.js 15 Frontend
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   │   ├── (auth)/      # Authentication pages
│   │   │   ├── customer/    # Customer dashboard
│   │   │   └── seller/      # Seller dashboard
│   │   ├── components/      # Reusable UI components
│   │   ├── lib/             # Utilities & configurations
│   │   └── redux/           # State management
│   └── public/              # Static assets
├── backend/                  # NestJS Backend
│   ├── src/
│   │   ├── auth/            # Authentication module
│   │   ├── users/           # User management
│   │   ├── products/        # Product management
│   │   ├── orders/          # Order processing
│   │   ├── common/          # Shared DTOs & utilities
│   │   └── prisma/          # Database service
│   └── prisma/              # Database schema
└── README.md                # Project documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ecommerce-fourbtech
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your database credentials

# Setup database
npx prisma generate
npx prisma migrate dev --name init

# Start development server
npm run start:dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Add: NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/graphql

# Start development server
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **GraphQL Playground**: http://localhost:8000/graphql

## 📊 Database Setup

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/fourbtech_ecommerce?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key"

# Server
PORT=8000
NODE_ENV=development
```

### Database Migration

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

## 🔐 Authentication

The application uses JWT-based authentication with role-based access control:

- **CUSTOMER**: Can browse products, place orders, manage profile
- **SELLER**: Can manage products, process orders, view analytics
- **ADMIN**: Full system access

### Sample API Usage

#### Login

```graphql
mutation Login($input: LoginInput!) {
  login(input: $input)
}
```

#### Get Products

```graphql
query GetProducts {
  products {
    id
    name
    description
    price
    stock
    isActive
  }
}
```

## 🎨 UI/UX Features

### Design System

- **Component Library**: Comprehensive Radix UI components
- **Styling**: Tailwind CSS with custom design tokens
- **Responsive**: Mobile-first responsive design
- **Accessibility**: WCAG compliant components
- **Theme Support**: Dark/light mode ready

### Key Components

- **Dashboard Layouts**: Consistent navigation and sidebar
- **Data Tables**: Sortable, filterable tables with pagination
- **Forms**: Validated forms with error handling
- **Charts**: Interactive analytics with Recharts
- **Modals**: Accessible dialog components

## 🔧 Development

### Available Scripts

#### Backend

```bash
npm run start:dev    # Development server
npm run build        # Build for production
npm run start:prod   # Production server
npm run test         # Run tests
```

#### Frontend

```bash
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Production server
npm run lint         # Run linter
```

### Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Testing**: Jest for unit tests

## 🚀 Deployment

### Backend (Vercel)

The backend is configured for Vercel deployment with:

- `vercel.json` configuration
- Environment variables setup
- Database connection handling

### Frontend (Vercel)

The frontend is optimized for Vercel with:

- Next.js 15 optimizations
- Image optimization
- Static asset handling

## 📝 Assumptions Made

Due to incomplete Figma designs, the following assumptions were made:

1. **User Roles**: Implemented CUSTOMER, SELLER, and ADMIN roles
2. **Product Management**: Full CRUD operations for products
3. **Order Flow**: Complete order lifecycle from creation to delivery
4. **Authentication**: JWT-based authentication with role-based access
5. **UI Components**: Used modern UI patterns and best practices
6. **Database Schema**: Designed comprehensive schema for scalability

## 🎯 Challenges Faced

1. **Incomplete Designs**: Had to make logical assumptions for missing UI elements
2. **GraphQL Integration**: Complex setup with NestJS and Apollo Server
3. **Authentication Flow**: Implementing secure JWT authentication
4. **Database Design**: Creating scalable schema for multi-vendor platform
5. **State Management**: Managing complex application state
6. **Responsive Design**: Ensuring mobile-first approach

## 🔮 Future Improvements

1. **Payment Integration**: Stripe/PayPal integration
2. **Real-time Features**: WebSocket for live updates
3. **File Upload**: Image upload for products
4. **Email Notifications**: Order status updates
5. **Advanced Analytics**: Detailed reporting and insights
6. **Mobile App**: React Native companion app
7. **SEO Optimization**: Meta tags and structured data
8. **Performance**: Caching and optimization

## 📄 License

This project is developed for the full stack evaluation process.

## 👨‍💻 Developer

**Nadim Chowdhury**

- **LinkedIn**: https://www.linkedin.com/in/nadim-chowdhury
- **GitHub**: https://github.com/nadim-chowdhury
- **Date**: June 2025

---

**Note**: This project demonstrates problem-solving skills, technical proficiency, and the ability to work with incomplete requirements while delivering a production-ready e-commerce solution.

