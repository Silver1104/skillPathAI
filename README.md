# ConvexAuth Web-App - SkillPath.AI

This web application allows users to search for learning resources on specific topics. Users can search for courses, YouTube videos, and Google Books related to a particular subject. Authentication is handled using ConvexAuth, ensuring that users can securely log in and access the platform.

## Features

- **User Authentication:** Secure login and registration using ConvexAuth.
- **Course Search:** Search for relevant courses on Coursera.
- **YouTube Videos:** Get a list of YouTube videos based on the search query.
- **Google Books:** Find books related to the search topic using the Google Books API.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend:** React, TypeScript, CSS
- **Backend:** Node.js, Express (ConvexAPI)
- **Authentication:** ConvexAuth
- **APIs:** 
  - Coursera
  - YouTube Data API v3
  - Google Books API
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js and npm installed
- A ConvexAuth account set up with your API keys
- API keys for YouTube and Google Books

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/skillpathAI.git
   cd skillpathAI
   npm install
   npx convex dev
   npx @convex/auth
   npm run deploy
   
## Note:

Relevant and necessary API Keys. SITE_URL will vary depending on on localhost or is deployed:
![Screenshot (621)](https://github.com/user-attachments/assets/547e78e3-5225-4bea-948d-81c265fa9555)


### For detailed instructions on Convex setup, visit https://docs.convex.dev/home
