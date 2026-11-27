# MentorLagbe — Tuition Management Platform

MentorLagbe is a full-stack tuition management platform that connects students with tutors. Students can discover tuition opportunities and manage applications, tutors can publish tuition posts and manage applicants, and administrators can monitor and moderate the platform.

## Screenshots

### Home Page

**Full Page Preview**

<img src="./public/screenshots/01-home-full-page.png" width="420" alt="MentorLagbe home page" />

**Guest and Authenticated Views**

| Guest View | Authenticated View |
|---|---|
| <img src="./public/screenshots/05-home-guest.png" width="100%" alt="Guest home page" /> | <img src="./public/screenshots/04-home-authenticated.png" width="100%" alt="Authenticated home page" /> |

### Role-Based Dashboards

| Tutor Dashboard | Student Dashboard |
|---|---|
| <img src="./public/screenshots/02-tutor-dashboard.png" width="100%" alt="Tutor dashboard" /> | <img src="./public/screenshots/03-student-dashboard.png" width="100%" alt="Student dashboard" /> |

**Admin Dashboard**

<img src="./public/screenshots/06-admin-dashboard.png" width="100%" alt="Admin dashboard" />

### Pricing and Membership

**Full Page Preview**

<img src="./public/screenshots/07-pricing-full-page.png" width="420" alt="Pricing page" />

| Pricing Hero | Membership Highlights |
|---|---|
| <img src="./public/screenshots/08-pricing-hero.png" width="100%" alt="Pricing hero" /> | <img src="./public/screenshots/09-pricing-highlights.png" width="100%" alt="Membership highlights" /> |

| Membership Plans | CTA and Footer |
|---|---|
| <img src="./public/screenshots/10-pricing-plan-cards.png" width="100%" alt="Membership plans" /> | <img src="./public/screenshots/11-pricing-cta-footer.png" width="100%" alt="Pricing CTA and footer" /> |

### Find Tuitions

| Hero Section | Search and Results |
|---|---|
| <img src="./public/screenshots/12-find-tuitions-hero.png" width="100%" alt="Find tuitions hero" /> | <img src="./public/screenshots/13-find-tuitions-results.png" width="100%" alt="Tuition search results" /> |

## Features

- Role-based experiences for students, tutors, and administrators
- Student and tutor registration and authentication
- Browse and search approved tuition opportunities
- Tuition details and application management
- Tutor tuition posting and applicant management
- Admin dashboard and tuition moderation
- Student and tutor membership plans
- One-time membership checkout through Stripe
- User profile management
- Responsive interface and theme support

## Technology Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- HeroUI
- TanStack React Query
- React Hook Form and Zod
- Better Auth
- next-themes
- Lucide React

### Backend
- Node.js
- Express 5
- TypeScript
- MongoDB
- Better Auth
- Stripe
- Zod

## Project Structure

```text
mentorlagbe-client/
├── public/
│   └── screenshots/
├── src/
│   ├── app/
│   ├── components/
│   ├── config/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   └── types/
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js
- npm
- MentorLagbe backend running locally

### Installation

```bash
git clone https://github.com/arafat11223/mentorlagbe-client.git
cd mentorlagbe-client
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SITE_URL=
```

Set the appropriate local or deployed URLs. Never commit private credentials or secret values.

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Related Repository

**Backend:** [mentorlagbe-server](https://github.com/arafat11223/mentorlagbe-server)

## Project Status

The main platform features, role-based dashboards, tuition workflows, membership interface, and payment integration have been implemented. Stripe webhook-based payment confirmation still requires final end-to-end verification.

## License

Developed for educational and portfolio purposes.
