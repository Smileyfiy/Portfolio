/*
 * jh&n portfolio content — the single source of truth for the site.
 * Edit this file to update the portfolio; the layout reads everything from here.
 *
 * Rules carried over from the master profile:
 *  - Leave a field as "" to hide it (e.g. dates you haven't confirmed yet).
 *  - Set `publish: false` on anything you're not ready to show publicly.
 *  - Never mark a planned project as completed or overstate a skill level.
 *
 * Supporting documents & pictures (`media`):
 *  Any experience, project, education or credential entry can have a `media` list.
 *  Drop the file into assets/achievements/ and reference it here:
 *
 *    media: [
 *      { src: "assets/achievements/cisco-certificate.pdf", caption: "Certificate of completion" },
 *      { src: "assets/achievements/open-lanes-team.jpg", caption: "Representing UoN at On Open Lanes" },
 *    ],
 *
 *  Images (.jpg .jpeg .png .webp .gif .svg) show as thumbnails and appear in the Gallery section;
 *  anything else (e.g. .pdf) shows as a document link. The first image becomes the card's cover.
 */

const PROFILE = {
  brand: "jh&n",
  name: "John Otieno Odhiambo",
  location: "Nairobi, Kenya",
  role: "Aspiring Cloud Engineer · AI/ML Enthusiast · Computer Science Student",
  tagline: "Building practical software. Learning cloud engineering. Exploring AI agents.",
  // To change your profile picture, replace this file (or point to a new one). Square images look best.
  // If the file is missing, the jh&n mark is shown instead.
  photo: "assets/images/profile.jpg",
  intro:
    "I'm a Computer Science student at the University of Nairobi building toward a career in cloud engineering, " +
    "with hands-on software engineering experience across fintech and agritech applications. I'm comfortable " +
    "working in production codebases, debugging infrastructure issues, and collaborating across engineering, " +
    "machine learning and QA teams. I'm now strengthening my AWS skills while exploring agentic AI, with the goal " +
    "of taking problems from idea to deployment.",
  focus: ["Cloud engineering on AWS", "Software & backend engineering", "Agentic AI & ML", "Cybersecurity fundamentals"],
  links: {
    github: "https://github.com/Smileyfiy",
    linkedin: "https://www.linkedin.com/in/john-otieno-9b4a4825b",
    email: "johnotieno177@gmail.com",
    cv: "", // e.g. "assets/docs/John-Odhiambo-CV.pdf" — consider a web copy without your phone number
  },
};

const EXPERIENCE = [
  {
    id: "accentity",
    org: "Accentity",
    role: "Software Engineer (Intern)",
    type: "Internship · Nairobi",
    dates: "Jun 2026 – Sep 2026",
    summary:
      "Backend engineering on a production codebase — authorization, testing and infrastructure — within an agile, cross-functional team.",
    points: [
      "Designed and implemented a session-aware redirect layer to safely retire a duplicated legacy route, removing associated legacy code across routers, templates and tests.",
      "Designed and implemented a two-layer authorization system with backend access controls and dynamic, permission-aware navigation.",
      "Built a registry-driven test suite that identified critical authorization defects before they reached production.",
      "Extended the authorization system with a custom-built create/read/update/delete (CRUD) permission layer, including data modelling, migrations and soft-delete-based permission management.",
      "Diagnosed a Docker Compose networking issue affecting Celery/Redis background processing.",
      "Contributed to test coverage improvements and local infrastructure testing with container-based AWS emulation.",
      "Collaborated with Engineering, Machine Learning and QA teams in an agile, cross-functional environment.",
    ],
    stack: ["Python", "Django", "Docker", "Celery", "Redis", "LocalStack", "SonarCloud"],
    media: [],
  },
  {
    id: "angaza",
    org: "Angaza Kenya Ltd",
    role: "Software Engineer (Intern)",
    type: "Internship · Nairobi",
    dates: "Aug 2025 – Oct 2025",
    summary:
      "Documentation, analysis and troubleshooting of cloud-based fintech systems built on serverless, event-driven architecture.",
    points: [
      "Contributed to technical documentation and analysis of cloud-based software systems and internal application workflows.",
      "Gained hands-on experience with Python, databases, cloud storage, authentication services and local cloud development environments.",
      "Assisted with troubleshooting application and deployment issues, strengthening debugging and problem-solving skills.",
      "Documented technical processes and system workflows using clear, structured documentation and diagrams.",
      "Gained practical exposure to API integrations, event-driven systems, application processing and cloud-based architectures.",
      "Collaborated with engineers in a professional environment, improving technical communication and understanding of production systems.",
    ],
    stack: ["Python", "AWS Lambda", "DynamoDB", "S3", "Cognito", "LocalStack", "Event-driven design"],
    media: [],
  },
];

