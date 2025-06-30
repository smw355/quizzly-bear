# Contributing to Quizzly Bear 🐻

Thank you for your interest in contributing to Quizzly Bear! This guide will help you get started with contributing to this open-source pub quiz application.

## 🎯 Ways to Contribute

### 🐛 Bug Reports
Found a bug? Help us fix it!
- Check [existing issues](https://github.com/smw355/quizzly-bear/issues) first
- Use the bug report template
- Include steps to reproduce, expected behavior, and screenshots if applicable

### 💡 Feature Requests
Have an idea for improvement?
- Check [existing discussions](https://github.com/smw355/quizzly-bear/discussions)
- Use the feature request template
- Explain the use case and why it would benefit quiz hosts

### 📦 Quiz Pack Contributions
Share your quiz expertise!
- Follow our [Pack Creation Guide](docs/creating-quiz-packs.md)
- Submit packs to the [community-packs](community-packs/) directory
- Ensure original content or proper attribution

### 💻 Code Contributions
Help improve the application!
- Fix bugs, add features, improve performance
- Follow our coding standards and testing guidelines

## 🚀 Getting Started

### Development Setup
1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/yourusername/quizzly-bear.git
   cd quizzly-bear
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Start** development server:
   ```bash
   npm run electron-dev
   ```

### Making Changes
1. **Create** a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make** your changes
3. **Test** thoroughly
4. **Commit** with clear messages:
   ```bash
   git commit -m "Add: brief description of changes"
   ```

## 📦 Quiz Pack Guidelines

### Content Standards
- ✅ **Original Content**: Create your own questions or use public domain sources
- ✅ **Factual Accuracy**: Verify all answers and explanations
- ✅ **Clear Questions**: Avoid ambiguous wording or trick questions
- ✅ **Appropriate Content**: Family-friendly, inclusive, and respectful
- ✅ **Balanced Difficulty**: Mix of easy, medium, and hard questions

### Pack Structure
```json
{
  "name": "Your Pack Name",
  "version": "1.0",
  "author": "Your Name",
  "description": "Brief description of the pack theme",
  "rounds": [
    {
      "round_number": 1,
      "theme_name": "Theme Name",
      "theme_description": "Description of the round theme",
      "questions": [
        // 5-6 questions with varied types
      ]
    }
  ]
}
```

### Question Types Guidelines

#### Text Answer
```json
{
  "type": "text_answer",
  "question": "Clear, unambiguous question?",
  "answer": "Exact expected answer",
  "explanation": "Brief explanation with context",
  "points": 1
}
```

#### Multiple Choice
```json
{
  "type": "multiple_choice",
  "question": "Question with 4 options?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "Option A",
  "explanation": "Why this answer is correct",
  "points": 1
}
```

#### True/False
```json
{
  "type": "true_false",
  "question": "Statement to evaluate.",
  "answer": "true",
  "explanation": "Explanation of the fact",
  "points": 1
}
```

#### Closest Number
```json
{
  "type": "closest_number",
  "question": "Numerical question?",
  "answer": "123",
  "explanation": "Context about the number",
  "scoring_type": "closest",
  "points": 1
}
```

### Submission Process
1. **Create** your pack following the guidelines
2. **Test** it thoroughly in the application
3. **Place** the JSON file in `community-packs/[category]/`
4. **Add** entry to `community-packs/README.md`
5. **Submit** a Pull Request with:
   - Clear title describing the pack
   - Description of the theme and target audience
   - Confirmation that content is original or properly attributed

## 🛠️ Code Contribution Guidelines

### Code Style
- Use TypeScript for type safety
- Follow existing code patterns and conventions
- Write clear, descriptive variable and function names
- Add comments for complex logic

### Testing
- Test your changes thoroughly
- Ensure the app builds successfully
- Test on multiple platforms when possible
- Verify quiz pack import/export still works

### Pull Request Process
1. **Update** documentation if needed
2. **Add** tests for new features
3. **Ensure** all builds pass
4. **Write** clear PR description explaining:
   - What changes were made
   - Why they were made
   - How to test them

## 🏗️ Project Structure

```
quizzly-bear/
├── src/                    # React application source
│   ├── components/         # React components
│   ├── data/              # Built-in quiz pack data
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── electron/              # Electron main process
├── quizpacks/            # Sample quiz packs
├── community-packs/      # Community-contributed packs
├── docs/                 # Documentation
└── build/                # Build configuration and icons
```

## 📝 Coding Standards

### TypeScript
- Use strict typing
- Define interfaces for all data structures
- Avoid `any` types when possible

### React
- Use functional components with hooks
- Follow React best practices
- Keep components focused and reusable

### File Organization
- Group related functionality together
- Use descriptive file and folder names
- Keep components, types, and utilities separate

## 🤝 Community Guidelines

### Be Respectful
- Welcome newcomers and help them get started
- Provide constructive feedback
- Respect different perspectives and approaches

### Be Collaborative
- Discuss major changes before implementing
- Ask for help when you need it
- Share knowledge and help others learn

### Be Patient
- Remember that contributors volunteer their time
- Reviews may take time
- Be understanding of different skill levels

## 🎉 Recognition

Contributors will be recognized in:
- The main README.md file
- Release notes for their contributions
- Special thanks in the application's about section

## 📞 Getting Help

- 💬 **Discussions**: Ask questions in [GitHub Discussions](https://github.com/smw355/quizzly-bear/discussions)
- 📖 **Documentation**: Check the [docs](docs/) folder
- 🐛 **Issues**: Report problems via [GitHub Issues](https://github.com/smw355/quizzly-bear/issues)

---

Thank you for helping make Quizzly Bear better for quiz hosts everywhere! 🐻✨