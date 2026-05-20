# 🌍 TravelSplit

A dynamic travel management app that simplifies expense tracking and splitting for group trips. Never worry about calculating who owes whom again!

**Live Demo:** [tra-split.vercel.app](https://tra-split.vercel.app/)



https://github.com/user-attachments/assets/4c2a11b0-c45d-4ac1-b08f-d475b7481683



## ✨ Features

### 💼 Trip Management
- **Create & Manage Trips**: Plan multiple trips with titles, descriptions, and cover images
- **Active/Completed Tracking**: Organize trips by status for easy management
- **Rich Trip Details**: Store comprehensive trip information including dates and member details
- **Real-time Updates**: All changes are instantly synced and persisted

### 💰 Expense Tracking
- **Easy Expense Logging**: Add expenses with amount, category, date, and payer information
- **Smart Splitting**: Automatically split expenses among trip members
- **Expense Categories**: Organize expenses by food, accommodation, transport, activities, and more
- **Expense History**: View all expenses with detailed information and timestamps

### 👥 Member Management
- **Add/Remove Members**: Dynamically manage trip participants
- **Member Profiles**: Store member names and email addresses
- **Automatic Balance Tracking**: Calculate who owes whom in real-time
- **Expense Contributions**: Track each member's spending contributions

### 📊 Settlement & Analytics
- **Smart Settlement System**: Get clear settlement recommendations for payment flows
- **Balance Calculation**: Visual indicators showing who's owed money or who owes
- **Per-Person Breakdown**: Automatic calculation of expense per participant
- **Quick Stats**: Dashboard with active trips, total members, and total expenses

### 📱 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Intuitive UI**: Clean, modern interface with smooth transitions
- **Dashboard Overview**: Quick access to all trips with status indicators
- **Organized Tabs**: Separate views for Overview, Expenses, and Members

## 🛠 Tech Stack

- **Frontend Framework**: React 18.3
- **Language**: TypeScript 5.5
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Lucide React Icons
- **Database**: Supabase (optional backend support)
- **Styling Utilities**: PostCSS & Autoprefixer
- **Linting**: ESLint with TypeScript support

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/akash2v/travel-split.git
   cd travel-split
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be created in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run typecheck` | Run TypeScript type checking |

## 📂 Project Structure

```
travel-split/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.tsx     # Main trip listing page
│   │   ├── TripDetails.tsx   # Individual trip management
│   │   ├── TravelPlanModal.tsx
│   │   ├── ExpenseModal.tsx
│   │   ├── SettlementModal.tsx
│   │   ├── EditTripModal.tsx
│   │   ├── AddMemberModal.tsx
│   │   ├── TripCard.tsx
│   │   └── ...other components
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   ├── types.ts             # TypeScript type definitions
│   └── index.css            # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🔑 Key Components

### Dashboard
- Display all trips with quick stats
- Create new trips
- Filter by active/completed status
- Quick access to trip details

### Trip Details
- **Overview Tab**: Recent expenses and member summary with balances
- **Expenses Tab**: Complete expense history with detailed breakdowns
- **Members Tab**: Member profiles with contribution tracking

### Modals
- **Travel Plan Modal**: Create new trips with rich details
- **Expense Modal**: Add and categorize expenses
- **Settlement Modal**: View settlement calculations
- **Member Modal**: Add trip participants
- **Edit Modal**: Modify trip information

## 💾 Data Persistence

- **Local Storage**: All trip data is automatically saved to browser's localStorage
- **Automatic Sync**: Changes are persisted immediately as you make updates
- **Data Recovery**: Graceful error handling with automatic cleanup of corrupted data

## 🎨 Design Features

- **Modern UI**: Gradient backgrounds and smooth animations
- **Responsive Layout**: Mobile-first design that scales beautifully
- **Accessibility**: Semantic HTML and icon-based visual feedback
- **Dark Mode Ready**: CSS infrastructure for future dark mode support

## 🔐 Data Storage

Currently, TravelSplit uses browser localStorage for data persistence. In the future, integration with Supabase will allow for:
- Cloud-based data storage
- Cross-device synchronization
- Real-time collaboration
- Secure data backup

## 📊 Currency Support

- Default currency: Indian Rupee (₹)
- Displays formatted numbers for better readability
- Easily customizable for other currencies

## 🐛 Known Limitations

- Data is stored locally in browser storage (max ~10MB depending on browser)
- No real-time sync across devices (local storage only)
- No user authentication currently implemented
- Settlement calculations assume equal split unless otherwise specified

## 🗺 Roadmap

- [ ] Cloud sync with Supabase
- [ ] User authentication and accounts
- [ ] Multi-currency support
- [ ] Expense categories with custom colors
- [ ] Payment reminders and notifications
- [ ] Export trip reports as PDF
- [ ] Unequal expense splitting
- [ ] Dark mode
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by [Akash](https://github.com/akash2v)

---

## 🎯 Quick Tips

- **Split Equally**: The app automatically splits each expense equally among all trip members
- **Track Balances**: Each member's balance is calculated automatically based on what they paid vs. their share
- **Settlement View**: Use the Settlement button to see who needs to pay whom
- **Complete Trip**: Mark a trip as completed when it's over to archive it from active trips

---

Made with ❤️ by [Skytup](https://github.com/akash2v) - Professional Travel Expense Management Solutions

**Questions or Issues?** Feel free to open an issue on GitHub!