const PROJECTS = [
  {
    id: "agri",
    title: "Agricultural Produce Management System",
    status: "completed",
    dates: "Mar 2025 – May 2025",
    summary: "A web platform that lets farmers track produce inventory, record sales and generate reports in real time.",
    problem:
      "Small-scale farmers often track harvests, stock and sales on paper, which makes it hard to see what is selling, what is left, and how the season is going.",
    features: [
      "Designed and built with React and Firebase (Authentication and Realtime Database)",
      "Produce inventory, sales recording and real-time reporting",
      "Data visualisation with Chart.js and downloadable PDF reports",
      "Environmental insights from the OpenWeatherMap API",
      "Technical documentation covering system architecture, a proposed backend design and infrastructure considerations",
    ],
    stack: ["React", "Firebase", "Chart.js", "OpenWeatherMap API"],
    repo: "https://github.com/Smileyfiy/Agriculture-produce-management-system",
    demo: "",
    media: [],
    publish: true,
  },
  {
    id: "dev-agent",
    title: "AI Developer Support Agent",
    status: "planned",
    dates: "",
    summary: "An agent that turns a developer's problem description into a structured troubleshooting plan.",
    problem:
      "Developers lose time triaging familiar issues. The goal is an assistant that uses selected tools and documentation to suggest a clear, verifiable plan.",
    features: [
      "LLM tool calling over a small, curated set of tools",
      "Structured output: likely causes, checks to run, and next steps",
      "An evaluation set of sample tasks to measure reliability",
      "Safe handling of tool output and clearly documented limitations",
    ],
    stack: ["Python", "FastAPI", "LLM APIs", "Tool calling", "Evaluation"],
    repo: "",
    demo: "",
    media: [],
    publish: true,
  },
  {
    id: "cloud-ops",
    title: "AWS Cloud Operations Assistant",
    status: "planned",
    dates: "",
    summary: "A controlled assistant that helps interpret cloud-operations data and guide common troubleshooting.",
    problem:
      "Cloud logs and metrics are noisy. This project explores how an assistant can help explain them without ever holding risky permissions.",
    features: [
      "Read-only, least-privilege IAM design from day one",
      "Serverless backend with Lambda and API Gateway",
      "Reads CloudWatch logs and metrics to explain what is happening",
      "Test cases, monitoring and a deployment guide",
    ],
    stack: ["AWS Lambda", "API Gateway", "CloudWatch", "IAM", "Python"],
    repo: "",
    demo: "",
    media: [],
    publish: true,
  },
  // Coursework projects — set publish: true once you've checked the code, your contribution and status.
  {
    id: "oncoguard",
    title: "OncoGuard AI",
    status: "completed",
    dates: "",
    summary: "An educational Streamlit app exploring breast-cancer classification with logistic regression.",
    problem: "Educational project only — not a medical diagnostic tool.",
    features: ["Logistic regression model", "Streamlit interface", "Generated PDF report"],
    stack: ["Python", "Streamlit", "scikit-learn"],
    repo: "",
    demo: "",
    media: [],
    publish: false,
  },
  {
    id: "uni-reg",
    title: "University Registration App",
    status: "in-progress",
    dates: "",
    summary: "A mobile registration app concept built with Kotlin and Jetpack Compose.",
    problem: "",
    features: [],
    stack: ["Kotlin", "Jetpack Compose"],
    repo: "",
    demo: "",
    media: [],
    publish: false,
  },
];

const EDUCATION = [
  {
    id: "uon",
    school: "University of Nairobi",
    award: "BSc Computer Science",
    dates: "Oct 2023 – Oct 2027 (expected)",
    summary: "School of Computing and Informatics — ongoing undergraduate degree covering software engineering, systems and theory.",
    highlights: [
      "Distributed systems and algorithm analysis",
      "Computer networking — VLANs, router-on-a-stick and secure network design in Cisco Packet Tracer",
      "Mobile development with Kotlin and Jetpack Compose",
      "Databases with SQL and MySQL",
    ],
    media: [],
  },
  {
    id: "mfa",
    school: "Moi Forces Academy, Nairobi",
    award: "Kenya Certificate of Secondary Education (KCSE)",
    dates: "2019 – 2022",
    summary: "Secondary education.",
    highlights: [],
    media: [],
  },
];

