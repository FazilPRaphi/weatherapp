# Development Setup & Getting Started Guide

## Prerequisites

### System Requirements
- **macOS/Windows/Linux** (any OS for React Native development)
- **Node.js:** v16.x or higher
- **npm:** v8.x or higher (or yarn v1.22+)
- **Xcode:** 14.0+ (for iOS development on macOS)
- **Android Studio:** Latest version (for Android development)
- **RAM:** 8GB minimum (16GB recommended)
- **Disk Space:** 10GB minimum

---

## Installation Steps

### 1. Install Node.js & npm
```bash
# Check if already installed
node --version
npm --version

# If not installed, download from https://nodejs.org/
# Choose LTS version (18.x or 20.x)
```

### 2. Install Expo CLI
```bash
npm install -g expo-cli@latest

# Verify installation
expo --version
```

### 3. Clone Project (if from repository)
```bash
git clone <repository-url>
cd weather-app
```

### 4. Install Project Dependencies
```bash
npm install
# or
yarn install
```

### 5. Create Environment Variables
```bash
# In project root, create .env file
cp .env.example .env

# Edit .env and add:
# OPENWEATHERMAP_API_KEY=your_api_key_here
```

### 6. Setup for iOS Development (macOS only)
```bash
# Install CocoaPods dependencies
cd ios
pod install
cd ..

# If using Expo with bare workflow
npm install react-native-unimodules
```

### 7. Setup for Android Development
```bash
# Set ANDROID_HOME environment variable
# Windows:
setx ANDROID_HOME "%USERPROFILE%\AppData\Local\Android\Sdk"

# macOS/Linux (add to ~/.zshrc or ~/.bash_profile):
export ANDROID_HOME=$HOME/Library/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

---

## Running the App

### Option 1: Expo Go (Easiest - Development Only)
```bash
# Start development server
npm start
# or
expo start

# Scan QR code with Expo Go app on your phone
# iOS: Camera app → scan code
# Android: Expo Go app → scan code
```

### Option 2: iOS Simulator (macOS only)
```bash
npm start

# In terminal, press 'i' to open iOS Simulator
# Or manually:
cd ios
open WeatherApp.xcworkspace/
# Click Build → Run
```

### Option 3: Android Emulator
```bash
# Start Android emulator first from Android Studio
# or from command line:
emulator -avd <emulator_name>

npm start
# In terminal, press 'a' to run on Android Emulator
```

### Option 4: Physical Device (iOS)
```bash
# Requirements: Apple Developer account, iPhone
npm run build:ios
# or use Xcode build process
```

### Option 5: Physical Device (Android)
```bash
# Enable USB Debugging on Android device
# Connect device via USB
npm run build:android

# or
npx react-native run-android
```

---

## Project Structure Quick Reference

```
weather-app/
├── src/
│   ├── screens/          # App screens
│   ├── components/       # Reusable components
│   ├── services/         # Business logic
│   ├── store/            # Redux store
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Helper functions
│   ├── styles/           # Design system
│   ├── config/           # App configuration
│   └── App.js            # App entry point
├── assets/               # Images, icons, fonts
├── tests/                # Test files
├── .env.example          # Environment variables template
├── app.json              # Expo/React Native config
├── babel.config.js       # Babel configuration
└── package.json          # Project dependencies
```

---

## NPM Commands

### Development
```bash
# Start development server
npm start

# Clear cache and start
npm start -- --clear

# Debug in browser DevTools
npm start -- --web
```

### Testing
```bash
# Run unit tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Build & Release
```bash
# Build for iOS
npm run build:ios

# Build for Android
npm run build:android

# Create production bundle
npm run build:production
```

### Other
```bash
# Format code with Prettier
npm run format

# Lint code with ESLint
npm run lint

# Fix linting issues
npm run lint:fix

# Clean build cache
npm run clean
```

---

## Configuration Files

### .env (Environment Variables)
```bash
# OpenWeatherMap API
OPENWEATHERMAP_API_KEY=your_api_key_here

# API Base URLs
API_BASE_URL=https://api.openweathermap.org

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_CRASH_REPORTING=true
ENABLE_NOTIFICATIONS=true
```

### app.json (Expo/React Native Configuration)
Key settings:
- App name, slug, version
- iOS & Android-specific settings
- Permissions
- Plugins (Firebase, notifications, etc.)
- Deep linking configuration

