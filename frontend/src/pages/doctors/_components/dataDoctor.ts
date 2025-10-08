import { generateSlugify } from "../../../utils/helper";
import { doctorImages } from "./imageData";

export interface DoctorSlot {
  id: number;
  day: string;
  number: number;
  time?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Doctor {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  available: boolean;
  href: string;
  image: string;
  slots?: DoctorSlot[];
  rating?: string;
  reviews?: string;
  experience?: string;
  about?: string;
  education?: Education[];
  services?: string[];
  hours?: string;
  address?: string;
  phone?: string;
  email?: string;
  fee?: string;
  patients?: string;
  awards?: string;
}

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Ayşe Yılmaz",
    category: "dermatologist",
    categoryName: "Dermatology",
    available: true,
    href: `${generateSlugify("Dr. Ayşe Yılmaz")}`,
    image: doctorImages.doctor1,
    rating: "4.9",
    reviews: "156",
    experience: "12",
    about:
      "Dr. Ayşe Yılmaz is a board-certified dermatologist specializing in cosmetic and medical dermatology. With over 12 years of experience, she has helped thousands of patients achieve healthy, radiant skin. Her expertise includes acne treatment, anti-aging procedures, and advanced skin cancer screenings.",
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Istanbul University Faculty of Medicine",
        year: "2008 - 2014",
      },
      {
        degree: "Dermatology Specialization",
        institution: "Hacettepe University Hospital",
        year: "2014 - 2018",
      },
    ],
    services: [
      "Acne Treatment",
      "Botox & Fillers",
      "Laser Therapy",
      "Skin Cancer Screening",
      "Chemical Peels",
      "Mole Removal",
    ],
    hours: "Mon - Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM",
    address: "Nişantaşı Medical Center, Istanbul",
    phone: "+90 212 555 0101",
    email: "a.yilmaz@medicalcenter.com",
    fee: "₺800",
    patients: "650",
    awards: "18",
    slots: [
      { id: 1, day: "monday", number: 10, time: "09:00 AM - 07:00 PM" },
      { id: 2, day: "wednesday", number: 8, time: "09:00 AM - 07:00 PM" },
      { id: 3, day: "friday", number: 12, time: "09:00 AM - 07:00 PM" },
    ],
  },
  {
    id: "2",
    name: "Dr. Mehmet Kaya",
    category: "pediatrician",
    categoryName: "Pediatrics",
    href: `${generateSlugify("Dr. Mehmet Kaya")}`,
    available: true,
    image: doctorImages.doctor2,
    rating: "4.8",
    reviews: "203",
    experience: "15",
    about:
      "Dr. Mehmet Kaya is a compassionate pediatrician dedicated to providing comprehensive healthcare for children from infancy through adolescence. His patient-centered approach and extensive experience make him a trusted choice for families seeking exceptional pediatric care.",
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Ankara University Faculty of Medicine",
        year: "2005 - 2011",
      },
      {
        degree: "Pediatrics Residency",
        institution: "Ankara Children's Hospital",
        year: "2011 - 2015",
      },
    ],
    services: [
      "Well-Child Checkups",
      "Vaccinations",
      "Developmental Assessments",
      "Illness Management",
      "Nutrition Counseling",
      "Behavioral Health",
    ],
    hours: "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 1:00 PM",
    address: "Çankaya Children's Clinic, Ankara",
    phone: "+90 312 555 0202",
    email: "m.kaya@childrensclinic.com",
    fee: "₺600",
    patients: "820",
    awards: "22",
    slots: [
      { id: 1, day: "tuesday", number: 15, time: "09:00 AM - 07:00 PM" },
      { id: 2, day: "thursday", number: 12, time: "09:00 AM - 07:00 PM" },
    ],
  },
  {
    id: "3",
    name: "Dr. Zeynep Demir",
    category: "cardiologist",
    categoryName: "Cardiology",
    href: `${generateSlugify("Dr. Zeynep Demir")}`,
    available: false,
    image: doctorImages.doctor3,
    rating: "4.9",
    reviews: "178",
    experience: "18",
    about:
      "Dr. Zeynep Demir is a highly skilled cardiologist with expertise in interventional cardiology and heart disease prevention. She is known for her thorough diagnostic approach and innovative treatment strategies that have helped countless patients maintain optimal cardiovascular health.",
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Ege University Faculty of Medicine",
        year: "2002 - 2008",
      },
      {
        degree: "Cardiology Fellowship",
        institution: "Mayo Clinic, USA",
        year: "2011 - 2014",
      },
    ],
    services: [
      "Heart Disease Diagnosis",
      "Angioplasty",
      "Cardiac Catheterization",
      "Echocardiography",
      "Stress Testing",
      "Hypertension Management",
    ],
    hours: "Currently on sabbatical",
    address: "İzmir Heart Center, İzmir",
    phone: "+90 232 555 0303",
    email: "z.demir@heartcenter.com",
    fee: "₺1000",
    patients: "450",
    awards: "25",
  },
  {
    id: "4",
    name: "Dr. Can Öztürk",
    category: "dermatologist",
    categoryName: "Dermatology",
    href: `${generateSlugify("Dr. Can Öztürk")}`,
    available: true,
    image: doctorImages.doctor4,
    rating: "4.7",
    reviews: "142",
    experience: "9",
    about:
      "Dr. Can Öztürk specializes in medical and surgical dermatology with a focus on treating complex skin conditions. His modern approach combines evidence-based medicine with the latest technological advancements to deliver outstanding results for his patients.",
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Marmara University Faculty of Medicine",
        year: "2010 - 2016",
      },
      {
        degree: "Dermatology Specialization",
        institution: "Istanbul Medical School",
        year: "2016 - 2020",
      },
    ],
    services: [
      "Psoriasis Treatment",
      "Eczema Management",
      "Hair Loss Treatment",
      "Vitiligo Therapy",
      "Skin Biopsy",
      "Cosmetic Procedures",
    ],
    hours: "Mon - Fri: 10:00 AM - 7:00 PM",
    address: "Kadıköy Dermatology Clinic, Istanbul",
    phone: "+90 216 555 0404",
    email: "c.ozturk@dermclinic.com",
    fee: "₺750",
    patients: "380",
    awards: "12",
    slots: [
      { id: 1, day: "monday", number: 9 },
      { id: 2, day: "thursday", number: 11 },
    ],
  },
  {
    id: "5",
    name: "Dr. Elif Şahin",
    category: "orthopedist",
    categoryName: "Orthopedics",
    href: `${generateSlugify("Dr. Elif Şahin")}`,
    available: true,
    image: doctorImages.doctor5,
    rating: "4.8",
    reviews: "189",
    experience: "14",
    about:
      "Dr. Elif Şahin is an accomplished orthopedic surgeon specializing in sports medicine and joint reconstruction. Her dedication to restoring mobility and improving quality of life has earned her recognition as one of the leading orthopedic specialists in the region.",
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Dokuz Eylül University Faculty of Medicine",
        year: "2006 - 2012",
      },
      {
        degree: "Orthopedic Surgery Residency",
        institution: "Johns Hopkins Hospital, USA",
        year: "2012 - 2017",
      },
    ],
    services: [
      "Joint Replacement",
      "Sports Injury Treatment",
      "Arthroscopy",
      "Fracture Care",
      "Spine Surgery",
      "Physical Therapy",
    ],
    hours: "Mon - Thu: 9:00 AM - 5:00 PM, Fri: 9:00 AM - 3:00 PM",
    address: "Bornova Orthopedic Center, İzmir",
    phone: "+90 232 555 0505",
    email: "e.sahin@orthocenter.com",
    fee: "₺900",
    patients: "520",
    awards: "20",
    slots: [
      { id: 1, day: "tuesday", number: 8, time: "09:00 AM - 07:00 PM" },
      { id: 2, day: "friday", number: 6, time: "09:00 AM - 07:00 PM" },
    ],
  },
  {
    id: "6",
    name: "Dr. Ahmet Çelik",
    category: "neurologist",
    categoryName: "Neurology",
    href: `${generateSlugify("Dr. Ahmet Çelik")}`,
    available: false,
    image: doctorImages.doctor6,
    rating: "4.9",
    reviews: "167",
    experience: "20",
    about:
      "Dr. Ahmet Çelik is a renowned neurologist with two decades of experience in diagnosing and treating neurological disorders. His research contributions and clinical excellence have made him a respected figure in the field of neurology both nationally and internationally.",
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Gazi University Faculty of Medicine",
        year: "2000 - 2006",
      },
      {
        degree: "Neurology Fellowship",
        institution: "Massachusetts General Hospital, USA",
        year: "2009 - 2012",
      },
    ],
    services: [
      "Migraine Treatment",
      "Epilepsy Management",
      "Stroke Care",
      "Parkinson's Treatment",
      "Multiple Sclerosis",
      "Nerve Disorders",
    ],
    hours: "Currently unavailable",
    address: "Ankara Neurology Institute, Ankara",
    phone: "+90 312 555 0606",
    email: "a.celik@neuroinstitute.com",
    fee: "₺1200",
    patients: "600",
    awards: "30",
  },
  {
    id: "7",
    name: "Dr. Selin Arslan",
    category: "pediatrician",
    categoryName: "Pediatrics",
    href: `${generateSlugify("Dr. Selin Arslan")}`,
    available: true,
    image: doctorImages.doctor7,
    rating: "4.9",
    reviews: "224",
    experience: "11",
    about:
      "Dr. Selin Arslan is a warm and caring pediatrician who believes in building lasting relationships with her patients and their families. Her holistic approach to pediatric care ensures that children receive not just medical treatment, but also guidance for healthy development.",
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Çukurova University Faculty of Medicine",
        year: "2009 - 2015",
      },
      {
        degree: "Pediatrics Specialization",
        institution: "Adana City Hospital",
        year: "2015 - 2019",
      },
    ],
    services: [
      "Newborn Care",
      "Adolescent Medicine",
      "Asthma Management",
      "Allergy Testing",
      "Growth Monitoring",
      "Preventive Care",
    ],
    hours: "Mon - Sat: 8:30 AM - 6:00 PM",
    address: "Seyhan Children's Hospital, Adana",
    phone: "+90 322 555 0707",
    email: "s.arslan@childhealth.com",
    fee: "₺650",
    patients: "920",
    awards: "16",
    slots: [
      { id: 1, day: "monday", number: 14, time: "09:00 AM - 07:00 PM" },
      { id: 2, day: "wednesday", number: 16, time: "09:00 AM - 07:00 PM" },
      { id: 3, day: "friday", number: 13, time: "09:00 AM - 07:00 PM" },
    ],
  },
  {
    id: "8",
    name: "Dr. Burak Yıldız",
    category: "cardiologist",
    categoryName: "Cardiology",
    href: `${generateSlugify("Dr. Burak Yıldız")}`,
    available: true,
    image: doctorImages.doctor8,
    rating: "4.8",
    reviews: "195",
    experience: "16",
    about:
      "Dr. Burak Yıldız is a distinguished cardiologist specializing in preventive cardiology and non-invasive cardiac imaging. His patient education approach empowers individuals to take control of their heart health through lifestyle modifications and evidence-based treatments.",
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Uludağ University Faculty of Medicine",
        year: "2004 - 2010",
      },
      {
        degree: "Cardiology Residency",
        institution: "Cleveland Clinic, USA",
        year: "2010 - 2014",
      },
    ],
    services: [
      "Coronary Angiography",
      "Heart Failure Management",
      "Arrhythmia Treatment",
      "Preventive Cardiology",
      "Lipid Management",
      "Cardiac Rehabilitation",
    ],
    hours: "Mon - Fri: 9:00 AM - 6:00 PM",
    address: "Osmangazi Cardiovascular Center, Bursa",
    phone: "+90 224 555 0808",
    email: "b.yildiz@cardiovascular.com",
    fee: "₺950",
    patients: "540",
    awards: "21",
    slots: [
      { id: 1, day: "tuesday", number: 10, time: "09:00 AM - 07:00 PM" },
      { id: 2, day: "thursday", number: 9, time: "09:00 AM - 07:00 PM" },
      { id: 3, day: "saturday", number: 5, time: "09:00 AM - 07:00 PM" },
    ],
  },
];
