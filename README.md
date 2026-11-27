# MentorLagbe — Find Tutors. Build Futures.

MentorLagbe is a full-stack tuition management platform designed to connect students with tutors through a structured, role-based system.

Students can explore tuition opportunities and manage applications, tutors can publish and manage tuition posts, and administrators can review and approve tuition listings.

## Key Features

### Authentication and User Accounts
- Student and Tutor registration
- Email/password authentication
- Role-based access
- User profile management

### Student Features
- Browse available tuition opportunities
- View tuition details
- Apply for tuition opportunities
- Manage submitted applications
- View payment history
- Manage profile

### Tutor Features
- Create and manage tuition posts
- Edit existing tuition posts
- Manage applicants
- View payment history
- Manage profile
- Free plan posting limit
- Pro membership option

### Admin Features
- Admin dashboard
- Review and approve tuition posts
- Manage tuition listings
- Admin profile

### Platform Features
- Responsive interface
- Dashboard navigation
- Light and dark theme support
- Form validation
- Notifications
- Loading, error, and not-found states
- Pricing and membership pages
- Stripe Checkout integration

## Technology Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI Components | HeroUI |
| Authentication | Better Auth |
| Data Fetching | TanStack React Query |
| Forms | React Hook Form |
| Validation | Zod |
| Notifications | Sonner |
| Icons | Lucide React |
| Theme | next-themes |

## Project Structure

```text
mentorlagbe-client/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (public)/
│   │   ├── about/
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   ├── student/
│   │   │   └── tutor/
│   │   ├── payment/
│   │   ├── pricing/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── tuitions/
│   ├── components/
│   ├── config/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   └── types/
├── package.json
└── README.md
```

## Application Pages

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/about` | About page |
| `/tuitions` | Tuition listings |
| `/tuitions/[id]` | Tuition details |
| `/pricing` | Membership pricing |
| `/sign-in` | Sign-in |
| `/sign-up` | Sign-up |
| `/signin` | Sign-in route |
| `/signup` | Sign-up route |
| `/dashboard/student` | Student dashboard |
| `/dashboard/student/applications` | Student applications |
| `/dashboard/student/payments` | Student payment history |
| `/dashboard/student/profile` | Student profile |
| `/dashboard/tutor` | Tutor dashboard |
| `/dashboard/tutor/tuitions` | Tutor tuition management |
| `/dashboard/tutor/tuitions/new` | Create tuition |
| `/dashboard/tutor/applicants` | Applicant management |
| `/dashboard/tutor/payments` | Tutor payment history |
| `/dashboard/tutor/profile` | Tutor profile |
| `/dashboard/admin` | Admin dashboard |
| `/dashboard/admin/tuitions` | Admin tuition management |
| `/dashboard/admin/profile` | Admin profile |
| `/payment/success` | Checkout return page |

## Getting Started

### Prerequisites

- Node.js
- npm
- MentorLagbe backend running locally

### 1. Clone the repository

```bash
git clone https://github.com/arafat11223/mentorlagbe-client.git
cd mentorlagbe-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Use the correct backend URL for your environment.

### 4. Start the development server

```bash
npm run dev
```

Open:

http://localhost:3000

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Backend Integration

The frontend communicates with the MentorLagbe Express API.

Default local API URL:

`http://localhost:5000`

Configure `NEXT_PUBLIC_API_URL` when using another backend environment.

## Payment Integration

MentorLagbe uses Stripe Checkout for one-time membership payments.

- Student Pro: USD 10
- Tutor Pro: USD 15
- Payment mode: One-time payment
- Membership activation: Verified backend webhook

**Testing status:** Stripe Sandbox checkout and webhook verification are still pending final end-to-end confirmation. Do not treat a pending payment page as proof of successful membership activation.

## Related Repository

Backend repository:

https://github.com/arafat11223/mentorlagbe-server

## Project Status

Frontend implementation and dashboard UX work are complete. Final Stripe Sandbox verification remains pending.

## License

This repository is maintained as a portfolio project.
