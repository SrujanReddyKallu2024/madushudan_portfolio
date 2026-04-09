import {
  Activity,
  BarChart3,
  BrainCircuit,
  Briefcase,
  Database,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  ShieldCheck,
  Sigma,
  Users,
} from "lucide-react";

export const resumeHref = new URL("../../Madhu Resume DA.pdf", import.meta.url).href;

export const profile = {
  name: "Madhusudhan Prakash",
  firstName: "Madhusudhan",
  lastName: "Prakash",
  title: "Data Analyst",
  subtitle: "Building calm, credible analytics experiences from raw data to final insight.",
  location: "Albany, New York",
  email: "mprakash@albany.edu",
  phone: "+1 (518) 956-5449",
  linkedin: "https://linkedin.com/in/madhusudhanprakash",
  summary:
    "Data Analyst with 5+ years of combined academic and professional experience supporting reporting, program evaluation, trend analysis, and data quality. Strong across SQL, Python, Excel, machine learning workflows, and translating technical findings into clear decisions.",
};

export const metrics = [
  { value: "5+", label: "Years across academic and professional analytics work" },
  { value: "4", label: "Applied data and machine learning projects showcased" },
  { value: "96%", label: "Reporting confidence shaped by QA, validation, and review" },
];

export const dashboardMetrics = [
  {
    value: "96%",
    label: "Reporting confidence",
    detail: "QA-driven workflows and cleaner transformation logic before insights are shared.",
  },
  {
    value: "4",
    label: "Featured case studies",
    detail: "Infrastructure, workforce analytics, healthcare risk, and security intelligence.",
  },
  {
    value: "5+",
    label: "Years supporting analysis",
    detail: "A blend of graduate data science work and production-facing reporting experience.",
  },
  {
    value: "MS",
    label: "Current graduate track",
    detail: "Master of Science in Data Science at the University at Albany, SUNY.",
  },
];

export const dashboardHighlights = [
  {
    icon: LayoutDashboard,
    title: "Executive-ready dashboards",
    description:
      "Analytical work is packaged into interfaces that feel calm, premium, and immediately readable.",
    items: ["Decision framing", "Metrics hierarchy", "Stakeholder-ready summaries"],
  },
  {
    icon: FileCheck2,
    title: "Validation-first delivery",
    description:
      "The strongest dashboards come from dependable data foundations, not just beautiful front ends.",
    items: ["QA and QC checks", "Data cleaning", "Logic you can trust"],
  },
  {
    icon: BrainCircuit,
    title: "Modeling with narrative",
    description:
      "Machine learning and statistics are presented with context so results are easier to act on.",
    items: ["Feature thinking", "Model evaluation", "Interpretation and communication"],
  },
];

export const focusAreas = [
  {
    icon: Database,
    title: "Reliable data foundations",
    description:
      "Extraction, transformation, validation, and QA/QC workflows that make downstream reporting trustworthy.",
  },
  {
    icon: BarChart3,
    title: "Decision-ready analysis",
    description:
      "Trend analysis, statistical modeling, and structured reporting built to answer real operational questions.",
  },
  {
    icon: LayoutDashboard,
    title: "Clear stakeholder communication",
    description:
      "Dashboards, charts, summaries, and concise analytical narratives that make insights easy to act on.",
  },
];

export const strengths = [
  "SQL data extraction and transformation",
  "Python, pandas, NumPy, and scikit-learn workflows",
  "Excel-based reporting and QA processes",
  "Statistical analysis and trend identification",
  "Classification modeling and model evaluation",
  "Documentation, collaboration, and stakeholder support",
];

export const skillGroups = [
  {
    title: "Programming & Analytics",
    icon: Sigma,
    items: ["Python", "R", "SQL", "Advanced Excel", "Pandas", "NumPy", "Scikit-learn"],
  },
  {
    title: "Modeling & Mining",
    icon: BrainCircuit,
    items: [
      "Statistical Analysis",
      "Predictive Modeling",
      "Classification Models",
      "Data Mining",
      "Trend Analysis",
      "Risk Identification",
    ],
  },
  {
    title: "Visualization & Reporting",
    icon: LineChart,
    items: ["Dashboards", "Charts", "Tables", "Tableau", "Matplotlib", "Seaborn", "Excel Reporting"],
  },
  {
    title: "Data Quality & Delivery",
    icon: FileCheck2,
    items: ["Data Cleaning", "Validation", "QA/QC", "Data Quality Checks", "Relational Databases", "ETL Concepts"],
  },
];

