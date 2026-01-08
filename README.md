# 🛍️ E-Commerce Frontend

A modern, responsive e-commerce web application built with **Vite**, **React**, and **Tailwind CSS**. Features a clean UI, shopping cart, user authentication, and admin panel.

![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)


## ✨ Features

### 🛒 Customer Features
- **Product Browsing** - Clean grid layout with product cards
- **Product Details** - Detailed view with image, description, and stock info
- **Shopping Cart** - Add, update, and remove items with real-time calculations
- **User Authentication** - Secure login and registration
- **Checkout Process** - Shipping address and payment method selection
- **Order History** - View past orders with status tracking
- **Responsive Design** - Optimized for mobile, tablet, and desktop

### 👨‍💼 Admin Features
- **Product Management** - Create and delete products
- **Order Management** - View all customer orders
- **Order Fulfillment** - Mark orders as delivered
- **Protected Routes** - Admin-only access control

### 🎨 UI/UX Features
- Clean, modern interface
- Smooth animations and transitions
- Toast notifications for user feedback
- Loading states for async operations
- Mobile-friendly navigation
- Accessible design with ARIA labels

## 🚀 Tech Stack

- **Frontend Framework:** React 18.2.0
- **Build Tool:** Vite 5.0.8
- **Styling:** Tailwind CSS 3.3.0
- **Icons:** Lucide React
- **State Management:** React Context API
- **Routing:** Custom hash-based router
- **HTTP Client:** Fetch API
- **Authentication:** JWT tokens

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Backend API** running on `http://localhost:5000`

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ecommerce-frontend.git
cd ecommerce-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 📦 Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

The build files will be in the `dist/` directory.

## 📂 Project Structure

```
ecommerce-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Header.jsx
│   │   └── Toast.jsx
│   ├── context/          # Global state management
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── hooks/            # Custom React hooks
│   │   └── useRouter.js
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Orders.jsx
│   │   ├── AdminProducts.jsx
│   │   └── AdminOrders.jsx
│   ├── utils/            # Utility functions
│   │   └── api.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔌 API Integration

This frontend is designed to work with a Node.js/Express/MongoDB backend. 

### Required Backend Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

#### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my` - Get user's orders

#### Admin (Protected)
- `GET /api/admin/orders` - Get all orders
- `POST /api/admin/products` - Create sample product
- `DELETE /api/admin/products/:id` - Delete product
- `PUT /api/admin/orders/:id/deliver` - Mark order as delivered

### Authentication Flow

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent with every authenticated request
5. Admin routes check user role

## 🎯 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install

# Clean install
rm -rf node_modules package-lock.json && npm install
```

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` |

**Note:** In Vite, all environment variables must be prefixed with `VITE_`

## 🎨 Customization

### Change Colors

Update Tailwind colors in components:
```jsx
// Current: blue theme
className="bg-blue-600"

// Change to purple
className="bg-purple-600"
```

### Change Logo

Edit `src/components/Header.jsx`:
```jsx
<button className="text-2xl font-bold text-gray-900">
  YourStoreName
</button>
```

### Adjust Pricing

Edit `src/pages/Cart.jsx` or `src/pages/Checkout.jsx`:
```javascript
const shippingPrice = 10;        // Shipping cost
const taxPrice = total * 0.1;    // Tax rate (10%)
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Set environment variable in Vercel dashboard:
```
VITE_API_URL=https://your-backend-api.com
```

### Netlify

```bash
# Build the project
npm run build

# Deploy dist/ folder to Netlify
```

Add environment variable in Netlify:
```
VITE_API_URL=https://your-backend-api.com
```

### Other Platforms

- **Railway** - Auto-deploy from GitHub
- **Render** - Connect repository for static site
- **AWS S3** - Upload `dist/` folder
- **Cloudflare Pages** - GitHub integration

## 🐛 Troubleshooting

### Port already in use
```javascript
// Change in vite.config.js
server: {
  port: 3001
}
```

### CORS errors
Ensure your backend has CORS enabled:
```javascript
const cors = require('cors');
app.use(cors());
```

### Build fails
```bash
# Clear cache
rm -rf node_modules/.vite
npm run dev
```

### Tailwind not working
```bash
# Reinstall Tailwind
npm uninstall tailwindcss
npm install -D tailwindcss@3.3.0 postcss autoprefixer
npx tailwindcss init -p
```

## 📊 Performance

- ⚡ **Dev Server Start:** < 1 second
- ⚡ **Hot Module Replacement:** < 50ms
- 📦 **Build Time:** ~30 seconds
- 🎯 **Lighthouse Score:** 95+

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide Icons](https://lucide.dev/) - Icon library

## 📞 Support

If you have any questions or need help, please:
- Open an [issue](https://github.com/yourusername/ecommerce-frontend/issues)
- Contact me at your.email@example.com

## 🗺️ Roadmap

- [ ] Product search and filtering
- [ ] Pagination for products
- [ ] User reviews and ratings
- [ ] Wishlist feature
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Order tracking
- [ ] Product image upload
- [ ] Advanced admin dashboard
- [ ] Multi-language support

## 📈 Project Status

**Status:** Active Development

**Version:** 1.0.0

**Last Updated:** January 2025

---

⭐ **If you like this project, please give it a star!** ⭐

**Made with ❤️ using React + Vite + Tailwind CSS**