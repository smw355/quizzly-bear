# Quiz Pack JSON Format Reference

This document provides the complete technical specification for creating quiz pack JSON files compatible with Quizzly Bear.

## 📋 Complete File Structure

```json
{
  "name": "Pack Name Here",
  "version": "1.0",
  "author": "Author Name",
  "description": "Brief description of the pack theme and content",
  "rounds": [
    {
      "round_number": 1,
      "theme_name": "Theme Name",
      "theme_description": "Brief description of round theme",
      "questions": [
        // 6 questions per round
      ]
    }
    // 10 rounds total
  ]
}
```

## 🔧 Question Type Specifications

### Text Answer Questions
```json
{
  "type": "text_answer",
  "question": "What is the capital of France?",
  "answer": "Paris",
  "explanation": "Paris has been the capital of France since 987 AD.",
  "points": 1
}
```

### Multiple Choice Questions
```json
{
  "type": "multiple_choice",
  "question": "Which planet is closest to the Sun?",
  "options": ["Mercury", "Venus", "Earth", "Mars"],
  "answer": "Mercury",
  "explanation": "Mercury orbits closest to the Sun at an average distance of 36 million miles.",
  "points": 1
}
```

### True/False Questions
```json
{
  "type": "true_false",
  "question": "The Great Wall of China is visible from space.",
  "answer": "false",
  "explanation": "This is a common myth. The Great Wall is not visible from space with the naked eye.",
  "points": 1
}
```

### Closest Number Questions
```json
{
  "type": "closest_number",
  "question": "In what year was the first iPhone released?",
  "answer": "2007",
  "explanation": "Apple released the first iPhone on June 29, 2007.",
  "scoring_type": "closest",
  "points": 1
}
```

### Image Questions
```json
{
  "type": "image",
  "question": "What landmark is shown in this image?",
  "image_path": "/images/eiffel-tower.jpg",
  "answer": "Eiffel Tower",
  "explanation": "The Eiffel Tower in Paris, completed in 1889 for the World's Fair.",
  "points": 1
}
```

## 📊 Question Type Distribution

### Required Distribution (60 questions total)
- **Text Answer**: 36 questions (60%)
- **Multiple Choice**: 12 questions (20%)
- **True/False**: 6 questions (10%)
- **Closest Number/Image**: 6 questions (10%)

### Recommended Round Variations
Don't use the same pattern every round. Mix it up:

```json
// Example Round 1: 4 text, 1 multiple choice, 1 true/false
// Example Round 2: 3 text, 2 multiple choice, 1 closest number
// Example Round 3: 4 text, 1 true/false, 1 image
// etc.
```

## 🎯 Complete Example Pack

Here's a minimal but complete example pack:

```json
{
  "name": "World Wonders Mini Pack",
  "version": "1.0",
  "author": "Quiz Master",
  "description": "A sample pack showcasing world landmarks and geography",
  "rounds": [
    {
      "round_number": 1,
      "theme_name": "Ancient Marvels",
      "theme_description": "Structures that have stood the test of time",
      "questions": [
        {
          "type": "text_answer",
          "question": "Which ancient wonder was located in Alexandria, Egypt?",
          "answer": "Lighthouse of Alexandria",
          "explanation": "The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World.",
          "points": 1
        },
        {
          "type": "multiple_choice",
          "question": "How many of the original Seven Wonders still exist today?",
          "options": ["None", "One", "Two", "Three"],
          "answer": "One",
          "explanation": "Only the Great Pyramid of Giza still exists in its original form.",
          "points": 1
        },
        {
          "type": "text_answer",
          "question": "In which country would you find Machu Picchu?",
          "answer": "Peru",
          "explanation": "Machu Picchu is an ancient Incan citadel located in Peru.",
          "points": 1
        },
        {
          "type": "true_false",
          "question": "The Colosseum in Rome could hold up to 80,000 spectators.",
          "answer": "true",
          "explanation": "The Colosseum had a capacity of 50,000-80,000 spectators.",
          "points": 1
        },
        {
          "type": "text_answer",
          "question": "What is the name of the famous stone circle in England?",
          "answer": "Stonehenge",
          "explanation": "Stonehenge is a prehistoric monument in Wiltshire, England.",
          "points": 1
        },
        {
          "type": "closest_number",
          "question": "In what year was the Great Wall of China's most famous sections built?",
          "answer": "1400",
          "explanation": "Most of the wall that exists today was built during the Ming Dynasty (1368-1644).",
          "scoring_type": "closest",
          "points": 1
        }
      ]
    }
    // 9 more rounds would follow...
  ]
}
```

