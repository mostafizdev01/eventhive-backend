🎉 Event Hive Backend

A modern event management backend powered by Node.js, Express.js, Prisma, and Stripe Payment Gateway.

🚀 Overview

Event Hive is a complete event management backend system where Admins, Hosts, and Users can seamlessly manage and participate in events.
This backend includes Authentication, Role-based Access, Event Management, Ticket Booking, Payment Integration, and Revenue Tracking.

🛠️ Tech Stack
| Category    | Technology                                    |
| ----------- | --------------------------------------------- |
| Runtime     | **Node.js**                                   |
| Framework   | **Express.js**                                |
| ORM         | **Prisma**                                    |
| Database    | PostgreSQL / MySQL / SQL Server (Your choice) |
| Payment     | **Stripe**                                    |
| Auth        | JWT + Bcrypt                                  |
| Validation  | Zod / Express-Validator                       |
| Environment | Dotenv                                        |

event-hive-backend/
│── src/
│   ├── app/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── user/
│   │   │   ├── event/
│   │   │   ├── eventJoin/
│   │   │   ├── payment/
│   │   │   └── dashboard/
│   ├── utils/
│   ├── middlewares/
│   ├── config/
│   └── server.ts
│── prisma/
│── package.json
│── README.md

🎭 Features
👤 Admin Dashboard

Admins can manage the entire platform:

User Management

Event Management

Payment & Revenue Overview

Delete/Block users

Update event categories

System monitoring

🧑‍💼 Host Dashboard

Hosts manage their own events:

Event Management

Create new events

Update event details

Delete event

Add/Edit ticket price, schedule, location

Manage event capacity

View join requests

See attendees & payment status

Attendee Control

View who joined

See payment status (paid/unpaid)

Mark "Offline Payment" as PAID

Revenue

Total event revenue

Event-wise revenue

Total tickets sold

🙋 User Dashboard

Normal attendee features:

Browse all events

Search + filter by date, price, city, category

Join an event

Online payment via Stripe

My Tickets / My Events

Upcoming events

Past attended events

Payment status tracking

💳 Payment System (Stripe Integrated)

✔ User clicks Join Event → Creates eventJoin record with UNPAID
✔ User proceeds to Stripe Checkout
✔ After payment success → paymentStatus = PAID
✔ Generates ticket confirmation

🧩 Database Schema (Important Models)
User

id

name

email

password

role (ADMIN / HOST / USER)

Event

hostId

title

description

category

price

capacity

location

date & time

EventJoin

userId

eventId

paymentStatus (UNPAID / PAID)

Payment

joinId

transactionId

amount

status

method

timestamp

⚙️ Installation
git clone https://github.com/mostafizdev01/event-hive-backend
cd event-hive-backend
npm install

🔧 Environment Variables (.env Example)
DATABASE_URL="your-postgres-url"
JWT_SECRET="your-secret"
STRIPE_SECRET_KEY="your-stripe-secret"
FRONTEND_URL="http://localhost:3000"

📌 API Highlights
Auth API

POST /auth/register

POST /auth/login

Event API

POST /events

GET /events/:id

GET /events

PATCH /events/:id

DELETE /events/:id

Event Join API

POST /events/:id/join

GET /user/joined-events

Payment API

POST /payment/create-checkout-session

POST /payment/webhook

👨‍💻 Author

Mostafiz
GitHub: https://github.com/mostafizdev01


⭐ Contributions

Pull requests are welcome!