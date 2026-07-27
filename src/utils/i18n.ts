export interface LanguageOption {
  code: string;
  gtCode: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const WORLD_LANGUAGES: LanguageOption[] = [
  { code: 'es', gtCode: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'en', gtCode: 'en', name: 'Inglés', nativeName: 'English', flag: '🇬🇧' },
  { code: 'zh', gtCode: 'zh-CN', name: 'Chino Mandarín', nativeName: '中文 (简体)', flag: '🇨🇳' },
  { code: 'fr', gtCode: 'fr', name: 'Francés', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', gtCode: 'de', name: 'Alemán', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', gtCode: 'pt', name: 'Portugués', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'it', gtCode: 'it', name: 'Italiano', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ru', gtCode: 'ru', name: 'Ruso', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ar', gtCode: 'ar', name: 'Árabe', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'hi', gtCode: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ja', gtCode: 'ja', name: 'Japonés', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', gtCode: 'ko', name: 'Coreano', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'id', gtCode: 'id', name: 'Indonesio', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'tr', gtCode: 'tr', name: 'Turco', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'vi', gtCode: 'vi', name: 'Vietnamita', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
];

// Dictionary of core UI translations across all 15 world languages
export const TRANSLATIONS: Record<string, Record<string, string>> = {
  // App Title & Header
  appTitle: {
    es: 'Asesorías al Migrante',
    en: 'Migration Advisory',
    zh: '移民咨询',
    fr: 'Conseils aux Migrants',
    de: 'Migrantenberatung',
    pt: 'Apoio ao Migrante',
    it: 'Consulenza Migranti',
    ru: 'Консультация мигрантов',
    ar: 'استشارات المهاجرين',
    hi: 'प्रवासी परामर्श',
    ja: '移民コンサルティング',
    ko: '이민 컨설팅',
    id: 'Konsultasi Migran',
    tr: 'Göçmen Danışmanlığı',
    vi: 'Tư vấn Di cư',
  },
  appBadge: {
    es: 'App Interactiva',
    en: 'Interactive App',
    zh: '互动应用',
    fr: 'Application Interactive',
    de: 'Interaktive App',
    pt: 'App Interativo',
    it: 'App Interattiva',
    ru: 'Интерактивное приложение',
    ar: 'تطبيق تفاعلي',
    hi: 'इंटरएक्टिव ऐप',
    ja: 'インタラクティブアプリ',
    ko: '인터랙티브 앱',
    id: 'Aplikasi Interaktif',
    tr: 'Etkileşimli Uygulama',
    vi: 'Ứng dụng Tương tác',
  },
  appSub: {
    es: 'Guía de Supervivencia Migratoria con Daniela Harrington',
    en: 'Migration Survival Guide with Daniela Harrington',
    zh: 'Daniela Harrington 移民生存指南',
    fr: 'Guide de survie migratoire avec Daniela Harrington',
    de: 'Handbuch für Migration mit Daniela Harrington',
    pt: 'Guia de Sobrevivência Migratória com Daniela Harrington',
    it: 'Guida di Sopravvivenza Migratoria con Daniela Harrington',
    ru: 'Руководство по выживанию в миграции с Даниэлой Гаррингтон',
    ar: 'دليل البقاء للمهاجرين مع دانييلا هارينغتون',
    hi: 'डेनिएला हरिंगटन के साथ प्रवासन उत्तरजीविता गाइड',
    ja: 'ダニエラ・ハリントンとの移民サバイバルガイド',
    ko: ' 다니엘라 해링턴과 함께하는 이민 생존 가이드',
    id: 'Panduan Kelangsungan Hidup Migrasi bersama Daniela Harrington',
    tr: 'Daniela Harrington ile Göç Hayatta Kalma Rehberi',
    vi: 'Hướng dẫn Sinh tồn Di cư cùng Daniela Harrington',
  },

  // Navigation Items
  navEbook: {
    es: 'eBook Interactivo',
    en: 'Interactive eBook',
    zh: '互动电子书',
    fr: 'eBook Interactif',
    de: 'Interaktives E-Book',
    pt: 'eBook Interativo',
    it: 'eBook Interattivo',
    ru: 'Интерактивная книга',
    ar: 'كتاب إلكتروني تفاعلي',
    hi: 'इंटरएक्टिव ई-बुक',
    ja: 'インタラクティブeBook',
    ko: '인터랙티브 전자책',
    id: 'eBook Interaktif',
    tr: 'Etkileşimli E-Kitap',
    vi: 'Ebook Tương tác',
  },
  navCountries: {
    es: 'Comparador Países (100+)',
    en: 'Country Comparison (100+)',
    zh: '国家比较器 (100+)',
    fr: 'Comparateur de pays (100+)',
    de: 'Ländervergleich (100+)',
    pt: 'Comparador de Países (100+)',
    it: 'Confronto Paesi (100+)',
    ru: 'Сравнение стран (100+)',
    ar: 'مقارنة الدول (100+)',
    hi: 'देश तुलना (100+)',
    ja: '国比較 (100+)',
    ko: '국가 비교 (100+)',
    id: 'Komparator Negara (100+)',
    tr: 'Ülke Karşılaştırıcı (100+)',
    vi: 'So sánh Quốc gia (100+)',
  },
  navBudget: {
    es: 'Calculadora Presupuesto',
    en: 'Budget Calculator',
    zh: '预算计算器',
    fr: 'Calculateur de budget',
    de: 'Budgetrechner',
    pt: 'Calculadora de Orçamento',
    it: 'Calcolatore Budget',
    ru: 'Калькулятор бюджета',
    ar: 'حاسبة الميزانية',
    hi: 'बजट कैलकुलेटर',
    ja: '予算計算機',
    ko: '예산 계산기',
    id: 'Kalkulator Anggaran',
    tr: 'Bütçe Hesaplayıcı',
    vi: 'Máy tính Ngân sách',
  },
  navChecklist: {
    es: 'Lista de Verificación',
    en: 'Checklist',
    zh: '准备清单',
    fr: 'Liste de vérification',
    de: 'Checkliste',
    pt: 'Lista de Checagem',
    it: 'Lista di Controllo',
    ru: 'Чек-лист',
    ar: 'قائمة التحقق',
    hi: 'चेकलिस्ट',
    ja: 'チェックリスト',
    ko: '체크리스트',
    id: 'Daftar Periksa',
    tr: 'Kontrol Listesi',
    vi: 'Danh sách kiểm tra',
  },
  navQuiz: {
    es: 'Test Preparación',
    en: 'Readiness Test',
    zh: '准备就绪测试',
    fr: 'Test de préparation',
    de: 'Bereitschaftstest',
    pt: 'Teste de Preparação',
    it: 'Test di Preparazione',
    ru: 'Тест готовности',
    ar: 'اختبار الجاهزية',
    hi: 'तैयारी परीक्षण',
    ja: '準備度テスト',
    ko: '준비도 테스트',
    id: 'Tes Kesiapan',
    tr: 'Hazırlık Testi',
    vi: 'Kiểm tra độ sẵn sàng',
  },
  navJobplan: {
    es: 'Guía Empleo & CV',
    en: 'Job & Resume Guide',
    zh: '求职与简历指南',
    fr: 'Guide Emploi & CV',
    de: 'Job & Lebenslauf Leitfaden',
    pt: 'Guia de Emprego e CV',
    it: 'Guida Lavoro e CV',
    ru: 'Гид по работе и резюме',
    ar: 'دليل الوظائف والسيرة الذاتية',
    hi: 'नौकरी और बायोडाटा गाइड',
    ja: '就職＆履歴書ガイド',
    ko: '취업 및 이력서 가이드',
    id: 'Panduan Kerja & CV',
    tr: 'İş ve Özgeçmiş Rehberi',
    vi: 'Hướng dẫn Việc làm & CV',
  },
  navResources: {
    es: 'Recursos Oficiales',
    en: 'Official Resources',
    zh: '官方资源',
    fr: 'Ressources officielles',
    de: 'Offizielle Ressourcen',
    pt: 'Recursos Oficiais',
    it: 'Risorse Ufficiali',
    ru: 'Официальные ресурсы',
    ar: 'الموارد الرسمية',
    hi: 'आधिकारिक संसाधन',
    ja: '公式リソース',
    ko: '공식 리소스',
    id: 'Sumber Resmi',
    tr: 'Resmi Kaynaklar',
    vi: 'Tài nguyên Chính thức',
  },

  // Chapter Viewer / Index
  activeSectionLabel: {
    es: 'Sección Activa',
    en: 'Active Section',
    zh: '当前章节',
    fr: 'Section active',
    de: 'Aktiver Bereich',
    pt: 'Seção Ativa',
    it: 'Sezione Attiva',
    ru: 'Активный раздел',
    ar: 'القسم النشط',
    hi: 'सक्रिय अनुभाग',
    ja: 'アクティブセクション',
    ko: '활성 섹션',
    id: 'Bagian Aktif',
    tr: 'Etkin Bölüm',
    vi: 'Phần đang xem',
  },
  chapterIndexTitle: {
    es: 'Índice de Capítulos',
    en: 'Chapter Index',
    zh: '章节索引',
    fr: 'Index des chapitres',
    de: 'Kapitelverzeichnis',
    pt: 'Índice de Capítulos',
    it: 'Indice dei Capitoli',
    ru: 'Указатель глав',
    ar: 'فهرس الفصول',
    hi: 'अध्याय सूचकांक',
    ja: '章の目次',
    ko: '장 목차',
    id: 'Indeks Bab',
    tr: 'Bölüm İndeksi',
    vi: 'Mục lục chương',
  },
  searchPlaceholder: {
    es: 'Buscar tema o palabra clave...',
    en: 'Search topic or keyword...',
    zh: '搜索主题或关键字...',
    fr: 'Rechercher un sujet ou un mot-clé...',
    de: 'Thema oder Schlüsselwort suchen...',
    pt: 'Buscar tema ou palavra-chave...',
    it: 'Cerca argomento o parola chiave...',
    ru: 'Поиск темы или ключевого слова...',
    ar: 'البحث عن موضوع أو كلمة رئيسية...',
    hi: 'विषय या कीवर्ड खोजें...',
    ja: 'トピックまたはキーワードを検索...',
    ko: '주제 또는 키워드 검색...',
    id: 'Cari topik atau kata kunci...',
    tr: 'Konu veya anahtar kelime ara...',
    vi: 'Tìm kiếm chủ đề hoặc từ khóa...',
  },
  btnExpand: {
    es: 'Desplegar',
    en: 'Expand',
    zh: '展开',
    fr: 'Développer',
    de: 'Ausklappen',
    pt: 'Expandir',
    it: 'Espandi',
    ru: 'Развернуть',
    ar: 'توسيع',
    hi: 'विस्तार करें',
    ja: '展開',
    ko: '펼치기',
    id: 'Buka',
    tr: 'Genişlet',
    vi: 'Mở rộng',
  },
  btnCollapse: {
    es: 'Ocultar',
    en: 'Collapse',
    zh: '折叠',
    fr: 'Réduire',
    de: 'Einklappen',
    pt: 'Ocultar',
    it: 'Riduci',
    ru: 'Свернуть',
    ar: 'إخفاء',
    hi: 'छिपाएं',
    ja: '折りたたむ',
    ko: '접기',
    id: 'Tutup',
    tr: 'Daralt',
    vi: 'Thu gọn',
  },
  btnPrev: {
    es: 'Anterior',
    en: 'Previous',
    zh: '上一页',
    fr: 'Précédent',
    de: 'Zurück',
    pt: 'Anterior',
    it: 'Precedente',
    ru: 'Назад',
    ar: 'السابق',
    hi: 'पिछला',
    ja: '前へ',
    ko: '이전',
    id: 'Sebelumnya',
    tr: 'Önceki',
    vi: 'Trước',
  },
  btnNext: {
    es: 'Siguiente',
    en: 'Next',
    zh: '下一页',
    fr: 'Suivant',
    de: 'Weiter',
    pt: 'Próximo',
    it: 'Successivo',
    ru: 'Далее',
    ar: 'التالي',
    hi: 'अगला',
    ja: '次へ',
    ko: '다음',
    id: 'Selanjutnya',
    tr: 'Sonraki',
    vi: 'Tiếp theo',
  },
  aiConsultantBtn: {
    es: 'Asesora IA',
    en: 'AI Advisor',
    zh: 'AI 顾问',
    fr: 'Conseillère IA',
    de: 'KI-Beraterin',
    pt: 'Assessora IA',
    it: 'Consulente IA',
    ru: 'ИИ-Консультант',
    ar: 'المستشارة الذكية',
    hi: 'एआई सलाहकार',
    ja: 'AIアドバイザー',
    ko: 'AI 상담원',
    id: 'Penasihat AI',
    tr: 'Yapay Zeka Danışmanı',
    vi: 'Cố vấn AI',
  },
  askAiAboutChapter: {
    es: 'Consultar a la Asesora IA sobre este tema',
    en: 'Ask AI Advisor about this topic',
    zh: '就此主题咨询 AI 顾问',
    fr: 'Consulter la conseillère IA sur ce sujet',
    de: 'Fragen Sie die KI-Beraterin zu diesem Thema',
    pt: 'Consultar Assessora IA sobre este tema',
    it: 'Chiedi alla Consulente IA su questo argomento',
    ru: 'Спросить ИИ-консультанта по этой теме',
    ar: 'استشر المستشارة الذكية حول هذا الموضوع',
    hi: 'इस विषय पर एआई सलाहकार से परामर्श करें',
    ja: 'このトピックについてAIアドバイザーに相談',
    ko: '이 주제에 대해 AI 상담원에게 문의',
    id: 'Konsultasikan dengan Penasihat AI tentang topik ini',
    tr: 'Bu konu hakkında Yapay Zeka Danışmanına danışın',
    vi: 'Hỏi Cố vấn AI về chủ đề này',
  },

  // Login Screen
  loginGuideTitle: {
    es: 'Acceso a la Guía Interactiva',
    en: 'Interactive Guide Access',
    zh: '互动指南入口',
    fr: 'Accès au Guide Interactif',
    de: 'Zugang zum interaktiven Leitfaden',
    pt: 'Acesso ao Guia Interativo',
    it: 'Accesso alla Guida Interattiva',
    ru: 'Доступ к интерактивному руководству',
    ar: 'الوصول إلى الدليل التفاعلي',
    hi: 'इंटरएक्टिव गाइड एक्सेस',
    ja: 'インタラクティブガイドへのアクセス',
    ko: '인터랙티브 가이드 접속',
    id: 'Akses Panduan Interaktif',
    tr: 'Etkileşimli Rehber Erişimi',
    vi: 'Truy cập Hướng dẫn Tương tác',
  },
  usernameLabel: {
    es: 'Usuario',
    en: 'Username',
    zh: '用户名',
    fr: "Nom d'utilisateur",
    de: 'Benutzername',
    pt: 'Usuário',
    it: 'Nome utente',
    ru: 'Имя пользователя',
    ar: 'اسم المستخدم',
    hi: 'उपयोगकर्ता नाम',
    ja: 'ユーザー名',
    ko: '사용자 이름',
    id: 'Nama Pengguna',
    tr: 'Kullanıcı Adı',
    vi: 'Tên người dùng',
  },
  passwordLabel: {
    es: 'Clave de Acceso',
    en: 'Access Key / Password',
    zh: '访问密码',
    fr: 'Mot de passe',
    de: 'Zugangsschlüssel',
    pt: 'Chave de Acesso',
    it: 'Chiave di Accesso',
    ru: 'Ключ доступа',
    ar: 'رمز الدخول',
    hi: 'एक्सेस कुंजी',
    ja: 'アクセスキー',
    ko: '접속 키',
    id: 'Kunci Akses',
    tr: 'Erişim Anahtarı',
    vi: 'Mã truy cập',
  },
  loginBtn: {
    es: 'Ingresar a la Guía',
    en: 'Sign In to Guide',
    zh: '进入指南',
    fr: 'Se connecter au guide',
    de: 'Zum Leitfaden anmelden',
    pt: 'Entrar no Guia',
    it: 'Accedi alla Guida',
    ru: 'Войти в руководство',
    ar: 'الدخول إلى الدليل',
    hi: 'गाइड में साइन इन करें',
    ja: 'ガイドにサインイン',
    ko: '가이드 로그인',
    id: 'Masuk ke Panduan',
    tr: 'Rehbere Giriş Yap',
    vi: 'Đăng nhập Hướng dẫn',
  },
  quickDemoBtn: {
    es: 'Acceso Demo Rápido',
    en: 'Quick Demo Access',
    zh: '快速演示入口',
    fr: 'Accès démo rapide',
    de: 'Schneller Demo-Zugang',
    pt: 'Acesso Demo Rápido',
    it: 'Accesso Demo Rapido',
    ru: 'Быстрый демо-доступ',
    ar: 'وصول تجريبي سريع',
    hi: 'त्वरित डेमो एक्सेस',
    ja: 'クイックデモアクセス',
    ko: '빠른 데모 접속',
    id: 'Akses Demo Cepat',
    tr: 'Hızlı Demo Erişimi',
    vi: 'Truy cập Demo Nhanh',
  },
  logoutBtn: {
    es: 'Salir',
    en: 'Logout',
    zh: '退出',
    fr: 'Déconnexion',
    de: 'Abmelden',
    pt: 'Sair',
    it: 'Esci',
    ru: 'Выход',
    ar: 'خروج',
    hi: 'साइन आउट',
    ja: 'ログアウト',
    ko: '로그아웃',
    id: 'Keluar',
    tr: 'Çıkış',
    vi: 'Đăng xuất',
  }
};

/**
 * Returns a translated string for a given key and language code.
 */
export function t(key: string, langCode?: string): string {
  const code = langCode || getAppLanguage();
  const keyMap = TRANSLATIONS[key];
  if (!keyMap) return key;
  return keyMap[code] || keyMap['es'] || key;
}

/**
 * Applies the target language to the entire application using Google Translate widget & cookies.
 */
export function setAppLanguage(langCode: string): void {
  const langObj = WORLD_LANGUAGES.find((l) => l.code === langCode) || WORLD_LANGUAGES[0];
  const targetGtCode = langObj.gtCode;

  // Store user choice in localStorage
  localStorage.setItem('migrante_lang', langCode);

  // Set Google Translate cookie across all domain scopes
  const cookieVal = langCode === 'es' ? '/es/es' : `/es/${targetGtCode}`;
  document.cookie = `googtrans=${cookieVal}; path=/;`;
  document.cookie = `googtrans=${cookieVal}; domain=${window.location.hostname}; path=/;`;

  // Try to interact directly with Google Translate element select dropdown in DOM
  const selectElem = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
  if (selectElem) {
    selectElem.value = targetGtCode;
    selectElem.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // Notify React listeners so components re-render immediately
  window.dispatchEvent(new Event('languagechange'));
}

/**
 * Gets the current stored language or defaults to 'es'
 */
export function getAppLanguage(): string {
  return localStorage.getItem('migrante_lang') || 'es';
}

// In-memory translation cache to store translated chapter objects
const chapterTranslationCache = new Map<string, any>();

/**
 * Translates a chapter object into target language using backend Gemini API
 */
export async function translateChapterWithAI(chapterObj: any, langCode: string): Promise<any> {
  if (langCode === 'es') return chapterObj;

  const cacheKey = `ch_${chapterObj.id}_${langCode}`;
  if (chapterTranslationCache.has(cacheKey)) {
    return chapterTranslationCache.get(cacheKey);
  }

  const langObj = WORLD_LANGUAGES.find((l) => l.code === langCode) || WORLD_LANGUAGES[0];

  try {
    const payloadToTranslate = {
      title: chapterObj.title,
      summary: chapterObj.summary,
      keyPoints: chapterObj.keyPoints,
      warningAlert: chapterObj.warningAlert,
      sections: chapterObj.sections.map((s: any) => ({
        heading: s.heading,
        content: s.content,
        bulletPoints: s.bulletPoints,
        imageCaption: s.imageCaption,
      })),
    };

    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payload: payloadToTranslate,
        targetLanguage: `${langObj.name} (${langObj.nativeName})`,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data.translated) {
      const trans = data.translated;
      const translatedChapter = {
        ...chapterObj,
        title: trans.title || chapterObj.title,
        summary: trans.summary || chapterObj.summary,
        keyPoints: Array.isArray(trans.keyPoints) ? trans.keyPoints : chapterObj.keyPoints,
        warningAlert: trans.warningAlert || chapterObj.warningAlert,
        sections: chapterObj.sections.map((origSec: any, idx: number) => {
          const transSec = trans.sections?.[idx] || {};
          return {
            ...origSec,
            heading: transSec.heading || origSec.heading,
            content: transSec.content || origSec.content,
            bulletPoints: Array.isArray(transSec.bulletPoints) ? transSec.bulletPoints : origSec.bulletPoints,
            imageCaption: transSec.imageCaption || origSec.imageCaption,
          };
        }),
      };

      chapterTranslationCache.set(cacheKey, translatedChapter);
      return translatedChapter;
    }
  } catch (err) {
    console.error(`AI Translation error for chapter ${chapterObj.id} into ${langCode}:`, err);
  }

  return chapterObj;
}
