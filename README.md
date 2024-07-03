## eight.js – A JavaScript Library for Musical Pattern Generation (Experimental)

eight.js is a work-in-progress JavaScript library designed for generating and manipulating musical patterns. Its primary goal is to create sequences that resemble those made by humans, with applications in light shows, percussion triggering, camera switching, and other event synchronization. 

### Current Status

This is an experimental project in its early stages.  

### Features

- Create patterns from arrays or functions.
- Perform mathematical operations on patterns (e.g., addition, multiplication).
- Generate random, rhythmic, and dynamically evolving patterns.
- Calculate statistics such as min, max, and average.
- Visualize patterns as ASCII graphs (helpful for debugging and understanding the output).

### Potential Applications

- **Live Events:** Automate light shows, percussion triggers, and camera cuts in sync with music.
- **Music Production:** Generate rhythmic variations or interesting sequences for drum tracks.
- **Interactive Installations:** Create dynamic, responsive patterns based on external input.

### Installation

1. Clone: `git clone https://github.com/YOUR_USERNAME/eight.js.git` (Replace with your actual repo URL)
2. Install dependencies (if any): `npm install` 

### Usage

Import the `MetaPattern` class and use it to create and manipulate patterns:

```javascript
import { MetaPattern } from 'eight.js';

const myPattern = MetaPattern.spiked(4);  // Create a spiked pattern
myPattern.logInfo(); // Visualize the pattern
```

### Contributing

Contributions are welcome! Feel free to open issues or pull requests.

### License

ISC License
