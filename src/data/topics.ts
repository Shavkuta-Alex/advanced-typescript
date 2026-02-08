// topics.ts — Structured content for Advanced TypeScript Learning Guide
// All code fields store raw TypeScript (not HTML-escaped).
// HTML tags in overview/keyConcepts are preserved for innerHTML rendering.

import type { Topic, QuickRefResource, IntroContent } from '@/types';

export const topics = [
  {
    id: 1,
    anchor: 't1',
    title: 'Discriminated Unions and Exhaustiveness',
    difficulty: 'Upper Intermediate',
    diffClass: '',
    prerequisites: 'Union types, type narrowing, never type',
    overview: 'Discriminated unions (tagged unions) use a common property to distinguish between variants, enabling TypeScript to narrow types in control flow. This is the foundation for modeling domain logic, API responses, Redux-style actions, and state machines. Master this first \u2014 it\u2019s used throughout advanced TypeScript patterns.',
    keyConcepts: [
      'Single and multiple discriminant properties',
      'Exhaustiveness checking with the never type',
      'Extracting and manipulating union variants',
      'Narrowing with in operator, typeof, and instanceof',
      'Nested discriminated unions for complex state',
      'Generic discriminated union factories'
    ],
    code: `// Basic discriminated union
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function handleResult<T>(result: Result<T>) {
  if (result.ok) {
    console.log(result.value);  // TS knows value exists
  } else {
    console.error(result.error); // TS knows error exists
  }
}

// EXHAUSTIVENESS CHECKING with never
type Action =
  | { type: 'INCREMENT'; amount: number }
  | { type: 'DECREMENT'; amount: number }
  | { type: 'RESET' };

function assertNever(x: never): never {
  throw new Error(\`Unexpected: \${JSON.stringify(x)}\`);
}

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREMENT': return state + action.amount;
    case 'DECREMENT': return state - action.amount;
    case 'RESET': return 0;
    default: return assertNever(action); // Error if case missing!
  }
}

// EXTRACT UNION VARIANTS
type ExtractVariant<U, T> = U extends { type: T } ? U : never;
type IncrementAction = ExtractVariant<Action, 'INCREMENT'>;

// GENERATE DISCRIMINATED UNION FROM CONFIG
type EventConfig = { click: { x: number; y: number }; keypress: { key: string } };
type Event = { [K in keyof EventConfig]: { type: K } & EventConfig[K] }[keyof EventConfig];`,
    resources: [
      { url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions', title: 'TypeScript Handbook - Discriminated Unions', description: 'Official documentation' },
      { url: 'https://github.com/gvergnaud/ts-pattern', title: 'ts-pattern', description: 'Exhaustive pattern matching library' },
      { url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking', title: 'Exhaustiveness Checking', description: 'Never type for completeness' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/literal-types', title: 'Literal Types', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/union-types', title: 'Union Types', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/type-narrowing', title: 'Type Narrowing', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/discriminated-union', title: 'Discriminated Union', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md', title: 'Pick', difficulty: 'Easy', diffClass: 'ex-easy', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00043-easy-exclude/README.md', title: 'Exclude', difficulty: 'Easy', diffClass: 'ex-easy', source: 'Type Challenges' }
    ],
    hints: [
      'Think about using the never type in the default case of a switch statement to catch missing cases at compile time.',
      'Try creating a discriminated union with a "type" field and use a switch statement to narrow the type.'
    ]
  },
  {
    id: 2,
    anchor: 't2',
    title: 'satisfies Operator and const Assertions',
    difficulty: 'Upper Intermediate',
    diffClass: '',
    prerequisites: 'Type inference, literal types, readonly types',
    overview: 'The <code>satisfies</code> operator (TS 4.9+) and <code>as const</code> assertions are essential modern TypeScript tools. While <code>as const</code> creates the narrowest possible literal type, <code>satisfies</code> validates against a type without widening. Together they enable precise typing of configuration objects while preserving full literal type information.',
    keyConcepts: [
      '<code>as const</code> creates deeply readonly types with literal values',
      '<code>satisfies</code> checks type compatibility without changing the inferred type',
      'Combining both for validated literal configurations',
      'Preserving string literal keys while ensuring value types',
      'Type-safe exhaustive objects with known keys'
    ],
    code: `// WITHOUT satisfies - type annotation widens
const colors1: Record<string, [number, number, number]> = {
  red: [255, 0, 0], green: [0, 255, 0],
};
colors1.typo; // No error - any string key allowed!

// WITH satisfies - validates but preserves literal types
const colors2 = {
  red: [255, 0, 0], green: [0, 255, 0],
} satisfies Record<string, [number, number, number]>;
colors2.red;   // Type is [255, 0, 0] - literal preserved!
colors2.typo;  // Error! Only 'red' | 'green' allowed

// as const for deepest literal type
const routes = { home: '/', users: '/users' } as const;
type RouteValues = typeof routes[keyof typeof routes]; // '/' | '/users'

// COMBINING BOTH for ultimate control
const apiRoutes = {
  getUsers: '/api/users',
  getUser: '/api/users/:id',
} as const satisfies Record<string, \`/\${string}\`>;
// Validates AND preserves literal types!`,
    resources: [
      { url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator', title: 'TypeScript 4.9 - satisfies', description: 'Official release notes' },
      { url: 'https://www.totaltypescript.com/clarifying-the-satisfies-operator', title: 'Total TypeScript - satisfies', description: "Matt Pocock's deep dive" }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/readonly', title: 'Readonly', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/typeof', title: 'Typeof', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/indexed-access', title: 'Indexed Access Types', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md', title: 'Readonly', difficulty: 'Easy', diffClass: 'ex-easy', source: 'Type Challenges' },
      { url: 'https://www.totaltypescript.com/workshops/type-transformations/type-helpers/constrain-a-type-helper-to-only-accept-strings', title: 'Constrain Type Helpers', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Total TypeScript' }
    ],
    hints: [
      'Try using "as const" first to see how it narrows types, then add "satisfies" to add validation without losing the narrow types.',
      'Remember: "satisfies" validates at the type level but doesn\'t change the inferred type.'
    ]
  },
  {
    id: 3,
    anchor: 't3',
    title: 'Advanced Infer Patterns and Positions',
    difficulty: 'Advanced',
    diffClass: 'advanced',
    prerequisites: 'Conditional types, basic infer usage, function types, variance',
    overview: 'The <code>infer</code> keyword is TypeScript\'s most powerful type extraction tool, but its behavior changes dramatically based on position (covariant vs contravariant). Mastering advanced infer patterns unlocks the ability to extract types from complex structures and understand why certain patterns produce unions vs intersections.',
    keyConcepts: [
      'Covariant positions (return types): multiple infers produce unions',
      'Contravariant positions (parameters): multiple infers produce intersections',
      'Using <code>infer X extends Constraint</code> for constrained inference (TS 4.7+)',
      'Inferring in template literal types for string parsing',
      'Variadic tuple infer: [...infer Head, infer Last]'
    ],
    code: `// COVARIANT - produces UNION
type Returns<T> = T extends { a: () => infer R } | { b: () => infer R } ? R : never;
type RU = Returns<{ a: () => string } | { b: () => number }>; // string | number

// CONTRAVARIANT - produces INTERSECTION
type Params<T> = T extends { a: (x: infer P) => void } | { b: (x: infer P) => void } ? P : never;
type PI = Params<{ a: (x: { foo: 1 }) => void } | { b: (x: { bar: 2 }) => void }>;
// { foo: 1 } & { bar: 2 }

// CONSTRAINED INFER (TS 4.7+)
type FirstStr<T> = T extends [infer S extends string, ...any[]] ? S : never;
type F = FirstStr<['hi', 42]>; // 'hi'

// VARIADIC TUPLE INFER
type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;
type L = Last<[1, 2, 3]>; // 3

// TEMPLATE LITERAL INFER
type ParseRoute<T> = T extends \`/\${infer Seg}/\${infer Rest}\`
  ? [Seg, ...ParseRoute<\`/\${Rest}\`>]
  : T extends \`/\${infer Seg}\` ? [Seg] : [];
type Segments = ParseRoute<'/users/123/posts'>; // ['users', '123', 'posts']`,
    resources: [
      { url: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types', title: 'TypeScript Handbook - Infer', description: 'Official documentation' },
      { url: 'https://type-level-typescript.com', title: 'Type-Level TypeScript', description: 'In-depth infer coverage' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/infer', title: 'Infer', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/return-type', title: 'ReturnType', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/parameters', title: 'Parameters', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/awaited', title: 'Awaited', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00002-medium-return-type/README.md', title: 'Get Return Type', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/03312-easy-parameters/README.md', title: 'Parameters', difficulty: 'Easy', diffClass: 'ex-easy', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/README.md', title: 'Awaited', difficulty: 'Easy', diffClass: 'ex-easy', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/03192-medium-reverse/README.md', title: 'Reverse', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' }
    ],
    hints: [
      'Remember: infer in covariant position (return types) produces unions, while in contravariant position (parameters) produces intersections.',
      'Use "infer X extends Constraint" to narrow what infer matches.'
    ]
  },
  {
    id: 4,
    anchor: 't4',
    title: 'Distributive Conditional Types',
    difficulty: 'Intermediate',
    diffClass: '',
    prerequisites: 'Union types, conditional types, generics',
    overview: 'Distributive conditional types automatically distribute over union types when the checked type is a naked type parameter. This behavior allows you to apply transformations to each member of a union independently. Understanding when distribution occurs (and how to prevent it) is crucial for writing predictable type utilities.',
    keyConcepts: [
      'Automatic distribution over naked type parameters in unions',
      'Preventing distribution by wrapping in tuple: [T] extends [U]',
      'The difference between distributed and non-distributed results',
      'Extract and Exclude as canonical distributive type examples',
      'Distribution behavior with never type'
    ],
    code: `// Distributive (naked type parameter)
type ToArray<T> = T extends any ? T[] : never;
type Distributed = ToArray<string | number>; // string[] | number[]

// Non-distributive (wrapped in tuple)
type ToArrayND<T> = [T] extends [any] ? T[] : never;
type NonDist = ToArrayND<string | number>; // (string | number)[]

// Extract/Exclude patterns
type Extract<T, U> = T extends U ? T : never;
type Exclude<T, U> = T extends U ? never : T;

type Strings = Extract<string | number | boolean, string>; // string
type NoStr = Exclude<string | number | boolean, string>;   // number | boolean

// Check if type is union
type IsUnion<T, U = T> = T extends any ? [U] extends [T] ? false : true : never;
type Test1 = IsUnion<string>;          // false
type Test2 = IsUnion<string | number>; // true`,
    resources: [
      { url: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types', title: 'TypeScript Handbook - Distributive Types', description: 'Official explanation' },
      { url: 'https://effectivetypescript.com', title: 'Effective TypeScript', description: 'Item 50 covers distribution in depth' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/conditional-types', title: 'Conditional Types', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/exclude', title: 'Exclude', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/extract', title: 'Extract', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/nonnullable', title: 'NonNullable', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00043-easy-exclude/README.md', title: 'Exclude', difficulty: 'Easy', diffClass: 'ex-easy', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00268-easy-if/README.md', title: 'If', difficulty: 'Easy', diffClass: 'ex-easy', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00949-medium-anyof/README.md', title: 'AnyOf', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' }
    ],
    hints: [
      'Wrap both sides in a tuple [T] extends [U] to prevent distribution over unions.',
      'Remember that never is the empty union \u2014 distributing over never returns never.'
    ]
  },
  {
    id: 5,
    anchor: 't5',
    title: 'Tuple Manipulation',
    difficulty: 'Intermediate to Advanced',
    diffClass: '',
    prerequisites: 'Basic tuple types, generics, infer keyword',
    overview: 'Tuple manipulation involves transforming fixed-length array types with heterogeneous element types. TypeScript provides powerful tools including variadic tuple types, labeled elements, and rest elements. These capabilities enable type-safe function composition and are the foundation for type-level arithmetic.',
    keyConcepts: [
      'Variadic tuple types with spread syntax [...T]',
      'Extracting first, last, and rest elements using infer',
      'Concatenating and reversing tuples at the type level',
      'Named/labeled tuple elements for better IDE support',
      'Converting between tuples and unions'
    ],
    code: `// Extract elements
type Head<T extends any[]> = T extends [infer F, ...any[]] ? F : never;
type Tail<T extends any[]> = T extends [any, ...infer R] ? R : [];
type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;

// Concatenate and reverse
type Concat<A extends any[], B extends any[]> = [...A, ...B];
type Reverse<T extends any[]> = T extends [infer F, ...infer R] ? [...Reverse<R>, F] : [];

// Usage
type Nums = [1, 2, 3, 4, 5];
type First = Head<Nums>;           // 1
type Rest = Tail<Nums>;            // [2, 3, 4, 5]
type Combined = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]
type Reversed = Reverse<Nums>;     // [5, 4, 3, 2, 1]
type Len = Nums['length'];         // 5

// Tuple to Union
type TupleToUnion<T extends any[]> = T[number];
type Union = TupleToUnion<[1, 2, 3]>; // 1 | 2 | 3`,
    resources: [
      { url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html', title: 'TypeScript 4.0 - Variadic Tuples', description: 'Feature introduction' },
      { url: 'https://github.com/type-challenges/type-challenges', title: 'Type Challenges', description: 'Tuple manipulation practice' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/tuple-length', title: 'Tuple Length', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/first-of-array', title: 'First of Array', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/last-of-array', title: 'Last of Array', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/concat', title: 'Concat', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/push', title: 'Push', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/unshift', title: 'Unshift', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.md', title: 'First of Array', difficulty: 'Easy', diffClass: 'ex-easy', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00015-medium-last/README.md', title: 'Last of Array', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00016-medium-pop/README.md', title: 'Pop', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/03057-easy-push/README.md', title: 'Push', difficulty: 'Easy', diffClass: 'ex-easy', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/03192-medium-reverse/README.md', title: 'Reverse', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' }
    ],
    hints: [
      'Use variadic tuple types [...T] to spread and combine tuples.',
      'Remember T["length"] gives you the length of a tuple as a literal number type.'
    ]
  },
  {
    id: 6,
    anchor: 't6',
    title: 'Template Literal Types',
    difficulty: 'Intermediate',
    diffClass: '',
    prerequisites: 'String literal types, union types, basic generics',
    overview: 'Template literal types bring string manipulation to the type level, allowing you to create new string literal types through concatenation and pattern matching. Combined with intrinsic types (Uppercase, Lowercase, Capitalize, Uncapitalize), they enable powerful string-based transformations for routes, events, and APIs.',
    keyConcepts: [
      'Creating string literal types with template syntax',
      'Intrinsic manipulation: Uppercase, Lowercase, Capitalize, Uncapitalize',
      'Pattern matching and extracting parts with infer',
      'Combining with unions for string permutations',
      'Building type-safe route parsers and event emitters'
    ],
    code: `type Greeting = \`Hello, \${'world'}\`; // "Hello, world"

// Union expansion
type Size = 'sm' | 'lg';
type Color = 'red' | 'blue';
type Combo = \`\${Color}-\${Size}\`; // "red-sm" | "red-lg" | "blue-sm" | "blue-lg"

// Intrinsic manipulation
type Upper = Uppercase<'hello'>;    // "HELLO"
type Cap = Capitalize<'hello'>;     // "Hello"

// Extract route params
type Params<T> = T extends \`\${string}:\${infer P}/\${infer R}\` ? P | Params<R>
  : T extends \`\${string}:\${infer P}\` ? P : never;
type P = Params<'/users/:id/posts/:pid'>; // "id" | "pid"

// Event handlers
type Handlers<T> = { [K in keyof T as \`on\${Capitalize<string & K>}\`]: (e: T[K]) => void };
type H = Handlers<{ click: MouseEvent }>; // { onClick: (e: MouseEvent) => void }

// Split string
type Split<S extends string, D extends string> =
  S extends \`\${infer H}\${D}\${infer T}\` ? [H, ...Split<T, D>] : [S];
type Parts = Split<'a-b-c', '-'>; // ['a', 'b', 'c']`,
    resources: [
      { url: 'https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html', title: 'TypeScript Handbook - Template Literals', description: 'Official documentation' },
      { url: 'https://type-level-typescript.com', title: 'Type-Level TypeScript', description: 'String manipulation chapter' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/template-literal-types', title: 'Template Literal Types', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/capitalize', title: 'Capitalize', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/trim', title: 'Trim', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/replace', title: 'Replace', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00106-medium-trimleft/README.md', title: 'Trim Left', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00108-medium-trim/README.md', title: 'Trim', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00110-medium-capitalize/README.md', title: 'Capitalize', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00116-medium-replace/README.md', title: 'Replace', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/02070-medium-drop-char/README.md', title: 'Drop Char', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00298-medium-length-of-string/README.md', title: 'Length of String', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' }
    ],
    hints: [
      'Template literal types distribute over unions \u2014 each member of the union gets combined.',
      'Use infer inside template literals to extract parts of a string type.'
    ]
  },
  {
    id: 7,
    anchor: 't7',
    title: 'Mapped Type Key Remapping',
    difficulty: 'Intermediate',
    diffClass: '',
    prerequisites: 'Mapped types, template literal types, keyof operator',
    overview: 'Key remapping in mapped types (TS 4.1+) allows you to transform the keys of an object type during mapping using the \'as\' clause. This enables powerful transformations like prefixing/suffixing keys, filtering keys, and creating entirely new object shapes from existing types.',
    keyConcepts: [
      "Using 'as' clause in mapped types for key transformation",
      'Combining with template literal types for string manipulation',
      "Filtering keys by returning 'never' to exclude them",
      'Creating getters/setters, prefixed methods, and event handlers'
    ],
    code: `// Getters
type Getters<T> = { [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K] };
interface Person { name: string; age: number; }
type PG = Getters<Person>; // { getName: () => string; getAge: () => number }

// Filter keys
type OnlyStrings<T> = { [K in keyof T as T[K] extends string ? K : never]: T[K] };

// Remove specific key
type RemoveKind<T> = { [K in keyof T as Exclude<K, 'kind'>]: T[K] };

// Event handlers
type Events<E extends string> = { [K in E as \`on\${Capitalize<K>}\`]: () => void };
type E = Events<'click' | 'hover'>; // { onClick: () => void; onHover: () => void }

// Getters + Setters
type Accessors<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
} & {
  [K in keyof T as \`set\${Capitalize<string & K>}\`]: (v: T[K]) => void
};`,
    resources: [
      { url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types', title: 'TypeScript 4.1 - Key Remapping', description: 'Feature introduction' },
      { url: 'https://www.typescriptlang.org/docs/handbook/2/mapped-types.html', title: 'TypeScript Handbook - Mapped Types', description: 'Comprehensive documentation' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/mapped-types', title: 'Mapped Types', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/pick', title: 'Pick', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/omit', title: 'Omit', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/readonly-2', title: 'Readonly 2', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00003-medium-omit/README.md', title: 'Omit', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00008-medium-readonly-2/README.md', title: 'Readonly 2', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00009-medium-deep-readonly/README.md', title: 'Deep Readonly', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/01367-medium-remove-index-signature/README.md', title: 'Remove Index Signature', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' }
    ],
    hints: [
      'Use "as never" to filter out keys you don\'t want in the resulting type.',
      'Combine key remapping with Capitalize to create getter/setter patterns.'
    ]
  },
  {
    id: 8,
    anchor: 't8',
    title: 'Recursive Conditional Types',
    difficulty: 'Advanced',
    diffClass: 'advanced',
    prerequisites: 'Conditional types, generics, infer keyword, tuples',
    overview: 'Recursive conditional types allow you to define types that reference themselves, enabling complex type transformations that operate on nested structures of arbitrary depth. This technique is essential for working with deeply nested objects, tree structures, and implementing utility types like DeepPartial and DeepReadonly.',
    keyConcepts: [
      'Self-referential type definitions',
      'Base cases to terminate recursion',
      "TypeScript's recursion depth limits (~50 levels)",
      'Tail-call optimization patterns',
      'Common patterns: DeepPartial, DeepReadonly, Flatten, Awaited'
    ],
    code: `// Deep Partial - makes all nested properties optional
type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

// Flatten nested arrays
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

// Unwrap nested Promises
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

// Usage
type Nested = { a: { b: { c: string } } };
type DP = DeepPartial<Nested>; // { a?: { b?: { c?: string } } }
type Flat = Flatten<number[][][][]>; // number
type Res = Awaited<Promise<Promise<string>>>; // string

// Deep Readonly
type DeepReadonly<T> = T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> } : T;

// Collect all paths
type Paths<T, P extends string = ''> = T extends object
  ? { [K in keyof T & string]: \`\${P}\${K}\` | Paths<T[K], \`\${P}\${K}.\`> }[keyof T & string]
  : never;`,
    resources: [
      { url: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html', title: 'TypeScript Handbook - Conditional Types', description: 'Official documentation' },
      { url: 'https://type-level-typescript.com', title: 'Type-Level TypeScript', description: 'Recursive types chapter' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/deep-readonly', title: 'Deep Readonly', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/flatten', title: 'Flatten', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/flatten-depth', title: 'Flatten Depth', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00009-medium-deep-readonly/README.md', title: 'Deep Readonly', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00459-medium-flatten/README.md', title: 'Flatten', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/03243-medium-flattendepth/README.md', title: 'Flatten Depth', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00213-hard-vue-basic-props/README.md', title: 'Vue Basic Props', difficulty: 'Hard', diffClass: 'ex-hard', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00956-hard-deeppick/README.md', title: 'DeepPick', difficulty: 'Hard', diffClass: 'ex-hard', source: 'Type Challenges' }
    ],
    hints: [
      'Always define a base case to prevent infinite recursion \u2014 check if T extends a primitive.',
      'TypeScript has a ~50-level recursion limit; use tail-call patterns for deeper recursion.'
    ]
  },
  {
    id: 9,
    anchor: 't9',
    title: 'Variance and Contravariance',
    difficulty: 'Advanced',
    diffClass: 'advanced',
    prerequisites: 'Generics, type compatibility, function types, inheritance',
    overview: 'Variance describes how subtyping relationships between complex types relate to subtyping between their components. Understanding covariance, contravariance, and invariance is essential for designing type-safe generic APIs and understanding why union-to-intersection conversion works.',
    keyConcepts: [
      'Covariance: subtype relationship preserved (output positions like return types)',
      'Contravariance: subtype relationship reversed (input positions like parameters)',
      'Invariance: no subtype relationship (both in and out positions)',
      "Using 'in' and 'out' modifiers for explicit variance annotation (TS 4.7+)",
      'Why function parameters are contravariant and return types are covariant'
    ],
    code: `interface Producer<out T> { produce(): T; }  // Covariant
interface Consumer<in T> { consume(x: T): void; }  // Contravariant
interface Box<T> { get(): T; set(x: T): void; }  // Invariant

class Animal { name = ''; }
class Dog extends Animal { bark() {} }

// Covariant - preserved
const dogs: Dog[] = [new Dog()];
const animals: readonly Animal[] = dogs; // OK

// Contravariant - reversed
type Handler<T> = (x: T) => void;
const animalH: Handler<Animal> = (a) => console.log(a.name);
const dogH: Handler<Dog> = animalH; // OK - contravariant!

// This is why union-to-intersection works:
// Contravariant position collects into intersection
// (A => void) | (B => void) in param position becomes A & B`,
    resources: [
      { url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#optional-variance-annotations-for-type-parameters', title: 'TypeScript 4.7 - Variance Annotations', description: 'in/out modifiers' },
      { url: 'https://www.stephanboyer.com/post/132/what-are-covariance-and-contravariance', title: "Stephan Boyer's Article", description: 'Excellent explanation' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/covariance-and-contravariance', title: 'Covariance and Contravariance', difficulty: 'Hard', diffClass: 'ex-hard', source: 'TypeHero' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md', title: 'Readonly (covariance)', difficulty: 'Easy', diffClass: 'ex-easy', source: 'Type Challenges' },
      { url: 'https://www.totaltypescript.com/workshops/type-transformations/conditional-types-and-infer/infer-with-generics', title: 'Infer with Generics (variance demo)', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Total TypeScript' },
      { url: 'https://www.typescriptlang.org/play?#code/PTAEBUAsFMCdtAQ3qALgdwPYFN5gIwCsAzRAJ2gBNIBjUAM2kIAdFaB+YVAby1AF5QAIgBGzCgEYA3EQC+RImQqotASz5IARI14ChYgDSTp0ACbNFVADb9sNcAE8ADgChjJsxfCVBF0IA', title: 'Playground: Variance Demo', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TS Playground' }
    ],
    hints: [
      'Think of covariance as "output" (return types) and contravariance as "input" (parameters).',
      'Use the "in" and "out" modifiers (TS 4.7+) to explicitly annotate variance on your generic types.'
    ]
  },
  {
    id: 10,
    anchor: 't10',
    title: 'Union to Intersection Conversion',
    difficulty: 'Advanced',
    diffClass: 'advanced',
    prerequisites: 'Distributive conditional types, function contravariance, infer keyword',
    overview: 'Converting a union type to an intersection type exploits function parameter contravariance to "flip" a union into an intersection. This pattern is essential for merging object types from unions and building complex type utilities.',
    keyConcepts: [
      'Exploiting contravariance in function parameters',
      'Why (A\u21d2void)|(B\u21d2void) becomes (A&B)\u21d2void in parameter position',
      'Distribute first, then collect via contravariance',
      'LastInUnion and UnionToTuple patterns'
    ],
    code: `// The classic trick
type UnionToIntersection<U> =
  (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never;

type U = { a: 1 } | { b: 2 };
type I = UnionToIntersection<U>; // { a: 1 } & { b: 2 }

// LastInUnion
type Last<U> = UnionToIntersection<
  U extends any ? (x: U) => void : never
> extends (x: infer L) => void ? L : never;
type L = Last<'a' | 'b' | 'c'>; // 'c'

// UnionToTuple
type UTT<U, L = Last<U>> = [U] extends [never] ? [] : [...UTT<Exclude<U, L>>, L];
type T = UTT<'a' | 'b'>; // ['a', 'b']

// Merge union of objects
type Merge<U> = { [K in keyof UnionToIntersection<U>]: UnionToIntersection<U>[K] };
type M = Merge<{ a: 1 } | { b: 2 }>; // { a: 1; b: 2 }`,
    resources: [
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00055-hard-union-to-intersection/README.md', title: 'Type Challenges - Union to Intersection', description: 'The canonical challenge' },
      { url: 'https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type', title: 'Stack Overflow Explanation', description: 'Original detailed breakdown' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/union-to-intersection', title: 'Union to Intersection', difficulty: 'Hard', diffClass: 'ex-hard', source: 'TypeHero' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00055-hard-union-to-intersection/README.md', title: 'Union to Intersection', difficulty: 'Hard', diffClass: 'ex-hard', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00730-hard-union-to-tuple/README.md', title: 'Union to Tuple', difficulty: 'Hard', diffClass: 'ex-hard', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00010-medium-tuple-to-union/README.md', title: 'Tuple to Union', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00599-medium-merge/README.md', title: 'Merge', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' }
    ],
    hints: [
      'The key insight is that function parameters are in contravariant position, which flips unions to intersections.',
      'Use distributive conditional types first to spread the union, then collect with infer in a function parameter.'
    ]
  },
  {
    id: 11,
    anchor: 't11',
    title: 'Declaration Merging',
    difficulty: 'Intermediate',
    diffClass: '',
    prerequisites: 'Interfaces, namespaces, modules, declaration files',
    overview: 'Declaration merging combines multiple declarations with the same name into a single definition. This enables extending existing types, augmenting third-party libraries, and is foundational for HKT simulation patterns.',
    keyConcepts: [
      'Interface merging: properties combined',
      'Namespace merging: exports combined',
      'Module augmentation for extending third-party types',
      'Global augmentation',
      'Namespace + class/enum merging'
    ],
    code: `// Interface merging
interface User { name: string; }
interface User { age: number; }
// Merged: { name: string; age: number }

// Module augmentation
declare module 'express' {
  interface Request { user?: { id: string; role: string } }
}

// Namespace + class merging
class Album { label: Album.Label; constructor(l: Album.Label) { this.label = l; } }
namespace Album {
  export interface Label { name: string }
  export function create(l: Label) { return new Album(l); }
}

// Global augmentation
declare global {
  interface Array<T> { first(): T | undefined }
}

// Enum + namespace merging
enum Color { Red, Green, Blue }
namespace Color {
  export function parse(s: string): Color | undefined {
    return Color[s as keyof typeof Color];
  }
}`,
    resources: [
      { url: 'https://www.typescriptlang.org/docs/handbook/declaration-merging.html', title: 'TypeScript Handbook - Declaration Merging', description: 'Official documentation' },
      { url: 'https://github.com/DefinitelyTyped/DefinitelyTyped', title: 'DefinitelyTyped', description: 'Real-world examples' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/declare-global', title: 'Declare Global', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/module-augmentation', title: 'Module Augmentation', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://www.totaltypescript.com/workshops/type-transformations/modules-and-declaration-merging', title: 'Modules and Declaration Merging', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Total TypeScript' },
      { url: 'https://www.typescriptlang.org/play?#code/CYUwxgNghgTiAEAzArgOzAFwJYHtVJxwB4AVeAZwIF4BeAKHnhACIAJAVQBkBRAbTYA0PAIwAuWgF0A3EA', title: 'Playground: Interface Merging', difficulty: 'Easy', diffClass: 'ex-easy', source: 'TS Playground' }
    ],
    hints: [
      'Interfaces with the same name automatically merge their members.',
      'Use "declare module" to augment types from third-party packages.'
    ]
  },
  {
    id: 12,
    anchor: 't12',
    title: 'Advanced Module and Namespace Patterns',
    difficulty: 'Upper Intermediate',
    diffClass: '',
    prerequisites: 'ES modules, declaration files, declaration merging',
    overview: 'Advanced module patterns include ambient modules, wildcard declarations, path mapping, and sophisticated declaration file authoring. Essential for library authors and complex build systems.',
    keyConcepts: [
      'Ambient module declarations for untyped packages',
      'Wildcard module patterns for CSS/images',
      'Path mapping in tsconfig',
      'Package.json exports and types',
      'Namespaces for organizing types'
    ],
    code: `// Ambient modules
declare module 'untyped-lib' {
  export function doSomething(x: string): number;
}

// Wildcard modules
declare module '*.css' { const c: { [k: string]: string }; export default c; }
declare module '*.png' { const s: string; export default s; }

// Path mapping (tsconfig.json)
// "paths": { "@components/*": ["src/components/*"] }
import { Button } from '@components/Button';

// Namespace for grouping
export namespace API {
  export interface User { id: string; name: string }
  export namespace Requests {
    export interface Create { name: string; email: string }
  }
}
const u: API.User = { id: '1', name: 'Alice' };`,
    resources: [
      { url: 'https://www.typescriptlang.org/docs/handbook/modules.html', title: 'TypeScript Handbook - Modules', description: 'Official documentation' },
      { url: 'https://arethetypeswrong.github.io/', title: 'Are The Types Wrong?', description: 'Check package exports' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/module-augmentation', title: 'Module Augmentation', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/namespace', title: 'Namespace', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://www.totaltypescript.com/how-to-create-an-npm-package', title: 'Create an NPM Package', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Total TypeScript' },
      { url: 'https://github.com/arethetypeswrong/arethetypeswrong.github.io', title: 'Analyze Your Package Types', difficulty: 'Medium', diffClass: 'ex-medium', source: 'ATTW Tool' }
    ],
    hints: [
      'Use "declare module" with wildcard patterns to type non-JS imports like CSS and images.',
      'Path mapping in tsconfig.json lets you create clean import aliases.'
    ]
  },
  {
    id: 13,
    anchor: 't13',
    title: 'Branded Types (Nominal Typing)',
    difficulty: 'Intermediate',
    diffClass: '',
    prerequisites: 'Type assertions, type guards, intersection types',
    overview: 'Branded types create nominally distinct types that are structurally identical but not assignable to each other. This prevents bugs like passing a UserId where a PostId is expected, and enables compile-time validation guarantees.',
    keyConcepts: [
      'Creating brand symbols using unique symbol',
      'Distinguishing structurally identical types (UserId vs PostId)',
      'Validation functions returning branded types',
      'Integration with validation libraries like zod'
    ],
    code: `declare const brand: unique symbol;
type Brand<T, B> = T & { [brand]: B };

// Distinct ID types
type UserId = Brand<string, 'UserId'>;
type PostId = Brand<string, 'PostId'>;

function getUser(id: UserId) {}
function getPost(id: PostId) {}

const uid = 'u1' as UserId;
const pid = 'p1' as PostId;

getUser(uid); // OK
getUser(pid); // Error!

// Validated types
type Email = Brand<string, 'Email'>;
function validateEmail(s: string): Email | null {
  return s.includes('@') ? s as Email : null;
}

function sendEmail(to: Email, subject: string) {}

const email = validateEmail('a@b.com');
if (email) sendEmail(email, 'Hello'); // Type-safe!`,
    resources: [
      { url: 'https://type-level-typescript.com', title: 'Type-Level TypeScript - Branded Types', description: 'Nominal typing patterns' },
      { url: 'https://zod.dev', title: 'Zod', description: 'Validation with brands built-in' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/opaque-types', title: 'Opaque Types (Branded)', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/nominal-typing', title: 'Nominal Typing', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00062-medium-type-lookup/README.md', title: 'Type Lookup', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://www.totaltypescript.com/workshops/type-transformations/branded-types', title: 'Branded Types Workshop', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Total TypeScript' },
      { url: 'https://zod.dev/?id=brand', title: 'Zod Brand Practice', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Zod Docs' }
    ],
    hints: [
      'Use a unique symbol as a brand key to make types nominally distinct.',
      'Create validation functions that return branded types to enforce runtime checks at the boundary.'
    ]
  },
  {
    id: 14,
    anchor: 't14',
    title: 'Type-Safe Builder Pattern',
    difficulty: 'Advanced',
    diffClass: 'advanced',
    prerequisites: 'Generics, mapped types, conditional types, method chaining',
    overview: "The type-safe builder pattern uses TypeScript's type system to enforce that all required fields are set before building, prevent setting the same field twice, and provide accurate autocompletion at each step.",
    keyConcepts: [
      'Tracking set/unset fields in the type parameter',
      'Progressive type narrowing as methods are called',
      'build() only available when all required fields are set',
      'Preventing duplicate field setting'
    ],
    code: `interface Config { name: string; email: string; age?: number }

type Required<T> = { [K in keyof T]-?: undefined extends T[K] ? never : K }[keyof T];

type Builder<T, Set extends keyof T = never> = {
  [K in keyof T as K extends Set ? never : \`set\${Capitalize<string & K>}\`]:
    (v: T[K]) => Builder<T, Set | K>
} & (Required<T> extends Set ? { build(): T } : {});

function createBuilder(): Builder<Config> {
  const c: Partial<Config> = {};
  const b: any = {
    setName: (n: string) => { c.name = n; return b; },
    setEmail: (e: string) => { c.email = e; return b; },
    setAge: (a: number) => { c.age = a; return b; },
    build: () => c as Config
  };
  return b;
}

createBuilder().setName('A').setEmail('a@b').build(); // OK
// createBuilder().setName('A').build(); // Error - email required!`,
    resources: [
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00012-medium-chainable-options/README.md', title: 'Type Challenges - Chainable', description: 'Builder pattern challenge' },
      { url: 'https://kysely.dev', title: 'Kysely', description: 'Type-safe SQL query builder' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/chainable-options', title: 'Chainable Options', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00012-medium-chainable-options/README.md', title: 'Chainable Options', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00006-hard-simple-vue/README.md', title: 'Simple Vue', difficulty: 'Hard', diffClass: 'ex-hard', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00213-hard-vue-basic-props/README.md', title: 'Vue Basic Props', difficulty: 'Hard', diffClass: 'ex-hard', source: 'Type Challenges' },
      { url: 'https://kysely.dev/docs/getting-started', title: 'Build a Query with Kysely', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Kysely' }
    ],
    hints: [
      'Track which fields have been set using a type parameter that accumulates set keys.',
      'Use conditional types to only expose build() when all required keys are in the Set parameter.'
    ]
  },
  {
    id: 15,
    anchor: 't15',
    title: 'Deep Path Types and Dot Notation Access',
    difficulty: 'Advanced',
    diffClass: 'advanced',
    prerequisites: 'Template literal types, recursive types, mapped types, conditional types',
    overview: 'Deep path types allow you to express paths into nested objects using dot notation strings (like "user.address.city") and retrieve the types at those paths. This pattern powers type-safe form libraries, ORM query builders, and lodash\'s get/set functions.',
    keyConcepts: [
      'Generating all valid path strings for a nested object type',
      'Extracting the type at a given path',
      'Handling arrays, optional properties, and nullable types',
      'Type-safe get/set functions'
    ],
    code: `// Get all paths
type Paths<T, P extends string = ''> = T extends object
  ? { [K in keyof T & string]: \`\${P}\${K}\` | Paths<T[K], \`\${P}\${K}.\`> }[keyof T & string]
  : never;

// Get type at path
type PathValue<T, P> = P extends \`\${infer K}.\${infer R}\`
  ? K extends keyof T ? PathValue<T[K], R> : never
  : P extends keyof T ? T[P] : never;

interface User { name: string; addr: { city: string; geo: { lat: number } } }

type UP = Paths<User>; // "name" | "addr" | "addr.city" | "addr.geo" | "addr.geo.lat"
type City = PathValue<User, 'addr.city'>; // string
type Lat = PathValue<User, 'addr.geo.lat'>; // number

// Type-safe get
function get<T, P extends Paths<T>>(o: T, p: P): PathValue<T, P> {
  return p.split('.').reduce((x: any, k) => x?.[k], o);
}

const user: User = { name: 'A', addr: { city: 'NYC', geo: { lat: 40 } } };
const city = get(user, 'addr.city');    // string
const lat = get(user, 'addr.geo.lat');  // number`,
    resources: [
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/07258-hard-object-key-paths/README.md', title: 'Type Challenges - Object Key Paths', description: 'Path generation challenge' },
      { url: 'https://react-hook-form.com', title: 'React Hook Form', description: 'Real-world path types' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/get', title: 'Get (lodash-style)', difficulty: 'Hard', diffClass: 'ex-hard', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/object-key-paths', title: 'Object Key Paths', difficulty: 'Hard', diffClass: 'ex-hard', source: 'TypeHero' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00270-hard-typed-get/README.md', title: 'Typed Get', difficulty: 'Hard', diffClass: 'ex-hard', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/07258-hard-object-key-paths/README.md', title: 'Object Key Paths', difficulty: 'Hard', diffClass: 'ex-hard', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/01130-medium-replacekeys/README.md', title: 'Replace Keys', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/02757-medium-partialbykeys/README.md', title: 'Partial By Keys', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' }
    ],
    hints: [
      'Use recursive template literal types to generate all valid dot-notation paths.',
      'Split the path string at "." using template literal infer to traverse the type.'
    ]
  },
  {
    id: 16,
    anchor: 't16',
    title: 'Type-Safe State Machines',
    difficulty: 'Advanced',
    diffClass: 'advanced',
    prerequisites: 'Discriminated unions, mapped types, conditional types, generics',
    overview: "Type-safe state machines use TypeScript's type system to enforce valid state transitions at compile time. Only valid events for the current state are allowed, and the resulting state type is correctly inferred.",
    keyConcepts: [
      'Defining states as discriminated unions',
      'Mapping valid events/transitions for each state',
      'Restricting event handlers to valid events for current state',
      'Inferring the next state type from transitions'
    ],
    code: `type State =
  | { s: 'idle' }
  | { s: 'loading'; t: number }
  | { s: 'done'; data: string };

type Event =
  | { e: 'FETCH' }
  | { e: 'DONE'; data: string }
  | { e: 'RESET' };

type Valid = { idle: 'FETCH'; loading: 'DONE'; done: 'RESET' | 'FETCH' };

type Allowed<S extends State> = Extract<Event, { e: Valid[S['s']] }>;

function transition<S extends State>(state: S, event: Allowed<S>): State {
  switch (state.s) {
    case 'idle': return { s: 'loading', t: Date.now() };
    case 'loading': return { s: 'done', data: (event as any).data };
    case 'done': return event.e === 'RESET' ? { s: 'idle' } : { s: 'loading', t: Date.now() };
  }
}

const idle: State = { s: 'idle' };
transition(idle, { e: 'FETCH' }); // OK
// transition(idle, { e: 'DONE', data: '' }); // Error!`,
    resources: [
      { url: 'https://xstate.js.org', title: 'XState', description: 'Production state machine library' },
      { url: 'https://stately.ai/docs/typescript', title: 'XState TypeScript Guide', description: 'Typing state machines' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/finite-state-machine', title: 'Finite State Machine', difficulty: 'Hard', diffClass: 'ex-hard', source: 'TypeHero' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00006-hard-simple-vue/README.md', title: 'Simple Vue (state patterns)', difficulty: 'Hard', diffClass: 'ex-hard', source: 'Type Challenges' },
      { url: 'https://stately.ai/docs/xstate-v5/migration', title: 'XState v5 Migration', difficulty: 'Hard', diffClass: 'ex-hard', source: 'XState' },
      { url: 'https://stately.ai/editor', title: 'Stately Editor', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Stately' }
    ],
    hints: [
      'Define a mapping type that maps each state to its valid events.',
      'Use Extract<Event, { e: ValidEvents }> to restrict which events are allowed for a given state.'
    ]
  },
  {
    id: 17,
    anchor: 't17',
    title: 'Type-Level Arithmetic',
    difficulty: 'Expert',
    diffClass: 'expert',
    prerequisites: 'Recursive types, tuple manipulation, conditional types, infer',
    overview: "Type-level arithmetic involves performing mathematical operations like addition, subtraction, and comparison entirely within TypeScript's type system using tuple lengths. This enables compile-time validations and range types.",
    keyConcepts: [
      'Representing numbers as tuple lengths',
      'Addition via tuple concatenation',
      'Subtraction via tuple destructuring',
      'Comparison operations at type level',
      'Range and vector types'
    ],
    code: `type BuildTuple<N, T extends any[] = []> = T['length'] extends N ? T : BuildTuple<N, [...T, 0]>;

// Add
type Add<A extends number, B extends number> = [...BuildTuple<A>, ...BuildTuple<B>]['length'];
type Sum = Add<3, 4>;  // 7

// Subtract
type Sub<A extends number, B extends number> =
  BuildTuple<A> extends [...BuildTuple<B>, ...infer R] ? R['length'] : never;
type Diff = Sub<10, 3>; // 7

// Less than
type LT<A extends number, B extends number> =
  BuildTuple<A> extends [...BuildTuple<B>, ...any[]] ? false : true;
type Less = LT<3, 5>;   // true

// Range (0 to N-1)
type Range<N, A extends number[] = []> = A['length'] extends N ? A[number] : Range<N, [...A, A['length']]>;
type R5 = Range<5>; // 0 | 1 | 2 | 3 | 4

// Fixed-length vector
type Vec<N extends number> = BuildTuple<N, number[]> & number[];
type Vec3 = Vec<3>; // [number, number, number]
const v: Vec3 = [1, 2, 3]; // OK`,
    resources: [
      { url: 'https://github.com/type-challenges/type-challenges', title: 'Type Challenges', description: 'Arithmetic challenges' },
      { url: 'https://github.com/gvergnaud/hotscript', title: 'HotScript', description: 'Type-level ops library' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/integer-to-positive', title: 'Integer to Positive', difficulty: 'Hard', diffClass: 'ex-hard', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/absolute', title: 'Absolute', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/percentage-parser', title: 'Percentage Parser', difficulty: 'Medium', diffClass: 'ex-medium', source: 'TypeHero' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/04425-medium-greater-than/README.md', title: 'Greater Than', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/02257-medium-minusone/README.md', title: 'MinusOne', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00529-medium-absolute/README.md', title: 'Absolute', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/08804-hard-two-sum/README.md', title: 'Two Sum', difficulty: 'Hard', diffClass: 'ex-hard', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00476-extreme-sum/README.md', title: 'Sum (Extreme)', difficulty: 'Extreme', diffClass: 'ex-extreme', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00517-extreme-multiply/README.md', title: 'Multiply (Extreme)', difficulty: 'Extreme', diffClass: 'ex-extreme', source: 'Type Challenges' }
    ],
    hints: [
      'Build a tuple of a specific length, then use its .length property to get the number type.',
      'Addition = concatenate two tuples and take the length; subtraction = destructure and take remainder length.'
    ]
  },
  {
    id: 18,
    anchor: 't18',
    title: 'Currying and Function Composition Types',
    difficulty: 'Expert',
    diffClass: 'expert',
    prerequisites: 'Tuple manipulation, recursive types, variadic tuples, function types',
    overview: 'Typing curried functions and function composition at the type level requires sophisticated manipulation of function signatures and parameter tuples. These patterns are essential for functional programming libraries like fp-ts and Ramda.',
    keyConcepts: [
      'Converting (a,b,c)\u21d2d to (a)\u21d2(b)\u21d2(c)\u21d2d',
      'Type-safe pipe and compose',
      'Partial application types',
      'Return type inference through function chains'
    ],
    code: `// Curry type
type Curry<F> = F extends (...args: infer A) => infer R
  ? A extends [infer F, ...infer Rest]
    ? Rest extends [] ? (a: F) => R : (a: F) => Curry<(...args: Rest) => R>
    : R
  : never;

type Orig = (a: string, b: number, c: boolean) => void;
type C = Curry<Orig>; // (a: string) => (a: number) => (a: boolean) => void

// Partial application
type Partial<F, A extends any[]> = F extends (...args: [...A, ...infer R]) => infer Ret
  ? (...args: R) => Ret : never;
type P1 = Partial<Orig, [string]>; // (b: number, c: boolean) => void

// Pipe type
declare function pipe<A, B>(f: (a: A) => B): (a: A) => B;
declare function pipe<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C;
declare function pipe<A, B, C, D>(f: (a: A) => B, g: (b: B) => C, h: (c: C) => D): (a: A) => D;

const process = pipe(
  (x: string) => x.length,
  (x: number) => x * 2,
  (x: number) => x.toString()
); // (a: string) => string`,
    resources: [
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00017-hard-currying-1/README.md', title: 'Type Challenges - Currying', description: 'Currying challenge' },
      { url: 'https://gcanti.github.io/fp-ts/modules/function.ts.html', title: 'fp-ts Function Module', description: 'Production implementations' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/currying-1', title: 'Currying 1', difficulty: 'Hard', diffClass: 'ex-hard', source: 'TypeHero' },
      { url: 'https://typehero.dev/challenge/currying-2', title: 'Currying 2', difficulty: 'Extreme', diffClass: 'ex-extreme', source: 'TypeHero' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00017-hard-currying-1/README.md', title: 'Currying 1', difficulty: 'Hard', diffClass: 'ex-hard', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00462-extreme-currying-2/README.md', title: 'Currying 2 (with placeholders)', difficulty: 'Extreme', diffClass: 'ex-extreme', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/02059-hard-drop-string/README.md', title: 'Drop String', difficulty: 'Hard', diffClass: 'ex-hard', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00151-extreme-query-string-parser/README.md', title: 'Query String Parser', difficulty: 'Extreme', diffClass: 'ex-extreme', source: 'Type Challenges' }
    ],
    hints: [
      'To curry, recursively peel off the first parameter and wrap the rest in a new function type.',
      'For pipe/compose, chain the return type of one function to the parameter type of the next.'
    ]
  },
  {
    id: 19,
    anchor: 't19',
    title: 'Higher-Kinded Type (HKT) Simulation',
    difficulty: 'Expert',
    diffClass: 'expert',
    prerequisites: 'Advanced generics, declaration merging, functional programming concepts',
    overview: "Higher-kinded types are type constructors (like Array without a type argument). TypeScript doesn't natively support HKTs, but simulation patterns enable Functor, Monad, and other FP abstractions through URI-based encoding and declaration merging.",
    keyConcepts: [
      'Type constructors vs concrete types',
      'URI-based HKT simulation (fp-ts approach)',
      'Defunctionalization via interface merging',
      'Implementing Functor, Monad generically'
    ],
    code: `// URI to Kind mapping
interface URItoKind<A> {
  Array: Array<A>;
  Option: Option<A>;
}

type URIS = keyof URItoKind<any>;
type Kind<URI extends URIS, A> = URItoKind<A>[URI];

// Option type
type Option<A> = { _tag: 'Some'; value: A } | { _tag: 'None' };
const some = <A>(a: A): Option<A> => ({ _tag: 'Some', value: a });
const none: Option<never> = { _tag: 'None' };

// Functor interface
interface Functor<F extends URIS> {
  map: <A, B>(fa: Kind<F, A>, f: (a: A) => B) => Kind<F, B>;
}

// Implementations
const arrayF: Functor<'Array'> = { map: (fa, f) => fa.map(f) };
const optionF: Functor<'Option'> = {
  map: (fa, f) => fa._tag === 'None' ? none : some(f(fa.value))
};

// Generic over any Functor
function double<F extends URIS>(F: Functor<F>, fa: Kind<F, number>): Kind<F, number> {
  return F.map(fa, n => n * 2);
}

double(arrayF, [1, 2, 3]);  // [2, 4, 6]
double(optionF, some(5));   // Some(10)`,
    resources: [
      { url: 'https://gcanti.github.io/fp-ts/', title: 'fp-ts', description: 'Production HKT implementation' },
      { url: 'https://effect.website', title: 'Effect-TS', description: 'Modern HKT patterns' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/higher-kinded-types', title: 'Higher-Kinded Types', difficulty: 'Extreme', diffClass: 'ex-extreme', source: 'TypeHero' },
      { url: 'https://github.com/gcanti/fp-ts/blob/master/tutorials/getting-started/create-functor-instance.md', title: 'Create Functor Instance (fp-ts)', difficulty: 'Hard', diffClass: 'ex-hard', source: 'fp-ts' },
      { url: 'https://github.com/gcanti/fp-ts/blob/master/tutorials/getting-started/create-monad-instance.md', title: 'Create Monad Instance (fp-ts)', difficulty: 'Extreme', diffClass: 'ex-extreme', source: 'fp-ts' },
      { url: 'https://effect.website/docs/getting-started/introduction', title: 'Effect Getting Started', difficulty: 'Hard', diffClass: 'ex-hard', source: 'Effect' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00006-hard-simple-vue/README.md', title: 'Simple Vue (HKT patterns)', difficulty: 'Hard', diffClass: 'ex-hard', source: 'Type Challenges' }
    ],
    hints: [
      'Use an interface as a registry that maps URI strings to concrete types.',
      'Declaration merging lets you add new type constructors to the registry from anywhere.'
    ]
  },
  {
    id: 20,
    anchor: 't20',
    title: 'Type-Level JSON Parsing',
    difficulty: 'Expert',
    diffClass: 'expert',
    prerequisites: 'All previous topics \u2014 this is the capstone',
    overview: "Type-level JSON parsing is the ultimate test of TypeScript's type system. It involves parsing JSON string literals into TypeScript types at compile time. While primarily academic, it demonstrates mastery of all advanced type features.",
    keyConcepts: [
      'Type-level tokenization',
      'Recursive descent parsing patterns',
      'Handling nested structures',
      'Type-level state machines'
    ],
    code: `// Simplified JSON Parser
type Trim<S> = S extends \` \${infer R}\` | \`\\n\${infer R}\` ? Trim<R> : S;
type ParseString<S> = S extends \`"\${infer C}"\${infer R}\` ? [C, R] : never;
type ParseLiteral<S> = S extends \`true\${infer R}\` ? [true, R]
  : S extends \`false\${infer R}\` ? [false, R]
  : S extends \`null\${infer R}\` ? [null, R] : never;

type ParseValue<S> = Trim<S> extends \`"\${string}\` ? ParseString<Trim<S>>
  : Trim<S> extends \`{\${string}\` ? ParseObject<Trim<S>>
  : ParseLiteral<Trim<S>>;

type ParseObject<S> = S extends \`{\${infer C}}\${infer R}\` ? [ParsePairs<C>, R] : never;

type ParsePairs<S, Acc = {}> = Trim<S> extends ''
  ? Acc
  : Trim<S> extends \`"\${infer K}":\${infer After}\`
    ? ParseValue<After> extends [infer V, infer R]
      ? Trim<R> extends \`,\${infer Next}\`
        ? ParsePairs<Next, Acc & { [P in K]: V }>
        : Acc & { [P in K]: V }
      : Acc
    : Acc;

type ParseJSON<S extends string> = ParseValue<S> extends [infer R, any] ? R : never;

// Usage!
type Parsed = ParseJSON<'{"name": "Alice", "active": true}'>;
// { name: "Alice" } & { active: true }`,
    resources: [
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/06228-extreme-json-parser/README.md', title: 'Type Challenges - JSON Parser', description: 'The ultimate challenge' },
      { url: 'https://github.com/gvergnaud/hotscript', title: 'HotScript', description: 'Type-level parsing utilities' }
    ],
    exercises: [
      { url: 'https://typehero.dev/challenge/json-parser', title: 'JSON Parser', difficulty: 'Extreme', diffClass: 'ex-extreme', source: 'TypeHero' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/06228-extreme-json-parser/README.md', title: 'JSON Parser', difficulty: 'Extreme', diffClass: 'ex-extreme', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/00151-extreme-query-string-parser/README.md', title: 'Query String Parser', difficulty: 'Extreme', diffClass: 'ex-extreme', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/02949-hard-objectfromentries/README.md', title: 'Object From Entries', difficulty: 'Hard', diffClass: 'ex-hard', source: 'Type Challenges' },
      { url: 'https://github.com/type-challenges/type-challenges/blob/main/questions/08640-medium-number-range/README.md', title: 'Number Range', difficulty: 'Medium', diffClass: 'ex-medium', source: 'Type Challenges' },
      { url: 'https://github.com/codemix/ts-sql', title: 'Build a SQL Parser (ts-sql)', difficulty: 'Extreme', diffClass: 'ex-extreme', source: 'ts-sql' }
    ],
    hints: [
      'Start by implementing parsers for individual values (strings, booleans, null), then combine them.',
      'Use recursive descent parsing \u2014 each parser returns the parsed value and the remaining string.'
    ]
  }
] satisfies Topic[];

export const quickRefResources = [
  { icon: '\u{1F9B8}', title: 'TypeHero', url: 'https://typehero.dev', description: 'Interactive challenges with instant feedback' },
  { icon: '\u{1F4DD}', title: 'Type Challenges', url: 'https://github.com/type-challenges/type-challenges', description: '150+ challenges from easy to extreme' },
  { icon: '\u{1F393}', title: 'Type-Level TypeScript', url: 'https://type-level-typescript.com', description: 'Interactive course' },
  { icon: '\u{1F3AC}', title: 'Total TypeScript', url: 'https://totaltypescript.com', description: "Matt Pocock's tutorials" },
  { icon: '\u{1F4D6}', title: 'Effective TypeScript', url: 'https://effectivetypescript.com', description: '83 ways to improve' },
  { icon: '\u{1F9EA}', title: 'TypeScript Playground', url: 'https://www.typescriptlang.org/play', description: 'Experiment interactively' },
  { icon: '\u03BB', title: 'fp-ts', url: 'https://gcanti.github.io/fp-ts/', description: 'FP with HKT patterns' },
  { icon: '\u{1F527}', title: 'ts-toolbelt', url: 'https://github.com/millsp/ts-toolbelt', description: '200+ type utilities' },
  { icon: '\u{1F525}', title: 'HotScript', url: 'https://github.com/gvergnaud/hotscript', description: 'Type-level parsing' }
] satisfies QuickRefResource[];

export const introContent = {
  text: 'This guide covers 20 advanced TypeScript type-system features, <strong>ordered by prerequisite dependencies</strong>. Each topic builds on concepts from previous ones, creating an optimal learning path from foundational patterns to expert-level type gymnastics.',
  howToUseTitle: 'How to Use This Guide',
  steps: [
    'Work through topics in order \u2014 each builds on previous concepts',
    'Study code examples in the TypeScript Playground',
    'Complete Type Challenges for hands-on practice',
    'Revisit earlier topics when prerequisites are mentioned'
  ]
} satisfies IntroContent;