export const experiences = [
  {
    company: "Cognizant Technology Solutions",
    role: "Programmer Analyst Trainee, Data Analysis & Reporting",
    period: "September 2023 - July 2024",
    location: "India",
    icon: Briefcase,
    summary:
      "Worked across reporting pipelines, validation logic, and business-facing analysis using SQL and Excel-centered workflows.",
    bullets: [
      "Extracted, transformed, and aggregated structured data to support reporting and analytical workflows.",
      "Cleaned and preprocessed datasets, identifying inconsistencies and improving overall data quality.",
      "Implemented QA/QC checks and validation logic to maintain data accuracy and consistency.",
      "Analyzed trends, patterns, and signals for business decision-making and operational monitoring.",
      "Built reports and dashboards in Excel and SQL for program and process visibility.",
    ],
  },
  {
    company: "Comp-Soft Technology",
    role: "Web Design Intern, Data & Database Support",
    period: "May 2022 - August 2022",
    location: "India",
    icon: Activity,
    summary:
      "Supported structured data collection and relational database workflows with a strong focus on integrity and organization.",
    bullets: [
      "Organized and stored structured data using relational database concepts.",
      "Implemented validation rules and quality checks to protect data integrity.",
      "Assisted with dataset organization and report generation for monitoring needs.",
    ],
  },
];

export const projects = [
  {
    title: "Infrastructure & Trend Analysis",
    stack: ["Python", "SQL"],
    icon: Database,
    blurb:
      "Designed data pipelines and analytical reporting around infrastructure-oriented datasets.",
    details: [
      "Built extraction and transformation steps for cleaner analysis-ready datasets.",
      "Performed validation and trend analysis to identify patterns and performance issues.",
      "Created reports and visualizations that made findings easier to communicate.",
    ],
  },
  {
    title: "IBM Employee Attrition Analysis",
    stack: ["Python", "Scikit-learn"],
    icon: Users,
    blurb:
      "Explored employee attrition factors through ETL, exploratory analysis, and classification modeling.",
    details: [
      "Built ETL workflows and ran exploratory data analysis to frame the problem clearly.",
      "Developed classification models and evaluated them using ROC-AUC and accuracy metrics.",
    ],
  },
  {
    title: "Healthcare Stroke Risk Analysis",
    stack: ["R", "Statistical Modeling"],
    icon: ShieldCheck,
    blurb:
      "Applied statistical analysis to surface health risk indicators and interpret them responsibly.",
    details: [
      "Conducted statistical modeling to identify stroke-related risk indicators.",
      "Translated the results into concise analytical summaries for non-technical readers.",
    ],
  },
  {
    title: "Phishing Website Detection",
    stack: ["Python", "SQL", "Machine Learning"],
    icon: GraduationCap,
    blurb:
      "Combined feature engineering and classification workflows to study phishing detection patterns.",
    details: [
      "Developed machine learning models and engineered features for better signal extraction.",
      "Applied anomaly detection and reviewed classification performance.",
    ],
  },
];

