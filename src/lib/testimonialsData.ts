export interface TestimonialUser {
    id: string;
    name: string;
    role: string;
    text: string;
    avatar: string;
    rating: number;
}

export const TESTIMONIALS_DATA: Record<string, TestimonialUser[]> = {
    ar: [
        {
            id: 'ar_1',
            name: "سارة المنصوري",
            role: "مديرة تقنية، TechFlow",
            text: "بصراحة، كُنت خايفة نسلم المشروع لفريندلانسر وللمرة الثانية، لكن عمر غيّر نظرتي تماماً. ما شاء الله، فهم المشكلة اللي عندنا قبل حتى ما أشرحها بالتفصيل. النتيجة كانت فوق الخيال.",
            avatar: "https://randomuser.me/api/portraits/women/45.jpg", // Conservative/Modest
            rating: 5.0
        },
        {
            id: 'ar_2',
            name: "أحمد العلوي",
            role: "مؤسس، StartupJo",
            text: "الموقع كان ثقيل ويطفّش العملاء، وكنت واصل لمرحلة يأس. عمر مو بس سرّع الموقع، هو 'أحياه' من جديد. الأرقام تحسنت فوراً، وأنا أخيراً صرت أنام وأنا مرتاح.",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg", // Middle Eastern features
            rating: 4.9
        },
        {
            id: 'ar_3',
            name: "ليلى حسن",
            role: "مديرة منتج، CreativeSolutions",
            text: "كانت عندي فكرة مجنونة في راسي وما عرفت أشرحها لأحد. عمر لقطها وهي طايرة! حوّل الفكرة لواقع أجمل بمراحل من اللي تخيلته. مبدع وفنان حقيقي.",
            avatar: "https://randomuser.me/api/portraits/women/54.jpg",
            rating: 5.0
        },
        {
            id: 'ar_4',
            name: "عمر فاروق",
            role: "رئيس تنفيذي، AlphaCorp",
            text: "تعاملت مع مطورين كثير، لكن قليل جداً تلاقي أحد يخاف على مشروعك كأنه حلاله. الأمانة والدقة في الشغل عند عمر شي نادر في هالوقت. الله يوفقه.",
            avatar: "https://randomuser.me/api/portraits/men/42.jpg",
            rating: 4.8
        },
        {
            id: 'ar_5',
            name: "نورا الزيد",
            role: "مديرة مشاريع، EnterpriseX",
            text: "كنا في ورطة والوقت يداهمنا قبل الإطلاق بأسبوع. الكل قال مستحيل، بس عمر قبل التحدي وأنجز في 3 أيام شغل شهر كامل. أنقذ سمعتنا قدام المستثمرين.",
            avatar: "https://randomuser.me/api/portraits/women/34.jpg",
            rating: 5.0
        },
        {
            id: 'ar_6',
            name: "خالد يوسف",
            role: "كبير المهندسين، SoftSys",
            text: "الكود اللي كتبه عمر عبارة عن درس في النظافة والترتيب. حتى التيم اللي استلم بعده كان يدعي له. نادراً ما نشوف كود بهذا الجمال والذكاء.",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
            rating: 4.9
        }
    ],
    fr: [
        {
            id: 'fr_1',
            name: "Sophie Martin",
            role: "Directrice Technique, InnovaWeb",
            text: "Honnêtement, je paniquais. Notre site crashait à chaque pic de trafic. Omar n'a pas juste 'fixé' le bug, il a sauvé notre lancement produit. Je peux enfin respirer.",
            avatar: "https://randomuser.me/api/portraits/women/65.jpg", // European/French
            rating: 5.0
        },
        {
            id: 'fr_2',
            name: "Thomas Bernard",
            role: "Lead Développeur, DevCore",
            text: "J'ai eu tellement de mauvaises expériences avec des freelances que j'étais méfiant. Mais Omar... wow. Il s'est impliqué dans le projet comme si c'était le sien. Rare.",
            avatar: "https://randomuser.me/api/portraits/men/11.jpg", // Distinct European
            rating: 4.9
        },
        {
            id: 'fr_3',
            name: "Camille Dubois",
            role: "Chef de Projet, AgenceCreate",
            text: "J'avais une vision très floue de l'UI. Omar a transformé mes gribouillages en une interface fluide et magnifique. J'ai passé 5 minutes à juste scroller en souriant.",
            avatar: "https://randomuser.me/api/portraits/women/29.jpg",
            rating: 5.0
        },
        {
            id: 'fr_4',
            name: "Lucas Petit",
            role: "PDG, StartUpFr",
            text: "C'était le chaos dans notre code. Omar est arrivé, a tout structuré avec un calme olympien. C'est plus qu'un développeur, c'est un partenaire stratégique.",
            avatar: "https://randomuser.me/api/portraits/men/76.jpg",
            rating: 4.8
        },
        {
            id: 'fr_5',
            name: "Emma Leroy",
            role: "Responsable Marketing, GrowthCo",
            text: "On avait une deadline impossible. Tout le monde disait non. Omar a dit 'On peut le faire'. Et il l'a fait. Avec deux jours d'avance. Incroyable.",
            avatar: "https://randomuser.me/api/portraits/women/90.jpg",
            rating: 5.0
        },
        {
            id: 'fr_6',
            name: "Antoine Moreau",
            role: "Architecte Logiciel, SoftSol",
            text: "Quand j'ai vu la qualité de son architecture, j'étais bluffé. C'est propre, logique, robuste. C'est le genre de code qu'on prend plaisir à lire.",
            avatar: "https://randomuser.me/api/portraits/men/28.jpg",
            rating: 4.9
        }
    ],
    en: [
        {
            id: 'en_1',
            name: "Sarah Jenkins",
            role: "CTO, TechGrowth",
            text: "Honestly, I was losing sleep over our load times. Omar didn't just 'optimize' specific pages; he completely re-engineered our core delivery. Our bounce rate dropped instantly.",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg", // Western/US style
            rating: 5.0
        },
        {
            id: 'en_2',
            name: "James Miller",
            role: "Lead Engineer, WebSystems",
            text: "I've been burned by freelancers who leave mess behind. Omar is different. His code is cleaner than what my in-house team writes. He actually cares about the long-term.",
            avatar: "https://randomuser.me/api/portraits/men/85.jpg", // Western
            rating: 4.9
        },
        {
            id: 'en_3',
            name: "Emily Chen",
            role: "Product Manager, InnovateX",
            text: "I had this crazy, complex idea in my head that I couldn't explain clearly. Omar somehow understood it instantly and built something better than I imagined. Pure magic.",
            avatar: "https://randomuser.me/api/portraits/women/33.jpg", // Western/Diverse
            rating: 5.0
        },
        {
            id: 'en_4',
            name: "Michael Ross",
            role: "Founder, StartUpUSA",
            text: "We were weeks behind schedule and panic was setting in. Omar stepped in, took ownership, and got us to launch 3 days early. He saved our Q4 goals.",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            rating: 4.8
        },
        {
            id: 'en_5',
            name: "Jessica Hall",
            role: "VP of Engineering, CloudScale",
            text: "It's rare to find a dev who understands both the 'how' and the 'why'. Omar questioned our logic where it was flawed and proposed better solutions. True partner.",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            rating: 5.0
        },
        {
            id: 'en_6',
            name: "David Wright",
            role: "Tech Lead, AppFlow",
            text: "Our legacy codebase was a nightmare. I thought we'd have to rewrite everything. Omar untangled the mess surgically. He saved us months of work and budget.",
            avatar: "https://randomuser.me/api/portraits/men/86.jpg",
            rating: 4.9
        }
    ]
};
