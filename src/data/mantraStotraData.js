/**
 * Authentic Mantra, Stotra, and Sukta Dataset for Veda Library
 * Inspired by Astromantra (astromantra.com/astrology-articles/)
 * Complete with 6-Fold Vedic Canon (Rishi, Chhandas, Devata, Beej, Shakti, Keelak), Japa Vidhi, and 4-D Falashruti.
 */

export const MANTRA_CATEGORIES = [
  { id: "all", nameEn: "All Mantras & Stotras", nameHi: "सम्पूर्ण मंत्र एवं स्तोत्र" },
  { id: "vedic-mantra", nameEn: "Vedic Mantras (वैदिक मंत्र)", nameHi: "वैदिक महामंत्र" },
  { id: "stotra", nameEn: "Stotra Sangrah (स्तोत्र संग्रह)", nameHi: "स्तोत्र संग्रह" },
  { id: "sukta", nameEn: "Vedic Suktis (वेद सूक्त)", nameHi: "ऋग्वेद एवं यजुर्वेद सूक्त" },
  { id: "beej-mantra", nameEn: "Beej Mantras (बीज मंत्र)", nameHi: "बीज मंत्र एवं साधना" },
  { id: "kavach", nameEn: "Kavach & Raksha (कवच)", nameHi: "दिव्य रक्षा कवच" },
];