## 🔒 Validation Rules

### Required Fields Validation
- ✅ `name` - String, 1-100 characters
- ✅ `version` - String, semantic version format
- ✅ `author` - String, 1-100 characters  
- ✅ `description` - String, 1-500 characters
- ✅ `rounds` - Array, exactly 10 objects

### Round Validation
- ✅ `round_number` - Integer, 1-10, sequential
- ✅ `theme_name` - String, 1-100 characters
- ✅ `theme_description` - String, 1-200 characters
- ✅ `questions` - Array, exactly 6 objects

### Question Validation
- ✅ `type` - Enum: "text_answer", "multiple_choice", "true_false", "closest_number", "image"
- ✅ `question` - String, 1-500 characters
- ✅ `answer` - String, 1-200 characters
- ✅ `explanation` - String, 1-1000 characters
- ✅ `points` - Integer, always 1

### Type-Specific Validation

#### Multiple Choice
- ✅ `options` - Array of exactly 4 strings
- ✅ `answer` - Must match one of the options exactly

#### True/False
- ✅ `answer` - Must be exactly "true" or "false" (lowercase)

#### Closest Number
- ✅ `scoring_type` - Must be "closest"
- ✅ `answer` - Must be a numeric string

#### Image
- ✅ `image_path` - Must be a valid relative path starting with "/"

## 🚨 Common JSON Errors to Avoid

### Syntax Errors
```json
// ❌ Wrong - Missing comma
{
  "name": "Test Pack"
  "version": "1.0"
}

// ✅ Correct
{
  "name": "Test Pack",
  "version": "1.0"
}
```

### Quote Issues
```json
// ❌ Wrong - Unescaped quotes in strings
"question": "What is the "best" answer?"

// ✅ Correct
"question": "What is the \"best\" answer?"
```

### Array/Object Confusion
```json
// ❌ Wrong - Using object instead of array for options
"options": {
  "a": "Option A",
  "b": "Option B"
}

// ✅ Correct
"options": ["Option A", "Option B", "Option C", "Option D"]
```

## 🛠️ Testing Your JSON

### Online Validators
- JSONLint.com
- JSON Formatter & Validator
- VS Code JSON validation

### File Testing
1. Save file with `.json` extension
2. Open in text editor with JSON support
3. Check for syntax highlighting errors
4. Validate structure against this specification
5. Test import in Quizzly Bear application

## 📁 File Organization

### Recommended Structure
```
quizpacks/
├── world-geography-v1.json
├── pop-culture-2000s.json
├── science-discoveries.json
└── local-history-pack.json
```

### Naming Conventions
- Use kebab-case (lowercase with hyphens)
- Include version numbers for updates
- Be descriptive but concise
- No spaces or special characters

## 🔄 Version Management

### Version Number Format
- Use semantic versioning: `MAJOR.MINOR.PATCH`
- Start with `1.0` for initial release
- Increment MINOR for content additions
- Increment PATCH for corrections/fixes

### Update Process
1. Create new file with incremented version
2. Update version field in JSON
3. Document changes in description or separate changelog
4. Test thoroughly before distribution

This specification ensures your quiz packs will be compatible with Quizzly Bear and provide the best possible quiz experience!