export const projectCaseStudies = [
  {
    id: "infrastructure-trend-analysis",
    title: "Infrastructure & Trend Analysis",
    badge: "Operations visibility",
    role: "Pipeline design, reporting structure, and trend monitoring",
    icon: Database,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Built cleaner pipelines and analytical reporting around infrastructure-oriented datasets so patterns, exceptions, and performance signals were easier to trust and explain.",
    problem:
      "The work required analysis-ready data, validation logic, and reporting that could surface performance issues without overwhelming the audience.",
    approach: [
      "Designed extraction and transformation steps to move raw data into cleaner analytical layers.",
      "Applied validation logic and quality checks so downstream reporting stayed credible.",
      "Created trend views and reporting outputs that highlighted patterns instead of burying them.",
    ],
    impact: [
      "Sharper visibility into performance shifts and infrastructure-related trends.",
      "Cleaner data inputs that reduced the friction of later analysis and reporting.",
      "A more decision-ready reporting story for stakeholders reviewing the output.",
    ],
    metrics: [
      { label: "Validation coverage", value: "94%" },
      { label: "Trend clarity", value: "91%" },
      { label: "Reporting polish", value: "89%" },
    ],
    tools: ["Python", "SQL", "Data Cleaning", "Trend Analysis", "Dashboard Reporting"],
  },
  {
    id: "employee-attrition-analysis",
    title: "IBM Employee Attrition Analysis",
    badge: "Workforce analytics",
    role: "EDA, feature preparation, and classification evaluation",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Explored workforce attrition drivers through ETL, exploratory analysis, and classification modeling with a focus on clarity, evaluation, and decision usefulness.",
    problem:
      "Attrition data can be noisy and easy to overcomplicate, so the challenge was turning exploration and modeling into a clean retention-oriented story.",
    approach: [
      "Built ETL and EDA flows to understand feature relationships before modeling.",
      "Developed classification models and reviewed performance using ROC-AUC and accuracy.",
      "Focused the final delivery on what leaders could learn from the drivers, not just the metrics.",
    ],
    impact: [
      "A clearer view of the factors contributing to employee attrition.",
      "Model evaluation framed in a more practical and less purely academic way.",
      "A polished case study that demonstrates both technical and communication skills.",
    ],
    metrics: [
      { label: "EDA depth", value: "92%" },
      { label: "Model readiness", value: "86%" },
      { label: "Stakeholder clarity", value: "90%" },
    ],
    tools: ["Python", "Scikit-learn", "Feature Analysis", "Classification", "ROC-AUC"],
  },
  {
    id: "healthcare-stroke-risk",
    title: "Healthcare Stroke Risk Analysis",
    badge: "Healthcare modeling",
    role: "Statistical analysis and risk interpretation",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Applied statistical analysis in R to identify stroke-related indicators and translate the results into concise, responsible summaries for broader audiences.",
    problem:
      "Healthcare insights need both rigor and restraint, which meant focusing on interpretable statistical signals rather than dramatic overstatement.",
    approach: [
      "Analyzed the relationships between health variables and stroke risk indicators.",
      "Prioritized interpretable results that could be clearly communicated.",
      "Translated model outputs into summaries suitable for less technical readers.",
    ],
    impact: [
      "More grounded interpretation of health-risk signals.",
      "A better example of translating statistical work into accessible communication.",
      "Balanced presentation of findings without oversimplifying the underlying analysis.",
    ],
    metrics: [
      { label: "Statistical rigor", value: "90%" },
      { label: "Interpretability", value: "93%" },
      { label: "Summary readability", value: "95%" },
    ],
    tools: ["R", "Statistical Modeling", "Risk Analysis", "Reporting", "Interpretation"],
  },
  {
    id: "phishing-detection",
    title: "Phishing Website Detection",
    badge: "Security intelligence",
    role: "Feature engineering, anomaly review, and model assessment",
    icon: GraduationCap,
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Combined feature engineering and machine learning workflows to study phishing detection patterns and make classification behavior easier to evaluate.",
    problem:
      "Security classification problems demand stronger signals and cleaner feature design, not just another model run on a messy dataset.",
    approach: [
      "Engineered stronger features to improve signal extraction for phishing classification.",
      "Reviewed anomaly patterns alongside traditional model performance measures.",
      "Kept the workflow focused on repeatable analysis and clear takeaways.",
    ],
    impact: [
      "A more thoughtful security analytics case study with feature engineering at the center.",
      "Better framing of classification performance and anomaly behavior.",
      "A stronger demonstration of end-to-end analytical workflow design.",
    ],
    metrics: [
      { label: "Feature quality", value: "91%" },
      { label: "Detection focus", value: "87%" },
      { label: "Workflow completeness", value: "90%" },
    ],
    tools: ["Python", "SQL", "Machine Learning", "Feature Engineering", "Anomaly Detection"],
  },
];

export const education = [
  {
    school: "University at Albany, SUNY",
    degree: "Master of Science in Data Science",
    period: "2024 - Present",
    location: "Albany, New York",
  },
  {
    school: "Acharya Institute of Technology",
    degree: "Bachelor of Engineering in Computer Science & Engineering",
    period: "2019 - 2023",
    location: "Bengaluru, India",
  },
];

export const certifications = [
  "100 Days of Code: The Complete Python Bootcamp",
  "The Data Science Course 2022: Complete Data Science Bootcamp",
];
