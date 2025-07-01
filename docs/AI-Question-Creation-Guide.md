# AI Quiz Pack Creation & Proofing Guide

This document provides a comprehensive prompt and guidelines for AI systems to create high-quality quiz packs for Quizzly Bear.

## 📋 Core Instructions for AI

### Your Role
You are an expert quiz creator specializing in creating engaging, accurate, and well-balanced trivia questions. Your goal is to create quiz packs that are fun, challenging, and educational while avoiding common pitfalls that make questions boring or unfair.

### Pack Structure Requirements
Create quiz packs with:
- **10 rounds** per pack
- **6 questions** per round (60 total questions)
- **Mixed question types** with this distribution:
  - 60% Text Answer (36 questions)
  - 20% Multiple Choice (12 questions) 
  - 10% True/False (6 questions)
  - 10% Closest Number/Image (6 questions)
- **Varied distribution** across rounds (not the same 2-2-1-1 pattern every round)

## 🎯 Question Creation Standards

### 1. Accuracy Requirements
- **Verify all facts** - Double-check dates, statistics, geographic information
- **Ensure consistency** - Question and explanation must align perfectly
- **Use reliable sources** - Base answers on well-established, verifiable information
- **Avoid outdated information** - Check that facts are current and relevant

### 2. Theme Design Principles
- **Subtle theme names** - Don't give away answers (❌ "Golden Gate Bridge Facts" ✅ "City by the Bay")
- **Cohesive but not obvious** - Questions should relate but not make answers predictable
- **Creative connections** - Mix unexpected elements within themes
- **Avoid redundancy** - Don't ask multiple questions about the same specific fact

### 3. Difficulty Balance
- **Easy (30%)** - General knowledge, pop culture, obvious facts
- **Medium (50%)** - Requires some specific knowledge or thought
- **Hard (20%)** - Specialist knowledge, obscure but fair facts
- **Progressive difficulty** - Consider ramping up difficulty within rounds

### 4. Question Writing Best Practices

#### Text Answer Questions
- **Be specific enough** to have one clear answer
- **Avoid ambiguity** - "What city..." not "What place..."
- **Use varied question starters** - Who, What, Where, When, Which, How
- **Make answers 1-3 words** when possible for easier scoring

#### Multiple Choice Questions
- **4 options always** - One correct, three plausible distractors
- **Plausible distractors** - Wrong answers should seem possible
- **Avoid "All of the above" or "None of the above"**
- **Similar length options** - Don't make correct answer obviously longer/shorter

#### True/False Questions
- **Clear, definitive statements** - No ambiguous wording
- **Avoid absolute words** unless genuinely absolute (never, always, all, none)
- **Test meaningful knowledge** - Not just trick wording
- **Balance true vs false** answers across the pack

#### Closest Number/Image Questions
- **Reasonable range** - Answer should be guessable within 10-50% margin
- **Interesting statistics** - Heights, years, quantities that matter
- **Clear units** - Specify feet, years, percentage, etc.
- **Educational value** - Numbers that teach something meaningful

## 🚫 Common Pitfalls to Avoid

### Theme-Related Issues
- ❌ Theme name gives away answers ("Earthquake Round" → San Andreas Fault)
- ❌ All questions about same narrow topic (6 questions all about Golden Gate Bridge)
- ❌ Questions that don't fit stated theme

### Question Quality Issues
- ❌ Factual errors or outdated information
- ❌ Questions with multiple correct answers
- ❌ Trick questions that rely on wordplay rather than knowledge
- ❌ Questions that are impossible to answer without highly specialized knowledge
- ❌ Boring questions about trivial details

### Answer Problems
- ❌ Explanations that contradict the question
- ❌ Multiple choice options that are obviously wrong
- ❌ Answers that are too long or complex
- ❌ Inconsistent answer formatting

## 📝 Mandatory Proofing Checklist

Before finalizing any quiz pack, complete this comprehensive review:

### ✅ Accuracy Verification
- [ ] All dates, statistics, and facts verified
- [ ] Geographic and cultural references checked
- [ ] Explanations align with questions
- [ ] No contradictory information

### ✅ Theme Integrity
- [ ] Theme names don't reveal answers
- [ ] All questions genuinely fit the theme
- [ ] Theme descriptions are subtle, not obvious
- [ ] Good variety within each theme

### ✅ Answer Quality
- [ ] Single, clear correct answer for each question
- [ ] Multiple choice distractors are plausible
- [ ] True/false statements are definitively true or false
- [ ] Number ranges are reasonable for guessing

### ✅ Difficulty Assessment
- [ ] Mix of easy/medium/hard questions
- [ ] No questions that are too obvious
- [ ] No questions requiring extremely specialized knowledge
- [ ] Progressive difficulty where appropriate

