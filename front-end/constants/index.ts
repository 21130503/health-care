export const GenderOptions = ["male", "female", "other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
    id: 1
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
    id: 2
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
    id: 3
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
    id: 4
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
    id: 5
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
    id: 6
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
    id:7
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
    id: 8
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
    id: 9
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};