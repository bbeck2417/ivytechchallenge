# Ivy Tech Challenge - Joke Generator

A simple web application that displays random jokes with separate setup and punchline reveals.

## Features

- Random joke generation
- Two-button interface:
  - "Get New Joke" button to fetch a new random joke
  - "Show Punchline" button to reveal the punchline
- Clean, responsive design
- Jokes stored in a simple flat file format

## Getting Started

### Prerequisites

- Node.js (download from [nodejs.org](https://nodejs.org/))
- Git (download from [git-scm.com](https://git-scm.com/))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bbeck2417/ivytechchallenge.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ivytechchallenge
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and visit:
   ```
   http://localhost:3000
   ```

### Adding New Jokes

Jokes are stored in `data/jokes.txt`. Each joke is on a new line with the setup and punchline separated by a pipe character (|).

Example format:
```
Why did the chicken cross the road?|To get to the other side!
What do you call a bear with no teeth?|A gummy bear!
```

## Technologies Used

- Node.js
- Express.js
- HTML5
- CSS3
- JavaScript

## License

ISC
