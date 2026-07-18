import { TopicData } from "./types";

export const CATEGORIES = [
  { id: "computer-fundamentals", name: "Computer Fundamentals", icon: "Monitor" },
  { id: "programming-languages", name: "Programming Languages", icon: "Code2" },
  { id: "web-development", name: "Web Development", icon: "Globe" },
  { id: "frontend-development", name: "Frontend Development", icon: "Layout" },
  { id: "backend-development", name: "Backend Development", icon: "Server" },
  { id: "full-stack-development", name: "Full Stack Development", icon: "Layers" },
  { id: "mobile-development", name: "Mobile Development", icon: "Smartphone" },
  { id: "databases", name: "Databases", icon: "Database" },
  { id: "dsa", name: "Data Structures & Algorithms", icon: "Binary" },
  { id: "operating-systems", name: "Operating Systems", icon: "Cpu" },
  { id: "computer-networks", name: "Computer Networks", icon: "Network" },
  { id: "compiler-design", name: "Compiler Design", icon: "Workflow" },
  { id: "software-engineering", name: "Software Engineering", icon: "GitBranch" },
  { id: "design-patterns", name: "Design Patterns", icon: "FileCode2" },
  { id: "system-design", name: "System Design", icon: "GitCommit" },
  { id: "cloud-computing", name: "Cloud Computing", icon: "Cloud" },
  { id: "devops", name: "DevOps", icon: "Infinity" },
  { id: "cybersecurity", name: "Cybersecurity", icon: "ShieldAlert" },
  { id: "artificial-intelligence", name: "Artificial Intelligence", icon: "Brain" },
  { id: "machine-learning", name: "Machine Learning", icon: "Gauge" },
  { id: "deep-learning", name: "Deep Learning", icon: "Network" },
  { id: "data-science", name: "Data Science", icon: "BarChart3" },
  { id: "big-data", name: "Big Data", icon: "DatabaseBackup" },
  { id: "blockchain", name: "Blockchain", icon: "Link2" },
  { id: "web3", name: "Web3", icon: "Fingerprint" },
  { id: "ui-ux", name: "UI/UX", icon: "Palette" },
  { id: "testing", name: "Testing", icon: "CheckSquare" },
  { id: "open-source", name: "Open Source", icon: "Heart" },
  { id: "roadmaps", name: "Career Roadmaps", icon: "Map" },
  { id: "interview-prep", name: "Interview Preparation", icon: "HelpCircle" },
  { id: "certifications", name: "Certifications", icon: "Award" },
  { id: "projects", name: "Projects", icon: "FolderGit" },
  { id: "resources", name: "Resources", icon: "BookOpen" }
];

export const SUB_CATEGORIES: Record<string, { title: string; topics: { title: string; slug: string }[] }[]> = {
  "frontend-development": [
    {
      title: "Core Technologies",
      topics: [
        { title: "HTML5 Semantic Markup", slug: "html5-semantic-markup" },
        { title: "CSS3 Flexbox & Grid", slug: "css3-flexbox-grid" },
        { title: "JavaScript ES6+", slug: "javascript-es6" }
      ]
    },
    {
      title: "Frameworks & Libraries",
      topics: [
        { title: "React Component Model", slug: "react-components" },
        { title: "Next.js App Router", slug: "nextjs-app-router" },
        { title: "Vue.js Composition API", slug: "vuejs-composition" }
      ]
    }
  ],
  "computer-networks": [
    {
      title: "Network Architectures",
      topics: [
        { title: "TCP/IP Suite", slug: "tcp-ip-suite" },
        { title: "OSI Reference Model", slug: "osi-model" },
        { title: "HTTP/3 & QUIC Protocols", slug: "http3-quic" }
      ]
    }
  ],
  "dsa": [
    {
      title: "Data Structures",
      topics: [
        { title: "Binary Search Tree", slug: "binary-search-tree" },
        { title: "Red-Black Tree", slug: "red-black-tree" },
        { title: "Min/Max Heaps", slug: "min-max-heaps" }
      ]
    },
    {
      title: "Algorithms",
      topics: [
        { title: "Dijkstra's Shortest Path", slug: "dijkstras-algorithm" },
        { title: "Quick Sort", slug: "quick-sort" },
        { title: "A* Search", slug: "a-star-search" }
      ]
    }
  ],
  "databases": [
    {
      title: "Relational Databases",
      topics: [
        { title: "PostgreSQL Architecture", slug: "postgresql-architecture" },
        { title: "SQL Queries & Indexing", slug: "sql-queries-indexing" }
      ]
    },
    {
      title: "NoSQL Databases",
      topics: [
        { title: "MongoDB Document Schema", slug: "mongodb-schema" },
        { title: "Redis Caching Strategies", slug: "redis-caching" }
      ]
    }
  ],
  "artificial-intelligence": [
    {
      title: "Foundations",
      topics: [
        { title: "Neural Network Mechanics", slug: "neural-network-mechanics" },
        { title: "Transformer Architecture", slug: "transformer-architecture" }
      ]
    }
  ]
};