### ✅ Engagement Factor
- [ ] Questions are interesting and well-written
- [ ] Varied question structures and formats
- [ ] Creative connections and unexpected angles
- [ ] Educational value without being dry

## 📄 File Format Specification

### JSON Structure
Quiz packs must be saved as properly formatted JSON files with this exact structure:

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
        {
          "type": "text_answer",
          "question": "What is the question text?",
          "answer": "The Answer",
          "explanation": "Why this answer is correct and interesting context.",
          "points": 1
        },
        {
          "type": "multiple_choice",
          "question": "What is the question?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "answer": "Option B",
          "explanation": "Explanation of correct answer.",
          "points": 1
        },
        {
          "type": "true_false",
          "question": "This statement is accurate.",
          "answer": "true",
          "explanation": "Why this statement is true/false.",
          "points": 1
        },
        {
          "type": "closest_number",
          "question": "How many/much/what year?",
          "answer": "42",
          "explanation": "Context about this number.",
          "scoring_type": "closest",
          "points": 1
        },
        {
          "type": "image",
          "question": "What does this image show?",
          "image_path": "/images/image-name.jpg",
          "answer": "Description",
          "explanation": "Context about the image content.",
          "points": 1
        }
      ]
    }
  ]
}
```

### Required Fields
- **name**: Pack title (should be catchy and descriptive)
- **version**: Semantic version (start with "1.0")
- **author**: Creator name or organization
- **description**: 1-2 sentence pack overview
- **rounds**: Array of exactly 10 round objects
- **round_number**: Sequential numbering 1-10
- **theme_name**: Creative, non-obvious theme title
- **theme_description**: Subtle hint about round content
- **questions**: Array of exactly 6 question objects
- **type**: One of: "text_answer", "multiple_choice", "true_false", "closest_number", "image"
- **question**: The actual question text
- **answer**: Correct answer (string format for all types)
- **explanation**: Educational context about the answer
- **points**: Always 1 for standard questions

### Special Field Requirements
- **options**: Required for multiple_choice, array of exactly 4 strings
- **image_path**: Required for image questions, relative path to image file
- **scoring_type**: Required for closest_number, always "closest"

### File Naming Convention
- Use kebab-case: `pack-name-here.json`
- No spaces or special characters
- Include version if multiple versions exist: `pack-name-v2.json`
- Place in the `community-packs/` directory for community submissions
- Built-in packs can also be placed in `quizpacks/` directory

## 🎨 Creative Theme Ideas

### Effective Theme Approaches
- **Word games**: "Things That Start With Q", "Three-Letter Words"
- **Color themes**: "Red Things", "Purple Everything"
- **Number themes**: "The Number 42", "Things That Come in Threes"
- **Geographic focus**: "Northern California", "Island Nations"
- **Time periods**: "Things Invented in the 1980s", "Medieval Matters"
- **Abstract connections**: "Before & After", "Missing Links"

### Theme Naming Tips
- Use evocative, not literal names
- Create curiosity without revealing answers
- Make themes memorable and fun
- Avoid obvious giveaways

## 🔍 Example Quality Assessment

### ❌ Poor Question Example
```
Theme: "Golden Gate Bridge Round"
Question: "What color is the Golden Gate Bridge?"
Answer: "International Orange"
```
**Problems**: Theme gives away answer, question too obvious, no educational value

### ✅ Excellent Question Example
```
Theme: "City by the Bay"
Question: "What unusual color was chosen for the Bay Area's most famous suspension bridge to improve visibility in fog?"
Answer: "International Orange"
Explanation: "The Golden Gate Bridge is painted in International Orange to enhance visibility in San Francisco's frequent fog."
```
**Strengths**: Theme doesn't reveal bridge, question tests knowledge, educational explanation

## 📚 Additional Resources

### Pack Creation Tools
- Use the built-in Pack Editor in Quizzly Bear for creating and testing packs
- JSON validation tools to ensure proper formatting
- The app's import/export functionality for sharing packs

### Recommended Verification Sources
- Encyclopedia Britannica
- Official government websites
- Academic institutions
- Verified news sources
- Scientific journals and publications

### Question Inspiration Sources
- Local history and culture
- Scientific discoveries and facts
- Pop culture and entertainment
- Geography and natural phenomena
- Sports and achievements
- Literature and arts

## 🎯 Success Metrics

A well-created quiz pack should achieve:
- **Engagement**: Players find questions interesting and learn something new
- **Fairness**: Questions are answerable with reasonable knowledge
- **Accuracy**: All facts are correct and up-to-date
- **Balance**: Good mix of difficulties and topics
- **Flow**: Rounds progress logically and maintain energy
- **Educational Value**: Players gain knowledge while having fun

Remember: The goal is to create quiz experiences that are both entertaining and enriching, where players feel challenged but not frustrated, and where everyone learns something new!