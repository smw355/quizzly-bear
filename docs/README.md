# Quizzly Bear Documentation

Welcome to the Quizzly Bear documentation! This folder contains comprehensive guides for creating high-quality quiz packs and understanding the application structure.

## 📚 Documentation Index

### For Quiz Pack Creators

#### [🤖 AI Question Creation & Proofing Guide](./AI-Question-Creation-Guide.md)
**The complete prompt and guidelines for AI systems to create excellent quiz packs**
- Detailed instructions for AI quiz creation
- Comprehensive quality standards and best practices
- Mandatory proofing checklist
- Common pitfalls to avoid
- Creative theme ideas and examples

#### [📄 Quiz Pack JSON Format Reference](./Quiz-Pack-JSON-Format.md)
**Technical specification for quiz pack file format**
- Complete JSON structure documentation
- Question type specifications and examples
- Validation rules and requirements
- Common errors and how to avoid them
- File organization and naming conventions

### Quick Start for Quiz Creators

1. **Read the AI Guide** - Understand quality standards and requirements
2. **Follow the JSON Format** - Use the technical specification for proper file structure
3. **Create Your Pack** - Build 10 rounds with 6 questions each (60 total)
4. **Apply the Proofing Checklist** - Ensure accuracy, theme integrity, and engagement
5. **Test Your Pack** - Import into Quizzly Bear and verify functionality

## 🎯 Quality Standards Summary

### Question Distribution (60 questions total)
- **60% Text Answer** (36 questions) - Main knowledge testing
- **20% Multiple Choice** (12 questions) - Recognition and elimination
- **10% True/False** (6 questions) - Quick fact checking
- **10% Closest Number/Image** (6 questions) - Estimation and visual

### Difficulty Balance
- **30% Easy** - General knowledge accessible to most players
- **50% Medium** - Requires specific knowledge or thought
- **20% Hard** - Specialist knowledge that's still fair

### Theme Requirements
- **Subtle naming** - Themes shouldn't give away answers
- **Cohesive content** - Questions relate but aren't repetitive
- **Creative connections** - Unexpected but logical associations
- **Educational value** - Players learn while being entertained

## 🏗️ Application Architecture

### Core Components
- **React + TypeScript** - Modern web application framework
- **Electron** - Desktop application wrapper
- **SQLite** - Local database for game storage
- **Vite** - Build tool and development server

### Key Directories
```
src/
├── components/          # React components
│   ├── game/           # Game flow and display components
│   ├── management/     # Pack management interface
│   ├── questions/      # Question type components
│   └── setup/          # Game and team setup
├── data/               # Built-in quiz packs
├── types/              # TypeScript type definitions
└── utils/              # Game logic and utilities

quizpacks/              # External quiz pack files
docs/                   # This documentation
```

### Data Flow
1. **Pack Selection** - Choose from built-in or imported packs
2. **Team Setup** - Configure participating teams
3. **Game Flow** - Round intro → Questions → Answers → Scoring → Leaderboard
4. **Pack Management** - Import, export, create, and edit packs

## 🎮 Game Features

### Question Types Supported
- **Text Answer** - Free text input with fuzzy matching
- **Multiple Choice** - Four options with single correct answer
- **True/False** - Binary choice questions
- **Closest Number** - Numerical estimation with closest-wins scoring
- **Image Questions** - Visual content with text answers

### Game Flow
- **Keyboard Navigation** - Spacebar advances through game phases
- **Team Scoring** - Real-time score tracking and leaderboards
- **Round Structure** - Themed rounds with 6 questions each
- **Answer Reveals** - Show all answers at end of each round

### Pack Management
- **Import/Export** - JSON file format for sharing packs
- **Pack Editor** - Create and modify packs within the application
- **Validation** - Automatic checking of pack format and content
- **Library Management** - Organize and activate/deactivate packs

## 🚀 Getting Started

### For Developers
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` for development mode
4. Run `npm run build` to create production build
5. Run `npm run electron-dev` to test desktop application

### For Quiz Masters
1. Use existing built-in packs (Bear Essentials, Quirky Questions)
2. Import community-created packs from JSON files
3. Create custom packs using the pack editor
4. Host quiz nights with projection setup

### For Content Creators
1. Read the AI Question Creation Guide thoroughly
2. Use the JSON format specification for technical details
3. Create engaging, accurate content following quality standards
4. Test your packs before sharing with the community

## 🤝 Contributing

### Code Contributions
- Follow TypeScript best practices
- Maintain existing code style and patterns
- Add tests for new functionality
- Update documentation for changes

### Content Contributions
- Create high-quality quiz packs following our guidelines
- Share interesting themes and creative question ideas
- Report factual errors or improvements for existing packs
- Help improve documentation and guides

## 📞 Support

For questions, issues, or contributions:
- Review the documentation in this folder
- Check the application's built-in help and examples
- Follow the quality standards for consistent experience
- Test thoroughly before sharing content

Happy quiz creating! 🐻✨