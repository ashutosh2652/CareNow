export const loginFormControl = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const ALL_SPECIALIZATIONS = [
  { id: "pediatrics", label: "Pediatrics" },
  { id: "cardiology", label: "Cardiology" },
  { id: "dermatology", label: "Dermatology" },
  { id: "gastroenterology", label: "Gastroenterology" },
  { id: "endocrinology", label: "Endocrinology" },
  { id: "neurology", label: "Neurology" },
  { id: "oncology", label: "Oncology" },
  { id: "pulmonology", label: "Pulmonology" },
  { id: "orthopedic-surgery", label: "Orthopedic Surgery" },
  { id: "ophthalmology", label: "Ophthalmology" },
  { id: "otolaryngology-ent", label: "Otolaryngology (ENT)" },
  {
    id: "obstetrics-gynecology-obgyn",
    label: "Obstetrics and Gynecology (OB/GYN)",
  },
  { id: "psychiatry", label: "Psychiatry" },
  { id: "urology", label: "Urology" },
  { id: "nephrology", label: "Nephrology" },
  { id: "general-surgery", label: "General Surgery" },
  { id: "anesthesiology", label: "Anesthesiology" },
  { id: "radiology", label: "Radiology" },
];
export const specializations_control = {
  pediatrics: "Pediatrics",
  cardiology: "Cardiology",
  dermatology: "Dermatology",
  gastroenterology: "Gastroenterology",
  endocrinology: "Endocrinology",
  neurology: "Neurology",
  oncology: "Oncology",
  pulmonology: "Pulmonology",
  "orthopedic-surgery": "Orthopedic Surgery",
  ophthalmology: "Ophthalmology",
  "otolaryngology-ent": "Otolaryngology (ENT)",
  "obstetrics-gynecology-obgyn": "Obstetrics and Gynecology (OB/GYN)",
  psychiatry: "Psychiatry",
  urology: "Urology",
  nephrology: "Nephrology",
  "general-surgery": "General Surgery",
  anesthesiology: "Anesthesiology",
  radiology: "Radiology",
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};
