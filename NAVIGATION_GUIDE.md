# 🗺️ TravelMate AI - Navigation Guide

## App Structure

```
Homepage (/)
├── Hero Section
├── Recommended Places Grid
├── Recommended Stays Grid
├── Footer
└── Auth Modal (on first visit)

Header (On all pages)
├── Logo (links to /)
├── Search Bar (navigates to /search?q=query)
├── Navigation Links:
│   ├── "Explore" → /recommendations
│   ├── "Build Trip" → /itinerary-builder
│   └── Account Button
│       ├── Login/Register
│       └── Profile (if logged in)
```

---

## 📍 Page Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | HomePage | Landing page with recommendations |
| `/profile` | ProfilePage | User profile, itineraries, saved destinations |
| `/recommendations` | RecommendationsPage | Browse & filter destinations |
| `/itinerary-builder` | ItineraryBuilderPage | Create day-by-day trip plans |
| `/destination/:id` | DestinationDetailPage | View full destination info, reviews |
| `/search?q=query` | SearchResultsPage | Search results with multiple view modes |

---

## 🎯 User Flow Examples

### Example 1: Finding a Beach Destination
```
Homepage
  ↓
Click "Explore" in Header
  ↓
RecommendationsPage
  - Filter by: Beach interest, Budget ₱2000
  - See: Boracay, Palawan, Camiguin
  ↓
Click "View Details" on Boracay
  ↓
DestinationDetailPage
  - View photos, costs, accommodations, reviews
  - Click "Write Review" to rate
  - Click "Add to Itinerary" to plan trip
  ↓
ItineraryBuilderPage
  - Continue building trip or save destination
```

### Example 2: Planning a Trip
```
Homepage or Header
  ↓
Click "Build Trip"
  ↓
ItineraryBuilderPage
  - Enter trip name: "Summer Vacation"
  - Set dates: July 1 - 15
  - Click "Add Destination"
  ↓
Destination Modal
  - Search "Beach"
  - Click Boracay Island
  ↓
Back to Builder
  - Add activities, notes
  - Click "Add Destination" again for Day 2
  - Repeat for all days
  ↓
Click "Save Itinerary"
  - Saved to Profile → My Itineraries
  ↓
Optional: Click "Export PDF" or "Share Link"
```

### Example 3: Searching for Specific Place
```
Header Search Bar
  ↓
Type "Palawan"
  ↓
SearchResultsPage
  - See all results matching "Palawan"
  - Sort by: Rating, Cost, Relevance
  - Switch view: Grid ↔️ List
  ↓
Click on any result
  ↓
DestinationDetailPage
```

---

## 🔄 Data Flow

### Authentication
```
Register/Login on Homepage
  ↓
Data → localStorage (travelmate_user, travelmate_logged_in)
  ↓
Header updates with user name/initial
  ↓
Custom event dispatch (travelmate:auth-changed)
  ↓
All pages sync user state
```

### Saving Destinations
```
Click ❤️ Heart Button
  ↓
Local component state updated
  ↓
(Optional: Can be enhanced to save to localStorage)
```

### Saving Reviews
```
DestinationDetailPage
  ↓
Click "Write Review"
  ↓
Enter rating (1-5 stars) + comment
  ↓
Click "Submit Review"
  ↓
Data → localStorage (travelmate_recommendations)
  ↓
Visible in Profile → Saved & Rated tab
```

### Creating Itineraries
```
ItineraryBuilderPage
  ↓
Fill trip details (name, dates)
  ↓
Add destinations with daily activities
  ↓
Click "Save Itinerary"
  ↓
Data → localStorage (travelmate_itineraries)
  ↓
Visible in Profile → My Itineraries tab
```

---

## 🛠️ Key Features Checklist

### Recommendations Page
- [x] Interest filters (Beach, Adventure, Nature, etc.)
- [x] Budget slider
- [x] Region dropdown filter
- [x] Sort options
- [x] Accommodation details (expandable)
- [x] Save/favorite functionality
- [x] Map links
- [x] View Details button

### Itinerary Builder
- [x] Trip name input
- [x] Date range picker (auto-calculates days)
- [x] Add destination with travel time
- [x] Daily activities management
- [x] Notes per day
- [x] Travel tips sidebar
- [x] Save itinerary
- [x] Export PDF
- [x] Share link

### Destination Details
- [x] High-res photo gallery
- [x] Full description
- [x] Cost breakdown table
- [x] Accommodation recommendations
- [x] User review section
- [x] Write review form
- [x] Related destinations
- [x] Add to itinerary button

### Search Results
- [x] Multi-field search
- [x] Grid view
- [x] List view toggle
- [x] Multiple sort options
- [x] Save destinations
- [x] No results handling
- [x] Result count

---

## 💡 Tips for Users

1. **Start with Explore**
   - Browse all destinations first
   - See what interests you

2. **Use Filters Effectively**
   - Combine interests with budget
   - Filter by region for focused search

3. **Save as You Go**
   - Heart icon to save destinations
   - Write reviews to remember experiences

4. **Build Complete Itineraries**
   - Use Builder for day-by-day planning
   - Add activities and notes
   - Export for offline access

5. **Check Related Destinations**
   - See similar places on detail page
   - Discover new alternatives

---

## 🔐 Persistence (localStorage)

All user data is saved in browser's localStorage:

```
travelmate_user           → User profile & preferences
travelmate_logged_in      → Login status
travelmate_itineraries    → Created trip plans
travelmate_recommendations → User reviews & ratings
```

Data persists across browser sessions!
Clearing browser data will reset everything.

---

## 🎨 Design System

- **Colors**: Primary (Blue), Danger (Red), Info (Cyan), Success (Green)
- **Components**: Bootstrap 5 cards, buttons, forms, modals
- **Icons**: React Icons (18-24px, color-coded)
- **Spacing**: Bootstrap grid system with responsive breakpoints
- **Layout**: Sticky header, collapsible filters, sticky sidebars

---

## 🚀 Performance Tips

1. **Search is fast** - Client-side filtering, no network delay
2. **Filtering is instant** - Real-time updates as you adjust settings
3. **Navigation is smooth** - React Router handles routing
4. **Data loads immediately** - localStorage is synchronous
5. **Images are optimized** - Using Unsplash CDN with query params

---

## ❓ FAQ

**Q: How do I export my itinerary?**
A: In the Itinerary Builder, click "Export PDF" button. Ready for backend integration.

**Q: Can I share my itinerary?**
A: Yes! Click "Share Link" to generate a shareable URL (currently generates link format).

**Q: Where do my reviews go?**
A: Saved to Profile → Saved & Rated tab automatically.

**Q: How do I delete an itinerary?**
A: Go to Profile → My Itineraries → Click delete button on any itinerary.

**Q: Can I book directly?**
A: Currently "Book Now" buttons are placeholders for future backend integration.

---

## 📞 Support

For issues or feature requests, navigate back to Homepage and try:
1. Clearing filters
2. Trying different search terms
3. Check Profile for saved data
4. Logout and login again if needed

All data is safely stored in your browser! 🎉
