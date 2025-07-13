# 🛍️ E-Store - Modern Ecommerce Platform

A modern, responsive ecommerce website built with Next.js, React, and Tailwind CSS. Features a complete shopping experience with authentication, product management, wishlist, cart, and checkout functionality.

## ✨ Features

### 🛒 Shopping Experience

- **Product Catalog**: Browse products with categories and subcategories
- **Product Details**: View detailed product information with images and descriptions
- **Search & Filter**: Find products easily with search and category filters
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 👤 User Management

- **User Registration**: Create new accounts with email validation
- **User Login**: Secure authentication with JWT tokens
- **Password Recovery**: Forgot password functionality with email reset
- **User Profile**: Manage personal information and preferences

### 🛍️ Shopping Features

- **Shopping Cart**: Add/remove products with quantity management
- **Wishlist**: Save favorite products for later
- **Checkout Process**: Complete payment flow with order confirmation
- **Order History**: View past orders and their status

### 🎨 Modern UI/UX

- **Beautiful Design**: Modern gradient backgrounds and smooth animations
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth loading indicators throughout the app
- **Responsive Navigation**: Mobile-friendly navigation with hamburger menu

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS 4
- **Icons**: Heroicons, Lucide React
- **State Management**: React Context API
- **Authentication**: JWT Tokens
- **API**: RESTful API integration

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ecomerce-1.git
   cd ecomerce-1
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Build for Production

### For GitHub Pages:

```bash
npm run build
```

### For Vercel/Netlify:

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Toast.jsx       # Toast notification component
│   │   └── Footer.jsx      # Footer component
│   ├── context/            # React Context providers
│   │   └── ToastContext.jsx # Toast notification context
│   ├── Home/               # Home page components
│   │   └── components/     # Home page specific components
│   ├── cart/               # Shopping cart page
│   ├── checkout/           # Checkout process
│   ├── login/              # User authentication
│   ├── register/           # User registration
│   ├── wishlist/           # User wishlist
│   └── layout.js           # Root layout component
```

## 🎯 Key Components

### Authentication System

- Secure login/register with JWT tokens
- Password recovery functionality
- Protected routes for authenticated users

### Shopping Cart

- Local storage for cart persistence
- Quantity management
- Real-time total calculation

### Wishlist Management

- API integration for wishlist operations
- Real-time updates with toast notifications
- User-specific wishlist storage

### Toast Notifications

- Success, error, and info notifications
- Auto-dismiss after 3 seconds
- Manual close option
- Beautiful animations

## 🌐 Live Demo

Visit the live demo: [E-Store Demo](https://yourusername.github.io/ecomerce-1)

## 📱 Screenshots

### Home Page

![Home Page](screenshots/home.png)

### Product Catalog

![Products](screenshots/products.png)

### Shopping Cart

![Cart](screenshots/cart.png)

### User Authentication

![Login](screenshots/login.png)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_API_URL=https://ecommerce.routemisr.com/api/v1
```

### API Endpoints

The application uses the following API endpoints:

- Authentication: `/auth/signin`, `/auth/signup`
- Products: `/products`
- Wishlist: `/wishlist`
- Categories: `/categories`

## 🚀 Deployment

### GitHub Pages

1. Build the project: `npm run build`
2. Push to GitHub
3. Enable GitHub Pages in repository settings
4. Set source to `/docs` or `/gh-pages` branch

### Vercel

1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Heroicons](https://heroicons.com/) for the beautiful icons
- [Lucide React](https://lucide.dev/) for additional icons

---

⭐ **Star this repository if you found it helpful!**
"# Ecommerce-Web-App" 