// kind: "certification" | "milestone"; status: "earned" | "planned"
const CREDENTIALS = [
  {
    kind: "certification",
    status: "earned",
    title: "Junior Cybersecurity Analyst Career Path",
    issuer: "Cisco Networking Academy",
    date: "May 2026",
    detail: "Career path covering cybersecurity fundamentals, network security, endpoint security and threat management.",
    link: "", // paste the Credly / Cisco verification URL here
    media: [],
  },
  {
    kind: "certification",
    status: "earned",
    title: "ICDL Certificate",
    issuer: "Computer Pride",
    date: "Mar – Jun 2023",
    detail: "International Certification of Digital Literacy covering core computing and productivity skills.",
    link: "",
    media: [],
  },
  {
    kind: "certification",
    status: "planned",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "",
    detail: "Planned — part of my AWS cloud engineering learning path.",
    link: "",
    media: [],
  },
  {
    kind: "milestone",
    status: "earned",
    title: "KamiLimu Cohort 10 — Interview Stage",
    issuer: "KamiLimu",
    date: "Mar 2026",
    detail: "Progressed to the interview stage of KamiLimu's competitive tech mentorship programme.",
    link: "",
    media: [],
  },
  {
    kind: "milestone",
    status: "earned",
    title: "On Open Lanes Varsity International",
    issuer: "University of Nairobi representative",
    date: "Oct 2026",
    detail: "Represented the University of Nairobi as a participant at the varsity running event.",
    link: "",
    media: [],
  },
  {
    kind: "milestone",
    status: "earned",
    title: "NCM Half Marathon",
    issuer: "Participant",
    date: "",
    detail: "Took on my first half marathon as part of building consistency in running.",
    link: "",
    media: [],
  },
];

// level: "Hands-on" (used in real work/projects) | "Comfortable" | "Learning"
const SKILLS = [
  {
    group: "Backend & Programming",
    items: [
      { name: "Python", level: "Hands-on" },
      { name: "Django", level: "Hands-on" },
      { name: "SQL", level: "Comfortable" },
      { name: "RESTful APIs", level: "Comfortable" },
      { name: "Celery & Redis", level: "Hands-on" },
    ],
  },
  {
    group: "Cloud & DevOps",
    items: [
      { name: "AWS (Lambda, DynamoDB, S3, Cognito)", level: "Hands-on" },
      { name: "LocalStack", level: "Hands-on" },
      { name: "Docker", level: "Hands-on" },
      { name: "Event-driven architecture", level: "Learning" },
      { name: "Git & GitHub", level: "Comfortable" },
    ],
  },
  {
    group: "Quality & Security",
    items: [
      { name: "Authorization & access control", level: "Hands-on" },
      { name: "Automated testing", level: "Hands-on" },
      { name: "Debugging & root-cause analysis", level: "Hands-on" },
      { name: "Cybersecurity fundamentals", level: "Comfortable" },
    ],
  },
  {
    group: "Web & Data",
    items: [
      { name: "JavaScript", level: "Comfortable" },
      { name: "React", level: "Comfortable" },
      { name: "Firebase", level: "Comfortable" },
      { name: "Chart.js", level: "Comfortable" },
    ],
  },
  {
    group: "AI & Agents",
    items: [
      { name: "LLM APIs & tool calling", level: "Learning" },
      { name: "FastAPI", level: "Learning" },
      { name: "AI evaluation", level: "Learning" },
    ],
  },
  {
    group: "Collaboration",
    items: [
      { name: "Technical documentation", level: "Hands-on" },
      { name: "Agile, cross-functional teams", level: "Hands-on" },
      { name: "System diagrams", level: "Comfortable" },
    ],
  },
];

const BEYOND = [
  {
    title: "Running",
    text: "Started running and took on the NCM Half Marathon. I'm still building consistency — and documenting it honestly.",
  },
  {
    title: "Training",
    text: "Around three years in the gym. The same discipline shapes how I approach learning: small, steady sessions.",
  },
  {
    title: "Learning in public",
    text: "Roughly an hour a day on cloud, backend and AI — turning what I learn into notes, fixes and projects.",
  },
];
