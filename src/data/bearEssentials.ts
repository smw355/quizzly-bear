import type { GamePack, Round, Question } from '../types';

export const bearEssentialsGamePack: GamePack = {
  id: 1,
  name: "Bear Essentials",
  version: "1.0",
  author: "Quizzly Bear Team",
  description: "10 bear-themed rounds perfect for any pub quiz night",
  total_rounds: 10,
  active: true,
};

export const bearEssentialsRounds: Round[] = [
  // Round 1: Honey Sweet
  {
    round_number: 1,
    theme_name: "Sweet Beginnings", 
    theme_description: "Nature's candy and busy workers",
    questions: [
      {
        type: 'multiple_choice',
        question: 'What percentage of a honeybee colony are worker bees?',
        options: ['50%', '75%', '90%', '98%'],
        answer: '98%',
        explanation: 'Worker bees make up about 98% of the colony, with only one queen and a few hundred drones.',
        points: 1,
      },
      {
        type: 'text_answer',
        question: 'What is the primary sugar that makes honey sweeter than table sugar?',
        answer: 'Fructose',
        explanation: 'Honey is primarily fructose (about 38%) and glucose (about 32%), with fructose being sweeter than regular sugar.',
        points: 1,
      },
      {
        type: 'true_false',
        question: 'Honey never spoils if stored properly.',
        answer: 'true',
        explanation: 'Honey has an indefinite shelf life due to its low moisture content and acidic pH.',
        points: 1,
      },
      {
        type: 'text_answer',
        question: 'Which bear character is famous for loving honey and living in the Hundred Acre Wood?',
        answer: 'Winnie the Pooh',
        explanation: 'Created by A.A. Milne, Winnie-the-Pooh is known for his love of honey and his adventures with Christopher Robin.',
        points: 1,
      },
      {
        type: 'multiple_choice',
        question: 'What is the name of the wax structure that bees build to store honey?',
        options: ['Honeycomb', 'Hive', 'Nest', 'Chamber'],
        answer: 'Honeycomb',
        explanation: 'Honeycomb is the hexagonal wax structure that bees build to store honey and raise their young.',
        points: 1,
      },
      {
        type: 'closest_number',
        question: 'How many flowers must a bee visit to make one pound of honey?',
        answer: '2000000',
        explanation: 'A bee must visit approximately 2 million flowers to make one pound of honey.',
        points: 1,
        scoring_type: 'closest',
      },
    ] as Question[],
  },

  // Round 2: Cave Dwellers
  {
    round_number: 2,
    theme_name: "Cave Dwellers",
    theme_description: "From hibernation to underground mysteries",
    questions: [
      {
        type: 'text_answer',
        question: 'What is the scientific term for the winter sleep that bears enter?',
        answer: 'Torpor',
        explanation: 'Bears enter torpor, not true hibernation. Their body temperature drops only slightly and they can wake up.',
        points: 1,
      },
      {
        type: 'multiple_choice',
        question: 'Which superhero is known as the "Dark Knight" and operates from a cave?',
        options: ['Superman', 'Batman', 'Spider-Man', 'Iron Man'],
        answer: 'Batman',
        explanation: 'Batman operates from the Batcave, a secret hideout beneath Wayne Manor.',
        points: 1,
      },
      {
        type: 'true_false',
        question: 'Bears actually sleep in caves during winter hibernation.',
        answer: 'false',
        explanation: 'Most bears create dens in hollowed trees, brush piles, or burrows, not necessarily caves.',
        points: 1,
      },
      {
        type: 'text_answer',
        question: 'What is the study of caves called?',
        answer: 'Speleology',
        explanation: 'Speleology is the scientific study of caves and other karst features.',
        points: 1,
      },
      {
        type: 'multiple_choice',
        question: 'Which ancient Greek philosopher taught in a cave according to his famous allegory?',
        options: ['Aristotle', 'Socrates', 'Plato', 'Pythagoras'],
        answer: 'Plato',
        explanation: 'Plato\'s Allegory of the Cave is one of the most famous philosophical thought experiments.',
        points: 1,
      },
      {
        type: 'closest_number',
        question: 'How many months can a black bear\'s winter torpor last?',
        answer: '7',
        explanation: 'Black bears can remain in torpor for up to 7 months, depending on climate and food availability.',
        points: 1,
        scoring_type: 'closest',
      },
    ] as Question[],
  },

  // Round 3: Fuzzy Logic
  {
    round_number: 3,
    theme_name: "Fuzzy Logic",
    theme_description: "From computer science to soft textures",
    questions: [
      {
        type: 'text_answer',
        question: 'What type of logic deals with reasoning that is approximate rather than fixed and exact?',
        answer: 'Fuzzy Logic',
        explanation: 'Fuzzy logic is a form of many-valued logic that deals with reasoning under uncertainty.',
        points: 1,
      },
      {
        type: 'multiple_choice',
        question: 'Which fruit is known for its fuzzy skin?',
        options: ['Apple', 'Orange', 'Peach', 'Banana'],
        answer: 'Peach',
        explanation: 'Peaches are known for their soft, fuzzy skin that many people find pleasant to touch.',
        points: 1,
      },
      {
        type: 'true_false',
        question: 'Polar bear fur is actually transparent, not white.',
        answer: 'true',
        explanation: 'Polar bear hair is hollow and transparent, appearing white due to light scattering.',
        points: 1,
      },
      {
        type: 'text_answer',
        question: 'What is the soft, fine hair that covers a newborn mammal called?',
        answer: 'Lanugo',
        explanation: 'Lanugo is the fine, soft hair that covers the body and limbs of a human fetus.',
        points: 1,
      },
      {
        type: 'multiple_choice',
        question: 'Which programming language was the first to implement fuzzy logic?',
        options: ['FORTRAN', 'LISP', 'Pascal', 'COBOL'],
        answer: 'LISP',
        explanation: 'LISP was one of the first programming languages to implement fuzzy logic concepts.',
        points: 1,
      },
      {
        type: 'text_answer',
        question: 'What do you call thinking that is vague or imprecise?',
        answer: 'Fuzzy thinking',
        explanation: 'Fuzzy thinking refers to imprecise or unclear reasoning, though it can sometimes be useful.',
        points: 1,
      },
    ] as Question[],
  },

  // Round 4: Big and Strong
  {
    round_number: 4,
    theme_name: "Big and Strong",
    theme_description: "From grizzly strength to powerful forces",
    questions: [
      {
        type: 'multiple_choice',
        question: 'Which is the largest species of bear?',
        options: ['Grizzly Bear', 'Polar Bear', 'American Black Bear', 'Sun Bear'],
        answer: 'Polar Bear',
        explanation: 'Polar bears are the largest bear species, with adult males weighing up to 1,500 pounds.',
        points: 1,
      },
      {
        type: 'closest_number',
        question: 'How many pounds can an adult male grizzly bear weigh?',
        answer: '800',
        explanation: 'Adult male grizzly bears typically weigh between 400-800 pounds, with some reaching up to 1,000 pounds.',
        points: 1,
        scoring_type: 'closest',
      },
      {
        type: 'text_answer',
        question: 'What is the strongest muscle in the human body relative to its size?',
        answer: 'Jaw muscle',
        explanation: 'The masseter (jaw muscle) is the strongest muscle in the human body based on its size.',
        points: 1,
      },
      {
        type: 'true_false',
        question: 'Bears can run faster than horses.',
        answer: 'false',
        explanation: 'Bears can run up to 35 mph, while horses can reach speeds of 55 mph.',
        points: 1,
      },
      {
        type: 'multiple_choice',
        question: 'Which structure is considered one of the strongest building materials?',
        options: ['Steel', 'Concrete', 'Carbon fiber', 'Graphene'],
        answer: 'Graphene',
        explanation: 'Graphene is about 200 times stronger than steel and is considered the strongest material known.',
        points: 1,
      },
      {
        type: 'text_answer',
        question: 'What is the name of the strongest known force in physics?',
        answer: 'Strong nuclear force',
        explanation: 'The strong nuclear force holds protons and neutrons together in atomic nuclei.',
        points: 1,
      },
    ] as Question[],
  },

  // Round 5: Forest Friends
  {
    round_number: 5,
    theme_name: "Forest Friends",
    theme_description: "From woodland creatures to outdoor adventures",
    questions: [
      {
        type: 'text_answer',
        question: 'What type of tree do pandas primarily eat?',
        answer: 'Bamboo',
        explanation: 'Giant pandas eat almost exclusively bamboo, consuming up to 40 pounds per day.',
        points: 1,
      },
      {
        type: 'multiple_choice',
        question: 'Which national park is famous for its black bear population?',
        options: ['Yellowstone', 'Yosemite', 'Great Smoky Mountains', 'All of the above'],
        answer: 'All of the above',
        explanation: 'All three parks are famous for their black bear populations and bear safety programs.',
        points: 1,
      },
      {
        type: 'true_false',
        question: 'Robin Hood lived in Sherwood Forest.',
        answer: 'true',
        explanation: 'According to legend, Robin Hood and his Merry Men lived in Sherwood Forest in Nottinghamshire.',
        points: 1,
      },
      {
        type: 'text_answer',
        question: 'What is the largest type of deer found in North American forests?',
        answer: 'Moose',
        explanation: 'Moose are the largest members of the deer family and can weigh up to 1,500 pounds.',
        points: 1,
      },
      {
        type: 'multiple_choice',
        question: 'Which tree produces acorns?',
        options: ['Maple', 'Oak', 'Pine', 'Birch'],
        answer: 'Oak',
        explanation: 'Oak trees produce acorns, which are an important food source for many forest animals.',
        points: 1,
      },
      {
        type: 'text_answer',
        question: 'What do you call a person who studies trees and forests?',
        answer: 'Forester',
        explanation: 'A forester is a professional who practices forestry, the science of managing forest resources.',
        points: 1,
      },
    ] as Question[],
  },

  // Round 6: Salmon Run
  {
    round_number: 6,
    theme_name: "Salmon Run",
    theme_description: "From fish migration to Alaskan adventures",
    questions: [
      {
        type: 'multiple_choice',
        question: 'During which season do salmon typically run upstream to spawn?',
        options: ['Spring', 'Summer', 'Fall', 'Winter'],
        answer: 'Fall',
        explanation: 'Most salmon species run upstream in the fall to spawn in their natal streams.',
        points: 1,
      },
      {
        type: 'text_answer',
        question: 'Which U.S. state is most famous for its salmon runs and bear viewing?',
        answer: 'Alaska',
        explanation: 'Alaska is renowned for its massive salmon runs and the bears that gather to feed on them.',
        points: 1,
      },
      {
        type: 'closest_number',
        question: 'How many miles can some salmon travel during their spawning migration?',
        answer: '2000',
        explanation: 'Some salmon species can travel over 2,000 miles from the ocean to their spawning grounds.',
        points: 1,
        scoring_type: 'closest',
      },
      {
        type: 'true_false',
        question: 'Salmon die after spawning.',
        answer: 'true',
        explanation: 'Pacific salmon die after spawning, while Atlantic salmon may survive to spawn again.',
        points: 1,
      },
      {
        type: 'text_answer',
        question: 'What is the pink-colored salmon species commonly found in cans?',
        answer: 'Pink salmon',
        explanation: 'Pink salmon, also called humpback salmon, is the most commonly canned salmon variety.',
        points: 1,
      },
      {
        type: 'multiple_choice',
        question: 'Which fast-food chain is famous for its salmon burgers in Alaska?',
        options: ['McDonald\'s', 'Burger King', 'White Spot', 'Local diners'],
        answer: 'Local diners',
        explanation: 'While major chains don\'t typically serve salmon burgers, many Alaskan local diners feature them.',
        points: 1,
      },
    ] as Question[],
  },

  // Round 7: Winter Sleep
  {
    round_number: 7,
    theme_name: "Winter Sleep",
    theme_description: "From hibernation science to seasonal rest",
    questions: [
      {
        type: 'text_answer',
        question: 'What is the condition called when people feel depressed during winter months?',
        answer: 'Seasonal Affective Disorder',
        explanation: 'SAD is a type of depression related to changes in seasons, most common in winter.',
        points: 1,
      },
      {
        type: 'multiple_choice',
        question: 'Which animal is famous for sleeping for months during winter?',
        options: ['Squirrel', 'Groundhog', 'Rabbit', 'Deer'],
        answer: 'Groundhog',
        explanation: 'Groundhogs are true hibernators, sleeping for about 5-6 months during winter.',
        points: 1,
      },
      {
        type: 'true_false',
        question: 'Bears lower their heart rate during winter torpor.',
        answer: 'true',
        explanation: 'During torpor, a bear\'s heart rate can drop from 40 beats per minute to just 8.',
        points: 1,
      },
      {
        type: 'text_answer',
        question: 'What Olympic sport involves racing down an icy track on a sled?',
        answer: 'Bobsled',
        explanation: 'Bobsledding is an Olympic winter sport where teams race down an ice track in a sled.',
        points: 1,
      },
      {
        type: 'multiple_choice',
        question: 'How many hours of sleep do experts recommend for adults?',
        options: ['6-7 hours', '7-9 hours', '9-10 hours', '10-12 hours'],
        answer: '7-9 hours',
        explanation: 'Most adults need 7-9 hours of sleep per night for optimal health.',
        points: 1,
      },
      {
        type: 'text_answer',
        question: 'What is the term for plants and trees that lose their leaves in winter?',
        answer: 'Deciduous',
        explanation: 'Deciduous plants shed their leaves annually, typically in autumn.',
        points: 1,
      },
    ] as Question[],
  },

  // Round 8: Bare Necessities
  {
    round_number: 8,
    theme_name: "Bare Necessities",
    theme_description: "From jungle book wisdom to essential needs",
    questions: [
      {
        type: 'text_answer',
        question: 'Which bear character sings "The Bare Necessities" in Disney\'s Jungle Book?',
        answer: 'Baloo',
        explanation: 'Baloo the bear teaches Mowgli about the simple bare necessities of life.',
        points: 1,
      },
      {
        type: 'multiple_choice',
        question: 'According to Maslow\'s hierarchy, what are the most basic human needs?',
        options: ['Love and belonging', 'Safety needs', 'Physiological needs', 'Self-actualization'],
        answer: 'Physiological needs',
        explanation: 'Physiological needs like food, water, and shelter form the base of Maslow\'s pyramid.',
        points: 1,
      },
      {
        type: 'text_answer',
        question: 'What are the three things humans need to survive for more than a few days?',
        answer: 'Food, water, and shelter',
        explanation: 'The survival rule of 3s: 3 minutes without air, 3 days without water, 3 weeks without food.',
        points: 1,
      },
      {
        type: 'true_false',
        question: 'The minimalism movement focuses on owning only bare necessities.',
        answer: 'true',
        explanation: 'Minimalism emphasizes reducing possessions to only what is necessary and meaningful.',
        points: 1,
      },
      {
        type: 'multiple_choice',
        question: 'In survival situations, which is typically the most immediately critical?',
        options: ['Food', 'Water', 'Shelter', 'Fire'],
        answer: 'Shelter',
        explanation: 'In harsh conditions, exposure can kill within hours, making shelter the most immediate need.',
        points: 1,
      },
      {
        type: 'text_answer',
        question: 'What essential nutrient do humans need that our bodies cannot produce?',
        answer: 'Vitamin C',
        explanation: 'Humans cannot synthesize vitamin C and must obtain it from food sources.',
        points: 1,
      },
    ] as Question[],
  },

  // Round 9: Teddy Bears
  {
    round_number: 9,
    theme_name: "Teddy Bears",
    theme_description: "From presidential history to childhood companions",
    questions: [
      {
        type: 'text_answer',
        question: 'Which U.S. President inspired the name "Teddy Bear"?',
        answer: 'Theodore Roosevelt',
        explanation: 'The teddy bear was named after President Theodore "Teddy" Roosevelt following a 1902 hunting trip.',
        points: 1,
      },
      {
        type: 'multiple_choice',
        question: 'What is the name of the famous teddy bear store chain?',
        options: ['Build-A-Bear Workshop', 'Teddy Bear Factory', 'Bear Necessities', 'Cuddle Bears'],
        answer: 'Build-A-Bear Workshop',
        explanation: 'Build-A-Bear Workshop is the famous chain where customers can create their own stuffed animals.',
        points: 1,
      },
      {
        type: 'true_false',
        question: 'The first teddy bears were made in Germany.',
        answer: 'true',
        explanation: 'The Steiff company in Germany created some of the first teddy bears in 1902.',
        points: 1,
      },
      {
        type: 'text_answer',
        question: 'What is the most expensive teddy bear ever sold at auction?',
        answer: 'Steiff Louis Vuitton Bear',
        explanation: 'A Steiff Louis Vuitton teddy bear sold for $2.1 million in 2000.',
        points: 1,
      },
      {
        type: 'multiple_choice',
        question: 'In which year was the teddy bear first created?',
        options: ['1900', '1902', '1905', '1910'],
        answer: '1902',
        explanation: 'The teddy bear was created in 1902, inspired by President Roosevelt\'s hunting trip.',
        points: 1,
      },
      {
        type: 'text_answer',
        question: 'What British children\'s character is a bear who loves marmalade sandwiches?',
        answer: 'Paddington Bear',
        explanation: 'Paddington Bear, from Peru, is famous for his love of marmalade sandwiches.',
        points: 1,
      },
    ] as Question[],
  },

  // Round 10: Bear Market
  {
    round_number: 10,
    theme_name: "Bear Market",
    theme_description: "From Wall Street bears to economic downturns",
    questions: [
      {
        type: 'text_answer',
        question: 'In financial terms, what does a "bear market" represent?',
        answer: 'Declining stock prices',
        explanation: 'A bear market is defined as a period when stock prices fall 20% or more from recent highs.',
        points: 1,
      },
      {
        type: 'multiple_choice',
        question: 'What is the opposite of a bear market called?',
        options: ['Bull market', 'Cow market', 'Deer market', 'Lion market'],
        answer: 'Bull market',
        explanation: 'A bull market represents rising stock prices and investor optimism.',
        points: 1,
      },
      {
        type: 'true_false',
        question: 'The terms "bull" and "bear" market come from how these animals attack.',
        answer: 'true',
        explanation: 'Bulls thrust upward with their horns, bears swipe downward with their claws.',
        points: 1,
      },
      {
        type: 'closest_number',
        question: 'What percentage decline typically defines a bear market?',
        answer: '20',
        explanation: 'A bear market is generally defined as a 20% decline from recent market highs.',
        points: 1,
        scoring_type: 'closest',
      },
      {
        type: 'text_answer',
        question: 'What Wall Street location is famous for its bronze bull statue?',
        answer: 'Bowling Green',
        explanation: 'The Charging Bull statue is located in Bowling Green park near Wall Street.',
        points: 1,
      },
      {
        type: 'multiple_choice',
        question: 'Which major stock market crash occurred in 1929?',
        options: ['Black Monday', 'Black Tuesday', 'Black Friday', 'Black Thursday'],
        answer: 'Black Tuesday',
        explanation: 'Black Tuesday, October 29, 1929, marked the most devastating stock market crash.',
        points: 1,
      },
    ] as Question[],
  },
];