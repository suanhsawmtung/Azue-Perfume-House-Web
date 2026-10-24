# AZUE Perfume House —— Frontend

Frontend application for the AZUE Perfume House e-commerce platform.

AZUE Perfume is a full-stack e-commerce application for selling authentic perfumes online. The customer-facing application allows users to browse perfumes, explore product details and variants, read perfume-related blog articles, manage their accounts, and place orders.

The project also includes an administration panel for managing the business, including product and inventory management, blog content, customer accounts, orders, and business reports. The application uses stateless authentication with JWT-based access and refresh tokens.

The project may be expanded in the future with additional e-commerce and business management capabilities.

**Related:** [Backend](https://github.com/suanhsawmtung/Azue-Perfume-House-Backend-API)

> **Note:** Some dummy images used in this project are hosted on external websites. If you are in Myanmar, you may need to use a VPN to load some of these images.

## Features

### Customer Application

- Browse and search authentic perfumes
- Filter and paginate products
- View product details and available variants
- Shopping cart
- Wishlist
- Customer reviews
- Customer profile and account settings
- Order placement and order history
- Order status tracking
- Blog listing and blog details
- Responsive design for desktop and mobile devices
- SEO-friendly page metadata and structured data
- Stateless authentication with JWT access and refresh tokens

### Administration Panel

- Dashboard with business reports and statistics
- Product management (CRUD)
- Product variant and stock management
- Blog management (CRUD)
- Order management
- Order status management
- Customer/user management
- Inventory and stock tracking
- Review management
- Business reports and analytics

### Possible Future Improvements

- Real-time notifications for customers and administrators
- Real-time customer–admin messaging
- Supplier management
- Enhanced delivery and order fulfillment process
- Exchange management
- Promotion and campaign management
- Order-level discounts and promotional pricing
- About Us page
- Contact page
- FAQ section
- Additional business and reporting features

## Tech Stack

- **React 19** + **TypeScript** — Frontend application
- **Vite** — Build tool and development server
- **React Router** — Routing and data APIs
- **Tailwind CSS** — Styling and responsive UI
- **shadcn/ui** — Reusable UI components
- **TanStack Query** — Server-state and API data management
- **Zod** — Schema validation
- **Zustand** — Client-state management
- **Axios** — HTTP client for API communication
- **Lucide React** — Icons

## Important Technical Implementations

- JWT-based stateless authentication with access and refresh tokens
- Role-based authorization for customers and administrators
- Product variants with individual pricing and stock
- Shopping cart persistence
- Pagination and filtering
- SEO metadata and canonical URLs
- Open Graph and Twitter/X metadata
- Product and Article JSON-LD structured data

## Setup

### Prerequisites

- Node.js
- pnpm

### Installation

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd <repository-folder>
pnpm install
```

### Environment Variables

Create a `.env` file in the project root and add the required environment variables:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_BASE_IMAGE_URL=http://localhost:8080/
VITE_CURRENCY=MMK
VITE_BASE_URL=http://localhost:5173
VITE_APP_ENV=development
```

### Run the Development Server

```bash
pnpm dev
```

### Run with Docker

Install and start [Docker Desktop](https://www.docker.com/products/docker-desktop/) before running the following commands.

Build the frontend image from the project root. These Vite environment variables are embedded into the image during the build:

```bash
docker build \
  --build-arg VITE_API_BASE_URL=http://localhost:8080/api/v1 \
  --build-arg VITE_BASE_IMAGE_URL=http://localhost:8080/images \
  --build-arg VITE_CURRENCY=MMK \
  --build-arg VITE_BASE_URL=http://localhost:5173 \
  --build-arg VITE_APP_ENV=development \
  -t azue-perfume-house-web .
```

Run the container:

```bash
docker run --rm -p 5173:80 azue-perfume-house-web
```

Open the application at [http://localhost:5173](http://localhost:5173). Make sure the backend API is running at `http://localhost:8080`.

> **Note:** Rebuild the Docker image whenever the Vite environment variables change.

## Environment Variables

| Variable              | Description                              | Example                     |
| --------------------- | ---------------------------------------- | --------------------------- |
| `VITE_API_BASE_URL`   | Base URL for the backend API             | `http://localhost:8080/api` |
| `VITE_BASE_IMAGE_URL` | Base URL for uploaded images and media   | `http://localhost:8080/`    |
| `VITE_CURRENCY`       | Currency used throughout the application | `MMK`                       |
| `VITE_BASE_URL`       | Base URL of the frontend application     | `http://localhost:5173`     |
| `VITE_APP_ENV`        | Current application environment          | `development`               |

> **Note:** These are development values. Update them according to your deployment environment.
