import { Chapter, CountryInfo, ChecklistCategory, QuizQuestion, QuizBlock, ActionPlanMonth, OfficialResource, BudgetItem } from '../types';
import { COUNTRIES_DATA } from './countriesData';
import danielaAuthorImg from '../assets/images/daniela_harrington_1784747709233.jpg';

export { COUNTRIES_DATA };

export const EBOOK_METADATA = {
  title: "Mudarse a Otro País: La verdadera Guía de Supervivencia",
  subtitle: "Todo lo que debes saber antes de tomar la decisión de migrar",
  author: "Daniela Harrington",
  role: "Abogada & Fundadora de Asesorías al Migrante",
  authorImage: danielaAuthorImg,
  website: "https://asesoriasal-migrante.vercel.app/",
  contact: {
    phone: "+5492235173127",
    instagram: "@asesoriasalmigrante",
    tiktok: "https://www.tiktok.com/@asesoriasalmigrante?_r=1&_t=ZS-98J3P6Lraej",
    tiktokHandle: "@asesoriasalmigrante",
    email: "asesoriasalmigrante@gmail.com"
  }
};

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "Introducción y Mensaje de Daniela Harrington",
    category: "Bienvenida & Filosofía",
    readTime: "4 min",
    summary: "Un mensaje directo y cercano de Daniela Harrington, abogada especialista en derecho migratorio y fundadora de Asesorías al Migrante. Descubre la visión y el propósito detrás de esta guía de supervivencia.",
    authorImage: danielaAuthorImg,
    keyPoints: [
      "Daniela Harrington comparte su propia historia como migrante y abogada especializada.",
      "El objetivo primordial es evitar errores costosos por desinformación o promesas irresponsables en redes sociales.",
      "Emigrar es un derecho y un proyecto de vida que exige estrategia legal, económica y emocional."
    ],
    danielaTip: "Bienvenidos a esta guía. Mi mayor deseo es brindarte la claridad y el acompañamiento práctico y legal que a mí me hubiera gustado tener cuando emprendí mi propio camino migratorio.",
    sections: [
      {
        heading: "Carta Abierta de la Autora: Daniela Harrington",
        content: "¡Hola! Soy Daniela Harrington, abogada, especialista en derecho migratorio y fundadora de Asesorías al Migrante, un proyecto creado con el propósito de orientar y acompañar a las personas que desean construir un futuro fuera de su país de origen de forma legal, informada y segura.\n\nA lo largo de mi experiencia asesorando migrantes, he comprobado que una de las mayores dificultades al momento de emigrar es la falta de información clara y confiable. Muchas personas toman decisiones importantes basándose en rumores, experiencias ajenas o información desactualizada, lo que puede generar errores costosos y retrasos en sus proyectos migratorios.\n\nPor esa razón decidí crear esta guía.\n\nMi objetivo es brindarte una herramienta práctica que te permita comprender los aspectos fundamentales de una migración exitosa: desde la elección del país adecuado y la preparación de documentos, hasta la planificación financiera, la búsqueda de empleo y la adaptación a una nueva cultura.\n\nEsta guía no pretende reemplazar la asesoría profesional personalizada, ya que cada proceso migratorio es único. Sin embargo, sí busca proporcionarte conocimientos esenciales para que puedas tomar decisiones más informadas y evitar los errores más comunes que enfrentan miles de migrantes cada año.\n\nCreo firmemente que migrar no es simplemente cambiar de país; es un proyecto de vida que merece preparación, estrategia y acompañamiento.\n\nEspero que este material te sirva como punto de partida para alcanzar tus metas y que cada página te acerque un poco más a la vida que deseas construir.",
        imageUrl: danielaAuthorImg,
        imageCaption: "Daniela Harrington — Abogada & Fundadora de Asesorías al Migrante"
      },
      {
        heading: "Propósito y Visión de esta Guía Interactiva",
        content: "En estas páginas no encontrarás fórmulas mágicas ni promesas irresponsables, porque la migración legal requiere rigor y perseverancia. Lo que sí encontrarás es un mapa claro para responder las preguntas cruciales de tu proceso:\n\n• ¿Cómo evaluar objetivamente tu perfil sin romantizar destinos?\n• ¿Cómo proyectar un presupuesto real y proteger tus ahorros?\n• ¿Cómo gestionar la homologación de tus títulos y postular a empleo formal?\n• ¿Cómo afrontar el duelo migratorio y cuidar tu estabilidad emocional?\n\nTe invito a explorar cada capítulo con la mente abierta y a aprovechar las herramientas interactivas integradas en esta aplicación (comparador de 100+ países, calculadora de costos, test de preparación y asesora virtual con IA) diseñadas para guiarte en cada etapa.",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Planificación estratégica para un proyecto migratorio sólido y legal"
      }
    ]
  },
  {
    id: 2,
    title: "¿Estás realmente listo para emigrar?",
    category: "Preparación Mental",
    readTime: "3 min",
    summary: "Migrar es un gran paso y es normal sentir miedos. La respuesta sincera es: ¡NADIE LO ESTÁ AL 100%! Requiere preparación práctica (documentos, maletas, idioma) y preparación emocional.",
    keyPoints: [
      "El miedo a migrar es natural y generalizado en todos los migrantes.",
      "La preparación no es solo económica o de boletos: involucra la salud mental y la estrategia legal.",
      "No esperes el momento perfecto: prepárate con información real y estructurada."
    ],
    danielaTip: "Migrar no es simplemente cambiar de país; es un proyecto de vida que merece preparación, estrategia y acompañamiento constante.",
    sections: [
      {
        heading: "La preparación mental y práctica",
        content: "Migrar es un gran paso, y es normal que aparezcan los miedos antes de intentar hacerlo. Te aseguro como migrante, que esta pregunta nos la hacemos todos ¿Estoy realmente listo para migrar?\n\nLa respuesta es simple: NADIE LO ESTA. ¡Quiero explicarte por qué!\n\nSabemos que tomar la decisión de cambiar de país da vértigo, pero las grandes historias siempre empiezan fuera de la zona de confort. Migrar no tiene por qué ser un caos de trámites interminables. Si el deseo de cambiar de horizontes ya está en tu mente, yo pondré el mapa y la estructura.\n\nLa pregunta no es solo si estás listo emocionalmente para migrar, sino si tienes el mapa correcto para hacerlo con éxito y sin contratiempos. Las leyes cambian, los requisitos abruman y un error en tu aplicación puede costar meses de espera. El migrar, lleva preparación, tanto práctica (y a esto me refiero con documentos, maletas, idioma, entre otras cosas), así como la preparación mental.\n\nEn esta guía quiero darte herramientas que te van a permitir tener una migración legal y segura, ya que estarás acompañada en todo el proceso.",
        imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Afrontar la partida con preparación emocional e información real"
      }
    ]
  },
  {
    id: 3,
    title: "¿Cómo elegir el país correcto?",
    category: "Estrategia",
    readTime: "5 min",
    summary: "No todos los países son ideales para ti. Evita cometer el error de elegir basándote en videos de redes sociales, experiencias ajenas o rumores.",
    keyPoints: [
      "1. Evalúa el mercado laboral de tu área.",
      "2. Considera el idioma con el que deseas vivir.",
      "3. Analiza los costos de vida reales.",
      "4. Investiga la facilidad migratoria y tipos de visa.",
      "5. Evalúa la seguridad y la estabilidad económica del país."
    ],
    danielaTip: "El mejor destino migratorio es aquel donde tus estudios, experiencia, idioma y objetivos personales tengan mayores posibilidades de éxito. No escojas el país solo porque otros lo eligieron.",
    warningAlert: "Muchas personas inician su migración guiándose por experiencias ajenas o videos virales, lo que genera decisiones impulsivas y costosas.",
    sections: [
      {
        heading: "Los 4 filtros esenciales para elegir tu país de destino",
        content: "Interesante pregunta, y te comento que el país perfecto no existe; existe el país adecuado para su momento de vida. No todos los países son los ideales para ti. Te explico: muchas personas inician su migración guiándose por experiencias ajenas, videos de redes sociales, o por conocer a una persona por internet. Tienes que pasar por estos 4 filtros que te ayudarán:\n\n1. El filtro legal: ¿Qué pasaporte tienes? ¿Calificas para una visa de nómada digital, de estudiante, de trabajo o por inversión? El país de tus sueños necesita tener una puerta de entrada legal para ti.\n2. El filtro del objetivo: ¿Por qué emigras? Si buscas ahorrar dinero rápido, tu destino será diferente a si buscas estabilidad y seguridad para tus hijos, o si solo quieres una experiencia de aventura por un año.\n3. El filtro del idioma y la cultura: ¿Estás dispuesto a aprender un idioma desde cero o prefieres la comodidad de tu lengua materna? El clima y la cultura local determinarán qué tan rápido te adaptes.\n4. El filtro financiero: ¿Cuánto cuesta vivir ahí y cuánto necesitas para establecerte los primeros 3 meses?\n\nEs por eso que los 5 puntos claves que te di al principio del capitulo te ayudaran escoger el país ideal para ti y que van a hacer que tu vida sea más sencilla. Mira los siguientes 3 ejemplos:",
        imageUrl: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Análisis objetivo de destinos internacionales sin caer en falsas promesas"
      }
    ]
  },
  {
    id: 4,
    title: "Evaluar el país según tus estudios y profesión",
    category: "Profesión y Empleo",
    readTime: "6 min",
    summary: "Migrar a trabajar 'en cualquier cosa' suele ser la puerta a malas experiencias y explotación. Debes saber si tu carrera es aceptada o si necesitas revalidar/homologar.",
    keyPoints: [
      "La homologación de títulos suele durar aproximadamente 6 meses (iniciar desde tu país de origen es clave).",
      "Investiga la lista oficial de profesiones y ocupaciones de alta demanda en el país de destino.",
      "Documentos indispensables para homologar: Título, Notas certificadas y Pensum / Contenido programático.",
      "Tu experiencia laboral previa te puede dar puntuación en sistemas de residencia basados en puntos."
    ],
    danielaTip: "Siempre recomiendo gestionar las homologaciones antes de viajar. Esto te permitirá llegar buscando oportunidades directas en tu área profesional.",
    sections: [
      {
        heading: "Requisitos de Homologación y Evaluación de Perfil",
        content: "La mayoría de las profesiones necesitan homologar para poder ejercer como te dije antes. Es por eso que necesitas preveer el tiempo para homologar y los costos. Siempre es mejor hacerlo desde tu país de origen, para poder ahorrar tiempo. Hay algunos países que no permiten hacerlo desde tu país de origen, uno de estos es Argentina, Brasil, EEUU, Reino Unido, por eso tienes que tomarlo en cuenta si quieres ejercer tu profesión en ese país.\n\nCada país puede requerir diferentes documentos pero los más importantes siempre serán:\n• Título\n• Notas\n• Contenido programático de cada materia\n\nTu experiencia laboral te puede ayudar en tu proceso. Algunos países te dan puntuación para ir a su país dependiendo de tu experiencia. De acuerdo a la cantidad de años que tengas ejerciendo esa profesión u oficio ellos te darán un puntaje más elevado.\n\nTambién tienes que tener en cuenta si manejas el idioma que utilizan en ese país. Es por lo que te podrían pedir que demuestres un nivel adecuado del idioma. Estos certificados también deben ser legalizados y apostillados para verificar su validez.\n\nEs importante tener en cuenta un salario promedio de tu profesión en los diferentes países que escogiste. Necesitas preguntarte lo siguiente:\n• ¿Podré cubrir mis gastos?\n• ¿Podré ahorrar?\n• ¿Tendré oportunidades de crecimiento profesional?\n\nSiempre aconsejo a mis clientes lo siguiente: El mejor destino migratorio es aquel donde tus estudios, experiencia, idioma y objetivos personales tengan mayores posibilidades de éxito. No escojas el país solo porque otros lo eligieron. Un país ideal para otra persona puede no ser el más adecuado para ti. Tu perfil profesional debe ser uno de los factores más importantes al momento de tomar la decisión.",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Inserción profesional y homologación laboral en el exterior"
      },
      {
        heading: "Preguntas clave que debes hacerte",
        content: "Antes de tomar una decisión, asegúrate de responder las siguientes interrogantes:",
        bulletPoints: [
          "¿Mi profesión tiene demanda en ese país?",
          "¿Necesito homologar mi título antes de ejercer?",
          "¿Puedo trabajar legalmente mientras se procesa la homologación?",
          "¿Necesito aprender otro idioma a nivel profesional?",
          "¿Los salarios promedio justifican el alto costo de vida?"
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Tipos de visas y residencias (Diferencias clave)",
    category: "Legal & Visados",
    readTime: "7 min",
    summary: "Confundir una visa con una residencia o ciudadanía es uno de los errores más comunes y costosos en los procesos migratorios.",
    keyPoints: [
      "VISA: Autorización otorgada por un país para ingresar bajo ciertas condiciones y por un tiempo determinado.",
      "Tipos de visas comunes: **Estudiante**, Empleo/Trabajo, Turismo, Inversión, Reunificación familiar.",
      "Visas NO comunes: Nómada Digital (trabajo remoto internacional con seguro) y Búsqueda de Empleo (Alemania, Portugal, Suecia, EAU).",
      "RESIDENCIA: Permiso legal para vivir durante un periodo (Temporal p.ej. 2 años, o Permanente). Otorga mayor estabilidad y derechos.",
      "CIUDADANÍA: Estatus definitivo que te da pasaporte y derecho al voto. Se obtiene tras años de residencia (2, 5 o 10 años) o por matrimonio/descendencia."
    ],
    danielaTip: "Las **visas de estudio** suelen permitir trabajar medio tiempo y al graduarte te habilitan para realizar un cambio a visa de trabajo.",
    sections: [
      {
        heading: "Diferencias Clave entre Visas, Residencia y Ciudadanía",
        content: "Un punto muy importante y en lo que muchos migrantes cometen errores es con las Visas. Te explico para que sepas la diferencia con la residencia.\n\nUna Visa es una autorización otorgada por un país para permitir el ingreso de una persona bajo determinadas condiciones y por un tiempo específico. Dependiendo del país, la visa puede solicitarse antes de viajar o, en algunos casos, al llegar al destino. Existen diferentes tipos de visa, las más comunes son:\n• Estudiante\n• Empleo\n• Turismo\n• Inversión\n• Reunificación familiar\n\n**La visa de estudiante** es generalmente para estudiar en ese país. Este tipo de visa te permite tener un empleo, por lo general de medio tiempo (eso depende del país). Debes cumplir con ciertos requisitos para obtener esta visa. Con la visa de estudio, al finalizar tus estudios, te va a permitir hacer un cambio de visa para una de trabajo. Le llamaremos a esta visa el caballo de troya, te preguntarás por qué esta visa no es solo para jóvenes que quieran estudiar, es para cualquier persona, estudios primarios, superiores, doctorados, pero también cursos, de idiomas o cursos para tener un oficio. Es por eso que realmente es una de las maneras mas sencilla de poder cambiar de país. Esta visa también te da el tiempo de conocer personas, conseguir un trabajo de medio tiempo lo que hará que tu red de contacto pueda crecer, para luego cambiar de visa de estudiante a una residencia o una visa de trabajo.\n\n**La Visa de Trabajo** te permite trabajar de manera legal en el país que escogiste. Sin embargo, por lo general necesitas ser contratado desde tu país de origen. Esta visa es el camino tradicional de muchas personas, y consiste en tener un perfil atractivo para el país al que deseas migrar. No solo el empleador necesita ver tus cualidades sino también el gobierno del país, ya que el empleador debe demostrar a su gobierno que tus cualidades no las ha podido conseguir en un nativo. Por lo general es una visa para personas altamente calificadas, Personal de Salud, Tecnología entre otros. La mayoría de los países tienen en sus sitios web los profesionales que son highly demandados en sus países, incluso colocan las vacantes que puedes ocupar. España por ejemplo siempre busca personas que puedan ser parte del personal de un buque, o que puedan reparar uno. Además de profesores de deportes. Canadá y Australia también buscan siempre profesionales y estos te dan la opción de ir de acuerdo con los puntos que reúnas.\n\n**La visa de inversión** te permite invertir en el país escogido. Puede ser con la compra de un inmueble, o abrir una empresa. Cada país tiene preestablecidos los montos mínimos para poder realizar las inversiones. Esta es la manera más fácil si cuentas con capital, por eso se le puede llamar el carril VIP. Pero eso sí necesitas demostrar de dónde vienen los fondos que vas a usar para invertir. La persona no debe tener antecedentes penales en su país de origen, por lo general te piden un informe médico para saber que estás en óptimas condiciones para migrar. Necesitas hacer un estudio del país y de los lugares donde deseas invertir ya que esto va a influir en el monto preestablecido por el gobierno. Beneficios de esta visa: residencia legal en el país, reunificación familiar, la posibilidad de trabajar, y en algunos casos depende del programa la posibilidad de adquirir la ciudadanía.\n\n**La visa de reunificación familiar** es para padres, hijos, cónyuges y en algunos países parejas de hecho (esta última deben tener un tiempo determinado por cada país para poder demostrar la unión, en algunos países suele ser de 1 año como mínimo). La familia desde siempre ha sido la unidad más importante de la sociedad, por lo que en el derecho internacional buscando respetar esto permiten esta visa, para que la familia se mantenga unida. Cada país determina qué familiares permite reunificar. Es necesario demostrar el vínculo con documentos, y como todo cuando se trata de derecho internacional debe estar legalizado y apostillado; en caso de que la visa a aplicar sea en otro idioma los documentos deben llevar traducciones. Los beneficios de esta visa es que vivirás con tu familia, tendrás residencia legal, y podrás trabajar, estudiar y hacer una vida normal en ese país, y podrás también adquirir la nacionalidad según tu tiempo de residencia.\n\n**La visa de Nómada Digital** te permite vivir en un país pero debes trabajar de manera digital remota y recibir ingresos de un país extranjero. Cada país varía esta visa, pero debes demostrar un mínimo de ingresos y contar con seguro médico del país al que vas. Esta visa se ha ido extendiendo por el mundo, ahora hay más de 50 países que hoy te permiten aplicar a esta visa. ¿Quién puede aplicar? Trabajadores independientes que trabajan de manera remota, consultores, emprendedores con clientes internacionales, profesionales que se dedican a prestar servicios de manera online. Depende de cada país el tiempo de duración de esta visa; en España dura 3 años y puedes renovar a 2 años más. Esta visa permite que vaya no solo el titular sino también su familia, lo important que debes tomar en cuenta es que deberás demostrar ingresos para la cantidad de personas que vayan. En general es una excelente manera de migrar.\n\n**La visa de búsqueda de empleo** está en pocos países pero te permite ir por un tiempo determinado y buscar trabajo. Una vez consigas el trabajo puedes hacer el cambio de visa. Países como Alemania, Portugal, Suecia, Emiratos Árabes y Dinamarca tienen esta visa. Cada país determina el tiempo que te permite buscar empleo pero inicia desde los 120 días hasta los 6 meses. Puedes pensar que es sencillo, pero tiene cierta complejidad y es que necesitas demostrar dinero para poder mantenerte durante ese tiempo. En esta, al igual que en otras visas, debes demostrar que no tienes antecedentes penales, seguro médico mientras buscas empleo, tener tu pasaporte vigente, los formularios oficiales y, dependiendo del país, haber homologado tu título previamente.\n\n**La visa de residencia no lucrativa**: Este realmente es un permiso de residencia de una persona que no es nacional de ese país, y desea retirarse después de jubilarse. La manera de poder acceder a ella es demostrando que puedes vivir de ahorros, ventas pasivas, patrimonio que genera un dividendo, o una pensión. Esta visa o permiso no permite trabajar, es por eso que no es ideal para todo tipo de persona. Recuerda que la cantidad de dinero que vas a tener que demostrar va a depender del número familiar, si vas solo es mucho menor que ir con toda tu familia.\n\nEs necesario que sepas cuál es la que más se adapta a lo que quieras hacer para poder tener una puerta abierta en el nuevo país.\n\nEn cambio, **la residencia** es el permiso legal para vivir en un país durante un período determinado o de forma permanente. A diferencia de una visa, la residencia suele otorgar más derechos y estabilidad migratoria.\n\nExisten dos tipos de residencia: **la residencia temporal** y **la residencia permanente**.\n\nPor lo general inicias con una **residencia temporal** que varía de acuerdo al país el tiempo de duración pero generalmente es de 1 año a 3 años. Esta te permite trabajar, estudiar y hacer vida común en el país, cada nación tiene normas específicas para permitir la residencia temporal, una vez vencido el lapso, se puede renovar si sigues cumpliendo con la normativa. Es el primer paso para poder obtener la residencia permanente.\n\n**La residencia permanente** te permite vivir de manera indeterminada en el país, esta te da otros derechos que la residencia temporal no te da, esta se renueva por lo general cada 10 años, y te permite cuando cumplas los requisitos solicitar la nacionalidad o ciudadanía.\n\nY por último podrías solicitar la ciudadanía. Esta también varía de acuerdo al tiempo de residencia; en algunos países puedes solicitarla después de 2 años, otros después de 5 y algunos después de 10 años de residencia continua. También podrías tener la ciudadanía por:\n• Matrimonio\n• Descendencia\n• Nacimiento\n\nLos ciudadanos suelen tener derechos como:\n• Votar.\n• Obtener pasaporte del país.\n• Acceder a todos los beneficios legales disponibles.",
        imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Visados, autorizaciones legales de trabajo, residencia y ciudadanía"
      }
    ]
  },
  {
    id: 6,
    title: "Documentos indispensables para migrar",
    category: "Documentación",
    readTime: "8 min",
    summary: "Los documentos son la base de cualquier proceso migratorio exitoso. Documentos vencidos o sin apostilla pueden costar meses de retraso y miles de dólares.",
    keyPoints: [
      "Pasaporte vigente con al menos 6 meses de vigencia adicional requeridos por la mayoría de países.",
      "Documentos de identidad nacional (DNI, cédula).",
      "Documentos de estado civil: Partidas de nacimiento, cartas de soltería, matrimonio o unión convivencial.",
      "Documentos académicos: Títulos, notas, pensum y programas de materias.",
      "Certificados médicos y de antecedentes penales apostillados y con traducción oficial.",
      "Apostilla de La Haya (Convenio 1961): Valida internacionalmente la autenticidad de documentos públicos."
    ],
    danielaTip: "¡CONSEJO DE VIDA! Haz un RESPALDO DIGITAL completo: escanea todo y guárdalo en tu correo electrónico, en la nube (Drive/Dropbox) y en un pendrive USB protegido. Perder la maleta no debe arruinar tu proceso.",
    warningAlert: "Viajar únicamente con documentos físicos es una imprudencia grave. Guarda copias digitales de absolutamente todo.",
    sections: [
      {
        heading: "Guía Completa de Documentación Migratoria",
        content: "La documentación es la base de cualquier proceso migratorio exitoso. Tener los documentos correctos, vigentes y debidamente legalizados puede ahorrarte meses de retrasos, gastos adicionales e incluso la imposibilidad de obtener una visa o residencia.\n\n**Documentos de identificación**\n\n• **Pasaporte vigente:** Es el documento más importante para viajar y realizar trámites migratorios.\nRecomendaciones:\n  - Verifica que tenga suficiente vigencia (muchos países exigen al menos 6 meses).\n  - Revisa que esté en buen estado.\n  - Conserva copias físicas y digitales.\n\n• **Documento nacional de identidad:** Aunque el pasaporte será tu principal documento internacional, tu documento de identidad nacional puede ser solicitado para diversos trámites.\n\n**Documentos de estado civil**\n\nDependiendo de tu situación personal, pueden ser necesarios:\n• Acta o partida de nacimiento.\n• Acta de matrimonio.\n• Certificado de unión convivencial o concubinato.\n• Sentencia de divorcio.\n• Acta de defunción del cónyuge (si aplica).\n\n*Consejo:* Solicita versiones recientes si el país de destino exige documentos actualizados.\n\n**Documentos académicos**\n\nSi planeas estudiar, trabajar o ejercer una profesión, reúne:\n\n*Educación secundaria:*\n• Título de bachiller.\n• Certificado de estudios.\n\n*Educación universitaria:*\n• Título universitario.\n• Notas certificadas.\n• Pensum académico.\n• Programas o contenidos de cada asignatura.\n• Certificados de especializaciones, maestrías o cursos.\n\nEstos documentos suelen ser necesarios para homologaciones, equivalencias o procesos de reconocimiento profesional.\n\n**Documentos laborales**\n\nLlevar evidencia de tu experiencia profesional puede facilitar la búsqueda de empleo. Incluye:\n• Currículum actualizado.\n• Cartas de trabajo.\n• Constancias laborales.\n• Referencias profesionales.\n• Certificados de cursos y capacitaciones.\n\n**Antecedentes penales**\n\nMuchos países exigen certificados de antecedentes penales para otorgar visas o residencias.\nVerifica:\n• El tiempo de vigencia exigido.\n• Si requiere apostilla o legalización.\n• Si necesita traducción oficial.\n\n**Certificados médicos**\n\nAlgunos países solicitan:\n• Certificado médico general.\n• Certificado de vacunación.\n• Exámenes específicos.\n• Seguro médico internacional.\n\n**Documentos para menores de edad**\n\nSi emigras con hijos, considera:\n• Partidas de nacimiento.\n• Pasaportes.\n• Permisos de viaje cuando corresponda.\n• Certificados de vacunación.\n• Historial académico.\n• Historial médico.\n\n**Apostilla y legalización**\n\nMuchos documentos deben ser apostillados o legalizados para que tengan validez internacional. La Apostilla de La Haya es una certificación internacional que valida la autenticidad de un documento público para que pueda ser reconocido legalmente en otro país que forme parte del Convenio de La Haya de 1961.\n\nAntes de viajar verifica:\n✅ Qué documentos requieren apostilla.\n✅ Cuáles necesitan traducción oficial.\n✅ Los tiempos de procesamiento.\n✅ Los costos asociados.\n\n**Respaldo digital**\n\nUno de los errores más frecuentes es viajar únicamente con documentos físicos no prevés que pierdas la maleta en el aeropuerto o que no llegue a tiempo. O que te roben en el viaje. Este consejo podría salvar tu vida.\n\nGuarda copias digitales de:\n• Pasaporte.\n• Visas.\n• Certificados académicos.\n• Actas de nacimiento y matrimonio.\n• Antecedentes penales.\n• Seguros.\n• Contratos laborales.\n\nPuedes almacenarlas en:\n• Correo electrónico.\n• Nube (Google Drive, OneDrive, Dropbox).\n• Memoria USB protegida.",
        imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Carpetas organizadas, apostillas e historiales legalizados"
      }
    ]
  },
  {
    id: 7,
    title: "Finanzas y presupuesto migratorio",
    category: "Finanzas",
    readTime: "7 min",
    summary: "Al llegar a un nuevo país no siempre consigues empleo de inmediato. Necesitas un fondo de emergencia que garantice tu supervivencia.",
    keyPoints: [
      "Regla de Oro: Contar con fondos suficientes para cubrir entre 3 y 6 meses de gastos básicos.",
      "No planifiques basándote únicamente en el 'mejor escenario posible'.",
      "Gastos iniciales a considerar: Trámites/Apostillas, Boletos de avión, Alojamiento temporal, Depósito de garantía de alquiler, Alimentación, Transporte y Seguro Médico.",
      "Reserva un fondo de emergencia exclusivo para problemas de salud, demoras en trámites o imprevistos."
    ],
    danielaTip: "Prevé los gastos de alquiler: En la mayoría de países al alquilar te pedirán el mes adelantado + mes de depósito de garantía + honorarios inmobiliarios.",
    sections: [
      {
        heading: "Categorías del Presupuesto Real",
        content: "Desglose financiero necesario para no quedarte sin dinero:\n\nLa planificación financiera es uno de los pilares más importantes de cualquier proyecto migratorio. Muchas personas preparan sus documentos y eligen un país de destino, pero no calculan adecuadamente los gastos que enfrentarán durante los primeros meses.\n\nContar con un presupuesto realista te permitirá reducir el estrés, evitar deudas innecesarias y adaptarte con mayor tranquilidad a tu nueva vida.\n\nEmpieza con el pie derecho, solo lo vas a lograr con una planificación financiera que te permita estar los primeros meses tranquilos y es que vienen muchos cambios al llegar a un nuevo país.\n\n**¿Por qué es importante tener un presupuesto migratorio?**\n\nAl llegar a un nuevo país es posible que no encuentres empleo de inmediato. Además, surgirán gastos inesperados relacionados con alojamiento, transporte, trámites y adaptación.\n\nPor ello, es recomendable contar con un fondo de emergencia que te permita mantenerte durante los primeros meses sin depender exclusivamente de conseguir trabajo.\n\n**Gastos que debes calcular antes de emigrar**\n\n**Gastos de documentación**\nIncluye todos los trámites necesarios para tu proceso migratorio:\n• Pasaporte.\n• Visas.\n• Apostillas.\n• Legalizaciones.\n• Traducciones oficiales.\n• Certificados médicos.\n• Antecedentes penales.\n\n*Consejo:* Lleva un registro detallado de cada gasto para evitar sorpresas.\n\n**Gastos de viaje**\nConsidera:\n• Boletos de avión o transporte internacional.\n• Equipaje adicional.\n• Traslados internos.\n• Alimentación durante el viaje.\n• Hospedajes temporales en escalas.\n\n**Alojamiento inicial**\nDurante las primeras semanas es posible que necesites:\n• Hotel.\n• Hostal.\n• Airbnb.\n• Habitación temporal.\n\nInvestiga los precios con anticipación para incluirlos en tu presupuesto.\n\n**Depósito y alquiler**\nEn muchos países, al alquilar una vivienda se solicita:\n• Mes de alquiler adelantado.\n• Depósito de garantía.\n• Honorarios inmobiliarios (si aplica).\n\nEsto puede representar varios meses de alquiler pagados por adelantado.\n\n**Alimentación**\nCalcula el costo promedio de:\n• Compras de supermercado.\n• Comidas fuera de casa.\n• Productos básicos de higiene.\n\n**Transporte**\nInvestiga:\n• Costo de transporte público.\n• Tarjetas de movilidad.\n• Combustible (si conducirás).\n• Seguro vehicular (si corresponde).\n\n**Seguro médico**\nAlgunos países exigen un seguro médico para ingresar o para solicitar determinados permisos migratorios.\nIncluso cuando no sea obligatorio, es altamente recomendable contar con cobertura durante los primeros meses.\n\n**¿Cuánto dinero debería ahorrar antes de emigrar?**\nNo existe una cifra universal, ya que depende del país y de tu situación personal.\nSin embargo, una recomendación general es contar con fondos suficientes para cubrir entre 3 y 6 meses de gastos básicos.\nEsto te permitirá:\n• Buscar empleo con mayor tranquilidad.\n• Resolver imprevistos.\n• Adaptarte progresivamente al nuevo entorno.\n\n**Crea un fondo de emergencia**\nAdemás de tu presupuesto principal, reserva una cantidad destinada exclusivamente a emergencias.\nEste fondo puede ayudarte en situaciones como:\n• Problemas de salud.\n• Retrasos en trámites.\n• Pérdida de empleo.\n• Cambios de alojamiento.\n• Regreso temporal a tu país de origen.\n\n**Evita estos errores financieros**\n❌ Emigrar sin ahorros.\n❌ Gastar todo el dinero en el pasaje.\n❌ No investigar el costo de vida real.\n❌ Depender completamente de conseguir empleo rápidamente.\n❌ No considerar gastos imprevistos.\n❌ Llegar con deudas elevadas.\n\nEn el menú principal te regalo una calculadora de presupuesto con esta vas a poder tener la tranquilidad de saber cuál va ser el gasto real que vas a tener al migrar. Además si adicionalmente lo verificas con el comparador de países que te dejo va ser más fácil saber los gastos reales.",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Planificación del fondo de ahorro inicial para 3 a 6 meses"
      }
    ]
  },
  {
    id: 8,
    title: "¿Cómo conseguir empleo desde el extranjero?",
    category: "Profesión y Empleo",
    readTime: "6 min",
    summary: "Conseguir trabajo antes de viajar reduce dramáticamente la incertidumbre económica y te abre puertas directas a visados laborales.",
    keyPoints: [
      "Adapta tu Currículum (CV) al formato, extensión e idioma del país de destino.",
      "Crea un perfil optimizado en LinkedIn orientándolo a reclutadores internacionales.",
      "Aprovecha portales globales: LinkedIn, Indeed, Glassdoor, InfoJobs, EURES (Europa), Job Bank (Canadá).",
      "Aprende sobre networking: Únete a comunidades profesionales y de migrantes en la ciudad destino.",
      "Prepárate para entrevistas virtuales: Investiga la empresa, cuida tu conexión y viste profesionalmente."
    ],
    danielaTip: "Prepara una carta de presentación personalizada especificando quién eres, tu experiencia y tu disponibilidad real para trasladarte de país.",
    warningAlert: "ALERTA DE ESTAFA: Desconfía si te piden dinero para contratarte, si te ofrecen salarios excesivos sin experiencia previa o si prometen visas '100% garantizadas'.",
    sections: [
      {
        heading: "Estrategias para conseguir empleo desde el extranjero",
        content: "Conseguir empleo antes de emigrar puede facilitar enormemente tu proceso de adaptación. Además de brindarte estabilidad económica desde el inicio, muchos países ofrecen visas o permisos de residencia para personas que ya cuentan con una oferta laboral.\n\nAunque encontrar trabajo desde otro país puede parecer difícil, hoy existen numerosas herramientas y plataformas que permiten postularse a vacantes internacionales de forma remota.\n\n**¿Por qué buscar empleo antes de emigrar?**\n\nTener una oferta laboral antes de viajar puede ayudarte a:\n✅ Reducir la incertidumbre económica.\n✅ Acceder a visas de trabajo.\n✅ Demostrar solvencia ante autoridades migratorias.\n✅ Adaptarte más rápidamente al nuevo país.\n✅ Generar ingresos desde el primer momento.\n\n**Investiga el mercado laboral**\n\nAntes de enviar currículums, analiza:\n• Profesiones más demandadas.\n• Salarios promedio.\n• Requisitos de experiencia.\n• Certificaciones necesarias.\n• Nivel de idioma exigido.\n\nRecuerda que una profesión muy demandada en tu país puede no tener la misma demanda en otro.\n\n**Adapta tu currículum al país de destino**\n\nUno de los errores más frecuentes es utilizar el mismo currículum para todos los países.\n\nInvestiga:\n• Formato preferido.\n• Extensión recomendada.\n• Información obligatoria.\n• Idioma requerido.\n\n*Consejos generales:*\n✔ Mantén un diseño limpio y profesional.\n✔ Destaca logros y resultados.\n✔ Incluye experiencia relevante.\n✔ Adapta el contenido a cada vacante.\n✔ Revisa cuidadosamente la ortografía.\n\n**Crea un perfil profesional en LinkedIn**\n\nActualmente muchas empresas reclutan talento internacional a través de LinkedIn.\n\nProcura:\n• Tener una fotografía profesional.\n• Completar toda tu experiencia laboral.\n• Incluir certificaciones.\n• Agregar habilidades relevantes.\n• Solicitar recomendaciones.\n\nUn perfil completo aumenta significativamente las posibilidades de ser contactado por reclutadores.\n\n**Utiliza portales internacionales de empleo**\n\nAlgunas plataformas populares son:\n• LinkedIn.\n• Indeed.\n• Glassdoor.\n• InfoJobs.\n• EURES (Europa).\n• Job Bank (Canadá).\n\nRevisa las ofertas constantemente y activa alertas de empleo.\n\n**Construye una red de contactos**\n\nMuchas oportunidades laborales surgen a través de recomendaciones.\n\nPuedes:\n• Participar en grupos profesionales.\n• Asistir a eventos virtuales.\n• Unirte a comunidades de migrantes.\n• Contactar profesionales de tu sector.\n\nEl networking puede abrir puertas que no aparecen en los portales de empleo.\n\n**Prepara una carta de presentación**\n\nAlgunas empresas valoran que expliques:\n• Quién eres.\n• Por qué te interesa la vacante.\n• Qué experiencia puedes aportar.\n• Tu disponibilidad para emigrar.\n\nUna carta personalizada puede ayudarte a destacar entre otros candidatos.\n\n**Prepárate para entrevistas virtuales**\n\nLas entrevistas online son cada vez más comunes.\n\nAntes de una entrevista:\n• Investiga la empresa.\n• Practica preguntas frecuentes.\n• Verifica tu conexión a internet.\n• Elige un lugar tranquilo.\n• Viste de manera profesional.\n• Llega puntual.\n\n**Mejora tus idiomas**\n\nEl idioma puede marcar la diferencia entre conseguir o no una oportunidad laboral.\n\nIncluso si el puesto no exige un nivel avanzado, demostrar interés por aprender el idioma local suele ser muy valorado por los empleadores.\n\n**Profesiones con alta demanda internacional**\n\nLas necesidades laborales cambian constantemente, pero suelen existir oportunidades en áreas como:\n• Tecnología y programación.\n• Enfermería y salud.\n• Ingeniería.\n• Construcción.\n• Electricidad.\n• Soldadura.\n• Logística.\n• Transporte.\n• Atención al cliente multilingüe.\n• Educación especializada.\n\nInvestiga siempre las listas oficiales de ocupaciones demandadas del país que te interesa.\n\n**Señales de alerta: evita estafas laborales**\n\nDesconfía cuando:\n• Te ofrecen salarios excesivamente altos sin experiencia.\n• Te solicitan dinero para contratarte.\n• Prometen visas garantizadas.\n• No existe información verificable sobre la empresa.\n• Presionan para tomar una decisión inmediata.\n\nSiempre verifica la legitimidad de la oferta y la empresa antes de compartir documentos personales.\n\n**Plan de acción para buscar empleo desde el extranjero**\n\n*Primer mes:*\n□ Actualizar currículum.\n□ Crear o mejorar perfil de LinkedIn.\n□ Investigar requisitos laborales del país.\n\n*Segundo mes:*\n□ Postular a vacantes.\n□ Participar en grupos profesionales.\n□ Mejorar nivel de idioma.\n\n*Tercer mes:*\n□ Preparar entrevistas.\n□ Obtener certificaciones relevantes.\n□ Ampliar red de contactos.\n\n**Consejo profesional:**\n\nNo esperes a llegar al país para comenzar tu búsqueda laboral. Mientras más temprano empieces a investigar, preparar tu perfil profesional y establecer contactos, mayores serán tus posibilidades de encontrar oportunidades que se ajusten a tus objetivos migratorios.",
        imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Entrevistas virtuales y adecuación de perfil laboral"
      }
    ]
  },
  {
    id: 9,
    title: "Adaptación emocional y cultural (El duelo migratorio)",
    category: "Salud Emocional",
    readTime: "7 min",
    summary: "Emigrar no es solo cambiar de domicilio. Involucra adaptarse a nuevas costumbres y atravesar el proceso del duelo migratorio.",
    keyPoints: [
      "El Duelo Migratorio es natural: Extrañarás familia, amigos, comida típica, celebraciones e idioma.",
      "Las 4 Etapas de la Adaptación: 1. Entusiasmo (luna de miel), 2. Choque cultural, 3. Adaptación, 4. Integración.",
      "Las 5 Fases del Duelo (Kübler-Ross): Negación, Ira, Negociación, Depresión y Aceptación.",
      "Aprender el idioma local no solo mejora el trabajo, sino que eleva enormemente tu calidad de vida.",
      "Cuida tu salud mental: Pedir ayuda profesional ante la ansiedad o la soledad es una muestra de fortaleza, no de debilidad."
    ],
    danielaTip: "Mi propia experiencia: Tardé 3 años en adaptarme al emigrar a Argentina porque no me preparé en la parte emocional. Entender en qué fase del duelo estaba me devolvió la tranquilidad. Adaptarte no significa olvidar tus raíces.",
    sections: [
      {
        heading: "Proceso del Duelo Migratorio y Salud Emocional",
        content: "Emigrar no implica únicamente cambiar de país; también significa adaptarse a una nueva cultura, nuevas costumbres, nuevas formas de comunicación y, en muchos casos, empezar desde cero. Aunque la mayoría de las personas se preparan para los aspectos legales y económicos de la migración, pocas se preparan para el impacto emocional que este proceso puede generar.\n\nComprender estos cambios te ayudará a enfrentar los desafíos con mayor fortaleza y a construir una vida más estable en tu nuevo hogar.\n\n**El duelo migratorio**\n\nEl duelo migratorio es el proceso emocional que experimentan muchas personas al dejar atrás su país, familia, amigos, costumbres y estilo de vida.\nNo significa que hayas tomado una mala decisión; es una reacción natural ante un cambio importante.\n\nEs común extrañar:\n• Familia y amigos.\n• Comida típica.\n• Tradiciones y celebraciones.\n• Lugares conocidos.\n• Idioma y expresiones cotidianas.\n\nCada persona vive este proceso de manera diferente y a su propio ritmo.\n\n**Etapas comunes de la adaptación migratoria**\n\n**1. La etapa de entusiasmo**\nDurante las primeras semanas o meses todo parece emocionante y novedoso.\nEs posible que sientas:\n• Motivación.\n• Curiosidad.\n• Optimismo.\n• Deseos de explorar.\n\n**2. El choque cultural**\nCon el paso del tiempo pueden aparecer dificultades relacionadas con:\n• Idioma.\n• Costumbres diferentes.\n• Normas sociales desconocidas.\n• Dificultades laborales.\n• Trámites burocráticos.\n\nEn esta etapa es normal sentir frustración o inseguridad.\n\n**3. La adaptación**\nPoco a poco comenzarás a comprender mejor el funcionamiento del país y desarrollarás nuevas rutinas.\nEmpezarás a:\n• Crear amistades.\n• Conocer la ciudad.\n• Entender mejor la cultura.\n• Sentirte más independiente.\n\n**4. La integración**\nCon el tiempo lograrás combinar aspectos de tu cultura de origen con la nueva cultura.\nEs el momento en que muchas personas comienzan a sentirse realmente parte de su nuevo entorno.\n\n**Cómo manejar la nostalgia**\n\nExtrañar tu país es completamente normal.\nAlgunas estrategias que pueden ayudarte son:\n✔ Mantener contacto frecuente con tus seres queridos.\n✔ Celebrar tradiciones importantes.\n✔ Cocinar platos típicos de tu país.\n✔ Compartir con otros migrantes.\n✔ Hablar abiertamente sobre tus emociones.\n\nRecuerda que adaptarte no significa olvidar tus raíces.\n\n**Aprende sobre la cultura local**\n\nConocer la cultura del país de destino facilitará tu integración.\nInvestiga:\n• Costumbres.\n• Horarios.\n• Normas de convivencia.\n• Tradiciones.\n• Festividades.\n• Formas de comunicación.\n\nCuanto más conozcas la cultura local, más fácil será evitar malentendidos y generar vínculos positivos.\n\n**La importancia del idioma**\n\nIncluso en países donde se habla tu mismo idioma, pueden existir diferencias en expresiones, modismos y formas de relacionarse.\nSi emigras a un país con otro idioma:\n• Practica diariamente.\n• Toma cursos.\n• Escucha medios locales.\n• Habla con personas nativas.\n\nAprender el idioma no solo mejora las oportunidades laborales, sino también la calidad de vida.\n\n**Construye una red de apoyo**\n\nUna red de apoyo puede marcar una gran diferencia durante el proceso de adaptación.\nBusca:\n• Familiares.\n• Amigos.\n• Comunidades de migrantes.\n• Grupos profesionales.\n• Organizaciones locales.\n\nTener personas con quienes compartir experiencias ayuda a reducir el sentimiento de aislamiento.\n\n**Cuida tu salud mental**\n\nLa migración puede generar:\n• Estrés.\n• Ansiedad.\n• Tristeza.\n• Miedo.\n• Sensación de soledad.\n\nBusca ayuda profesional si sientes que estas emociones afectan significativamente tu bienestar o tu capacidad para desenvolverte en la vida diaria.\nPedir ayuda es una muestra de fortaleza, no de debilidad.\n\n**Errores comunes durante la adaptación**\n\n❌ Comparar constantemente el nuevo país con el país de origen.\n❌ Aislarse socialmente.\n❌ Rechazar las costumbres locales.\n❌ Esperar que la adaptación sea inmediata.\n❌ Descuidar la salud física y emocional.\n\n**Consejos para una adaptación exitosa**\n\n✅ Mantén una actitud abierta.\n✅ Sé paciente contigo mismo.\n✅ Celebra los pequeños logros.\n✅ Participa en actividades sociales.\n✅ Aprende continuamente sobre tu nuevo entorno.\n✅ Mantén expectativas realistas.\n\n**Ejemplo real**\n\nMuchas personas llegan pensando que el desafío más difícil será encontrar empleo o realizar trámites migratorios. Sin embargo, meses después descubren que lo más complejo ha sido manejar la distancia con sus seres queridos, adaptarse a nuevas costumbres y construir una nueva rutina.\n\nPrepararte emocionalmente es tan importante como preparar tus documentos.",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Superación del duelo migratorio y adaptación cultural sana"
      }
    ]
  },
  {
    id: 10,
    title: "Top 10 Errores que pueden arruinar tu proceso migratorio",
    category: "Prevención",
    readTime: "6 min",
    summary: "Un solo error grave puede significar la expulsión, deudas gigantescas o la imposibilidad de legalizar tu situación.",
    keyPoints: [
      "1. No investigar los requisitos migratorios oficiales antes de comprar pasajes.",
      "2. Emigrar sin fondos de ahorro suficientes (mínimo 3 a 6 meses).",
      "3. No apostillar o legalizar títulos y documentos personales a tiempo.",
      "4. Confiar en rumores de redes sociales en lugar de consultar organismos o abogados oficiales.",
      "5. Caer en estafas o pagar por ofertas laborales falsas.",
      "6. No aprender el idioma del país receptor.",
      "7. No investigar la homologación de títulos profesionales.",
      "8. Viajar sin un seguro médico de cobertura internacional.",
      "9. No preparar un plan alternativo (Plan B) en caso de contingencias.",
      "10. Descuidar la salud mental y el bienestar emocional."
    ],
    danielaTip: "El desconocimiento de las leyes migratorias de un país jamás te exime de su cumplimiento. Infórmate antes de actuar.",
    sections: [
      {
        heading: "Cómo protegerte de decisiones erróneas",
        content: "Migrar es un proyecto que requiere planificación, información y paciencia. Un solo error puede generar retrasos, pérdidas económicas, rechazo de solicitudes o incluso problemas legales. Conocer los errores más frecuentes te ayudará a evitarlos y aumentar las probabilidades de éxito. La mayoría de los errores ocurren cuando las personas se precipitan y quieren todo de inmediato, creeme que necesitas planificar y hacer las cosas paso a paso y con calma para tener el exito.\n\n**1. No investigar los requisitos migratorios**\n\nMuchas personas compran boletos o toman decisiones importantes sin conocer las condiciones de ingreso y permanencia del país de destino.\n\n*Cómo evitarlo:*\n✅ Consulta siempre fuentes oficiales.\n✅ Verifica los requisitos más recientes.\n✅ Confirma si necesitas visa, residencia o permisos especiales.\n\n**2. Emigrar sin suficientes ahorros**\n\nConfiar en encontrar empleo inmediatamente puede ser un error costoso.\n\n*Cómo evitarlo:*\n✅ Lleva fondos suficientes para cubrir entre 3 y 6 meses de gastos.\n✅ Incluye un fondo para emergencias.\n✅ Calcula el costo real de vida del país de destino.\n\n**3. No apostillar o legalizar documentos**\n\nMuchos migrantes descubren demasiado tarde que necesitan documentos apostillados o legalizados para trabajar, estudiar o solicitar residencia.\n\n*Cómo evitarlo:*\n✅ Reúne tu documentación con anticipación.\n✅ Verifica cuáles documentos requieren apostilla o legalización.\n✅ Conserva copias digitales.\n\n**4. Confiar en información de redes sociales sin verificar**\n\nLas leyes migratorias cambian constantemente. Lo que funcionó para otra persona puede no aplicar a tu caso.\n\n*Cómo evitarlo:*\n✅ Contrasta la información con páginas oficiales.\n✅ Consulta profesionales cuando sea necesario.\n\n**5. Caer en estafas migratorias**\n\nLos estafadores suelen aprovecharse de la urgencia y el desconocimiento de los migrantes.\n\n*Señales de alerta:*\n❌ Promesas de residencia garantizada.\n❌ Ofertas laborales poco creíbles.\n❌ Solicitudes de dinero sin respaldo legal.\n❌ Documentos falsificados.\n\n**6. No aprender el idioma**\n\nEl idioma puede influir directamente en:\n• Empleo.\n• Integración.\n• Estudios.\n• Trámites.\n\n*Cómo evitarlo:*\n✅ Comienza a estudiar antes de emigrar.\n✅ Practica diariamente.\n✅ Aprovecha recursos gratuitos.\n\n**7. No investigar la homologación de títulos**\n\nAlgunas profesiones requieren autorizaciones especiales para ejercer.\n\n*Cómo evitarlo:*\n✅ Investiga el proceso antes de viajar.\n✅ Reúne los documentos necesarios.\n✅ Calcula tiempos y costos.\n\n**8. Viajar sin seguro médico**\n\nUna emergencia médica puede representar gastos muy elevados.\n\n*Cómo evitarlo:*\n✅ Contrata un seguro adecuado.\n✅ Verifica las coberturas disponibles.\n\n**9. No preparar un plan alternativo**\n\nLas cosas no siempre salen según lo previsto.\n\n*Cómo evitarlo:*\n✅ Ten un plan B.\n✅ Mantén recursos de emergencia.\n✅ Conserva opciones de alojamiento y empleo adicionales.\n\n**10. Descuidar la salud emocional**\n\nLa adaptación puede ser tan desafiante como los trámites migratorios.\n\n*Cómo evitarlo:*\n✅ Construye una red de apoyo.\n✅ Mantén contacto con tus seres queridos.\n✅ Busca ayuda profesional si la necesitas.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Prevención de estafas e información contrastada por expertos"
      }
    ]
  },
  {
    id: 11,
    title: "Checklist final antes de abordar el avión",
    category: "Checklist",
    readTime: "4 min",
    summary: "Una lista de comprobación rigurosa para asegurarte de no olvidar ningún detalle fundamental en tu equipaje de viaje.",
    keyPoints: [
      "Verificación de Documentos físicos: Pasaporte, Visa, DNI, Títulos, Antecedentes Penales.",
      "Verificación Digital: Escaneos en nube, correo electrónico y pendrive USB.",
      "Verificación Financiera: Presupuesto listo, tarjetas bancarias habilitadas internacionalmente y efectivo.",
      "Verificación de Viaje: Seguro médico con póliza impresa, reserva de alojamiento inicial y transporte organizado."
    ],
    danielaTip: "En el banner tendrás el checklist que te va a ir diciendo qué porcentaje tienes y cuál te falta.",
    checklistItems: [
      "Pasaporte vigente (> 6 meses)",
      "Visa o permiso de entrada impreso",
      "Documentos apostillados (Académicos y Estado Civil)",
      "Copia digital respaldada en la nube y USB",
      "Fondos financieros para 3-6 meses + Emergencia",
      "Tarjetas de débito/crédito autorizadas para uso exterior",
      "Póliza de Seguro Médico Internacional",
      "Reserva de Alojamiento por las primeras semanas"
    ],
    sections: [
      {
        heading: "Checklist de Preparación Migratoria",
        content: "Utiliza esta lista para asegurarte de que estás preparado antes de iniciar tu viaje.\n\n**Documentación**\n□ Pasaporte vigente.\n□ Visa o permiso correspondiente.\n□ Documento de identidad.\n□ Acta de nacimiento.\n□ Acta de matrimonio o divorcio (si aplica).\n□ Antecedentes penales.\n□ Certificados médicos.\n□ Documentos apostillados o legalizados.\n□ Títulos académicos.\n□ Notas certificadas.\n□ Pensum académico.\n□ Programas de materias.\n□ Currículum actualizado.\n\n**Respaldo digital**\n□ Escaneo de todos los documentos importantes.\n□ Copias guardadas en la nube.\n□ Copias almacenadas en una memoria USB.\n□ Fotografías digitales de documentos esenciales.\n\n**Finanzas**\n□ Presupuesto migratorio elaborado.\n□ Ahorros suficientes para varios meses.\n□ Fondo de emergencia.\n□ Tarjetas bancarias habilitadas para uso internacional.\n□ Dinero disponible para gastos inmediatos\n\n**Viaje**\n□ Pasaje confirmado.\n□ Equipaje preparado.\n□ Seguro médico contratado.\n□ Reserva de alojamiento inicial.\n□ Transporte desde el aeropuerto organizado.\n\n**Adaptación**\n□ Investigación sobre cultura local.\n□ Conocimientos básicos del idioma.\n□ Contactos de familiares o amigos.\n□ Información sobre empleo y vivienda.\n□ Objetivos migratorios definidos.",
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Verificación de equipaje y vuelo de partida"
      }
    ]
  }
];



export const INITIAL_BUDGET_ITEMS: BudgetItem[] = [
  { id: '1', category: 'Trámites y Documentos', name: 'Renovación de Pasaporte', estimatedCost: 250, notes: 'Gestión consular e impuestos' },
  { id: '2', category: 'Trámites y Documentos', name: 'Apostillas y Legalizaciones (Apostilla de La Haya)', estimatedCost: 180, notes: 'Títulos, notas, antecedentes, partidas' },
  { id: '3', category: 'Trámites y Documentos', name: 'Traducciones Oficiales Juradas', estimatedCost: 200, notes: 'Si el país tiene otro idioma' },
  { id: '4', category: 'Trámites y Documentos', name: 'Tasas de Visado Consular', estimatedCost: 150, notes: 'Solicitud ante embajada' },
  { id: '5', category: 'Viaje y Traslado', name: 'Boleto de Avión Internacional', estimatedCost: 850, notes: 'Con equipaje facturado' },
  { id: '6', category: 'Viaje y Traslado', name: 'Traslados Aeropuerto - Alojamiento', estimatedCost: 60, notes: 'Taxi, tren o transporte público' },
  { id: '7', category: 'Alojamiento Inicial', name: 'Airbnb / Hotel (Semanas 1 a 3)', estimatedCost: 900, notes: 'Mientras buscas alquiler definitivo' },
  { id: '8', category: 'Depósito y Alquiler', name: 'Mes de Alquiler Adelantado', estimatedCost: 850, notes: 'Vivienda fija' },
  { id: '9', category: 'Depósito y Alquiler', name: 'Depósito de Garantía (1 o 2 meses)', estimatedCost: 850, notes: 'Reembolsable al finalizar contrato' },
  { id: '10', category: 'Alimentación e Higiene', name: 'Supermercado (Mes 1)', estimatedCost: 350, notes: 'Gastos de comida en casa' },
  { id: '11', category: 'Transporte', name: 'Bono mensual de transporte público', estimatedCost: 70, notes: 'Tarjeta de metro/autobús' },
  { id: '12', category: 'Seguro Médico', name: 'Seguro de Salud Internacional (1er año)', estimatedCost: 450, notes: 'Exigido para visas de ingreso' },
  { id: '13', category: 'Fondo de Emergencia', name: 'Reserva para 3 Meses de Gastos Mínimos', estimatedCost: 2500, notes: 'RECOMENDACIÓN CLAVE DE DANIELA' }
];

export const CHECKLIST_CATEGORIES: ChecklistCategory[] = [
  {
    id: 'identidad',
    name: '1. Identidad y Documentos Personales',
    iconName: 'UserCheck',
    description: 'Documentos primarios requeridos en fronteras y aeropuertos.',
    items: [
      { id: 'chk_1', text: 'Pasaporte vigente (mínimo 6 meses de vigencia extra)', required: true, isDigitalBackupRecommend: true, tooltip: 'Verifica la fecha de caducidad antes de comprar pasajes' },
      { id: 'chk_2', text: 'Documento Nacional de Identidad / Cédula vigente', required: true, isDigitalBackupRecommend: true },
      { id: 'chk_3', text: 'Partida / Acta de Nacimiento legalizada o apostillada', required: true, isDigitalBackupRecommend: true },
      { id: 'chk_4', text: 'Fotos tamaño carnet/pasaporte con fondo blanco', required: false, isDigitalBackupRecommend: false }
    ]
  },
  {
    id: 'estado_civil',
    name: '2. Estado Civil y Familia',
    iconName: 'HeartHandshake',
    description: 'Requeridos para visas familiares, reagrupaciones o trámites de residencia.',
    items: [
      { id: 'chk_5', text: 'Acta de Matrimonio o Certificado de Unión Convivencial apostillado', required: false, isDigitalBackupRecommend: true, tooltip: 'Parejas de hecho suelen requerir 1 año de convivencia previa probada' },
      { id: 'chk_6', text: 'Carta / Certificado de Soltería (si el país destino lo exige)', required: false, isDigitalBackupRecommend: true },
      { id: 'chk_7', text: 'Sentencia de Divorcio o Defunción (si aplica)', required: false, isDigitalBackupRecommend: true },
      { id: 'chk_8', text: 'Permiso notarial internacional de salida para menores de edad', required: false, isDigitalBackupRecommend: true }
    ]
  },
  {
    id: 'academicos',
    name: '3. Formación Académica y Títulos',
    iconName: 'GraduationCap',
    description: 'Esenciales para ejercer tu profesión y realizar homologaciones de títulos.',
    items: [
      { id: 'chk_9', text: 'Título Universitario / Técnico registrado y apostillado', required: true, isDigitalBackupRecommend: true },
      { id: 'chk_10', text: 'Notas Certificadas oficiales de la institución', required: true, isDigitalBackupRecommend: true },
      { id: 'chk_11', text: 'Pensum Académico y Contenido Programático asignatura por asignatura', required: true, isDigitalBackupRecommend: true, tooltip: 'Obligatorio en la mayoría de homologaciones consulares' },
      { id: 'chk_12', text: 'Certificados de cursos, maestrías o diplomados', required: false, isDigitalBackupRecommend: true }
    ]
  },
  {
    id: 'salud_penales',
    name: '4. Salud, Antecedentes y Legalizaciones',
    iconName: 'ShieldAlert',
    description: 'Exigencias de ley para la aprobación del visado de entrada.',
    items: [
      { id: 'chk_13', text: 'Certificado de Antecedentes Penales (vigencia reciente < 90 días) apostillado', required: true, isDigitalBackupRecommend: true },
      { id: 'chk_14', text: 'Apostilla de La Haya en todos los documentos públicos', required: true, isDigitalBackupRecommend: true, tooltip: 'Garantiza la autenticidad en más de 120 países firmantes' },
      { id: 'chk_15', text: 'Traducción oficial jurada por intérprete público (si aplica idioma distinto)', required: false, isDigitalBackupRecommend: true },
      { id: 'chk_16', text: 'Certificado Médico de salud general y carnet de vacunación', required: true, isDigitalBackupRecommend: true }
    ]
  },
  {
    id: 'respaldo_digital',
    name: '5. Respaldo Digital OBLIGATORIO (Tip de Daniela)',
    iconName: 'Cloud',
    description: 'Salvavidas en caso de robo, pérdida de equipaje o extorsiones.',
    items: [
      { id: 'chk_17', text: 'Archivos PDF guardados en carpeta segura en la nube (Google Drive / Dropbox)', required: true, isDigitalBackupRecommend: true },
      { id: 'chk_18', text: 'Copia enviada a tu propio correo electrónico personal', required: true, isDigitalBackupRecommend: true },
      { id: 'chk_19', text: 'Copia en Memoria USB (Pendrive) dentro de tu equipaje de mano', required: true, isDigitalBackupRecommend: true },
      { id: 'chk_20', text: 'Fotografías de alta resolución de pasaporte y visas en el celular', required: true, isDigitalBackupRecommend: true }
    ]
  },
  {
    id: 'viaje_finanzas',
    name: '6. Finanzas, Viaje y Alojamiento',
    iconName: 'PlaneTakeoff',
    description: 'Comprobaciones finales antes de subir al avión.',
    items: [
      { id: 'chk_21', text: 'Póliza impresa de Seguro Médico Internacional de Viajero', required: true, isDigitalBackupRecommend: true },
      { id: 'chk_22', text: 'Reserva confirmada de Alojamiento inicial (Airbnb/Hotel)', required: true, isDigitalBackupRecommend: true },
      { id: 'chk_23', text: 'Aviso previo a tus bancos para autorizar uso de tarjetas en el extranjero', required: true, isDigitalBackupRecommend: false },
      { id: 'chk_24', text: 'Efectivo en la moneda del país destino para gastos iniciales de transporte', required: true, isDigitalBackupRecommend: false }
    ]
  }
];

export const READINESS_QUIZ_BLOCKS: QuizBlock[] = [
  {
    id: 1,
    title: "Objetivos y Planificación",
    questionRange: "Preguntas 1 a la 4",
    questions: [
      { id: 1, question: "¿Tienes claro por qué quieres emigrar y cuáles son tus objetivos a corto, mediano y largo plazo?" },
      { id: 2, question: "¿Elegiste tu país de destino después de comparar oportunidades laborales, costo de vida, seguridad y calidad de vida?" },
      { id: 3, question: "¿Conoces al menos tres opciones de visas o residencias que podrían aplicar a tu perfil?" },
      { id: 4, question: "Si hoy cambiaran las políticas migratorias del país que elegiste, ¿tendrías un plan alternativo?" }
    ]
  },
  {
    id: 2,
    title: "Documentación",
    questionRange: "Preguntas 5 a la 8",
    questions: [
      { id: 5, question: "¿Sabes exactamente qué documentos necesitarás para emigrar?" },
      { id: 6, question: "¿Verificaste si alguno de tus documentos debe apostillarse o legalizarse?" },
      { id: 7, question: "¿Tus documentos importantes están digitalizados y almacenados en un lugar seguro?" },
      { id: 8, question: "Si mañana tuvieras una oportunidad laboral en otro país, ¿podrías reunir toda la documentación requerida en menos de un mes?" }
    ]
  },
  {
    id: 3,
    title: "Profesión y Empleo",
    questionRange: "Preguntas 9 a la 12",
    questions: [
      { id: 9, question: "¿Investigaste si tu profesión tiene demanda en el país al que deseas emigrar?" },
      { id: 10, question: "¿Sabes si necesitarás homologar o reconocer tu título profesional?" },
      { id: 11, question: "¿Has adaptado tu currículum al formato utilizado en el país de destino?" },
      { id: 12, question: "¿Tienes un perfil profesional actualizado en plataformas de empleo como LinkedIn?" }
    ]
  },
  {
    id: 4,
    title: "Finanzas",
    questionRange: "Preguntas 13 a la 16",
    questions: [
      { id: 13, question: "¿Has calculado cuánto dinero necesitas para cubrir entre tres y seis meses de gastos en el país de destino?" },
      { id: 14, question: "¿Tienes un fondo de emergencia para imprevistos?" },
      { id: 15, question: "¿Conoces el costo real del alquiler, transporte, alimentación y servicios básicos en la ciudad donde planeas vivir?" },
      { id: 16, question: "Si tardaras tres meses en conseguir empleo, ¿podrías mantenerte económicamente?" }
    ]
  },
  {
    id: 5,
    title: "Adaptación",
    questionRange: "Preguntas 17 a la 19",
    questions: [
      { id: 17, question: "¿Hablas el idioma del país de destino o tienes un plan para aprenderlo?" },
      { id: 18, question: "¿Has investigado las costumbres, normas sociales y cultura del lugar donde vivirás?" },
      { id: 19, question: "¿Cuentas con una red de apoyo (familiares, amigos o contactos) en el país de destino o sabes cómo crear una?" }
    ]
  },
  {
    id: 6,
    title: "Preparación Legal",
    questionRange: "Preguntas 20 a la 22",
    questions: [
      { id: 20, question: "¿Obtienes información migratoria principalmente de fuentes oficiales y profesionales especializados?" },
      { id: 21, question: "¿Sabes identificar una posible estafa migratoria?" },
      { id: 22, question: "¿Conoces cuáles son tus derechos y obligaciones como migrante en el país al que deseas ir?" }
    ]
  },
  {
    id: 7,
    title: "Preparación personal",
    questionRange: "Preguntas 23 a la 25",
    questions: [
      { id: 23, question: "¿Has hablado con tu familia sobre los cambios emocionales y económicos que implicará emigrar?" },
      { id: 24, question: "¿Estás dispuesto(a) a empezar desde cero si fuera necesario, incluso aceptando un empleo diferente a tu profesión mientras te estableces?" },
      { id: 25, question: "Si tuvieras que emigrar en los próximos 60 días, ¿te sentirías realmente preparado(a) para hacerlo con confianza?" }
    ]
  }
];

export const QUIZ_RESULT_TIERS = [
  {
    minScore: 41,
    maxScore: 50,
    title: "¡Estás muy bien preparado!",
    badgeColor: "bg-emerald-500 text-slate-950",
    badgeBorder: "bg-emerald-100 border-emerald-300 text-emerald-800 dark:bg-emerald-950/60 dark:border-emerald-700 dark:text-emerald-300",
    description: "Has realizado una planificación sólida. Aun así, revisa los detalles específicos del país al que deseas emigrar para minimizar riesgos."
  },
  {
    minScore: 26,
    maxScore: 40,
    title: "Vas por buen camino",
    badgeColor: "bg-amber-500 text-slate-950",
    badgeBorder: "bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950/60 dark:border-amber-700 dark:text-amber-300",
    description: "Tu proyecto tiene una buena base, pero existen áreas que conviene fortalecer antes de dar el paso."
  },
  {
    minScore: 0,
    maxScore: 25,
    title: "Aún no estás listo",
    badgeColor: "bg-red-500 text-white",
    badgeBorder: "bg-red-100 border-red-300 text-red-900 dark:bg-red-950/60 dark:border-red-700 dark:text-red-300",
    description: "No significa que debas renunciar a tu sueño. Solo necesitas una mejor planificación para evitar errores que puedan costarte tiempo, dinero y oportunidades."
  }
];

export const JOB_ACTION_PLAN: ActionPlanMonth[] = [
  {
    monthNumber: 1,
    title: "Mes 1: Preparación de Perfil e Investigación",
    tasks: [
      { id: 'j_1', text: 'Investigar el formato de Currículum preferido en el país de destino (Europass, Resumé de 1 página, etc.).', category: 'CV & Formato', tip: 'Evita incluir fotos o estado civil si postulas a EE.UU. o Canadá; sí es usual en España.' },
      { id: 'j_2', text: 'Optimizar perfil de LinkedIn: titular claro, foto profesional, extracto en el idioma local y palabras clave del sector.', category: 'LinkedIn', tip: 'Cambia tu ubicación objetivo en LinkedIn a la ciudad donde planeas residir.' },
      { id: 'j_3', text: 'Identificar si tu profesión requiere colegiatura u homologación previa para ejercer.', category: 'Legalidad', tip: 'Médicos, abogados e ingenieros suelen requerir trámites adicionales.' }
    ]
  },
  {
    monthNumber: 2,
    title: "Mes 2: Postulación Activa y Networking",
    tasks: [
      { id: 'j_4', text: 'Postular a mínimo 5 a 10 ofertas semanales en portales oficiales (LinkedIn, Indeed, InfoJobs, EURES, Job Bank).', category: 'Postulaciones', tip: 'Adapta levemente el resumen de tu CV a los requisitos de cada vacante.' },
      { id: 'j_5', text: 'Red de contactos: Conectar con reclutadores de tu sector y comunidades de profesionales de tu país en la ciudad de destino.', category: 'Networking' },
      { id: 'j_6', text: 'Redactar una Carta de Presentación (Cover Letter) estándar en la que expliques tu motivación y disponibilidad para mudarte.', category: 'Postulaciones' }
    ]
  },
  {
    monthNumber: 3,
    title: "Mes 3: Entrevistas Virtuales y Cierre",
    tasks: [
      { id: 'j_7', text: 'Practicar entrevistas en el idioma del país (preguntas frecuentes sobre motivación para emigrar y fortalezas).', category: 'Entrevistas' },
      { id: 'j_8', text: 'Verificar la validez y requisitos de visas laborales si una empresa demuestra interés formal en contratarte.', category: 'Legalidad' },
      { id: 'j_9', text: 'Aprender a detectar alertas de estafa: Nunca envíes dinero para exámenes médicos o procesamiento de empleo.', category: 'Prevención', tip: 'Las empresas serias jamás cobran dinero al postulante.' }
    ]
  }
];

export const OFFICIAL_RESOURCES: OfficialResource[] = [
  {
    category: "Organismos de Migración y Asilo",
    title: "Organización Internacional para las Migraciones (OIM)",
    organization: "Naciones Unidas (ONU)",
    description: "Información sobre migración segura, ordenada, derechos humanos del migrante y programas de orientación.",
    url: "https://www.iom.int/es",
    badge: "Oficial ONU"
  },
  {
    category: "Organismos de Migración y Asilo",
    title: "ACNUR (UNHCR) - Agencia para los Refugiados",
    organization: "Naciones Unidas (ONU)",
    description: "Portal de ayuda oficial para solicitantes de asilo, personas desplazadas y protección internacional.",
    url: "https://www.acnur.org/",
    badge: "Oficial ONU"
  },
  {
    category: "Empleo Internacional",
    title: "EURES - El Portal Europeo de la Movilidad Profesional",
    organization: "Unión Europea",
    description: "Base de datos oficial de puestos vacantes en los 27 países de la UE y orientación de condiciones de vida.",
    url: "https://eures.europa.eu/",
    badge: "Unión Europea"
  },
  {
    category: "Empleo Internacional",
    title: "Job Bank Canadá",
    organization: "Gobierno de Canadá",
    description: "Bolsa de trabajo del gobierno canadiense para residentes y trabajadores extranjeros calificados.",
    url: "https://www.jobbank.gc.ca/",
    badge: "Gobierno Canadá"
  },
  {
    category: "Estudios y Homologaciones",
    title: "Red ENIC-NARIC",
    organization: "Comisión Europea / UNESCO",
    description: "Información oficial sobre homologación, reconocimiento y equivalencias de títulos universitarios en Europa y América.",
    url: "https://www.enic-naric.net/",
    badge: "Homologaciones"
  },
  {
    category: "Apostilla y Legalización",
    title: "Conferencia de La Haya sobre Apostilla (HCCH)",
    organization: "HCCH",
    description: "Consulta la lista oficial de países miembros del Convenio de la Apostilla de 1961 y autoridades competentes.",
    url: "https://www.hcch.net/es/instruments/conventions/specialised-sections/apostille",
    badge: "Convenio HCCH"
  }
];
