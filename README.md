# Trx Payment with Next.js

![Trx Payment](https://github.com/ArmanPayandeh/trx-payment-next/blob/main/public/banner.png)

## 🚀 Project Overview
**Trx Payment** is a TRX-based payment system built with **Next.js**, **Prisma**, and **tRPC**. It provides a fast and modern solution for secure and scalable blockchain transactions.

## ✨ Features
- Send and receive TRX transactions using **TronWeb**
- Fast and secure API with **tRPC**
- Database management with **Prisma** and **PostgreSQL**
- Modern and sleek UI with **NextUI** and **TailwindCSS**
- **React Query** for efficient network request management
- Easy configuration with `.env` file

## 📦 Installation & Setup

### 1️⃣ Prerequisites
Ensure you have the following installed before starting:
- [Node.js](https://nodejs.org/) (minimum version **16**)
- [PostgreSQL](https://www.postgresql.org/) (minimum version **12**)
- [pnpm](https://pnpm.io/) (for package management)

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/trx-payment.git
cd trx-payment
```

### 3️⃣ Install Dependencies
```bash
pnpm install
```

### 4️⃣ Configure Environment Variables
Rename `.env.example` to `.env` and fill in the required values:
```bash
cp .env.example .env
```
Update `DATABASE_URL` and other necessary settings according to your setup.

### 5️⃣ Set Up the Database
```bash
pnpm db:generate
pnpm db:migrate
```

### 6️⃣ Start the Development Server
```bash
pnpm dev
```

Now, you can access the application at **http://localhost:3000**. 🚀

## 📜 Useful Scripts
| Script | Description |
|----------|------------|
| `pnpm dev` | Run the project in development mode |
| `pnpm build` | Build the project for production |
| `pnpm start` | Start the project in production mode |
| `pnpm lint` | Check for coding standards |
| `pnpm typecheck` | Run TypeScript type checks |
| `pnpm db:studio` | Open Prisma Studio UI |
| `pnpm db:migrate` | Run database migrations |

## 🛠 Technologies Used
- **Next.js** (React framework)
- **Prisma** (ORM for database management)
- **tRPC** (Fast and type-safe API)
- **TronWeb** (For TRX blockchain transactions)
- **TailwindCSS** & **NextUI** (For UI design)
- **React Query** (For client-side data management)

## 🤝 Contributing
If you would like to contribute:
1. Fork this repository 🍴
2. Create a **new branch** for your changes: `git checkout -b feature-branch`
3. Make your changes and **commit** them: `git commit -m "Add new feature"`
4. **Push** your changes: `git push origin feature-branch`
5. Submit a **Pull Request**! 🚀

---
🌟 If you found this project helpful, don't forget to give it a ⭐ on GitHub!
