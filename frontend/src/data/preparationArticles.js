export const preparationArticles = [
  {
    id: "javascript-interview-questions-freshers",
    slug: "javascript-interview-questions-freshers",
    title: "JavaScript Interview Questions for Freshers: Core Concepts, Code & Common Mistakes",
    shortTitle: "JavaScript for Freshers",
    category: "JavaScript",
    readTime: "12 min read",
    difficulty: "Beginner to Intermediate",
    publishDate: "October 2026",
    summary: "A practical guide for freshers covering execution context, closures, the event loop, coercion, array manipulation, and asynchronous programming with real interview code examples and rookie mistakes to avoid.",
    author: "AI Interview Engineering Team",
    tags: ["JavaScript", "Frontend", "Freshers", "Web Development", "Interview Questions"],
    tableOfContents: [
      { id: "var-let-const-hoisting", title: "1. Scope, Hoisting & var vs let vs const" },
      { id: "equality-coercion", title: "2. Equality (== vs ===) & Type Coercion" },
      { id: "closures-lexical-scope", title: "3. Closures and Lexical Scope in Practice" },
      { id: "event-loop-concurrency", title: "4. The Event Loop, Microtasks & Call Stack" },
      { id: "array-methods", title: "5. Essential Array Methods: map, filter, reduce" },
      { id: "this-keyword-binding", title: "6. Understanding 'this' and Function Binding" },
      { id: "async-promises", title: "7. Promises & Async/Await Error Handling" },
      { id: "common-fresher-mistakes", title: "8. Five Common Mistakes Freshers Make" }
    ],
    sections: [
      {
        id: "var-let-const-hoisting",
        title: "1. Scope, Hoisting & var vs let vs const",
        overview: "Interviewers frequently start technical rounds by checking if you understand how JavaScript stores and accesses variables in memory before executing code.",
        question: "What is hoisting, and how do var, let, and const behave differently?",
        explanation: "Hoisting is JavaScript's default behavior of moving declarations to the top of their enclosing scope during the compilation/memory allocation phase. Only declarations are hoisted, not initializations.\n\n- `var` is function-scoped (or globally scoped). When hoisted, it is initialized with `undefined`. Accessing a `var` before its declaration does not throw an error; it simply evaluates to `undefined`.\n- `let` and `const` are block-scoped (bounded by `{}`). They are also hoisted, but they remain uninitialized in a state known as the Temporal Dead Zone (TDZ) from the start of the block until the execution reaches the declaration line. Accessing them prematurely throws a `ReferenceError`.\n- `const` requires immediate initialization upon declaration and prevents reassignment of the variable identifier.",
        codeExample: `// 1. var hoisting: initialized as undefined
console.log(score); // Output: undefined
var score = 100;

// 2. let / const hoisting: Temporal Dead Zone (TDZ)
try {
  console.log(player); // Throws ReferenceError: Cannot access 'player' before initialization
  let player = "Alex";
} catch (err) {
  console.error(err.message);
}

// 3. Block Scope Difference
function runCheck() {
  if (true) {
    var functionalVar = "Available outside block";
    let blockLet = "Locked inside block";
  }
  console.log(functionalVar); // Works!
  // console.log(blockLet);   // Uncaught ReferenceError: blockLet is not defined
}
runCheck();`,
        commonMistake: "Assuming let and const are not hoisted at all. They ARE hoisted by the JS engine, but the Temporal Dead Zone protects you from accessing uninitialized memory.",
        evaluatorTip: "Always mention 'Temporal Dead Zone' and 'block-scoped vs function-scoped'. Interviewers look for these specific industry-standard terms."
      },
      {
        id: "equality-coercion",
        title: "2. Equality (== vs ===) & Type Coercion",
        overview: "JavaScript is dynamically and weakly typed. Understanding implicit type conversion separates candidates who truly understand the language from those who guess.",
        question: "What is the difference between loose equality (==) and strict equality (===)?",
        explanation: "The `==` (loose equality) operator performs implicit type coercion if the operands are of different types before comparing their values according to the Abstract Equality Comparison Algorithm.\n\nThe `===` (strict equality) operator performs no type conversion; it returns `true` only if both the type and the value are identical.\n\nKey rules of implicit coercion:\n1. If comparing a number with a string, the string is coerced to a number (`'5' == 5` -> `5 == 5` -> `true`).\n2. If comparing a boolean with another type, the boolean is coerced to a number (`true` -> `1`, `false` -> `0`).\n3. `null == undefined` is explicitly defined as `true`, but neither equals any other falsy value (`null == 0` is `false`).\n4. Objects and arrays are compared by reference, not value.",
        codeExample: `// Value vs Reference comparisons
console.log(0 == false);        // true  (false coerced to 0)
console.log(0 === false);       // false (number vs boolean)

console.log("" == 0);           // true  ("" coerced to 0)
console.log(" " == 0);          // true  (" " trimmed & coerced to 0)

console.log(null == undefined); // true
console.log(null === undefined);// false

// Array reference traps
const a = [1, 2];
const b = [1, 2];
console.log(a == b);            // false (different memory references!)
console.log(a === b);           // false

// Strange coercion gotchas:
console.log([] + []);           // "" (empty string)
console.log([] + {});           // "[object Object]"`,
        commonMistake: "Writing `if (arr == [])` to check if an array is empty. In JavaScript, two distinct array literals are separate references in memory, so this will always evaluate to `false`. Use `arr.length === 0` instead.",
        evaluatorTip: "Explain that in modern production codebases, `===` is the universal standard to prevent silent type conversion bugs."
      },
      {
        id: "closures-lexical-scope",
        title: "3. Closures and Lexical Scope in Practice",
        overview: "Closures are one of the most frequently tested concepts in technical interviews for junior and mid-level web developers.",
        question: "What is a closure, and what are practical scenarios where developers use it?",
        explanation: "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In simple terms: an inner function always maintains access to the variables of its outer parent function, even after the outer function has finished executing and returned.\n\nPractical Applications:\n1. **Data Encapsulation / Private State**: Creating private variables that cannot be modified directly from outside.\n2. **Factory Functions**: Creating specialized utility functions with pre-configured arguments.\n3. **Event Handlers & Callback Timers**: Preserving parameters across asynchronous lifecycles.",
        codeExample: `// 1. Data Encapsulation (Private Variables)
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable

  return {
    deposit: (amount) => {
      if (amount > 0) balance += amount;
      return balance;
    },
    withdraw: (amount) => {
      if (amount > balance) return "Insufficient funds";
      balance -= amount;
      return balance;
    },
    getBalance: () => balance
  };
}

const account = createBankAccount(500);
console.log(account.deposit(200)); // 700
console.log(account.withdraw(100)); // 600
console.log(account.balance);       // undefined (balance is completely private!)

// 2. The Classic Loop Trap
// BAD: var shares a single global/function 'i'
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var loop:", i), 100);
} // Prints: 3, 3, 3

// GOOD: let creates a fresh binding per iteration
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let loop:", j), 100);
} // Prints: 0, 1, 2`,
        commonMistake: "Confusing scope with closure. Scope determines variable accessibility at compile time. Closure is the actual runtime mechanism preserving that scope when the inner function is invoked outside its lexical birthplace.",
        evaluatorTip: "When asked the classic `setTimeout` inside a `for` loop question, proactively explain that `let` solves it because of block-scoped closure bindings, or demonstrate an IIFE (Immediately Invoked Function Expression) as an alternative."
      },
      {
        id: "event-loop-concurrency",
        title: "4. The Event Loop, Microtasks & Call Stack",
        overview: "JavaScript is single-threaded, meaning it has one call stack and executes one command at a time. The event loop is how JavaScript handles asynchronous operations without freezing the user interface.",
        question: "How does the JavaScript runtime execute synchronous vs asynchronous code?",
        explanation: "The runtime comprises:\n1. **Call Stack**: LIFO (Last-In-First-Out) queue where active execution frames run synchronously.\n2. **Web APIs / Node APIs**: Background threads managing timers (`setTimeout`), network requests (`fetch`), and DOM events.\n3. **Microtask Queue**: High-priority queue holding Promise callbacks (`.then()`, `async/await`), `queueMicrotask`, and `MutationObserver`.\n4. **Macrotask (Task) Queue**: Regular queue holding `setTimeout`, `setInterval`, `setImmediate`, and UI events.\n\nExecution Order:\n1. Execute all synchronous code currently on the Call Stack.\n2. Once Call Stack is empty, drain the ENTIRE Microtask Queue.\n3. Pick the FIRST task from the Macrotask Queue and run it.\n4. Repeat the cycle (check microtasks again after every macrotask).",
        codeExample: `console.log("1. Script Start");

setTimeout(() => {
  console.log("2. Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask (Promise 1)");
}).then(() => {
  console.log("4. Microtask (Promise 2)");
});

console.log("5. Script End");

// EXECUTION ORDER:
// 1. Script Start
// 5. Script End
// 3. Microtask (Promise 1)
// 4. Microtask (Promise 2)
// 2. Macrotask (setTimeout) - Even with 0ms delay!`,
        commonMistake: "Thinking `setTimeout(fn, 0)` executes immediately. It only registers the callback into the Macrotask Queue, which CANNOT run until both the Call Stack and the entire Microtask Queue are completely empty.",
        evaluatorTip: "Draw or verbally describe the Call Stack -> Microtask Queue -> Macrotask Queue sequence. Interviewers love output prediction questions based on this."
      },
      {
        id: "array-methods",
        title: "5. Essential Array Methods: map, filter, reduce",
        overview: "Functional array programming is tested in almost every modern frontend and backend coding interview.",
        question: "What are map, filter, and reduce, and how do they differ from forEach?",
        explanation: "- `forEach(cb)`: Iterates through each item to trigger side-effects (e.g. logging or DOM mutation). It returns `undefined` and cannot be chained.\n- `map(cb)`: Transforms every element into a new representation and returns a NEW array of the exact same length without mutating the original.\n- `filter(cb)`: Evaluates a predicate function returning `true` or `false` on each item, returning a NEW array containing only items that passed the condition.\n- `reduce(cb, initialValue)`: Accumulates an array down to a single value (a number, object, string, or grouped map) using an accumulator pattern.",
        codeExample: `const candidates = [
  { name: "Priya", score: 88, role: "Frontend" },
  { name: "Rahul", score: 65, role: "Backend" },
  { name: "Sarah", score: 94, role: "Frontend" },
  { name: "David", score: 72, role: "Frontend" }
];

// 1. filter: Select qualifying frontend candidates
const topFrontend = candidates.filter(c => c.role === "Frontend" && c.score >= 75);
console.log(topFrontend); // Priya (88), Sarah (94)

// 2. map: Extract candidate names formatted
const candidateBadges = topFrontend.map(c => \`Candidate: \${c.name}\`);

// 3. reduce: Calculate average score of all candidates
const avgScore = candidates.reduce((acc, curr, index, arr) => {
  acc += curr.score;
  return index === arr.length - 1 ? (acc / arr.length).toFixed(1) : acc;
}, 0);
console.log("Average Score:", avgScore); // 79.8

// 4. reduce: Group candidates by role
const groupedByRole = candidates.reduce((acc, item) => {
  acc[item.role] = acc[item.role] || [];
  acc[item.role].push(item.name);
  return acc;
}, {});
console.log(groupedByRole);
// { Frontend: ['Priya', 'Sarah', 'David'], Backend: ['Rahul'] }`,
        commonMistake: "Forgetting to provide an `initialValue` in `.reduce()`. Without an initial value, JavaScript uses the first element of the array as the initial accumulator, which causes runtime bugs when processing arrays of objects.",
        evaluatorTip: "Emphasize immutability: none of `map`, `filter`, or `reduce` mutate the original array, which is essential in React state management."
      },
      {
        id: "this-keyword-binding",
        title: "6. Understanding 'this' and Function Binding",
        overview: "The `this` keyword represents execution context and is a notorious stumbling block in interviews.",
        question: "How is the value of 'this' determined, and how do arrow functions differ?",
        explanation: "In standard functions, `this` is dynamically determined by HOW the function is called at runtime:\n1. **Default Binding**: In standalone function calls, `this` refers to the `global` object (or `undefined` in strict mode `'use strict'`).\n2. **Implicit Binding**: When invoked as a method of an object (`obj.method()`), `this` refers to the parent object `obj`.\n3. **Explicit Binding**: You can manually enforce `this` using `.call()`, `.apply()`, or `.bind()`.\n4. **New Binding**: In constructor functions called with `new`, `this` references the freshly created instance.\n\n**Arrow Functions**: Arrow functions do NOT have their own `this`. They capture `this` lexically from their enclosing scope at the moment they are defined.",
        codeExample: `const interviewer = {
  name: "Marcus",
  greet: function() {
    console.log(\`Hello from \${this.name}\`);
  },
  delayedGreet: function() {
    // Arrow function captures 'this' from delayedGreet context
    setTimeout(() => {
      console.log(\`Delayed hello from \${this.name}\`);
    }, 100);
  }
};

interviewer.greet();        // "Hello from Marcus"
interviewer.delayedGreet(); // "Delayed hello from Marcus"

// Common Loss of Context trap:
const detachedGreet = interviewer.greet;
detachedGreet(); // "Hello from undefined" (context was detached!)

// Explicitly fixing context with .bind():
const boundGreet = interviewer.greet.bind(interviewer);
boundGreet();    // "Hello from Marcus"`,
        commonMistake: "Using arrow functions for object methods. If you write `const obj = { name: 'A', say: () => console.log(this.name) }`, `this` points to the outer window/module, NOT `obj`.",
        evaluatorTip: "Remember the mnemonic: call = comma-separated arguments, apply = array of arguments, bind = returns a brand new bound function."
      },
      {
        id: "async-promises",
        title: "7. Promises & Async/Await Error Handling",
        overview: "Modern web applications communicate with APIs asynchronously. Demonstrating clean asynchronous flow and bulletproof error handling is critical.",
        question: "How do Promises work, and how does async/await simplify asynchronous flow?",
        explanation: "A Promise is an object representing the eventual completion or failure of an asynchronous operation. A promise exists in one of three states: `pending`, `fulfilled` (resolved), or `rejected`.\n\n`async/await` is syntactic sugar built on top of native Promises and generators. An `async` function always returns a Promise automatically. `await` pauses execution of the async function until the Promise settles, making asynchronous code read synchronously and cleanly.\n\nError handling with Promises uses `.catch()`, whereas with `async/await` you wrap calls in standard `try...catch` blocks.",
        codeExample: `// Simulated async API call
const fetchUserProfile = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, username: "dev_coder", verified: true });
      } else {
        reject(new Error("Invalid user ID provided"));
      }
    }, 200);
  });
};

// Modern async/await with robust error handling
async function loadUserData(userId) {
  try {
    console.log("Fetching user...");
    const user = await fetchUserProfile(userId);
    console.log(\`Welcome \${user.username}!\`);
    return user;
  } catch (error) {
    console.error("Failed to load profile:", error.message);
    // Graceful fallback or user notification
    return null;
  } finally {
    console.log("Cleanup: Hide loading spinner");
  }
}

loadUserData(42);
loadUserData(-1); // Triggers catch block gracefully`,
        commonMistake: "Forgetting `await` inside an `async` function and assuming the variable contains the response object instead of an unresolved `Promise { <pending> }`.",
        evaluatorTip: "Mention `Promise.all()` for parallel independent requests and `Promise.allSettled()` when you don't want one failed request to abort the remaining batch."
      },
      {
        id: "common-fresher-mistakes",
        title: "8. Five Common Mistakes Freshers Make",
        overview: "Technical interviewers interview dozens of candidates every week and notice the exact same avoidable patterns.",
        question: "What recurring mistakes should freshers consciously eliminate during JavaScript interview rounds?",
        explanation: "Here are the top 5 mistakes that immediately reveal lack of hands-on experience:\n\n1. **Mutating State Directly**: Mutating arrays or objects directly (e.g. `arr.push()` or `obj.key = val`) instead of creating immutable copies (`[...arr, val]`).\n2. **Relying on Floating Point Precision for Currency**: `0.1 + 0.2 === 0.3` evaluates to `false` due to IEEE 754 binary floating-point representation (`0.30000000000000004`). Always use integers for monetary units (cents/paise).\n3. **Unchecked Nullable Access**: Accessing `user.address.street` without checking if `address` exists. Use optional chaining `user?.address?.street`.\n4. **Forgetting to Return Values in Arrow Functions**: Writing `{}` around an arrow body creates a block that requires an explicit `return` (`arr.map(x => { x * 2 })` returns `[undefined, undefined]`).\n5. **Failing to Clean Up Event Listeners / Intervals**: Creating `setInterval` or window event listeners without cleaning them up leads to browser memory leaks.",
        codeExample: `// Gotcha 1: Floating point arithmetic
console.log(0.1 + 0.2 === 0.3); // false!
console.log(Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON); // true (safe comparison)

// Gotcha 2: Arrow function implicit return
const numbers = [1, 2, 3];
const broken = numbers.map(n => { n * 2 }); // [undefined, undefined, undefined]
const fixed = numbers.map(n => n * 2);      // [2, 4, 6]

// Gotcha 3: Optional Chaining & Nullish Coalescing
const response = { profile: null };
// Safe fallback without crashing:
const street = response.profile?.address?.street ?? "Address not provided";
console.log(street); // "Address not provided"`,
        commonMistake: "Memorizing code snippets without understanding why. Interviewers will alter one variable in a trick question to test if you understand the underlying runtime mechanics.",
        evaluatorTip: "If you don't know the answer to an obscure question, say: 'I haven't encountered that specific edge case in my projects yet, but based on how JS scopes works, I hypothesize that...' Thought process matters more than encyclopedic trivia."
      }
    ]
  },
  {
    id: "hr-interview-questions-sample-answers",
    slug: "hr-interview-questions-sample-answers",
    title: "HR Interview Questions & Sample Answers: The Complete Behavioral Playbook",
    shortTitle: "HR Questions & Answers",
    category: "HR & Behavioral",
    readTime: "14 min read",
    difficulty: "All Levels",
    publishDate: "October 2026",
    summary: "Learn how to structure compelling answers for behavioral and culture-fit rounds using the STAR method, with recruiter rationale breakdowns, word-for-word responses, and trap avoidance tips.",
    author: "AI Talent Advisory Team",
    tags: ["HR Interview", "Behavioral", "STAR Method", "Career Advice", "Soft Skills"],
    tableOfContents: [
      { id: "star-method-framework", title: "1. The Psychology of HR Rounds & The STAR Method" },
      { id: "tell-me-about-yourself", title: "2. 'Tell Me About Yourself' (The Present-Past-Future Formula)" },
      { id: "strengths-and-weaknesses", title: "3. 'What Is Your Greatest Weakness?'" },
      { id: "conflict-management", title: "4. 'Describe a Conflict With a Coworker or Manager'" },
      { id: "why-our-company", title: "5. 'Why Do You Want to Work Here?'" },
      { id: "five-year-vision", title: "6. 'Where Do You See Yourself in 5 Years?'" },
      { id: "failure-experience", title: "7. 'Tell Me About a Time You Failed'" },
      { id: "questions-for-interviewer", title: "8. High-Impact Questions You Must Ask the Interviewer" }
    ],
    sections: [
      {
        id: "star-method-framework",
        title: "1. The Psychology of HR Rounds & The STAR Method",
        overview: "Human Resources and behavioral interviews are not casual chats. They are structured evaluation systems designed to evaluate cultural alignment, resilience, communication clarity, and teamwork.",
        question: "Why do interviewers ask behavioral questions, and what is the STAR framework?",
        explanation: "Recruiters operate on one proven principle: **Past behavior is the best predictor of future performance.** Instead of asking hypothetical questions ('What would you do?'), interviewers ask for specific historical examples ('Tell me about a time when...').\n\nThe **STAR framework** is the gold standard for structuring behavioral responses:\n\n- **S — Situation (15-20% of time)**: Set the context. Where were you working, what was the project, and what was the challenge?\n- **T — Task (10-15% of time)**: Define your exact personal role and responsibility in solving that challenge.\n- **A — Action (50-60% of time)**: Detail the precise steps YOU took. Use 'I' instead of 'we'. Focus on decisions, technical tools, and communication.\n- **R — Result (15-20% of time)**: Quantify the outcome with numbers, metrics, or positive changes (e.g. 'reduced latency by 35%', 'saved 10 hours a week').",
        codeExample: `// The STAR Architecture Breakdown
const STAR_Response = {
  Situation: "At Acme Corp, our payment processing service dropped 12% of mobile requests on Black Friday.",
  Task: "As the junior backend engineer, I was assigned to diagnose the bottleneck and prevent server timeouts.",
  Action: "I profiled our SQL queries, discovered unindexed foreign keys causing table locks, and added Redis caching with an async queue.",
  Result: "Database CPU utilization dropped from 94% to 28%, and zero payment transactions dropped during the remaining peak."
};`,
        commonMistake: "Spending 80% of your answer talking about the background problem and only 20% on the action you personally took. Keep the Situation brief and expand on your Actions.",
        evaluatorTip: "Always close your STAR stories with measurable metrics or a clear lesson learned. Concrete numbers turn an unconvincing story into credible evidence."
      },
      {
        id: "tell-me-about-yourself",
        title: "2. 'Tell Me About Yourself' (The Present-Past-Future Formula)",
        overview: "This is universally the first question in 95% of interviews. Your response sets the narrative tone and confidence baseline for the entire session.",
        question: "How do you answer 'Tell me about yourself' without reciting your resume?",
        explanation: "Do NOT begin with where you were born, your childhood hobbies, or a line-by-line reading of your CV. The recruiter already has your resume.\n\nUse the **Present-Past-Future framework**:\n1. **Present (30 sec)**: What is your current role, primary technical specialization, and recent high-impact achievement?\n2. **Past (45 sec)**: What foundational background, education, or projects led you here?\n3. **Future (20 sec)**: Why is this specific company and role the logical next step in your career journey?\n\nKeep your total answer between 90 and 120 seconds.",
        codeExample: `// Word-for-Word Recommended Answer:
"I am a full-stack developer specializing in modern JavaScript ecosystems, particularly React, Node.js, and RESTful API architecture. 

In my most recent role [or capstone university project], I built an end-to-end analytics dashboard that handled real-time telemetry from over 1,000 simulated devices, reducing dashboard render lag by 40% using memoization and virtualized lists. 

Prior to this, I completed my Computer Science degree where I led our team to win a 36-hour hackathon by developing an automated accessibility auditing tool. 

I've followed your engineering blog's recent posts on scaling cloud infrastructure, and I'm really excited about this opportunity because your team is solving large-scale distributed frontend challenges where my performance optimization skills can make an immediate impact."`,
        commonMistake: "Asking 'What do you want to know?' or reciting personal details like hobbies and schooling history from 10 years ago.",
        evaluatorTip: "Practice your elevator pitch out loud until it sounds conversational, energetic, and natural rather than memorized."
      },
      {
        id: "strengths-and-weaknesses",
        title: "3. 'What Is Your Greatest Weakness?'",
        overview: "This question tests authentic self-awareness, professional humility, and whether you possess a growth mindset.",
        question: "How should you answer the weakness question without damaging your candidacy?",
        explanation: "Never use cliché 'humble-brags' like 'I'm too much of a perfectionist' or 'I work too hard'. Recruiters hear these dozens of times and immediately recognize insincerity.\n\nThe winning formula:\n1. **Acknowledge a genuine, non-fatal weakness** (a secondary skill or behavioral habit that won't disqualify you from core job duties).\n2. **Explain the concrete actions you are actively taking to improve it**.\n3. **Provide evidence of measurable progress**.",
        codeExample: `// Word-for-Word Recommended Answer:
"Historically, I used to struggle with public speaking and presenting my technical designs to larger groups. Because I was confident in my code, I assumed the code would speak for itself, but I noticed that during cross-functional meetings, quieter team members often get overlooked.

To address this actively, over the last six months I joined an engineering presentation group and volunteered to lead our bi-weekly sprint demo sessions. I also started creating structured visual diagrams before meetings so I could communicate architectural trade-offs concisely.

While public speaking is still not completely effortless for me, I recently presented our quarterly API refactoring plan to a group of 25 stakeholders without hesitation, and received positive feedback on my clarity."`,
        commonMistake: "Naming a core competency of the job as your weakness (e.g. applying for a frontend role and saying 'I am really bad at CSS and JavaScript').",
        evaluatorTip: "A great answer demonstrates that you are self-aware, proactive about self-improvement, and open to feedback."
      },
      {
        id: "conflict-management",
        title: "4. 'Describe a Conflict With a Coworker or Manager'",
        overview: "Software development is collaborative. Disagreements over architecture, deadlines, and code reviews are inevitable. Employers want to know if you handle friction maturely.",
        question: "How should you discuss conflict without sounding difficult or placing blame?",
        explanation: "The purpose of this question is to assess your emotional intelligence (EQ). A mature engineer focuses on **the problem, not the person**.\n\nStructure your response:\n1. State a professional disagreement (e.g., tech stack choice, code review feedback, or feature prioritization).\n2. Show empathy by validating the other person's perspective.\n3. Explain the objective data-driven compromise you reached.\n4. Share the positive end result and how it strengthened the working relationship.",
        codeExample: `// Word-for-Word Recommended Answer:
"During a recent team project, my senior colleague and I had a strong disagreement regarding state management. He advocated for introducing Redux Toolkit across the entire app, while I felt that for our relatively simple five-screen flow, React Context and local state hooks would prevent unnecessary boilerplate and bundle bloat.

Instead of arguing personal preferences in pull request comments, I scheduled a 20-minute discussion. I first listened to his reasoning—he was anticipating significant feature scaling next quarter. I acknowledged his point, but presented a bundle analyzer report showing the impact on initial load time for our mobile users.

We compromised by isolating our authentication and user session state in lightweight Context, while agreeing on clear threshold criteria for when we would migrate to Redux as features grew. This allowed us to hit our release deadline, and our collaboration on code reviews became much closer as a result."`,
        commonMistake: "Saying 'I have never had a conflict with anyone'. This signals either extreme inexperience or dishonesty. Disagreements happen on every healthy engineering team.",
        evaluatorTip: "Focus on de-escalation, active listening, and finding data-driven compromises. Never badmouth former managers, colleagues, or companies."
      },
      {
        id: "why-our-company",
        title: "5. 'Why Do You Want to Work Here?'",
        overview: "Companies want to hire people who specifically want to work for them, not someone sending out 300 identical applications on LinkedIn.",
        question: "How do you demonstrate genuine company interest in an HR interview?",
        explanation: "To score top marks on this question, research 3 things before the call:\n1. **The Product**: Use the app or read their documentation. Mention a specific feature you noticed.\n2. **The Engineering Culture**: Check their engineering blog, open-source repositories, or tech stack.\n3. **Company Mission or Milestones**: Have they expanded recently? Did they release a major update?\n\nConnect their specific company challenges to what you want to learn and contribute.",
        codeExample: `// Word-for-Word Recommended Answer:
"I've been following your engineering updates closely, particularly the recent case study on how your team reduced WebSocket latency for your real-time audio pipeline. 

Coming from a background building interactive React web apps, I really admire how clean and responsive your user experience is even on low-bandwidth connections. 

Furthermore, during my research on your company culture, I noticed your strong emphasis on peer code reviews and internal tech talks. I want to work in an environment where engineering excellence and continuous learning are prioritized, and where my frontend performance skills can directly impact hundreds of thousands of candidates."`,
        commonMistake: "Saying 'Because you are a Fortune 500 company and you offer great compensation and remote work perks'. This focuses on what the company does for you rather than what you bring to them.",
        evaluatorTip: "Mentioning a specific engineering blog post or product detail that isn't on the company's homepage immediately puts you in the top 5% of candidates."
      },
      {
        id: "five-year-vision",
        title: "6. 'Where Do You See Yourself in 5 Years?'",
        overview: "Hiring and training an employee takes immense company resources. Recruiters ask this to gauge your career ambition and whether you plan to stay long enough to deliver return on investment.",
        question: "How do you discuss future ambitions without overpromising or sounding restless?",
        explanation: "Focus on **competence, leadership depth, and domain expertise** rather than specific managerial job titles.\n\nKey beats:\n1. Year 1-2: Master the internal codebase, deliver reliable features, and contribute independently.\n2. Year 3-4: Mentor junior teammates, participate in system design architecture, and drive key product initiatives.\n3. Year 5: Recognized as a go-to technical authority who bridges engineering execution with business impact.",
        codeExample: `// Word-for-Word Recommended Answer:
"In the next five years, my goal is to evolve from a strong individual contributor into a well-rounded senior engineer and technical mentor. 

In the first couple of years, I want to deeply understand your product architecture, contribute clean, reliable code, and streamline our deployment pipelines. 

As I gain domain mastery, I want to take on architectural ownership of larger features and actively mentor junior developers and interns. Ultimately, I see myself taking on technical leadership responsibilities where I can help shape engineering best practices and ensure our software scales efficiently."`,
        commonMistake: "Saying 'I want to start my own startup in two years' or 'I want to be a product manager or director'. This makes the recruiter wonder why they should invest in hiring you as an engineer today.",
        evaluatorTip: "Show enthusiasm for steady technical growth within the engineering track of the company."
      },
      {
        id: "failure-experience",
        title: "7. 'Tell Me About a Time You Failed'",
        overview: "Everyone makes mistakes in tech—deploying buggy code, underestimating deadlines, or misunderstanding a specification. Interviewers evaluate how you take accountability and recover.",
        question: "How do you discuss failure without making yourself look incompetent?",
        explanation: "Rules for discussing failure:\n1. **Pick a real technical or process failure**, but one where the failure was an honest miscalculation rather than negligence or unethical behavior.\n2. **Take full personal ownership**: Never blame teammates, QA, or vague 'miscommunications'.\n3. **Explain the immediate containment action**: How did you fix the immediate problem?\n4. **Detail the permanent systemic prevention**: What safeguards did you install to ensure it never happens again?",
        codeExample: `// Word-for-Word Recommended Answer:
"In my final semester project, I was responsible for deploying our backend API. Under pressure to finish ahead of the deadline, I pushed an unverified database migration script directly to our staging server without backing up the testing database first. The migration script contained a syntax error that corrupted the mock candidate records, stalling our front-end teammates for four hours.

I immediately took ownership of the mistake, informed the team, and spent the next two hours manually restoring our database schema from seed scripts. 

More importantly, I established a strict safeguard: I introduced automated database backup snapshots before every migration command and wrote a pre-commit script that runs dry-run checks in a separate Docker container before any migration touches shared environments. We never had another deployment data loss incident."`,
        commonMistake: "Choosing a failure where you blame someone else, or picking something trivial like 'I forgot my password once'.",
        evaluatorTip: "Accountability + Root-cause prevention = The mark of a true software professional."
      },
      {
        id: "questions-for-interviewer",
        title: "8. High-Impact Questions You Must Ask the Interviewer",
        overview: "When the interviewer asks 'Do you have any questions for me?', saying 'No, you answered everything' is a missed opportunity. Great questions show deep curiosity and analytical thinking.",
        question: "What questions should you ask at the end of an HR or behavioral interview?",
        explanation: "Group your questions into three categories:\n1. **Engineering Practices & Culture**\n2. **Role Expectations & Success Criteria**\n3. **Interviewer's Personal Experience**\n\nPick 2 or 3 questions based on who is interviewing you (HR vs Tech Lead vs Director).",
        codeExample: `// High-Impact Questions You Can Ask:

// 1. Expectations:
"What would success look like in this role during the first 90 days?"

// 2. Culture & Engineering Reality:
"How does the engineering team handle technical debt versus new feature pressure from management?"

// 3. Team Dynamics:
"What is the typical code review and CI/CD deployment cadence on the team I would be joining?"

// 4. Personal Perspective:
"What has surprised you most about working at this company compared to your previous roles?"

// 5. Next Steps:
"What are the next milestones in the hiring process, and is there any additional information I can provide?"`,
        commonMistake: "Asking about salary, vacation days, or break policy during the initial round before establishing mutual interest.",
        evaluatorTip: "Write down 4 questions beforehand so you have backups if the interviewer naturally answers 1 or 2 during the conversation."
      }
    ]
  },
  {
    id: "react-interview-questions-answers",
    slug: "react-interview-questions-answers",
    title: "React Interview Questions and Answers: From Components & Hooks to Performance",
    shortTitle: "React Questions & Answers",
    category: "React",
    readTime: "16 min read",
    difficulty: "Intermediate",
    publishDate: "October 2026",
    summary: "Master essential React concepts: Virtual DOM diffing, JSX, state vs props, hooks (useState, useEffect, useRef, useMemo, useCallback, custom hooks), component lifecycles, and optimization techniques.",
    author: "AI Frontend Practice Team",
    tags: ["React", "Hooks", "Frontend", "JavaScript", "Virtual DOM", "Performance"],
    tableOfContents: [
      { id: "components-jsx-vdom", title: "1. Components, JSX, and the Virtual DOM" },
      { id: "props-vs-state", title: "2. Props vs State & Unidirectional Data Flow" },
      { id: "usestate-batching", title: "3. useState & Batching Mechanics" },
      { id: "useeffect-lifecycle", title: "4. useEffect: Lifecycles, Dependencies & Cleanups" },
      { id: "useref-dom-access", title: "5. useRef: Persistent Values Without Re-renders" },
      { id: "usememo-usecallback", title: "6. Performance Optimization: useMemo vs useCallback" },
      { id: "custom-hooks", title: "7. Building Custom Hooks for Clean Architecture" },
      { id: "react-traps-gotchas", title: "8. Critical React Interview Gotchas & Memory Leaks" }
    ],
    sections: [
      {
        id: "components-jsx-vdom",
        title: "1. Components, JSX, and the Virtual DOM",
        overview: "Interviewers want to see whether you understand how React compiles component code and applies mutations to the browser's real Document Object Model.",
        question: "How does React work under the hood, and what role does the Virtual DOM play?",
        explanation: "1. **JSX is syntactic sugar**: Browsers cannot read JSX directly. Babel or Vite compiles JSX like `<div className='box'>Hello</div>` into plain JavaScript calls: `React.createElement('div', { className: 'box' }, 'Hello')`.\n\n2. **Virtual DOM (VDOM)**: An in-memory JavaScript tree representation of the real DOM. Creating and mutating JavaScript objects is thousands of times faster than touching the browser's real DOM.\n\n3. **Reconciliation & Diffing Algorithm**: When state changes in a component:\n   - React creates a new Virtual DOM tree.\n   - It runs a heuristic $O(n)$ diffing algorithm comparing the new VDOM with the previous snapshot.\n   - It computes the minimal set of real DOM operations required (patches) and batches them in a single paint cycle.\n\n4. **Why `key` is mandatory in lists**: Keys give elements a persistent identity across re-renders. Without unique keys, React cannot distinguish whether an element was added, deleted, or reordered, leading to unnecessary re-renders or corrupted state in form inputs.",
        codeExample: `// 1. What JSX compiles into:
// JSX:
const element = <button className="btn-primary">Click Me</button>;

// Compiled JavaScript:
const elementCompiled = React.createElement(
  "button",
  { className: "btn-primary" },
  "Click Me"
);

// 2. The Danger of using index as Key in dynamic lists:
// BAD: Index as key causes bugs when items are deleted or inserted at top!
{items.map((item, index) => (
  <TodoItem key={index} text={item.text} />
))}

// GOOD: Stable unique identifier from database or uuid
{items.map((item) => (
  <TodoItem key={item.id} text={item.text} />
))}`,
        commonMistake: "Saying 'The Virtual DOM makes React faster than vanilla JavaScript'. Vanilla JavaScript that directly updates the exact DOM node is technically faster. The Virtual DOM provides a declarative API that makes applications fast *by default* without requiring developers to manually write imperative DOM mutation code.",
        evaluatorTip: "Always mention 'Reconciliation' and explain that React batches DOM mutations to avoid browser layout thrashing."
      },
      {
        id: "props-vs-state",
        title: "2. Props vs State & Unidirectional Data Flow",
        overview: "State and props are the twin pillars of React data architecture. Understanding their boundaries prevents messy codebases.",
        question: "What is the difference between props and state, and what is unidirectional data flow?",
        explanation: "- **Props (Properties)**: Read-only inputs passed from a parent component down to a child component. A component MUST NEVER modify its own props (pure function principle).\n- **State**: Mutable, encapsulated data managed internally within a component that can change over time based on user interactions or network responses. When state updates, React schedules a re-render of the component and its children.\n- **Unidirectional Data Flow**: Data in React flows in one direction: from top to bottom (parent to child) via props. If a child needs to update parent state, the parent passes down a callback function via props. The child triggers that function with payload data ('lifting state up').",
        codeExample: `// Parent Component
function InterviewDashboard() {
  const [selectedRole, setSelectedRole] = React.useState("Frontend");

  // Callback passed to child to modify parent state
  const handleRoleChange = (newRole) => {
    setSelectedRole(newRole);
  };

  return (
    <div className="dashboard">
      <h1>Active Role: {selectedRole}</h1>
      {/* Passing state down as props + callback down as props */}
      <RoleSelector currentRole={selectedRole} onSelect={handleRoleChange} />
    </div>
  );
}

// Child Component (Pure, Read-Only Props)
function RoleSelector({ currentRole, onSelect }) {
  // Props are immutable: NEVER do currentRole = "Backend"
  return (
    <div className="buttons">
      {["Frontend", "Backend", "Fullstack"].map((role) => (
        <button
          key={role}
          className={currentRole === role ? "active" : ""}
          onClick={() => onSelect(role)} // Invoking parent callback
        >
          {role}
        </button>
      ))}
    </div>
  );
}`,
        commonMistake: "Copying props directly into local state (e.g. `const [name, setName] = useState(props.initialName)`) unless you specifically intend for local state to diverge permanently from parent updates.",
        evaluatorTip: "Explain the term 'lifting state up': when two sibling components need to share the same data, lift that state up to their closest common parent ancestor."
      },
      {
        id: "usestate-batching",
        title: "3. useState & Batching Mechanics",
        overview: "`useState` is the most common hook in React, but its asynchronous scheduling catches many candidates off guard.",
        question: "Why doesn't state update immediately after calling setState, and what is automatic batching?",
        explanation: "1. **State updates are asynchronous**: Calling `setCount(count + 1)` does not mutate the current `count` variable in place. It schedules a re-render for the next render pass.\n2. **Automatic Batching (React 18+)**: React groups multiple state updates together into a single re-render cycle for performance optimization, whether inside event handlers, `setTimeout`, Promises, or native event listeners.\n3. **Functional Updater**: If your new state depends on the previous state value, you must pass an updater callback `setCount(prev => prev + 1)` to guarantee you are operating on the freshest queued state value.",
        codeExample: `function Counter() {
  const [count, setCount] = React.useState(0);

  const handleIncorrectIncrement = () => {
    // BUG: Both calls read 'count' as 0 during the same render pass!
    setCount(count + 1); // schedules 0 + 1
    setCount(count + 1); // schedules 0 + 1
    // Final result after render: count is 1, NOT 2!
  };

  const handleCorrectIncrement = () => {
    // CORRECT: Functional updates queue state transitions sequentially
    setCount((prev) => prev + 1); // 0 -> 1
    setCount((prev) => prev + 1); // 1 -> 2
    // Final result after render: count is 2!
  };

  return (
    <div>
      <p>Current Count: {count}</p>
      <button onClick={handleCorrectIncrement}>+2 Safely</button>
    </div>
  );
}`,
        commonMistake: "Calling `setCount(5)` and immediately doing `console.log(count)` on the next line expecting to see `5`. The variable still holds the value from the current render closure.",
        evaluatorTip: "Always use functional updaters `prev => ...` whenever computing new state from prior state."
      },
      {
        id: "useeffect-lifecycle",
        title: "4. useEffect: Lifecycles, Dependencies & Cleanups",
        overview: "`useEffect` handles side-effects: network requests, subscriptions, DOM mutations, and timers. Dependency array subtleties are tested continuously.",
        question: "How does useEffect work, and what purpose does the cleanup function serve?",
        explanation: "1. **No dependency array (`useEffect(fn)`)**: Runs after EVERY single render.\n2. **Empty dependency array (`useEffect(fn, [])`)**: Runs ONCE after the initial component mount.\n3. **With dependencies (`useEffect(fn, [a, b])`)**: Runs on mount and re-runs whenever any dependency value changes (checked via `Object.is`).\n4. **Cleanup function**: The function returned by `useEffect` executes:\n   - Before the component unmounts from the DOM.\n   - Before re-running the effect on subsequent renders when dependencies change.\n   Crucial for unsubscribing from sockets, clearing `setInterval`, and cancelling pending abortable fetch requests.",
        codeExample: `function LiveScoreFeed({ interviewId }) {
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    let isMounted = true;
    console.log(\`Connecting to telemetry for session \${interviewId}...\`);

    const timer = setInterval(() => {
      // Simulating real-time incoming score stream
      if (isMounted) {
        setScore((prev) => Math.min(100, prev + Math.floor(Math.random() * 5)));
      }
    }, 1000);

    // CLEANUP FUNCTION: Essential to prevent memory leaks!
    return () => {
      console.log(\`Cleaning up telemetry for session \${interviewId}...\`);
      isMounted = false;
      clearInterval(timer); // Stops timer when component unmounts or interviewId changes
    };
  }, [interviewId]); // Only re-runs if interviewId changes

  return <div>Live Score: {score}%</div>;
}`,
        commonMistake: "Omitting variables used inside `useEffect` from the dependency array to prevent re-renders, causing stale closures where the effect reads outdated state.",
        evaluatorTip: "Mention the AbortController API: modern cleanups use `controller.abort()` to cancel pending fetch requests when components unmount."
      },
      {
        id: "useref-dom-access",
        title: "5. useRef: Persistent Values Without Re-renders",
        overview: "`useRef` serves two very distinct purposes in React: accessing DOM nodes directly and storing mutable values across renders.",
        question: "When should you use useRef instead of useState?",
        explanation: "`useRef` returns a mutable object `{ current: initialValue }` that persists across the full lifecycle of the component.\n\nTwo primary use cases:\n1. **Direct DOM Access**: Focusing an input element, measuring element bounding rects, playing/pausing a video element, or interfacing with third-party non-React libraries (e.g. Chart.js or canvas).\n2. **Mutable Instance Variables**: Storing timer IDs, previous state values, or tracking flags where **changing the value should NOT trigger a UI re-render**.\n\n`useState` causes a re-render when modified; `useRef.current` mutation does NOT cause a re-render.",
        codeExample: `function VideoAnswerRecorder() {
  const [isRecording, setIsRecording] = React.useState(false);
  
  // 1. DOM Reference: Accessing native video element directly
  const videoElementRef = React.useRef(null);

  // 2. Mutable Variable: Storing timer ID without causing re-renders
  const timerIdRef = React.useRef(null);
  const secondsElapsedRef = React.useRef(0);

  const startRecording = () => {
    setIsRecording(true);
    videoElementRef.current?.play(); // Direct imperative DOM call

    timerIdRef.current = setInterval(() => {
      secondsElapsedRef.current += 1;
      console.log("Recorded seconds:", secondsElapsedRef.current);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    videoElementRef.current?.pause();
    clearInterval(timerIdRef.current); // Clearing using persistent ref
  };

  return (
    <div>
      <video ref={videoElementRef} src="/placeholder.mp4" muted />
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
}`,
        commonMistake: "Writing to `ref.current` during rendering (`ref.current = Math.random()`). Refs should only be read or modified inside `useEffect` or event handlers to avoid unpredictable render passes.",
        evaluatorTip: "Remember: 'If you want the UI to update when the data changes, use useState. If you want to keep track of data quietly behind the scenes, use useRef.'"
      },
      {
        id: "usememo-usecallback",
        title: "6. Performance Optimization: useMemo vs useCallback",
        overview: "Premature optimization is a red flag, but knowing how to prevent costly re-renders is expected of mid-level engineers.",
        question: "What is the difference between useMemo and useCallback, and when should you actually use them?",
        explanation: "- `useMemo(cb, deps)`: Memoizes the **result of a calculation**. It re-runs the computation function only when dependencies change, avoiding expensive loops, sorting, or data transformations on every render.\n- `useCallback(cb, deps)`: Memoizes a **function definition itself**. In JavaScript, functions are recreated as new reference addresses on every render (`() => {} !== () => {}`). Passing an un-memoized function to an optimized child wrapped in `React.memo` breaks memoization because the prop reference changes.\n\n**When NOT to use them**:\nDo not wrap simple inline calculations (like `a + b` or basic filtering of 10 items). Memoization introduces memory overhead and dependency comparison costs. Use them only when measuring a tangible performance bottleneck or maintaining referential stability.",
        codeExample: `// Child component wrapped in React.memo (only re-renders if props change)
const QuestionCard = React.memo(({ question, onAnswerSubmit }) => {
  console.log("Rendered QuestionCard:", question.id);
  return (
    <div className="card">
      <h3>{question.title}</h3>
      <button onClick={() => onAnswerSubmit(question.id)}>Submit Answer</button>
    </div>
  );
});

function InterviewManager({ questions, filterQuery }) {
  const [selectedId, setSelectedId] = React.useState(null);

  // 1. useMemo: Caches filtered list computation
  const filteredQuestions = React.useMemo(() => {
    console.log("Expensive filtering running...");
    return questions.filter(q => q.title.toLowerCase().includes(filterQuery.toLowerCase()));
  }, [questions, filterQuery]);

  // 2. useCallback: Preserves function reference so QuestionCard doesn't re-render
  const handleSubmit = React.useCallback((questionId) => {
    setSelectedId(questionId);
    console.log("Submitting question:", questionId);
  }, []); // Empty deps = stable reference forever

  return (
    <div>
      {filteredQuestions.map(q => (
        <QuestionCard key={q.id} question={q} onAnswerSubmit={handleSubmit} />
      ))}
    </div>
  );
}`,
        commonMistake: "Wrapping every callback in `useCallback` without wrapping the child component in `React.memo`. If the child isn't memoized, it will re-render anyway when the parent renders!",
        evaluatorTip: "Formula to state in interviews: `useMemo(() => fn, deps)` is equivalent to `useCallback(fn, deps)`."
      },
      {
        id: "custom-hooks",
        title: "7. Building Custom Hooks for Clean Architecture",
        overview: "Custom hooks allow you to extract component logic into reusable, testable functions following clean architecture.",
        question: "How do you create a custom hook, and what are the rules governing hooks?",
        explanation: "A custom hook is a standard JavaScript function whose name begins with `use` and that can call other React hooks (`useState`, `useEffect`, etc.).\n\n**The Two Rules of Hooks**:\n1. **Only Call Hooks at the Top Level**: Do not call hooks inside loops, conditions, or nested functions to ensure hooks are called in the exact same order on every render.\n2. **Only Call Hooks from React Functions**: Call them from React functional components or custom hooks, never from regular vanilla JS functions.",
        codeExample: `// Custom Hook: useDebounce
// Delays updating value until user stops typing for 'delay' ms
function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer); // Cleanup timer if value changes rapidly
  }, [value, delay]);

  return debouncedValue;
}

// Consuming Component
function CandidateSearch() {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  // Custom hook in action
  const debouncedSearch = useDebounce(searchTerm, 500);

  React.useEffect(() => {
    if (debouncedSearch) {
      console.log("API Search Triggered for:", debouncedSearch);
      // fetch('/api/search?q=' + debouncedSearch)
    }
  }, [debouncedSearch]);

  return (
    <input 
      type="text"
      placeholder="Type to search candidates..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}`,
        commonMistake: "Thinking custom hooks share state between components. Each component calling a custom hook receives an entirely independent, isolated copy of that hook's state.",
        evaluatorTip: "Mention real-world custom hooks you've written or used: `useMediaQuery`, `useLocalStorage`, `useDebounce`, or `useAuth`."
      },
      {
        id: "react-traps-gotchas",
        title: "8. Critical React Interview Gotchas & Memory Leaks",
        overview: "Senior and staff engineers evaluate whether you have battle-tested experience by asking about common React production pitfalls.",
        question: "What are the most frequent React pitfalls you must avoid in production code?",
        explanation: "Top 5 React interview gotchas:\n\n1. **Stale Closures**: An effect or callback captures an outdated value of state because dependencies were omitted from `useEffect` or `useCallback`.\n2. **Memory Leaks from Unsubscribed Listeners**: Setting window listeners (`resize`, `scroll`) or WebSocket subscriptions inside `useEffect` without removing them in the cleanup function.\n3. **Infinite Render Loops**: Calling a state updater inside the body of a component or inside a `useEffect` that lists that same state variable in its dependency array.\n4. **Over-using Context for High-Frequency State**: Storing high-frequency state (like keystrokes or mouse coordinates) in a React Context causes all consumer components to re-render, degrading performance.\n5. **Derived State Anti-Pattern**: Mirroring props into state when the value could have been computed on-the-fly during render.",
        codeExample: `// Gotcha 1: Unnecessary Derived State
// BAD:
function UserBadge({ firstName, lastName }) {
  const [fullName, setFullName] = React.useState('');
  React.useEffect(() => {
    setFullName(\`\${firstName} \${lastName}\`);
  }, [firstName, lastName]); // Unnecessary extra render!
  return <span>{fullName}</span>;
}

// GOOD: Compute during render (instant, clean, 0 extra renders)
function UserBadgeClean({ firstName, lastName }) {
  const fullName = \`\${firstName} \${lastName}\`;
  return <span>{fullName}</span>;
}

// Gotcha 2: The Stale Closure Trap
function StaleTimer() {
  const [seconds, setSeconds] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => {
      // BUG: 'seconds' is trapped as 0 from initial closure!
      // setSeconds(seconds + 1); 
      
      // FIX: Functional updater always reads fresh state
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []); // Empty deps is safe ONLY with functional updater
  return <div>{seconds}s</div>;
}`,
        commonMistake: "Thinking `React.memo` does deep comparison. It only performs a shallow reference comparison (`prevProp === nextProp`). Complex nested objects will still trigger re-renders unless custom comparison functions or immutable data is used.",
        evaluatorTip: "Demonstrating awareness of derived state and cleanups proves you write production-grade maintainable code."
      }
    ]
  }
];

export const getArticleBySlug = (slug) => {
  return preparationArticles.find(article => article.slug === slug);
};

