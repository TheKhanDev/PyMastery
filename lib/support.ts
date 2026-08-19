// Client-side-only support data: quick inquiry categories (used by both the
// Services screen and the dedicated Support Center) + FAQ content.

export interface SupportCategory {
  key: string;
  label: string;
  icon: string;
  message: string; // pre-filled WhatsApp message text
}

export const SUPPORT_CATEGORIES: SupportCategory[] = [
  {
    key: 'fyp',
    label: 'Final Year Project',
    icon: 'school-outline',
    message: 'Assalam o Alaikum TheKhanDev! Mujhe apne Final Year Project (FYP) ke liye madad chahiye. Please quote aur availability batayein.',
  },
  {
    key: 'custom-software',
    label: 'Custom Software',
    icon: 'business-outline',
    message: 'Assalam o Alaikum TheKhanDev! Mujhe apne business ke liye custom software/website banwana hai. Please details discuss karein.',
  },
  {
    key: 'assignment',
    label: 'Assignment Help',
    icon: 'document-text-outline',
    message: 'Assalam o Alaikum TheKhanDev! Mujhe ek programming assignment mein madad chahiye. Please jaldi reply karein.',
  },
  {
    key: 'course-question',
    label: 'Course Question',
    icon: 'book-outline',
    message: 'Assalam o Alaikum TheKhanDev! Mujhe PyMastery course ke ek lesson/topic ke baare mein sawal hai.',
  },
  {
    key: 'technical-issue',
    label: 'Technical Issue',
    icon: 'bug-outline',
    message: 'Assalam o Alaikum TheKhanDev! Mujhe app use karte waqt ek technical issue aa raha hai.',
  },
  {
    key: 'billing',
    label: 'Billing / Payment',
    icon: 'card-outline',
    message: 'Assalam o Alaikum TheKhanDev! Mera payment/billing se related ek sawal hai.',
  },
  {
    key: 'partnership',
    label: 'Partnership / Collab',
    icon: 'people-outline',
    message: 'Assalam o Alaikum TheKhanDev! Mujhe aapke sath collaboration/partnership discuss karni hai.',
  },
  {
    key: 'general',
    label: 'General Inquiry',
    icon: 'help-circle-outline',
    message: 'Assalam o Alaikum TheKhanDev! Mujhe aapki services ke baare mein kuch sawalat hain.',
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-free',
    question: 'Kya PyMastery course free hai?',
    answer: 'Ji haan! Poora Python course — sab modules, lessons, quizzes, aur video playlist — bilkul free hai. Sirf software services aur academic support (FYP, assignments, thesis) paid hain, jinki pricing Services section mein clearly likhi hai.',
  },
  {
    id: 'faq-refund',
    question: 'Agar service order karne ke baad khush na hoon to refund milega?',
    answer: 'Har project shuru hone se pehle requirements aur milestones clearly discuss kiye jate hain. Agar kaam shuru hone se pehle cancel karna ho to advance wapas ho sakta hai — is baare mein WhatsApp par pehle hi baat kar lo taake dono taraf clarity rahe.',
  },
  {
    id: 'faq-timeline',
    question: 'Custom software ya FYP kitne din mein mil jata hai?',
    answer: 'Delivery time project ke size par depend karta hai — chhoti assignments 2-5 din mein, FYP 2-4 hafton mein, aur bara custom software 6-10 hafton mein deliver hota hai. Exact timeline Services screen par har service ke sath likha hai.',
  },
  {
    id: 'faq-payment',
    question: 'Payment kaise karte hain?',
    answer: 'Payment details (bank transfer / Easypaisa / JazzCash) WhatsApp par confirm hone ke baad share ki jati hain. Zyadatar projects mein advance + delivery ke waqt remaining payment ka tareeqa hota hai.',
  },
  {
    id: 'faq-progress-lost',
    question: 'Agar main app uninstall kar dun to progress kho jayega?',
    answer: 'Ji haan, progress (completed lessons, XP, streak) is device par locally save hoti hai. Agar app uninstall ya device change karo to progress reset ho jayegi — koi cloud backup nahi hai kyunki ye app bilkul backend-free hai.',
  },
  {
    id: 'faq-support-hours',
    question: 'Support kis waqt available hota hai?',
    answer: 'WhatsApp par messages ka jawab aam tor par kuch ghanton ke andar mil jata hai. Urgent kaam ke liye seedha WhatsApp call bhi kar sakte ho.',
  },
  {
    id: 'faq-certificate',
    question: 'Course complete karne pe certificate milta hai?',
    answer: 'Abhi PyMastery mein digital certificate feature nahi hai, lekin har module ke baad quiz se apna understanding verify kar sakte ho, aur Students section mein apna progress track hota hai.',
  },
];