export const PRE_POPULATED_TOPICS: Record<string, TopicData> = {
  "react-components": {
    slug: "react-components",
    title: "React Component Model",
    category: "Frontend Development",
    icon: "Layout",
    definition: "React is a component-based JavaScript library for building user interfaces, pioneered by Meta. Its core architectural pattern divides complex UIs into small, isolated, and reusable code blocks called components.",
    beginnerExplanation: "Imagine you are building a Lego castle. Instead of building the entire castle from a single giant chunk of plastic, you assemble it from individual Lego bricks like windows, walls, and doors. In React, these bricks are called 'Components'. A component is a small piece of code that describes a part of the user interface. For example, a website might have a 'Header' component, a 'Sidebar' component, and a 'Button' component. Each component is responsible for its own design and logic.",
    advancedExplanation: "React components are declarative, meaning they express what the UI should look like for a given state rather than prescribing step-by-step DOM manipulations. Internally, React uses a Virtual DOM (VDOM)—an in-memory representation of the real DOM. When a component's state or props change, React triggers a reconciliation cycle. During this cycle, a new VDOM tree is constructed, compared (diffed) with the previous VDOM tree using a highly optimized heuristic algorithm (O(N)), and the minimal set of changes is batch-applied to the actual browser DOM to maximize performance.",
    history: "React was created by Jordan Walke, a software engineer at Facebook, who released a prototype called 'FaxJS'. It was first deployed on Facebook's News Feed in 2011 and later on Instagram in 2012. It was open-sourced at JSConf US in May 2013, revolutionizing web development by popularizing the concept of components, unidirectional data flow, and JSX.",
    whyExists: "Before React, developers manipulated the browser DOM directly using tools like jQuery. As web applications grew, synchronizing state with the UI became extremely error-prone and slow. React was introduced to solve this state-sync problem. By defining UI as a pure function of state (UI = f(State)), React guarantees that the interface is always in sync with application data while abstracting away slow DOM manipulations.",
    coreConcepts: [
      "Components & Composition: UI elements built as hierarchical trees",
      "Props (Properties): Read-only data passed down from parent to child",
      "State: Internal, mutable component data that triggers re-renders",
      "Virtual DOM & Reconciliation: Efficient tree-diffing and batch DOM updates",
      "Hooks: Functions (e.g. useState, useEffect) that let functional components manage state"
    ],
    terminology: [
      { term: "JSX (JavaScript XML)", definition: "A syntax extension allowing developers to write HTML-like markup inside JavaScript files." },
      { term: "Reconciliation", definition: "The algorithm React uses to diff the Virtual DOM against the real DOM and apply minimal updates." },
      { term: "Unidirectional Data Flow", definition: "A design pattern where data flows down from parent components to child components via props." }
    ],
    internalWorking: "When state updates, React creates a new React Element tree. It runs a reconciliation algorithm to compare this new tree with the old tree. It computes a set of 'patches' (updates) and schedules them for commit. React operates in two phases: the 'Render Phase' (which is asynchronous, compute-heavy, and does not touch the real DOM) and the 'Commit Phase' (which is synchronous, fast, and applies changes directly to the DOM).",
    architecture: `+-----------------------------------------+
|               State Update              |
+-----------------------------------------+
                     |
                     v
+-----------------------------------------+
|       Re-render Functional Component    |
+-----------------------------------------+
                     |
                     v
+-----------------------------------------+
|     Compute New Virtual DOM Tree        |
+-----------------------------------------+
                     |
                     v
+-----------------------------------------+
|   Diffing Algorithm (Heuristic Diff)    |
+-----------------------------------------+
                     |
                     v
+-----------------------------------------+
|     Batch Apply Patches to Real DOM    |
+-----------------------------------------+`,
    workflow: [
      "User interacts with a component (e.g., clicks a button).",
      "Event handler executes and calls state-setter function (e.g., setState).",
      "React schedules a re-render of the component and its children.",
      "React evaluates the component's JSX to produce a new Virtual DOM node.",
      "React diffs the new node with the previous node and commits updates to the DOM."
    ],
    components: [
      "Props System: Configures component behavior externally",
      "State Store: Manages component state internally",
      "Lifecycle Hooks: Triggers side effects during mount, update, or unmount",
      "Event System: Normalized wrapper around native browser events (SyntheticEvents)"
    ],
    analogy: "A React component is like a restaurant chef. The chef receives an order (Props) containing specifications (e.g., 'Medium-rare steak'). The chef has internal ingredients and timers (State) to manage the cooking process. Finally, the chef presents a beautifully plated dish (HTML representation) which is delivered to the table (Browser DOM). If the customer changes the order (Props update), the chef cooks a new dish to match.",
    useCases: [
      "Single Page Applications (SPAs) like Facebook, Spotify, and Netflix.",
      "Interactive widgets embedded in traditional Server-rendered websites.",
      "Dynamic dashboards with complex real-time data visualisations."
    ],
    setupGuide: "To set up React inside a Next.js environment (standard for modern apps):\n\n1. Run `npx create-next-app@latest` to start a React-powered project.\n2. Ensure your React components are saved in the `components/` directory.\n3. Mark interactive components with the `'use client'` directive at the top of the file to enable client-side React rendering, hooks, and events.",
    folderStructure: `my-react-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── index.css
├── package.json
└── tsconfig.json`,
    codeExample: {
      language: "typescript",
      code: `"use client";

import React, { useState } from 'react';

interface CounterProps {
  initialCount?: number;
  step?: number;
}

export default function Counter({ initialCount = 0, step = 1 }: CounterProps) {
  const [count, setCount] = useState<number>(initialCount);

  const increment = () => {
    setCount(prevCount => prevCount + step);
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-card border border-border rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-foreground">Interactive Counter</h2>
      <p className="text-3xl font-mono text-primary">{count}</p>
      <button
        onClick={increment}
        className="w-full px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        Increment by {step}
      </button>
    </div>
  );
}`,
      explanation: [
        "Line 1: 'use client' specifies that this file contains a Client Component, allowing us to use React hooks and browser interactivity.",
        "Line 3: Import standard React and the useState hook for state management.",
        "Line 5-8: Define TypeScript interfaces for Props (initialCount and step) to ensure type-safe configurations.",
        "Line 11: Declare count state initialized to initialCount, returning state variable and setter function.",
        "Line 13-15: increment handler updates state using functional update form, preventing race conditions.",
        "Line 17-28: JSX markup returns structured components using semantic layout and Tailwind CSS classes."
      ]
    },
    security: [
      "XSS Prevention: React automatically escapes variables in JSX to prevent Cross-Site Scripting injections.",
      "Dangerously Set Inner HTML: Avoid using dangerouslySetInnerHTML unless the markup is verified and sanitized (e.g. using DOMPurify).",
      "JSON Injections: Sanitize preloaded state sent from server-side scripts."
    ],
    performance: [
      "Use Callback & Memoization: Wrap heavy callbacks in useMemo and useCallback to avoid recalculations on every render.",
      "Code Splitting: Use dynamic imports (React.lazy) to split bundles and load pages asynchronously.",
      "Avoid Unnecessary State: Keep state as localized as possible to minimize full-page component tree re-renders."
    ],
    errorHandling: [
      "Error Boundaries: Wrap component subtrees with ErrorBoundary classes to catch runtime exceptions and render fallback UIs.",
      "State fallbacks: Provide empty structures (e.g., initial arrays) to avoid null pointer exceptions."
    ],
    bestPractices: [
      "Keep components small, focused, and single-purpose.",
      "Lift state up to the nearest common ancestor only when necessary.",
      "Always assign unique, stable keys to items in dynamically rendered lists."
    ],
    commonMistakes: [
      "Mutating state directly (e.g. count = count + 1) instead of using the state setter function.",
      "Forgetting list keys, causing React to render items inefficiently or incorrectly.",
      "Leaving side effects dangling in useEffect without returning a cleanup function."
    ],
    advantages: [
      "Declarative UI model makes code predictable and easy to debug.",
      "Rich ecosystem of developer tools, routers, forms, and UI kits.",
      "Cross-platform support via React Native."
    ],
    disadvantages: [
      "Pace of evolution is very fast, requiring constant learning (e.g., class components vs. hooks vs. Server Components).",
      "Requires building/transpilation pipeline (webpack/Vite) out of the box.",
      "High memory usage due to keeping a copy of the DOM in memory."
    ],
    comparisonTable: {
      headers: ["Feature", "React", "Angular", "Vue"],
      rows: [
        ["Type", "Library (UI)", "Framework (Full-featured)", "Progressive Framework"],
        ["Data Binding", "One-way", "Two-way", "Two-way"],
        ["DOM Model", "Virtual DOM", "Real DOM", "Virtual DOM"],
        ["Learning Curve", "Medium", "High", "Low-Medium"]
      ]
    },
    faqs: [
      { question: "What is the difference between state and props?", answer: "Props are configuration variables passed from a parent component down to a child (read-only), while State is an internal memory cell managed entirely inside the component itself." },
      { question: "Does React compile to HTML?", answer: "No, React compiles JSX to React.createElement method calls which evaluate to JS objects. At runtime, React uses these objects to construct the corresponding browser DOM nodes." }
    ],
    questions: [
      { type: "interview", question: "Explain the reconciliation algorithm and Virtual DOM.", answer: "Reconciliation is the process React uses to update the browser. React creates a lightweight representation of the DOM (Virtual DOM). When state changes, a new tree is created. React compares the new tree with the old one using a diffing algorithm (assuming O(n) complexity through component types and key attributes), and applies only the changes to the real DOM." },
      { type: "viva", question: "What is the rule of React Hooks?", answer: "Hooks must only be called at the top level of your functional component (not inside loops, conditions, or nested functions) and must only be called from React function components or custom Hooks." }
    ],
    mcqs: [
      {
        question: "Which of the following is used to pass data down to a child component?",
        options: ["state", "props", "context", "hooks"],
        answerIndex: 1,
        explanation: "Props are read-only properties passed down to child components in the React component hierarchy."
      },
      {
        question: "What does the 'use client' directive mean in Next.js?",
        options: ["The file should be sent to mobile users only", "The component runs on the client browser, enabling state and hooks", "The file is client-side documentation", "The database client should connect"],
        answerIndex: 1,
        explanation: "'use client' is a Next.js directive indicating that the component is a client-side component, enabling interactivity, hooks (useState, useEffect), and standard browser event listeners."
      }
    ],
    exercises: [
      {
        title: "Build a Toggle Component",
        problem: "Write a React component that shows a card. Inside the card, add a button that toggles the card's visibility state from 'hidden' to 'shown'.",
        solution: `import React, { useState } from 'react';\n\nexport default function ToggleCard() {\n  const [visible, setVisible] = useState(true);\n  return (\n    <div>\n      <button onClick={() => setVisible(!visible)}>Toggle</button>\n      {visible && <p>This is a toggled card content!</p>}\n    </div>\n  );\n}`
      }
    ],
    miniProject: {
      title: "Task Tracker",
      description: "Build a simple single-page task manager with categories, filter, and LocalStorage mapping.",
      steps: [
        "Initialize task list state with dummy items.",
        "Add a text input form to create new tasks with title and category.",
        "Include checkbox to mark tasks as completed.",
        "Create status filters (All, Completed, Active)."
      ]
    },
    majorProject: {
      title: "Portfolio Dashboard Sandbox",
      description: "Assemble a multi-widget dashboard displaying charts, to-do lists, and an editor workspace using React states.",
      steps: [
        "Create dashboard grid using Tailwind grid system.",
        "Integrate modular widgets (Clock, Tasks, Notes, Code Editor).",
        "Implement custom drag-and-drop or column layout settings.",
        "Add theme selectors (glass, light, dark, retro) inside local storage stores."
      ]
    },
    cheatSheet: [
      "useState: const [state, setState] = useState(initial)",
      "useEffect: useEffect(() => { doEffect(); return () => cleanup(); }, [deps])",
      "useRef: const ref = useRef(null) - references mutable variable or DOM node without re-renders",
      "Component creation: function MyComp({ prop }) { return <div>{prop}</div> }"
    ],
    revisionNotes: "Focus on React's declarative nature. Keep components pure: do not mutate props, write idempotent render functions. Use state for values that affect UI rendering; use refs for direct DOM manipulation or persistent values that do not trigger visual redraws.",
    summary: "React revolutionized frontend web development by introducing a component-based declarative structure, unidirectional data flow, and virtual DOM diffing. It provides a fast, predictable architecture for scaling user interfaces.",
    keyTakeaways: [
      "UI is a function of state: UI = f(State).",
      "Reconciliation updates the browser efficiently using VDOM diffing.",
      "Hooks enable state and lifecycle features inside functional components."
    ],
    resources: [
      "Official React Documentation (react.dev)",
      "Next.js Documentation (nextjs.org)",
      "React Under the Hood - Technical Blog Series"
    ],
    relatedTopics: [
      { title: "Next.js App Router", slug: "nextjs-app-router" },
      { title: "JavaScript ES6+", slug: "javascript-es6" }
    ],
    nextTopic: { title: "Next.js App Router", slug: "nextjs-app-router" }
  },

  "tcp-ip-suite": {
    slug: "tcp-ip-suite",
    title: "TCP/IP Suite",
    category: "Computer Networks",
    icon: "Network",
    definition: "The Transmission Control Protocol/Internet Protocol (TCP/IP) suite is the conceptual model and set of communications protocols used to power the modern internet, defining how data is packaged, addressed, transmitted, and routed.",
    beginnerExplanation: "Think of sending a large book to your friend across the country through the mail. Instead of sending the entire book in one heavy package (which might get lost or damaged), you rip the book into individual pages, put each page in an envelope with an address, a return address, and a page number, and mail them. Your friend receives the envelopes, checks if any are missing, orders them by page number, and reassembles the book. TCP/IP does exactly this with computer data: it breaks files into 'packets', sends them across the web, and reassembles them at the destination.",
    advancedExplanation: "The TCP/IP suite is a four-layer networking model standardized in RFC 1122. Unlike the theoretical 7-layer OSI model, TCP/IP represents practical internet protocols. The layers are: Application (HTTP, DNS), Transport (TCP, UDP), Network/Internet (IP, ICMP), and Link/Network Access (Ethernet, Wi-Fi). TCP (Transport Layer) is connection-oriented, providing reliable, ordered delivery of data streams with flow control and congestion avoidance (via sliding window algorithms and congestion windows). IP (Network Layer) is connectionless and best-effort, handling packet addressing, routing, and fragmentation across multiple network hops.",
    history: "TCP/IP was developed during the 1970s by computer scientists Vint Cerf and Bob Kahn under a research project funded by the US Defense Advanced Research Projects Agency (DARPA). In 1983, the ARPANET transitioned from the older Network Control Program (NCP) to TCP/IP, which marked the formal birth of the modern Internet.",
    whyExists: "Early computer networks were proprietary and isolated; computers from different manufacturers could not communicate. TCP/IP was created as an open, vendor-neutral standard to interconnect heterogeneous computers over diverse physical networks, establishing a universal dialling code and mailing ruleset for all digital hardware.",
    coreConcepts: [
      "Layering: Separation of network responsibilities (4-layer model)",
      "Packet Switching: Breaking data streams into packets routed independently",
      "Reliability vs Speed: TCP (ordered, verified) vs UDP (unordered, speed-first)",
      "IP Addressing & Routing: Directing packets to unique addresses across routers",
      "Congestion Control: Adapting transmission speed based on packet drop rates"
    ],
    terminology: [
      { term: "Packet", definition: "A segment of data wrapped in header controls containing destination addresses and sequence keys." },
      { term: "IP Address", definition: "A unique numerical identifier assigned to each device connected to a computer network." },
      { term: "Three-way Handshake", definition: "The synchronization sequence (SYN, SYN-ACK, ACK) used by TCP to establish a connection." }
    ],
    internalWorking: "To establish connection, TCP performs a Three-Way Handshake: client sends SYN, server replies SYN-ACK, client sends ACK. During transmission, data is segmented. Each segment is appended with a TCP header (defining source/dest ports, sequence, and ack numbers) and passed to IP. IP appends an IP header (defining source/dest IPs) to create a packet. The packet is framed by Ethernet/Wi-Fi drivers (Link Layer) and sent. The receiver acknowledges packet sequences; missing packets trigger retransmissions.",
    architecture: `+---------------------------------------+
|  Application Layer (HTTP, DNS, SSH)  |  <- Generates Data
+---------------------------------------+
                   |
                   v
+---------------------------------------+
|  Transport Layer (TCP, UDP Segments)  |  <- Adds Ports & Reliability
+---------------------------------------+
                   |
                   v
+---------------------------------------+
|   Network Layer (IP Packets/Datagram) |  <- Adds IP Addressing & Routing
+---------------------------------------+
                   |
                   v
+---------------------------------------+
|     Link Layer (Ethernet, Wi-Fi)      |  <- Serializes onto Physical Media
+---------------------------------------+`,
    workflow: [
      "Application requests resource (e.g., browser requests page index).",
      "Transport layer establishes TCP handshake and segments raw HTML query.",
      "Network layer attaches destination IP and routes packets through gateways.",
      "Link layer converts digital packets into electrical or optical signals.",
      "Recipient reassembles TCP packets, verifies checksums, and responds."
    ],
    components: [
      "IP Protocol: Standardizes addressing and packet encapsulation",
      "TCP Protocol: Controls stream integrity, sequencing, and handshakes",
      "UDP Protocol: Standardizes fast, lightweight connectionless delivery",
      "ICMP: Handles network diagnostics and error-reporting (e.g., ping)"
    ],
    analogy: "Think of TCP as a registered courier service. The courier gives you receipt numbers, checks if boxes are intact, and guarantees delivery. IP is like the GPS and road system: it maps the streets and calculates the quickest routes for the delivery trucks to drive from house to house. UDP is like standard postcards: dropped in a mailbox without tracking, fast, simple, and cheap.",
    useCases: [
      "Web browsing (HTTP/HTTPS) and email clients (SMTP, IMAP).",
      "File Transfer (FTP, SFTP) and secure terminal configurations (SSH).",
      "Real-time media streaming and online gaming (utilizing UDP subprotocols)."
    ],
    setupGuide: "TCP/IP is native to all modern Operating Systems. No installation is required. \n\nTo view active connections in a terminal:\n1. On Windows: run `netstat -ano` inside CMD/PowerShell.\n2. On Linux/macOS: run `ss -tulpn` or `netstat -nat`.",
    folderStructure: `OS-Network-Stack/ (Low-level kernel files)
├── drivers/
│   ├── ethernet/
│   └── wifi/
├── protocols/
│   ├── tcp.c
│   ├── udp.c
│   └── ip.c
└── socket/
    └── socket_interface.c`,
    codeExample: {
      language: "javascript",
      code: `const net = require('net');

// Create a simple TCP server
const server = net.createServer((socket) => {
  console.log('Client connected:', socket.remoteAddress);

  // Receive data from client
  socket.on('data', (data) => {
    console.log('Received:', data.toString());
    // Reply back (Echo protocol)
    socket.write('Echo from TCP Server: ' + data.toString());
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

// Bind to port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('TCP Echo Server running on port 3000');
});`,
      explanation: [
        "Line 1: Import Node's net module, providing native socket structures for low-level TCP connection handles.",
        "Line 4: Create a TCP server instance. The callback fires when a new socket handshake completes.",
        "Line 8-11: Bind an event listener to the 'data' event, triggered when incoming segments are buffered.",
        "Line 10: Echo message back using socket write method, demonstrating duplex data transfer.",
        "Line 19: Listen on localhost loopback (127.0.0.1) on port 3000."
      ]
    },
    security: [
      "SYN Flood Attacks: Flooding server with SYN packets without sending ACKs. Prevented using 'SYN Cookies'.",
      "Man-in-the-Middle: Intercepting TCP streams. Prevented using TLS encryption (HTTPS/SSL) above TCP.",
      "IP Spoofing: Fabricating source IP addresses to bypass firewall configurations."
    ],
    performance: [
      "Window Scaling: Enables TCP sliding window sizes larger than 64KB for high-speed fiber lines.",
      "TCP Fast Open (TFO): Allows client data to be sent inside initial SYN packets, saving a round-trip time.",
      "Nagle's Algorithm: Consolidates tiny packets into larger ones. Disable using TCP_NODELAY for low latency."
    ],
    errorHandling: [
      "Checksum verification: Auto-discards corrupt frames.",
      "Retransmission Timeout (RTO): Server re-sends segment if acknowledgement is not received in a timeframe."
    ],
    bestPractices: [
      "Close sockets properly to release OS file descriptors.",
      "Always set socket read timeouts to prevent infinite blocking threads.",
      "Use UDP for telemetry or streaming where packet loss is preferable to latency."
    ],
    commonMistakes: [
      "Expecting TCP packet boundaries: TCP is a streaming protocol. Multiple socket writes can be received in one read.",
      "Failing to handle connection terminations, leading to orphan sockets (Close-Wait states)."
    ],
    advantages: [
      "Guarantees reliable, complete, and correct order of data delivery.",
      "Interoperable: runs on any operating system, network card, and hardware.",
      "Flow control prevents fast senders from overwhelming slow receivers."
    ],
    disadvantages: [
      "High overhead: headers add bytes, handshakes add round trips.",
      "Head-of-Line Blocking: if packet 1 is lost, packets 2 and 3 must wait in the buffer until 1 is retransmitted.",
      "Vulnerable to network state switching (e.g. moving from cellular to Wi-Fi drops socket connection)."
    ],
    comparisonTable: {
      headers: ["Metric", "TCP", "UDP"],
      rows: [
        ["Connection", "Connection-oriented", "Connectionless"],
        ["Reliability", "Guaranteed delivery", "Best-effort (No guarantee)"],
        ["Header Size", "20-60 bytes", "8 bytes"],
        ["Speed", "Slower (due to checks)", "Faster (no checks)"],
        ["Use Case", "Webpages, Email, SSH", "DNS, Gaming, Streaming"]
      ]
    },
    faqs: [
      { question: "What is TCP Head-of-line blocking?", answer: "When one packet is dropped in transmission, subsequent packets in the stream cannot be read by the application and must wait in the socket buffer until the dropped packet is retransmitted and acknowledged." },
      { question: "What is a port number?", answer: "An identifier (0-65535) used to direct packets to the correct application on a target machine, e.g. Port 80 for HTTP, Port 22 for SSH." }
    ],
    questions: [
      { type: "interview", question: "Explain the TCP Three-Way Handshake.", answer: "The three-way handshake establishes a TCP connection. 1. SYN: Client sends synchronization packet containing initial sequence number. 2. SYN-ACK: Server acknowledges client and sends its own SYN. 3. ACK: Client acknowledges server's SYN. The connection is now open." },
      { type: "viva", question: "Which OSI layer maps to TCP/IP Network layer?", answer: "The Network Layer of the OSI Model maps directly to the Internet Layer of the TCP/IP Model." }
    ],
    mcqs: [
      {
        question: "Which layer of the TCP/IP model is responsible for packet routing?",
        options: ["Application", "Transport", "Internet/Network", "Link"],
        answerIndex: 2,
        explanation: "The Internet (or Network) layer handles IP routing, routing tables, and delivery across gateways."
      },
      {
        question: "What handshake flags are set in the first step of TCP connection?",
        options: ["ACK", "SYN", "FIN", "RST"],
        answerIndex: 1,
        explanation: "In the first step, the client transmits a packet with the SYN (Synchronize) flag set."
      }
    ],
    exercises: [
      {
        title: "Identify IP Subnets",
        problem: "Calculate the broadcast address for a device at 192.168.1.50 with a netmask of 255.255.255.0.",
        solution: "A netmask of 255.255.255.0 leaves the last octet for hosts. The broadcast address is 192.168.1.255."
      }
    ],
    miniProject: {
      title: "Port Scanner",
      description: "Build a Node script that tries to open socket connections to a range of local ports to find open services.",
      steps: [
        "Create loop from port 1 to 1024.",
        "Create a net.Socket() connection attempt for each port.",
        "If connection succeeds, log the port number and close connection.",
        "Handle errors silently (ports that reject or time out are closed)."
      ]
    },
    majorProject: {
      title: "Reliable UDP Protocol Simulator",
      description: "Implement a packet loss simulator that wraps UDP packets in custom sequence headers and acknowledges them over raw UDP sockets.",
      steps: [
        "Create a UDP socket server and client.",
        "Send packets with a header format (e.g. SEQ:001;DATA).",
        "Implement a simulated drop chance (e.g., 20% loss rate).",
        "Implement sliding window timeouts and retransmissions client-side."
      ]
    },
    cheatSheet: [
      "Three-Way Handshake: SYN -> SYN-ACK -> ACK",
      "Teardown Handshake: FIN -> ACK -> FIN -> ACK",
      "Default ports: HTTP (80), HTTPS (443), SSH (22), DNS (53)"
    ],
    revisionNotes: "Remember: TCP is reliable, connection-oriented, stream-based, and handles congestion. UDP is unreliable, connectionless, packet-based, and optimizes speed.",
    summary: "The TCP/IP suite is the operating system core that drives the internet. Using a 4-layer structure, it splits, routes, and reliably reassembles packets, balancing performance and reliability for diverse applications.",
    keyTakeaways: [
      "TCP/IP is a 4-layer architecture mapping to network realities.",
      "TCP handles reliability; UDP handles speed.",
      "IP routing enables worldwide connectivity without persistent links."
    ],
    resources: [
      "RFC 793 (TCP Protocol Spec)",
      "RFC 791 (Internet Protocol Spec)",
      "Computer Networking: A Top-Down Approach (Kurose & Ross)"
    ],
    relatedTopics: [
      { title: "OSI Reference Model", slug: "osi-model" },
      { title: "HTTP/3 & QUIC Protocols", slug: "http3-quic" }
    ],
    nextTopic: { title: "OSI Reference Model", slug: "osi-model" }
  }
};