### babel.config.js
Babel presets and plugins for:
- React Native transformation
- Module resolution (`@` alias for src/)
- Environment-specific transforms

---

## Debugging

### React DevTools
```bash
# Connect to the app
npm start

# In terminal, press 'd' for debugger
# Opens browser dev tools
```

### Flipper (Mobile Debugger)
1. Download Flipper: https://fbflipper.com/
2. Connect your device/emulator
3. Inspect app state, network, logs

### Console Logs
```javascript
// Use console.log, console.error, console.warn
console.log('Debug message:', data);

// Will appear in terminal and Flipper
```

### Redux DevTools
- Redux store actions visible in browser
- Time-travel debugging
- State comparison

---

## Common Issues & Solutions

### Issue: "react-native command not found"
```bash
# Solution: Install React Native CLI globally
npm install -g react-native-cli
```

### Issue: "Pod install fails on macOS"
```bash
# Solution: Clean and reinstall
cd ios
rm -rf Pods
rm Podfile.lock
pod install
cd ..
```

### Issue: "Android Emulator won't start"
```bash
# Solution: Kill existing process and restart
adb kill-server
adb start-server
emulator -avd <emulator_name>
```

### Issue: "API calls returning 401 (Unauthorized)"
```bash
# Solution: Check API key in .env file
# Ensure OpenWeatherMap API key is correct and active
```

### Issue: "Location permission denied"
```bash
# Solution: Grant permissions manually
# iOS: Settings → Weather App → Location → Always
# Android: Settings → Apps → Weather App → Permissions → Location
```

### Issue: "Metro bundler hangs"
```bash
# Solution: Clear cache and restart
npm start -- --clear
```

---

## Git Workflow

### Clone Repository
```bash
git clone https://github.com/your-org/weather-app.git
cd weather-app
```

### Create Feature Branch
```bash
git checkout -b feature/screen-name
# or
git checkout -b feature/api-integration
```

### Make Changes & Commit
```bash
git add .
git commit -m "feat: add weather screen component"
```

### Push & Create Pull Request
```bash
git push origin feature/screen-name
# Then create PR on GitHub
```

### Commit Message Convention
```
feat: add new feature
fix: fix a bug
docs: documentation changes
style: code style changes
refactor: refactor without feature change
test: add/update tests
chore: build/dependency changes
```

---

## IDE Setup Recommendations

### Visual Studio Code
**Extensions:**
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- React Native Tools
- Thunder Client (API testing)

**Settings (.vscode/settings.json):**
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Android Studio
- Install React Native components
- Configure Android SDK
- Setup emulator with Google Play API

### Xcode (macOS)
- Install development tools
- Install simulator
- Configure signing certificates

---

## API Key Setup

### Getting OpenWeatherMap API Key

1. Go to https://openweathermap.org/
2. Sign up for free account
3. Go to API Keys section
4. Copy default API key
5. Add to your `.env` file:
   ```
   OPENWEATHERMAP_API_KEY=your_key_here
   ```

### API Limits (Free Tier)
- 60 calls/minute
- 1,000 calls/day
- Hourly & daily forecast: 5 day limit

---

## Performance Tips

### Development
- Use Expo Go for rapid iteration
- Use physical device for testing (more realistic)
- Monitor bundle size regularly
- Profile app with React DevTools

### Testing
- Test on both iOS and Android
- Test on different screen sizes
- Test with poor internet connection
- Check battery consumption

---

## Resources

- **React Native Docs:** https://reactnative.dev
- **Expo Docs:** https://docs.expo.dev
- **Redux Docs:** https://redux.js.org
- **OpenWeatherMap API:** https://openweathermap.org/api
- **React Navigation:** https://reactnavigation.org

---

## Getting Help

### Before Asking for Help
1. Check error message carefully
2. Search issue tracker on GitHub
3. Check React Native/Expo documentation
4. Try clearing cache: `npm start -- --clear`

### Where to Get Help
- GitHub Issues: Report bugs and request features
- Stack Overflow: Tag `react-native`, `expo`, `redux`
- React Native Community Discord
- Expo Discord

---

## Next Steps

1. ✅ Complete setup following this guide
2. ✅ Test by running: `npm start`
3. ✅ Read PROJECT_PLAN.md for phase breakdown
4. ✅ Review ARCHITECTURE.md to understand project structure
5. ✅ Read DESIGN_SYSTEM.md for UI guidelines
6. ✅ Start Phase 1: Project Setup & Configuration