export const MANTRAS_STOTRAS_LIST = [
  {
    id: "m-01",
    slug: "maha-mrityunjaya-mantra",
    category: "vedic-mantra",
    categoryLabel: { en: "Vedic Mantra", hi: "वैदिक महामंत्र" },
    deity: { en: "Lord Shiva (Tryambaka)", hi: "भगवान शिव (त्र्यम्बक)" },
    title: {
      en: "Maha Mrityunjaya Mantra: The Great Death-Conquering Hymn",
      hi: "महामृत्युंजय मंत्र: संजीवनी स्वरूप मृत्युंजय महामंत्र",
    },
    subtitle: {
      en: "Rigveda Mandala 7, Sukta 59, Verse 12. Revealed by Sage Vashistha / Markandeya for longevity, disease-healing, and ultimate liberation.",
      hi: "ऋग्वेद ७.५९.१२ का पावन संजीवनी मंत्र - अकाल मृत्यु भय नाशक, आरोग्य प्रदाता एवं मोक्ष दायिनी साधना।",
    },
    excerpt: {
      en: "Known as the King of Healing Mantras, chanting Maha Mrityunjaya radiates cellular vitality, shields against negative astral forces, and eliminates Markesh dosha.",
      hi: "अकाल मृत्यु से रक्षा और असाध्य व्याधियों के शमन हेतु त्र्यम्बकम मंत्र का शुद्ध पाठ, जप विधि एवं षडंग न्यास विधान।",
    },
    featuredImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    readTime: "6 min read",
    viewsCount: 38900,
    tags: ["MahaMrityunjaya", "ShivaMantra", "Rigveda", "HealingChant", "Moksha"],
    // 6-Fold Vedic Canon (मन्त्र षडङ्ग विधान)
    canonAnga: {
      rishi: { en: "Sage Vashistha / Markandeya", hi: "महर्षि वशिष्ठ / मार्कण्डेय" },
      chhandas: { en: "Anushtup (अनुष्टुप्)", hi: "अनुष्टुप्" },
      devata: { en: "Lord Tryambaka Rudra", hi: "श्री त्र्यम्बक रुद्र" },
      beejam: { en: "Hroum (ह्रौं)", hi: "ह्रौं" },
      shakti: { en: "Jum (जूं)", hi: "जूं" },
      keelakam: { en: "Sah (सः)", hi: "सः" },
    },
    keyVerse: {
      sanskrit: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात् ॥",
      transliteration: "Oṁ tryambakaṁ yajāmahe sugandhiṁ puṣṭivardhanam |\nUrvārukamiva bandhanān mṛtyormukṣīya māmṛtāt ||",
      meaningHi: "हम त्रि-नेत्रधारी (भूत, वर्तमान, भविष्य के ज्ञाता) सुगंधित एवं पुष्टि (जीवन-शक्ति) को बढ़ाने वाले भगवान शिव की आराधना करते हैं। जैसे पका हुआ खरबूजा अपनी बेल के बंधन से सहज ही मुक्त हो जाता है, वैसे ही हम मृत्यु और नश्वर संसार के बंधनों से मुक्त हों, किंतु अमरता (अमृत) से कभी विलग न हों।",
      meaningEn: "We worship the Three-Eyed Lord Shiva, who is fragrant and nurtures all beings. Just as a ripe melon effortlessly detaches from its vine, may He liberate us from death and worldly bondage, but never from Immortality.",
    },
    vidhi: {
      muhurat: { en: "Brahma Muhurta (4:00 - 6:00 AM) or Pradosh twilight", hi: "ब्रह्म मुहूर्त (प्रातः ४ से ६) अथवा प्रदोष काल" },
      direction: { en: "East or North (facing Ishanya / North-East)", hi: "पूर्व अथवा उत्तर दिशा" },
      asana: { en: "White or orange wool/kusha mat", hi: "सफेद अथवा ऊनी/कुशा का आसन" },
      mala: { en: "Pure 5-Mukhi Rudraksha Mala (108 beads)", hi: "प्रामाणिक पंचमुखी रुद्राक्ष माला" },
      sankhya: { en: "1 mala (108 times) daily, or 11 malas during critical convalescence", hi: "प्रतिदिन १०८ बार (१ माला) अथवा संकट काल में ११ माला" },
    },
    benefits: [
      {
        category: { en: "Spiritual", hi: "आध्यात्मिक" },
        text: { en: "Dissolves karmic knots, quiets mental chatter, and awakens inner Shiva consciousness.", hi: "चित्त की चंचलता शांत होती है और शिवत्व का प्राकट्य होता है।" },
      },
      {
        category: { en: "Vital Health", hi: "आरोग्य एवं स्वास्थ्य" },
        text: { en: "Acoustic resonance revitalizes cellular rejuvenation and builds psychological resilience against terminal anxiety.", hi: "प्राण ऊर्जा में वृद्धि होती है और असाध्य रोगों से लड़ने की आंतरिक शक्ति प्राप्त होती है।" },
      },
      {
        category: { en: "Astrological", hi: "ज्योतिषीय निवारण" },
        text: { en: "Neutralizes severe Markesh Dasha, Saturn Sade Sati, Rahu-Ketu afflictions, and untoward planetary collisions.", hi: "मारक ग्रह दशा, शनि साढ़े साती एवं राहु-केतु के अशुभ गोचर का शमन करता है।" },
      },
    ],
  },
  {
    id: "m-02",
    slug: "gayatri-maha-mantra",
    category: "vedic-mantra",
    categoryLabel: { en: "Vedic Mantra", hi: "वैदिक महामंत्र" },
    deity: { en: "Goddess Savitri / Solar Logos (Surya)", hi: "सविता देव / माँ गायत्री" },
    title: {
      en: "Gayatri Maha Mantra: The Supreme Vedic Illuminator",
      hi: "गायत्री महामंत्र: वेदों का सार एवं आत्म-ज्ञान का प्रकाश",
    },
    subtitle: {
      en: "Rigveda 3.62.10. Discovered by Brahmarshi Vishwamitra. The universal prayer for intellect illumination and wisdom.",
      hi: "ऋग्वेद ३.६२.१० - ब्रह्मर्षि विश्वामित्र द्वारा साक्षात्कृत, समस्त सद्बुद्धि और तेज का मूल स्रोत।",
    },
    excerpt: {
      en: "Lord Krishna proclaims in Bhagavad Gita: 'Among all chhandas, I am the Gayatri.' Discover the sacred phonetic science that awakens the crown chakra.",
      hi: "गीता में श्रीकृष्ण कहते हैं - 'छन्दसामहम् गायत्री'। जानें गायत्री मंत्र के २४ अक्षरों का वैज्ञानिक एवं चक्र-जागरण रहस्य।",
    },
    featuredImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    readTime: "7 min read",
    viewsCount: 45200,
    tags: ["GayatriMantra", "SuryaAradhana", "Rigveda", "VedicChant", "Meditation"],
    canonAnga: {
      rishi: { en: "Brahmarshi Vishwamitra", hi: "ब्रह्मर्षि विश्वामित्र" },
      chhandas: { en: "Gayatri (गायत्री)", hi: "गायत्री (२४ वर्ण)" },
      devata: { en: "Savita (The Solar Generator of Life)", hi: "सविता (सूर्य देव)" },
      beejam: { en: "Om (ॐ)", hi: "ॐ" },
      shakti: { en: "Bhur Bhuvah Svah", hi: "भूर्भुवः स्वः" },
      keelakam: { en: "Prachodayat (प्रचोदयात्)", hi: "प्रचोदयात्" },
    },
    keyVerse: {
      sanskrit: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥",
      transliteration: "Oṁ bhūrbhuvaḥ svaḥ tatsaviturvareṇyaṁ\nbhargo devasya dhīmahi dhiyo yo naḥ pracodayāt ||",
      meaningHi: "उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा को हम अपनी अंतरात्मा में धारण करें, जो हमारी बुद्धि को सन्मार्ग पर प्रेरित करे।",
      meaningEn: "We meditate upon the supreme adorable effulgence of the Divine Sun (Creator of all realms). May that Divine Light illuminate our intellect and guide us on the righteous path.",
    },
    vidhi: {
      muhurat: { en: "Trikala Sandhya: Dawn twilight, Solar noon, and Sunset", hi: "त्रिकाल संध्या: सूर्योदय, मध्याह्न एवं सूर्यास्त काल" },
      direction: { en: "Facing East in the morning; facing West in evening", hi: "प्रातः पूर्व दिशा; सायं पश्चिम दिशा" },
      asana: { en: "Kusha grass mat or yellow woolen cloth", hi: "कुशा अथवा पीत ऊनी आसन" },
      mala: { en: "Tulsi Mala, Chandan Mala, or Rudraksha Mala", hi: "तुलसी, चंदन अथवा रुद्राक्ष माला" },
      sankhya: { en: "3 malas (324 chants) daily or minimum 108 chants", hi: "नित्य १०८ बार (१ माला) अथवा ३ माला" },
    },
    benefits: [
      {
        category: { en: "Intellect & Concentration", hi: "बुद्धि एवं मेधा शक्ति" },
        text: { en: "Clears brain fog, improves academic retention, and synchronizes left and right brain hemispheres.", hi: "स्मरण शक्ति, एकाग्रता और निर्णय क्षमता में अद्भुत वृद्धि होती है।" },
      },
      {
        category: { en: "Purification", hi: "आत्म-शुद्धि" },
        text: { en: "The 24 phonetic syllables stimulate the 24 glandular centers of the subtle energetic body.", hi: "शरीर के २४ प्रमुख नाड़ी चक्रों का परिशोधन होता है।" },
      },
      {
        category: { en: "Planetary Harmony", hi: "सूर्य ग्रह अनुकूलता" },
        text: { en: "Strengthens Sun in natal chart, granting leadership, vitality, and societal honor.", hi: "कुंडली में सूर्य बलवान होकर मान-सम्मान एवं आत्म-विश्वास प्रदान करता है।" },
      },
    ],
  },
  {
    id: "m-03",
    slug: "shiva-tandava-stotram",
    category: "stotra",
    categoryLabel: { en: "Stotra Sangrah", hi: "स्तोत्र संग्रह" },
    deity: { en: "Lord Shiva Nataraja", hi: "भगवान शिव नटराज" },
    title: {
      en: "Shiva Tandava Stotram: The Hymn of Cosmic Vibration",
      hi: "शिव ताण्डव स्तोत्रम्: लंकाधिपति रावण कृत परम कल्याणकारी स्तोत्र",
    },
    subtitle: {
      en: "Composed in ecstatic Panchachamara meter by Ravana at Mount Kailash. The ultimate expression of devotion, strength, and cosmic rhythm.",
      hi: "पंचचामर छंद में रचित, अद्वितीय शब्द-ध्वनि और लयबद्धता से परिपूर्ण परम ओजस्वी शिव स्तोत्र।",
    },
    excerpt: {
      en: "Filled with energetic alliteration and acoustic power, reciting Shiva Tandava Stotram instills fearless confidence, artistic eloquence, and spiritual victory.",
      hi: "जटाटवीगलज्जलप्रवाहपावितस्थले... शिव तांडव स्तोत्र के पाठ से वाणी में ओज, शत्रुओं पर विजय और भगवान आशुतोष की असीम कृपा प्राप्त होती है।",
    },
    featuredImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    readTime: "9 min read",
    viewsCount: 31200,
    tags: ["ShivaTandava", "RavanaStotra", "Panchachamara", "ShivaBhakti", "PowerChant"],
    canonAnga: {
      rishi: { en: "Dashanana Ravana", hi: "दशानन रावण" },
      chhandas: { en: "Panchachamara Meter (पञ्चचामर छन्द)", hi: "पञ्चचामर छन्द" },
      devata: { en: "Lord Chandrashekhara (Nataraja)", hi: "भगवान चंद्रशेखर शिव" },
      beejam: { en: "Namah Shivaya", hi: "नमः शिवाय" },
      shakti: { en: "Hreem", hi: "ह्रीं" },
      keelakam: { en: "Vande Sambhum", hi: "वन्दे शम्भुम्" },
    },
    keyVerse: {
      sanskrit: "जटाटवीगलज्जलप्रवाहपावितस्थले\nगलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ।\nडमड्डमड्डमड्डमन्निनादवड्डमर्वयं\nचकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥ १ ॥",
      transliteration: "Jaṭāṭavīgalajjalapravāhapāvitasthale\ngale'valambya lambitāṁ bhujaṅgatuṅgamālikām |\nḌamaḍḍamaḍḍamaḍḍamanninādavaḍḍamarvayaṁ\ncakāra caṇḍatāṇḍavaṁ tanotu naḥ śivaḥ śivam || 1 ||",
      meaningHi: "जिनके सघन वन रूपी जटाओं से बहने वाले जल-प्रवाह से पवित्र हुए कंठ देश में विशाल सर्पों की माला लटक रही है, तथा जो डमरू के 'डमड् डमड्' की भीषण ध्वनि के साथ प्रचंड तांडव नृत्य कर रहे हैं—वे भगवान शिव हमारा परम कल्याण विस्तार करें।",
      meaningEn: "With His neck sanctified by the cascading waters flowing through the dense forest of His matted hair, wearing a lofty serpent as a necklace, and performing the vigorous Tandava dance to the pulsating beat of His Damaru—may Lord Shiva bestow all auspiciousness upon us.",
    },
    vidhi: {
      muhurat: { en: "Mondays, Pradosh Vrat, or Maha Shivratri night", hi: "प्रत्येक सोमवार, प्रदोष व्रत अथवा महाशिवरात्रि" },
      direction: { en: "North (Uttara) direction", hi: "उत्तर दिशा" },
      asana: { en: "Clean woolen cloth with Bilva patra offerings", hi: "स्वच्छ ऊनी आसन, सम्मुख शिवलिंग व बिल्वपत्र" },
      mala: { en: "Rudraksha Mala", hi: "रुद्राक्ष माला" },
      sankhya: { en: "Recite full 15 shlokas once or 3 times with pure diction", hi: "सम्पूर्ण १५ श्लोकों का एक अथवा ३ बार सस्वर पाठ" },
    },
    benefits: [
      {
        category: { en: "Eloquence & Command", hi: "वाक् सिद्धि एवं ओज" },
        text: { en: "Infuses fearless confidence, vocal resonance, and commanding leadership aura.", hi: "वाणी में तेजस्विता आती है और भय-अवसाद का सर्वथा नाश होता है।" },
      },
      {
        category: { en: "Enemy & Obstacle Removal", hi: "शत्रु एवं संकट निवारण" },
        text: { en: "Dissolves external obstacles and protects against hidden animosities.", hi: "शत्रु बाधा और कार्यक्षेत्र में आने वाली रुकावटें दूर होती हैं।" },
      },
    ],
  },
  {
    id: "m-04",
    slug: "kanakadhara-stotram",
    category: "stotra",
    categoryLabel: { en: "Stotra Sangrah", hi: "स्तोत्र संग्रह" },
    deity: { en: "Goddess Mahalakshmi", hi: "माँ महालक्ष्मी" },
    title: {
      en: "Kanakadhara Stotram: The Celestial Shower of Gold & Wealth",
      hi: "कनकधारा स्तोत्रम्: जगद्गुरु आदि शंकराचार्य कृत ऐश्वर्य-लक्ष्मी स्तोत्र",
    },
    subtitle: {
      en: "Composed by Jagadguru Adi Shankaracharya to alleviate the penury of a poor brahmin lady, causing a golden gooseberry shower.",
      hi: "आदि गुरु शंकराचार्य द्वारा रचित, दरिद्रता का नाश करने वाला एवं अक्षय धन-धान्य प्रदाता दिव्य स्तोत्र।",
    },
    excerpt: {
      en: "A lyrical masterpiece celebrating the merciful glance of Goddess Lakshmi that transforms poverty into spiritual and material opulence.",
      hi: "अंगं हरेः पुलकभूषणमाश्रयन्ती... कनकधारा स्तोत्र के नित्य पाठ से घर में लक्ष्मी का स्थायी वास होता है और कर्ज मुक्ति मिलती है।",
    },
    featuredImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    readTime: "8 min read",
    viewsCount: 29500,
    tags: ["Kanakadhara", "LakshmiStotra", "AdiShankara", "WealthMantra", "Prosperity"],
    canonAnga: {
      rishi: { en: "Adi Shankaracharya", hi: "आदि शंकराचार्य" },
      chhandas: { en: "Vasantatilaka (वसन्ततिलका छन्द)", hi: "वसन्ततिलका छन्द" },
      devata: { en: "Goddess Kanaka Mahalakshmi", hi: "माँ कनक महालक्ष्मी" },
      beejam: { en: "Shreem (श्रीं)", hi: "श्रीं" },
      shakti: { en: "Hreem (ह्रीं)", hi: "ह्रीं" },
      keelakam: { en: "Kleem (क्लीं)", hi: "क्लीं" },
    },
    keyVerse: {
      sanskrit: "अङ्गं हरेः पुलकभूषणमाश्रयन्ती\nभृङ्गाङ्गनेव मुकुलाभरणं तमालम् ।\nअङ्गीकृताखिलविभूतिरपाङ्गलीला\nमाङ्गल्यदास्तु मम मङ्गलदेवतायाः ॥ १ ॥",
      transliteration: "Aṅgaṁ hareḥ pulakabhūṣaṇamāśrayantī\nbhṛṅgāङ्गनेव mukulābharaṇaṁ tamālam |\nAṅgīkṛtākhilavibhūtirapāṅgalīlā\nmāṅgalyadāstu mama maṅgaladevatāyāḥ || 1 ||",
      meaningHi: "जैसे भ्रमरी खिले हुए फूलों से लदे तमाल वृक्ष पर मँडराती है, उसी प्रकार जो श्रीहरि विष्णु के रोमांचित श्रीअंगों का निरंतर आश्रय लेती हैं और जिनकी कृपा-कटाक्ष में समस्त ऐश्वर्य समाहित हैं—वे परम मंगला भगवती लक्ष्मी मुझे समस्त मंगल और समृद्धि प्रदान करें।",
      meaningEn: "Like a female honeybee resting upon a budding Tamala tree, She who clings to the ecstatic body of Lord Hari, embracing all universal treasures in Her playful glance—may that Divine Mother of Auspiciousness bestow all welfare upon me.",
    },
    vidhi: {
      muhurat: { en: "Friday morning, Diwali, or Dhanteras", hi: "शुक्रवार प्रातःकाल, धनतेरस अथवा दीपावली" },
      direction: { en: "North or North-East (Kubera & Ishanya)", hi: "उत्तर अथवा ईशान दिशा" },
      asana: { en: "Red or yellow silk mat", hi: "लाल अथवा पीला रेशमी आसन" },
      mala: { en: "Kamal Gatta Mala or Sphatik Mala", hi: "कमलगट्टे अथवा स्फटिक माला" },
      sankhya: { en: "Recite all 21 verses once with ghee lamp", hi: "शुद्ध घी का दीपक प्रज्वलित कर सम्पूर्ण २१ पद्यों का पाठ" },
    },
    benefits: [
      {
        category: { en: "Financial Freedom", hi: "ऋण मुक्ति एवं धन लाभ" },
        text: { en: "Alleviates persistent debt, unlocks stuck funds, and invites steady domestic prosperity.", hi: "दीर्घकालिक ऋण से मुक्ति मिलती है और व्यापार में धन आगमन के मार्ग खुलते हैं।" },
      },
      {
        category: { en: "Grace & Harmony", hi: "पारिवारिक शांति एवं ऐश्वर्य" },
        text: { en: "Infuses the household with harmonious warmth, removing discord and financial anxiety.", hi: "घर में कलह समाप्त होकर माँ लक्ष्मी का स्थायी मंगलमय वास होता है।" },
      },
    ],
  },
  {
    id: "m-05",
    slug: "purusha-suktam",
    category: "sukta",
    categoryLabel: { en: "Vedic Sukti", hi: "वेद सूक्त" },
    deity: { en: "The Cosmic Purusha (Paramatman)", hi: "विराट् पुरुष (परमात्मा)" },
    title: {
      en: "Purusha Suktam: The Cosmic Hymn of Universal Creation",
      hi: "पुरुष सूक्तम्: विराट् ब्रह्माण्ड स्वरूप सृष्टि का आदि वैदिक सूक्त",
    },
    subtitle: {
      en: "Rigveda Mandala 10, Sukta 90. The foundational hymn describing the organic cosmic unity of all existence.",
      hi: "ऋग्वेद १०.९० - समस्त चराचर जगत की एकता, महायज्ञ एवं ब्रह्माण्डीय चेतना का अमर गान।",
    },
    excerpt: {
      en: "Sahasra-shirsha purushah... Explore the Rigvedic vision where the cosmos is experienced as a single living organism endowed with a thousand eyes and feet.",
      hi: "सहस्रशीर्षा पुरुषः सहस्राक्षः सहस्रपात्... सम्पूर्ण सृष्टि को एक चेतन इकाई के रूप में अनुभव करने वाला परम पावन वैदिक सूक्त।",
    },
    featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    readTime: "10 min read",
    viewsCount: 24700,
    tags: ["PurushaSuktam", "Rigveda", "CreationHymn", "VedicPhilosophy", "CosmicConsciousness"],
    canonAnga: {
      rishi: { en: "Narayana Rishi", hi: "नारायण ऋषि" },
      chhandas: { en: "Anushtup & Trishtup (अनुष्टुप् एवं त्रिष्टुप्)", hi: "अनुष्टुप् एवं त्रिष्टुप्" },
      devata: { en: "The Omnipresent Virat Purusha", hi: "सर्वव्यापी विराट् पुरुष" },
      beejam: { en: "Om Purushaya Namah", hi: "ॐ पुरुषाय नमः" },
      shakti: { en: "Yajnam", hi: "यज्ञम्" },
      keelakam: { en: "Amritatvam", hi: "अमृतत्वम्" },
    },
    keyVerse: {
      sanskrit: "सहस्रशीर्षा पुरुषः सहस्राक्षः सहस्रपात् ।\nस भूमिं सर्वतः स्पृत्वाऽत्यतिष्ठद्दशाङ्गुलम् ॥ १ ॥",
      transliteration: "Sahasraśīrṣā puruṣaḥ sahasrākṣaḥ sahasrapāt |\nSa bhūmiṁ sarvataḥ spṛtvā'tyatiṣṭhaddaśāṅgulam || 1 ||",
      meaningHi: "उस विराट् पुरुष के सहस्रों (अनंत) सिर हैं, सहस्रों नेत्र हैं और सहस्रों चरण हैं। वह इस संपूर्ण ब्रह्मांड को सब ओर से व्याप्त करके भी दस अंगुल (समस्त सीमाओं से परे अनंत विस्तार में) स्थित है।",
      meaningEn: "The Supreme Cosmic Being possesses a thousand (innumerable) heads, a thousand eyes, and a thousand feet. Encompassing the entire creation on all sides, He transcends all spatial dimensions.",
    },
    vidhi: {
      muhurat: { en: "Daily Morning Puja, Yagya ceremonies, or Abhishek of Lord Vishnu", hi: "नित्य प्रातःकाल, विष्णु अभिषेक अथवा महायज्ञ के समय" },
      direction: { en: "East (Purva)", hi: "पूर्व दिशा" },
      asana: { en: "Kusha grass asana", hi: "कुशा का आसन" },
      mala: { en: "Tulsi Mala", hi: "तुलसी माला" },
      sankhya: { en: "Full 16 Mantras recited with Ghee & Panchamrit tarpana", hi: "सम्पूर्ण १६ मंत्रों का सस्वर पाठ एवं आहुति" },
    },
    benefits: [
      {
        category: { en: "Cosmic Integration", hi: "ब्रह्माण्डीय चेतना" },
        text: { en: "Dismantles the illusion of separation, instilling boundless empathy and divine connection.", hi: "व्यक्तिगत अहंकार का शमन होकर सर्वत्र ईश्वर के दर्शन की अनुभूति होती है।" },
      },
      {
        category: { en: "Yagya Sanctification", hi: "यज्ञीय पवित्रता" },
        text: { en: "Converts any domestic puja space into a consecrated Vedic sacrificial sanctuary.", hi: "घर के वातावरण में परम सात्विकता एवं शांति का संचार होता है।" },
      },
    ],
  },
  {
    id: "m-06",
    slug: "aditya-hridaya-stotram",
    category: "stotra",
    categoryLabel: { en: "Stotra Sangrah", hi: "स्तोत्र संग्रह" },
    deity: { en: "Surya Deva (Aditya)", hi: "भगवान सूर्य देव" },
    title: {
      en: "Aditya Hridaya Stotram: The Solar Hymn for Invincible Victory",
      hi: "आदित्य हृदय स्तोत्रम्: महर्षि अगस्त्य प्रोक्त विजय प्रदाता सूर्य स्तोत्र",
    },
    subtitle: {
      en: "Valmiki Ramayana, Yuddha Kanda, Sarga 105. Imparted by Sage Agastya to Lord Rama on the battlefield to defeat Ravana.",
      hi: "वाल्मीकि रामायण युद्धकाण्ड - महर्षि अगस्त्य द्वारा रणभूमि में श्रीराम को उपदेशित परम तेजस्वी स्तोत्र।",
    },
    excerpt: {
      en: "Tato yuddha-parishrantam... Chanting Aditya Hridaya Stotram dispels fatigue, destroys inner and outer adversaries, and secures enduring triumph.",
      hi: "ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम्... इस स्तोत्र के पाठ से हृदय की दुर्बलता समाप्त होती है और समस्त कार्यों में निर्विवाद विजय मिलती है।",
    },
    featuredImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    readTime: "8 min read",
    viewsCount: 26100,
    tags: ["AdityaHridaya", "SuryaStotra", "Ramayana", "VictoryChant", "Agastya"],
    canonAnga: {
      rishi: { en: "Maharshi Agastya", hi: "महर्षि अगस्त्य" },
      chhandas: { en: "Anushtup (अनुष्टुप्)", hi: "अनुष्टुप्" },
      devata: { en: "Lord Surya Narayana", hi: "भगवान सूर्य नारायण" },
      beejam: { en: "Hram Hreem Saum", hi: "ह्रां ह्रीं सः" },
      shakti: { en: "Adityaya Namah", hi: "आदित्याय नमः" },
      keelakam: { en: "Bhaskaraya", hi: "भास्कराय" },
    },
    keyVerse: {
      sanskrit: "आदित्यहृदयं पुण्यं सर्वशत्रुविनाशनम् ।\nजयावहं जपेन्नित्यम् अक्षय्यं परमं शिवम् ॥ ४ ॥",
      transliteration: "Ādityahṛdayaṁ puṇyaṁ sarvaśatruvināśanam |\nJayāvahaṁ japennityam akṣayyaṁ paramaṁ śivam || 4 ||",
      meaningHi: "यह पावन आदित्य हृदय स्तोत्र समस्त शत्रुओं का नाश करने वाला, सदा विजय प्रदान करने वाला, अक्षय सुख देने वाला तथा परम कल्याणकारी है। इसका नित्य जप करना चाहिए।",
      meaningEn: "This holy Aditya Hridaya hymn destroys all enemies, bestows unconditional victory, grants imperishable joy, and is supremely auspicious. One should chant it daily.",
    },
    vidhi: {
      muhurat: { en: "Sunday morning at sunrise with copper vessel Arghya", hi: "रविवार प्रातः सूर्योदय काल में ताम्र पात्र से अर्घ्य देकर" },
      direction: { en: "East (directly facing the rising Sun)", hi: "पूर्व दिशा (उदीयमान सूर्य के सम्मुख)" },
      asana: { en: "Red woolen or kusha mat", hi: "लाल ऊनी अथवा कुशा का आसन" },
      mala: { en: "Red Sandalwood (Rakta Chandan) Mala", hi: "रक्त चंदन माला" },
      sankhya: { en: "3 times recitation with Surya Arghya", hi: "अर्घ्यदान उपरांत ३ बार पाठ" },
    },
    benefits: [
      {
        category: { en: "Victory & Confidence", hi: "विजय एवं आत्मबल" },
        text: { en: "Dispels despondency, anxiety, and boosts unshakeable resolve in difficult endeavors.", hi: "हताशा और भय का नाश होकर आत्म-विश्वास में अभूतपूर्व वृद्धि होती है।" },
      },
      {
        category: { en: "Cardio-Solar Health", hi: "नेत्र एवं हृदय आरोग्य" },
        text: { en: "Strengthens eyesight, cardiovascular endurance, and physical vitality.", hi: "नेत्र ज्योति और हृदय को बल मिलता है, शरीर में स्फूर्ति आती है।" },
      },
    ],
  },
];

export const getMantraBySlug = (slug) => {
  return MANTRAS_STOTRAS_LIST.find((m) => m.slug === slug || m.id === slug) || null;
};