// Generates fallback data for topics that aren't pre-populated, so that everything works instantly!
export function getTopicData(slug: string): TopicData {
  if (PRE_POPULATED_TOPICS[slug]) {
    return PRE_POPULATED_TOPICS[slug];
  }

  // Check client-side custom CMS topics
  if (typeof window !== "undefined") {
    const customStr = localStorage.getItem("tech_world_custom_topics");
    if (customStr) {
      try {
        const customs = JSON.parse(customStr);
        if (customs[slug]) {
          return customs[slug];
        }
      } catch (e) {}
    }
  }

  // Find a matching category/title from our hierarchies or standard mappings
  let title = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  let categoryName = "Technology Subject";
  
  // Try to find the category
  for (const catKey in SUB_CATEGORIES) {
    const subcats = SUB_CATEGORIES[catKey];
    for (const sub of subcats) {
      const found = sub.topics.find(t => t.slug === slug);
      if (found) {
        title = found.title;
        const mainCat = CATEGORIES.find(c => c.id === catKey);
        categoryName = mainCat ? mainCat.name : catKey;
        break;
      }
    }
  }

  return {
    slug,
    title,
    category: categoryName,
    icon: "BookOpen",
    definition: `${title} refers to the structural definition, design mechanics, and industry guidelines associated with this core technology concept.`,
    beginnerExplanation: `Let's make a simple analogy for ${title}. Imagine you have a large library containing thousands of items. If there were no index or organizing shelves, finding a book would take hours. This concept acts as the librarian, indexing and arranging resources so that they are easily accessible. Similarly in computers, ${title} coordinates information flow to optimize performance and prevent systems from locking up.`,
    advancedExplanation: `From an architectural viewpoint, ${title} defines the programmatic structure and execution rulesets governing this standard technology domain. By leveraging modular encapsulation and algorithmic scheduling, it ensures low-latency operations, proper garbage collection, and seamless client-server message routing. Developers configure these constraints through compile-time configuration overrides or dynamic runtime flags.`,
    history: `The developmental origins of ${title} date back to early researchers identifying scalability limits. Over several iterations and IEEE/RFC standardization revisions, it evolved into its current state to support high-throughput cloud environments and microservice patterns.`,
    whyExists: `Without ${title}, software engineers faced manual configuration, race conditions, memory leaks, and scaling blockages. This architectural pattern was standardly created to abstract low-level complexity, giving developers a structured framework to deploy highly available systems.`,
    coreConcepts: [
      "Modular Encapsulation: Grouping components to protect state",
      "Latency Minimization: Optimizing data pipelines",
      "Dynamic Resolution: Allocating memory and hardware capacity on demand",
      "Fail-Safe Protocols: Isolating faults without system-wide crashes"
    ],
    terminology: [
      { term: "Instantiation", definition: "Allocation of computing resources to bootstrap a template representation." },
      { term: "Throughput", definition: "The volume of operations processed by a system in a designated unit of time." },
      { term: "Fault Tolerance", definition: "The ability of a system to continue operating properly in the event of subcomponent failure." }
    ],
    internalWorking: `When executed, the system initializes the engine thread pool, mounts configurations, and maps input events. The internal scheduler analyzes the current CPU thread queue and maps memory layouts before compiling instruction sets into native binary blocks.`,
    architecture: `+---------------------------------------+
|          Input Request Pipeline       |
+---------------------------------------+
                   |
                   v
+---------------------------------------+
|    Dynamic Scheduling & Processing    |
+---------------------------------------+
                   |
                   v
+---------------------------------------+
|        Hardware Allocation Core       |
+---------------------------------------+`,
    workflow: [
      "Initialize application configuration parameters.",
      "Allocate memory buffer registers and spawn worker threads.",
      "Execute logic cycle, validating parameters and routing outputs.",
      "Log monitoring metrics and run cleanup routines."
    ],
    components: [
      "Configuration Loader: Reads external system properties",
      "Execution Thread Pool: Controls concurrent CPU usage",
      "State Repository: Maintains application variables"
    ],
    analogy: `It's like a traffic light system in a busy city center. Without it, cars (data packets) would crash at intersections (race conditions) and traffic would stop completely (deadlocks). By scheduling turns, it keeps vehicles moving safely.`,
    useCases: [
      "Building high-throughput, fault-tolerant web services.",
      "Structuring components in modern microservices architectures.",
      "Optimizing database caching layers for large-scale applications."
    ],
    setupGuide: `To get started with ${title}:\n\n1. Ensure your local runtime (e.g. Node.js or compiler) is updated.\n2. Create a standard config file in your project root.\n3. Run the CLI bootstrap script: \`npx bootstrap-${slug}-module\`.`,
    folderStructure: `${slug}-project/
├── config/
│   └── settings.json
├── src/
│   ├── index.js
│   └── core/
│       └── handler.js
└── package.json`,
    codeExample: {
      language: "javascript",
      code: `// Simple dynamic representation of ${title}
class ${title.replace(/\s+/g, "")}Service {
  constructor(config = {}) {
    this.config = config;
    this.active = false;
  }

  initialize() {
    this.active = true;
    console.log("[System] Initialized ${title} Service.");
  }

  process(data) {
    if (!this.active) throw new Error("Service is inactive.");
    console.log("[Processing] Handling:", data);
    return { status: "success", timestamp: Date.now() };
  }
}

const service = new ${title.replace(/\s+/g, "")}Service();
service.initialize();
service.process({ event: "demo" });`,
      explanation: [
        "Line 2: Declare service class wrapping core technology logics.",
        "Line 7-10: Create initialization routine to allocate system flags.",
        "Line 12-16: Implement process method with built-in safety boundaries."
      ]
    },
    security: [
      "Input Validation: Ensure all request parameters are sanitized.",
      "Least Privilege: Run runtime handles with restricted host credentials."
    ],
    performance: [
      "Enable caching filters for recurring query payloads.",
      "Optimize thread pools to scale dynamically under high traffic."
    ],
    errorHandling: [
      "Implement try-catch wrappers around unstable asynchronous calls.",
      "Log full stack traces in debugging environments while hiding details in production."
    ],
    bestPractices: [
      "Keep configurations externalized and environment-specific.",
      "Write unit tests covering edge boundary conditions."
    ],
    commonMistakes: [
      "Hardcoding configurations inside service logic blocks.",
      "Leaving active connections open, leading to memory leaks."
    ],
    advantages: [
      "Increases deployment speed and reliability.",
      "Reduces boilerplate code and accelerates system diagnostics."
    ],
    disadvantages: [
      "Introduces slight performance latency due to abstraction layers.",
      "Increases code footprint and setup complexity."
    ],
    comparisonTable: {
      headers: ["Metric", `Standard ${title}`, "Alternative Approach"],
      rows: [
        ["Speed", "Optimized / Cached", "Manual / Blocked"],
        ["Reliability", "Fault-tolerant", "Prone to exceptions"],
        ["Flexibility", "Highly modular", "Rigid / Monolithic"]
      ]
    },
    faqs: [
      { question: `What is the main goal of ${title}?`, answer: "To simplify structural engineering of software by abstracting low-level machine components." }
    ],
    questions: [
      { type: "interview", question: `Explain the fundamental concept of ${title}.`, answer: `It standardizes operations by decoupling configuration from execution, preventing typical lockups.` },
      { type: "viva", question: `Why is garbage collection relevant to ${title}?`, answer: "It prevents memory leaks by reclaiming memory blocks of unreachable references." }
    ],
    mcqs: [
      {
        question: `Which of the following describes the key benefit of ${title}?`,
        options: ["Increased manual code", "Improved modularity & maintainability", "Slower compilation times", "Requires older legacy systems"],
        answerIndex: 1,
        explanation: "Modularity and maintainability are major advantages of standardized engineering practices."
      }
    ],
    exercises: [
      {
        title: "Define configuration map",
        problem: `Configure a mock settings payload for ${title} to support 5 concurrent workers.`,
        solution: '{\n  "workers": 5,\n  "cache": true\n}'
      }
    ],
    miniProject: {
      title: `${title} Monitor`,
      description: `Create a shell script that logs memory usage of this module every 10 seconds.`,
      steps: [
        "Create loop logic in Bash or JS.",
        "Query process parameters.",
        "Write updates to monitoring.log."
      ]
    },
    majorProject: {
      title: `${title} Cluster Orchestrator`,
      description: `Design a load balancing workspace that distributes tasks between multiple worker clusters.`,
      steps: [
        "Implement queue mechanism.",
        "Distribute tasks using round-robin patterns.",
        "Integrate failure tracking and auto-recovery handles."
      ]
    },
    cheatSheet: [
      `Setup command: npm install ${slug}-lib`,
      "Instantiation: const service = new Service()",
      "Process request: service.process(payload)"
    ],
    revisionNotes: `Study the modular hierarchy of ${title}. Remember the trade-offs: faster dev velocity vs minor execution overhead.`,
    summary: `${title} provides a scalable and maintainable pattern to organize software, managing resource pipelines securely and efficiently.`,
    keyTakeaways: [
      "Encapsulation boosts team productivity.",
      "Dynamic allocation guarantees resource availability.",
      "Proper setups prevent typical lockups."
    ],
    resources: [
      "Industry Standard Guidebook",
      "Academic computer science lectures"
    ],
    relatedTopics: [
      { title: "Software Architecture", slug: "software-architecture" }
    ],
    nextTopic: { title: "Software Architecture", slug: "software-architecture" }
  };
}
