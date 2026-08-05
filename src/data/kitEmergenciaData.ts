export interface KitSection {
  id: string;
  title: string;
  subsections: KitSubsection[];
}

export interface KitSubsection {
  id: string;
  title: string;
  content: string[];
}

export const KIT_EMERGENCIA_DATA: KitSection[] = [
  {
    id: "seccion-1",
    title: "SECCIÓN I: INTRODUCCIÓN Y MARCO DE GARANTÍAS UNIVERSALES",
    subsections: [
      {
        id: "nota-direccion-juridica",
        title: "Nota de la Dirección Jurídica",
        content: [
          "Migrar es iniciar un nuevo iter procedimental (camino legal) hacia tus sueños. Sin embargo, durante este viaje pueden surgir imprevistos de diversa índole jurídica y administrativa. Este compendio normativo unificado ha sido estructurado meticulosamente por la dirección jurídica de Asesorías al Migrante de LATAM y UE, bajo la supervisión estratégica de la abogada Dra. Daniela Harrington. Su finalidad es compilar en un solo instrumento las soluciones legales inmediatas y los protocolos operativos ante los escenarios de crisis más severos que puede afrontar una persona en el extranjero. Traducimos conceptos jurídicos de alta complejidad en instrucciones claras, transparentes y aplicables para proteger tus derechos fundamentales en cualquier situación crítica, mitigando al máximo los riesgos de rechazo o inadmisión."
        ]
      },
      {
        id: "derechos-humanos",
        title: "RESUMEN DE DERECHOS HUMANOS UNIVERSALES INALIENABLES",
        content: [
          "Es un principio rector del derecho internacional contemporáneo que tu estatus migratorio administrativo jamás anula tu condición de ser humano. Los tratados internacionales —incluyendo los Pactos de las Naciones Unidas y las convenciones regionales— protegen de forma irrestricta e inalienable los siguientes derechos, aplicables con independencia absoluta de la regularidad de la estancia:",
          "Derecho a la Vida y a la Integridad Física: Prohibición absoluta de sufrir tratos crueles, inhumanos o degradantes por parte de cualquier agente de control fronterizo o policial.",
          "Derecho a la Asistencia Médica de Urgencia: Acceso garantizado en situaciones de peligro de muerte o secuelas graves, sin que la falta de documentación pueda actuar como barrera excluyente.",
          "Derecho al Debido Proceso Legal: Garantía de ser escuchado, comprendido mediante asistencia lingüística oficial, y defendido por profesionales jurídicos cualificados antes de la ejecución de cualquier medida sancionatoria o de expulsión."
        ]
      }
    ]
  },
  {
    id: "seccion-2",
    title: "SECCIÓN II: PROTOCOLOS ANTE EMERGENCIAS MIGRATORIAS Y DE CONTROL POLICIAL",
    subsections: [
      {
        id: "inadmision-frontera",
        title: "Inadmisión en Frontera y Orden de Devolución",
        content: [
          "Término Jurídico Clave: Inadmisión en Frontera / Orden de Devolución. Significa que la autoridad migratoria o fronteriza del país de destino determina que el ciudadano extranjero no cumple con los requisitos normativos estrictos para el ingreso, ordenando de forma perentoria su retorno inmediato al punto de origen o a un tercer país de tránsito.",
          "Contexto y Datos Reales: Con base en el Código de Fronteras Schengen de la Unión Europea y las vigentes Leyes de Extranjería del espacio iberoamericano (LATAM), las autoridades de control poseen la facultad legal de realizar inspecciones minuciosas en aeropuertos, puertos y pasos fronterizos terrestres. La falta de justificación clara de los motivos de la estancia, la insuficiencia de medios de subsistencia o la carencia de visados adecuados detonan de inmediato este procedimiento administrativo sancionador.",
          "Protocolo de Actuación Inmediata: Mantén la calma y solicita asistencia letrada: Tienes el derecho inalienable a pedir la presencia obligatoria de un abogado (de oficio si no dispones de un representante particular) antes de estampar tu firma en cualquier documento de rechazo, denegación de entrada o acta de entrevista.",
          "Solicita la inmediata asistencia consular: Invoca formalmente el Artículo 36 del Convenio de Viena sobre Relaciones Consulares. Las autoridades de frontera están obligadas por el derecho internacional a notificar de manera expresa a la delegación consular de tu país de origen sobre tu retención si tú lo solicitas verbalmente.",
          "Exigencia lingüística absoluta: Si no dominas a la perfección el idioma del país de llegada, exige legalmente y de forma firme la designación de un intérprete oficial gratuito. No prestes declaración alguna bajo confusión idiomática."
        ]
      },
      {
        id: "redadas-policiales",
        title: "Redadas Policiales y Controles con Barrera Idiomática",
        content: [
          "Verse involucrado en una inspección de extranjería masiva, control aleatorio o redada policial en un país cuyo idioma no dominas genera un escenario de alto riesgo de indefensión procesal. El ordenamiento internacional te otorga salvaguardas infranqueables que debes activar:",
          "Exigencia del Intérprete Gratuito Certificado: Al amparo del Pacto Internacional de Derechos Civiles y Políticos y del Convenio Europeo de Derechos Humanos, el Estado receptor tiene la obligación absoluta de proveerte un traductor homologado sin coste alguno. Tienes la facultad legal de negarte a responder preguntas técnicas si esta garantía no se materializa.",
          "Aplicación del Silencio Estratégico: Si detectas que no comprendes con absoluta precisión los requerimientos o actas que formulan los funcionarios policiales, evita adivinar o proveer datos ambiguos que puedan incriminarte. Mantén una postura respetuosa pero firme y reitera la siguiente declaración: \"No hablo el idioma. Solicito la presencia de un intérprete oficial y de mi asistencia letrada defensora\".",
          "Prohibición Absoluta de Firma Ciega: Jamás estampes tu firma manuscrita o digital en tabletas electrónicas, formularios preimpresos o notificaciones si el texto no te ha sido traducido íntegramente, palabra por palabra, por el intérprete asignado. Firmar a ciegas suele conllevar la aceptación implícita de una orden de salida voluntaria o la renuncia perentoria a recursos de alzada.",
          "Activación Consular Obligatoria: Reitera a los funcionarios la aplicación del Artículo 36 del Convenio de Viena para que se comunique tu paradero exacto y las causas de la retención a tu consulado de bandera."
        ]
      },
      {
        id: "expediente-sancionador",
        title: "Apertura de Expediente Sancionador de Expulsión o Detención Policial",
        content: [
          "Término Jurídico Clave: Procedimiento Administrativo Sancionador de Expulsión. Proceso formal que inicia el Estado cuando constata que un ciudadano extranjero se encuentra en situación irregular, con el objeto de ejecutar su salida obligatoria del territorio.",
          "Protocolo de Actuación: Solicita inmediatamente la lectura de los derechos en tu idioma. Exige copia del acta de inicio del procedimiento. No firmes ninguna documentación que no comprendas al 100%. Activa tu derecho al silencio y contacta a tu consulado."
        ]
      },
      {
        id: "declaracion-derechos",
        title: "Modelo Práctico: Declaración Escrita de Exigencia de Derechos",
        content: [
          "AL ÓRGANO DE CONTROL POLICIAL / MIGRATORIO COMPETENTE: Yo, el ciudadano abajo firmante, amparado por el Artículo 36 del Convenio de Viena de 1963, el Pacto Internacional de Derechos Civiles y Políticos y la normativa local vigente, manifiesto formalmente:",
          "1. Que SOLICITO la presencia inmediata de asistencia letrada / abogado defensor.",
          "2. Que SOLICITO la designación de un intérprete oficial y gratuito en idioma español.",
          "3. Que EXIJO la inmediata comunicación de mi retención a la Sección Consular de mi país de origen.",
          "Me acojo a mi derecho al silencio legal hasta la comparecencia de los profesionales citados."
        ]
      }
    ]
  },
  {
    id: "seccion-3",
    title: "SECCIÓN III: EMERGENCIAS DOCUMENTALES Y GESTIÓN CONSULAR",
    subsections: [
      {
        id: "perdida-documentos",
        title: "Pérdida, Robo o Destrucción de Documentos Vitales",
        content: [
          "Término Jurídico Clave: Pérdida de Capacidad Postulatoria e Identificativa. Acontece cuando el ciudadano sufre la sustracción, extravío o destrucción física total de sus documentos de identidad internacional de soporte matriz (pasaportes o visados), quedando provisionalmente inhabilitado para acreditar la regularidad de su estatus administrativo frente a las fuerzas de seguridad del Estado receptor.",
          "PASO 1: La Denuncia Policial de Urgencia. Trasládate inmediatamente a la jefatura de policía o comisaría más cercana. Formaliza una denuncia detallando si se trató de robo, hurto o extravío. El acta física original con sello húmedo oficial representa tu escudo jurídico provisional.",
          "PASO 2: Comparecencia ante la Delegación Consular. Preséntate de urgencia en la sede consular con el acta de denuncia policial para la tramitación de un Pasaporte de Emergencia o un Salvoconducto (Documento Provisional de Viaje).",
          "PASO 3: Activación del Resguardo Digital Prevenio. Recupera las copias digitales de tus documentos desde tu carpeta segura en la nube (Google Drive, Dropbox) o desde el correo electrónico."
        ]
      },
      {
        id: "ausencia-sede-consular",
        title: "Contingencia ante la Ausencia de Sede Consular Física",
        content: [
          "La Jurisdicción Consular Concurrente: Cobertura de países sin delegación física asignada a embajadas regionales en estados vecinos.",
          "Mecanismos de Cooperación y Asistencia entre Países Aliados: Acuerdos multilaterales de asistencia humanitaria (Mercosur, Comunidad Andina).",
          "Amparo Consular de la Unión Europea (Art. 23 del TFUE): Protección diplomática accesible a ciudadanos con doble nacionalidad europea en cualquier consulado de un Estado miembro de la UE."
        ]
      }
    ]
  },
  {
    id: "seccion-4",
    title: "SECCIÓN IV: GESTIÓN DE CRISIS LABORALES, FAMILIARES Y SINIESTROS VIALES",
    subsections: [
      {
        id: "emergencias-laborales",
        title: "Emergencias Laborales y Vulneración de Derechos Adquiridos",
        content: [
          "Término Jurídico Clave: Indefensión Laboral. Se configura cuando se explota abusivamente la condición de extranjería. La jurisprudencia internacional de la OIT ampara el cobro íntegro de salarios devengados independientemente de la regularidad administrativa.",
          "Compilación metódica de elementos probatorios (mensajería, extractos, registros).",
          "Denuncia ante la Inspección de Trabajo (garantizando el anonimato).",
          "Activación de vías de regularización extraordinaria por arraigo u orden social."
        ]
      },
      {
        id: "emergencias-familiares",
        title: "Emergencias Familiares y Situaciones de Violencia de Género",
        content: [
          "Las víctimas de violencia de género e intrafamiliar ostentan el derecho a solicitar una autorización de residencia y trabajo autónoma e independiente, extinguiendo la subordinación con el reagrupante.",
          "Protocolo de Actuación: Solicita protección policial inmediata. Acude al centro de atención más cercano. Activa la热线 de emergencia nacional del país de residencia."
        ]
      },
      {
        id: "siniestros-viales",
        title: "Siniestros Viales y Accidentes de Tránsito",
        content: [
          "1. Asistencia Médica Primaria: Acceso universal garantizado a la salud de urgencia médica vital. Ningún centro sanitario puede rechazar la atención por falta de visado.",
          "2. Atestado Policial: Exigir la presencia de la autoridad vial para la confección del informe pericial. No firmar acuerdos informales en la vía.",
          "3. Intercambio Seguro: Registrar datos de licencias, matrículas y seguros obligatorios sin formular asunciones verbales de culpabilidad."
        ]
      }
    ]
  },
  {
    id: "seccion-5",
    title: "SECCIÓN V: EMERGENCIAS DE VIAJE, SALUD Y CRISIS ECONÓMICAS SOBREVENIDAS",
    subsections: [
      {
        id: "emergencias-viaje-salud-economia",
        title: "Emergencias de Viaje, Salud y Crisis Económicas",
        content: [
          "1. Asistencia Sanitaria Universal de Urgencia: Tramitación extraordinaria de Residencia Temporal por Razones Humanitarias de Salud ante afecciones sobrevenidas graves.",
          "2. Denegación de Tránsito Aéreo (Reglamento CE 261/2004): Derechos de asistencia, manutención, alojamiento y compensaciones tasadas (250 EUR a 600 EUR) ante cancelaciones o denegaciones injustificadas.",
          "3. Sobrevenida Carencia de Medios Económicos: Reorganización estratégica y Modificación de la Tipología de Autorización antes del vencimiento del título habilitante."
        ]
      }
    ]
  },
  {
    id: "seccion-6",
    title: "SECCIÓN VI: PREVENCIÓN ESTRATÉGICA Y BLINDAJE CONTRA FRAUDES",
    subsections: [
      {
        id: "prevencion-fraudes",
        title: "Identificación de Indicadores de Alerta ante Estafas Migratorias",
        content: [
          "Ausencia de Soporte Contractual: Exija siempre un Contrato de Prestación de Servicios Jurídicos (Hoja de Encargo Profesional).",
          "Promesas Falsas de Resultados Garantizados: La concesión de visados es una facultad soberana discrecional del Estado receptor.",
          "Canales de Pago Opacos: Rechace pagos a cuentas de particulares o giros informales. Exija facturas oficiales."
        ]
      }
    ]
  },
  {
    id: "seccion-7",
    title: "SECCIÓN VII: GARANTÍAS DE ACOMPAÑAMIENTO ESTRATÉGICO Y CIERRE",
    subsections: [
      {
        id: "garantias-acompanamiento",
        title: "Garantías de Acompañamiento Estratégico",
        content: [
          "Se ratifica que nuestro servicio de Asesoramiento Legal Estratégico y Acompañamiento Migratorio Continuo posee una estructura corporativa enfocada en la auditoría permanente de la documentación, el monitoreo normativo de alertas y la prevención activa de contingencias."
        ]
      }
    ]
  }
];
