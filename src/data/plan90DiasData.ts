export interface PlanPhase {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  weeks: PlanWeek[];
}

export interface PlanWeek {
  id: string;
  title: string;
  days: PlanDay[];
}

export interface PlanDay {
  day: number;
  title: string;
  description: string;
}

export const PLAN_90_DIAS_DATA: PlanPhase[] = [
  {
    id: "fase1",
    title: "EL CIMIENTO",
    subtitle: "DIAGNÓSTICO Y ESTRATEGIA (DÍAS 1 A 30)",
    description: "Esta etapa inicial tiene como fin evaluar las condiciones jurídicas del solicitante y escoger el marco regulatorio óptimo para evitar erogaciones económicas infundadas.",
    weeks: [
      {
        id: "week1",
        title: "FIJACIÓN DEL OBJETO LEGAL",
        days: [
          {
            day: 1,
            title: "Determinación de la Jurisdicción",
            description:
              "Fijar formalmente el país de destino en Europa o LATAM, identificando su bloque normativo específico.",
          },
          {
            day: 2,
            title: "Calificación del Objeto Migratorio",
            description:
              "Definir la categoría de visado a aplicar: estudios, empleo asalariado, residencia no lucrativa, inversión o razones humanitarias.",
          },
          {
            day: 3,
            title: "Mapeo de Fuentes Oficiales",
            description:
              "Localizar y compilar los enlaces de los ministerios de extranjería y portales consulares del Estado receptor.",
          },
          {
            day: 4,
            title: "Apertura del Repositorio Digital",
            description:
              "Estructurar una base de datos segura en la nube para el resguardo ordenado del expediente en formación.",
          },
          {
            day: 5,
            title: "Examen de Validez del Pasaporte",
            description:
              "Verificar que el documento de viaje cuente con una vigencia remanente superior a los 12 meses y páginas libres.",
          },
          {
            day: 6,
            title: "Ubicación de la Sede Consular",
            description:
              "Identificar la demarcación consular que le corresponde por vecindad civil para la futura presentación física.",
          },
          {
            day: 7,
            title: "Descarga de Guías de Requisitos",
            description:
              "Obtener los listados oficiales actualizados de la delegación diplomática para evitar basarse en información desactualizada.",
          },
        ],
      },
      {
        id: "week2",
        title: "AUDITORÍA DE IDENTIDAD Y ESTADO CIVIL",
        days: [
          {
            day: 8,
            title: "Filtro Preventivo de Seguridad",
            description:
              "Constatar la inexistencia de prohibiciones de viaje o impedimentos judiciales en las bases de datos locales.",
          },
          {
            day: 9,
            title: "Delimitación de la Unidad Familiar",
            description:
              "Determinar si el trámite será individual o si incluirá el derecho de reagrupación familiar simultánea para cónyuge e hijos.",
          },
          {
            day: 10,
            title: "Inventario de Actas Requeridas",
            description:
              "Listar de manera detallada las partidas de registro civil indispensables para acreditar los vínculos de parentesco.",
          },
          {
            day: 11,
            title: "Solicitud de la Partida de Nacimiento",
            description:
              "Requerir formalmente ante el Registro Civil local la expedición de copias fieles certificadas de las actas del solicitante principal.",
          },
          {
            day: 12,
            title: "Gestión de Actas Civiles de Co-solicitantes",
            description:
              "Solicitar las partidas de nacimiento de descendientes y actas de matrimonio o uniones convivenciales inscritas.",
          },
          {
            day: 13,
            title: "Fijación del Cronotopo Documental",
            description:
              "Registrar las fechas de expedición para vigilar los términos de caducidad (generalmente entre 90 y 180 días).",
          },
          {
            day: 14,
            title: "Ractreo de Títulos e Historial Académico",
            description:
              "Ubicar físicamente diplomas y analíticos que precisen ser validados para visas de estudio o empleo cualificado.",
          },
        ],
      },
      {
        id: "week3",
        title: "PLANIFICACIÓN FINANCIERA ADMINISTRATIVA",
        days: [
          {
            day: 15,
            title: "Recopilación de Datos Filiatorios",
            description:
              "Organizar la información de ascendientes para completar de forma exacta las secciones de antecedentes familiares.",
          },
          {
            day: 16,
            title: "Tasación de Aranceles Consulares",
            description:
              "Identificar el valor oficial exacto exigido por el consulado para la admisión a trámite de la solicitud de visado.",
          },
          {
            day: 17,
            title: "Estimación de Tasas de Residencia",
            description:
              "Presupuestar los tributos de extranjería exigibles en el país receptor al momento de la expedición de la tarjeta de identidad.",
          },
          {
            day: 18,
            title: "Cotización del Seguro Médico Internacional",
            description:
              "Evaluar pólizas de salud que cumplan los criterios normativos (cobertura total, sin copagos ni carencias, con repatriación).",
          },
          {
            day: 19,
            title: "Presupuesto de Servicios Auxiliares",
            description:
              "Calcular costos estimados de traductores públicos matriculados y peritos en el idioma del Estado de destino.",
          },
          {
            day: 20,
            title: "Costeo de Aranceles de Legalización",
            description:
              "Establecer los montos fijos gubernamentales para la colocación de la Apostilla de La Haya en cada documento.",
          },
          {
            day: 21,
            title: "Cuantificación de Medios Económicos Suficientes",
            description:
              "Calcular el IPREM, Salario Mínimo o índice oficial correspondiente fijado por la ley de extranjería del país de destino.",
          },
        ],
      },
      {
        id: "week4",
        title: "ARQUITECTURA DE FONDOS Y CIERRE DE VIABILIDAD",
        days: [
          {
            day: 22,
            title: "Selección del Instrumento Bancario",
            description:
              "Designar la cuenta bancaria institucional que servirá de soporte probatorio de la solvencia líquida.",
          },
          {
            day: 23,
            title: "Auditoría Preliminar de Estados de Cuenta",
            description:
              "Revisar que los movimientos de los últimos 90 días no muestren ingresos injustificados que alerten sobre lavado de activos.",
          },
          {
            day: 24,
            title: "Redacción de Compromisos de Patrocinio",
            description:
              "Elaborar minutas jurídicas para cartas de sostenimiento económico por parte de terceros o garantes familiares.",
          },
          {
            day: 25,
            title: "Validación de Documentación de Identidad Local",
            description:
              "Corroborar la perfecta vigencia de las cédulas o DNI locales que se usarán como soporte supletorio.",
          },
          {
            day: 26,
            title: "Análisis de Restricciones Sanitarias y de Bioseguridad",
            description:
              "Verificar requisitos de inoculación o cuarentenas para personas y animales de compañía según directrices fitosanitarias internacionales.",
          },
          {
            day: 27,
            title: "Proyección del Horizonte Temporal",
            description:
              "Calcular la ventana idónea de presentación en relación con los plazos legales de resolución administrativa gubernamental.",
          },
          {
            day: 28,
            title: "Adecuación de Perfil Laboral",
            description:
              "Alinear el historial curricular a los estándares internacionales del territorio de destino (v.gr., modelo Europass para la UE).",
          },
          {
            day: 29,
            title: "Certificación Técnica de Viabilidad",
            description:
              "Concluir el examen técnico que ratifique que el solicitante encuadra perfectamente en los supuestos normativos vigentes.",
          },
          {
            day: 30,
            title: "Declaración de Aprobación de la Fase 1",
            description:
              "Consolidar formalmente la estrategia legal. El cimiento conceptual se encuentra firme y validado.",
          },
        ],
      },
    ],
  },
  {
    id: "fase2",
    title: "EL ITER DOCUMENTAL",
    subtitle: "RECOLECCIÓN Y CONTROL DE CALIDAD (DÍAS 31 A 60)",
    description: "Este bloque se centra en el armado formal del expediente administrativo. El rigor en los renglones, sellos y firmas extingue cualquier posibilidad de inadmisión por vicios de forma.",
    weeks: [
      {
        id: "week5",
        title: "COMPILACIÓN FORMAL",
        days: [
          {
            day: 31,
            title: "Apertura del Archivador Físico Coherente",
            description:
              "Disponer de una carpeta de solapas con divisiones indexadas que replique el orden estricto del listado consular.",
          },
          {
            day: 32,
            title: "Obtención de Formularios de Solicitud",
            description:
              "Descargar las versiones oficiales más recientes de las solicitudes de visado estatal emitidas por los entes del gobierno receptor.",
          },
          {
            day: 33,
            title: "Cumplimentación en Minuta Provisional",
            description:
              "Llenar un borrador de los formularios para identificar campos complejos y evitar enmendaduras o tachaduras ulteriores.",
          },
          {
            day: 34,
            title: "Captura de Registro Fotográfico Biométrico",
            description:
              "Producir fotografías que cumplan taxativamente con el estándar OACI (fondo blanco neutro, proporciones faciales estrictas).",
          },
          {
            day: 35,
            title: "Solicitud de Certificaciones Judiciales",
            description:
              "Requerir el Certificado de Antecedentes Penales ante la autoridad de seguridad pública o Ministerio del Interior local.",
          },
          {
            day: 36,
            title: "Gestión de Historiales Penales Plurilocalizados",
            description:
              "Tramitar constancias penales de aquellos países donde el interesado haya tenido residencia efectiva durante los últimos 5 años.",
          },
          {
            day: 37,
            title: "Retiro y Cotejo Preliminar de Actas del Registro Civil",
            description:
              "Retirar físicamente las partidas solicitadas y validar que incorporen los sellos húmedos o firmas digitales verificables.",
          },
        ],
      },
      {
        id: "week6",
        title: "CONTROL DE INCONGRUENCIAS Y ACREDITACIONES ESPECÍFICAS",
        days: [
          {
            day: 38,
            title: "Examen de Correspondencia Identitaria",
            description:
              "Cotejar grafía por grafía que nombres, apellidos y fechas de nacimiento coincidan plenamente entre pasaporte y actas matrices.",
          },
          {
            day: 39,
            title: "Obtención del Certificado Médico Oficial",
            description:
              "Acudir al facultativo colegiado para redactar la constancia de salud conforme al Reglamento Sanitario Internacional de la OMS.",
          },
          {
            day: 40,
            title: "Validación Administrativa de Títulos Educativos",
            description:
              "Presentar títulos académicos ante el Ministerio de Educación de origen para el reconocimiento previo a la apostilla.",
          },
          {
            day: 41,
            title: "Legalización de Certificados Analíticos de Calificaciones",
            description:
              "Tramitar el desglose de asignaturas cursadas para visas que exijan homologación o convalidación en destino.",
          },
          {
            day: 42,
            title: "Aseguramiento de la Admisión Académica Definitiva",
            description:
              "Verificar que la carta de aceptación del centro educativo extranjero especifique fechas exactas y pago de matrícula.",
          },
          {
            day: 43,
            title: "Examen Técnico de Contratos Laborales o Promesas de Empleo",
            description:
              "Garantizar que los instrumentos contractuales estén visados o cuenten con las autorizaciones del Ministerio de Trabajo del país receptor.",
          },
          {
            day: 44,
            title: "Compilación de Evidencia de Trayectoria Profesional",
            description:
              "Reunir constancias de cotización a la seguridad social y certificaciones laborales que validen la experiencia invocada.",
          },
        ],
      },
      {
        id: "week7",
        title: "CADENA DE CUSTODIA LEGAL INTERNACIONAL",
        days: [
          {
            day: 45,
            title: "Auditoría de Firmas e Hitos Estatales Intermedios",
            description:
              "Confirmar que toda documentación local posea las firmas ministeriales previas requeridas para el trámite de apostillado.",
          },
          {
            day: 46,
            title: "Apostilla de La Haya sobre Actas de Estado Civil",
            description:
              "Someter las actas de nacimiento y matrimonio al proceso de apostillado ante la Cancillería o entidad delegada competente.",
          },
          {
            day: 47,
            title: "Apostilla de Certificaciones Judiciales y Penales",
            description:
              "Estampar la Apostilla sobre los antecedentes penales vigentes para asegurar su inmediata validez internacional.",
          },
          {
            day: 48,
            title: "Apostilla de Títulos e Historiales Escolares o Universitarios",
            description:
              "Culminar la legalización internacional de los documentos de instrucción pública para sus plenos efectos en el exterior.",
          },
          {
            day: 49,
            title: "Legalización por Vía Diplomática Supletoria",
            description:
              "Ejecutar la cadena manual de legalizaciones en ministerios y consulados si el país de destino no es signatario del Convenio de La Haya.",
          },
          {
            day: 50,
            title: "Asignación a Traducción Pública Homologada",
            description:
              "Remitir el expediente completo y apostillado al traductor jurado debidamente certificado por el Estado receptor.",
          },
          {
            day: 51,
            title: "Monitoreo Técnico de la Fiel Traducción",
            description:
              "Supervisar que los nombres propios y términos legales no sufran alteraciones sustanciales que vicien la traducción.",
          },
        ],
      },
      {
        id: "week8",
        title: "CONSOLIDACIÓN Y CIERRE DEL EXPEDIENTE",
        days: [
          {
            day: 52,
            title: "Contratación Formal de la Cobertura de Salud Internacional",
            description:
              "Efectuar el pago y la emisión definitiva del seguro médico que cumpla a cabalidad las exigencias normativas migratorias.",
          },
          {
            day: 53,
            title: "Obtención del Certificado de Cobertura y Repatriación",
            description:
              "Imprimir la constancia en el idioma del país de destino donde se certifique la ausencia de franquicias y el amparo total.",
          },
          {
            day: 54,
            title: "Recepción y Verificación de las Traducciones Juradas",
            description:
              "Retirar las traducciones oficiales constatando la perfecta fijación de los sellos de ley del perito actuante.",
          },
          {
            day: 55,
            title: "Emisión de la Certificación Bancaria Definitiva de Fondos",
            description:
              "Solicitar al banco la expedición de la constancia de saldo actual y saldo promedio líquido con sello de agua institucional.",
          },
          {
            day: 56,
            title: "Redacción Definitiva de la Declaración de Motivos",
            description:
              "Plasmar con nitidez el fundamento causal y la justificación legal de la pretensión migratoria ante el cónsul o instructor.",
          },
          {
            day: 57,
            title: "Consolidación de Pruebas Legítimas de Alojamiento en Destino",
            description:
              "Anexar contratos de arrendamiento, reservas hoteleras firmes o actas notariales de invitación de ciudadanos residentes.",
          },
          {
            day: 58,
            title: "Compulsa y Duplicación Documental",
            description:
              "Generar copias fotostáticas íntegras de excelente nitidez para su entrega, reservando bajo estricta custodia los originales.",
          },
          {
            day: 59,
            title: "Digitalización Indexada de Resguardo",
            description:
              "Crear un archivo PDF unificado de alta resolución que sirva de respaldo digital ante extravíos o requerimientos en línea.",
          },
          {
            day: 60,
            title: "Cierre Formal de la Fase 2",
            description:
              "La carpeta de radicación se encuentra 100% blindada, clasificada y apta para su presentación ante la autoridad soberana.",
          },
        ],
      },
    ],
  },
  {
    id: "fase3",
    title: "LA EJECUCIÓN",
    subtitle: "RADICACIÓN, CITAS Y LOGÍSTICA FINAL (DÍAS 61 A 90)",
    description: "Periodo de sumisión del expediente ante las plataformas estatales y estructuración de la logística internacional de instalación territorial.",
    weeks: [
      {
        id: "week9",
        title: "CONEXIÓN GUBERNAMENTAL E IMPOSICIÓN DE TASAS",
        days: [
          {
            day: 61,
            title: "Alta en Plataformas Telemáticas Oficiales",
            description:
              "Crear perfiles de usuario en las sedes electrónicas de migración o del ministerio competente del país receptor.",
          },
          {
            day: 62,
            title: "Reserva de Turno Consular o de Radicación Digital",
            description:
              "Acceder al sistema de asignación de citas para fijar la fecha cierta de comparecencia o subida formal de datos.",
          },
          {
            day: 63,
            title: "Emisión del Comprobante Oficial de Cita Agendada",
            description:
              "Descargar e imprimir la confirmación electrónica institucional que garantiza el turno para evitar cancelaciones del sistema.",
          },
          {
            day: 64,
            title: "Generación de Liquidaciones Impositivas de Extranjería",
            description:
              "Emitir las boletas oficiales de pago de tasas administrativas vinculadas a la solicitud correspondiente.",
          },
          {
            day: 65,
            title: "Liquidación Fiscal del Canon Migratorio",
            description:
              "Efectuar el pago formal de los tributos en las entidades bancarias autorizadas o pasarelas de pago del gobierno receptor.",
          },
          {
            day: 66,
            title: "Incorporación del Justificante de Pago de Tasas",
            description:
              "Anexar el comprobante original de la transacción fiscal al inicio de la carpeta de tramitación como requisito de admisión.",
          },
          {
            day: 67,
            title: "Firma Manuscrita Definitiva de Instrumentos Oficiales",
            description:
              "Plasmar la firma en tinta azul en todos los formularios oficiales de forma exacta a la estampa gráfica de su pasaporte.",
          },
        ],
      },
      {
        id: "week10",
        title: "COMPARECENCIA Y MITIGACIÓN DEL INTERROGATORIO CONSULAR",
        days: [
          {
            day: 68,
            title: "Simulación de Entrevista de Veracidad Jurídica I",
            description:
              "Practicar de forma exhaustiva la exposición clara y concisa de los objetivos legítimos del viaje ante la autoridad soberana.",
          },
          {
            day: 69,
            title: "Simulación de Entrevista de Suficiencia Financiera II",
            description:
              "Ensayar defensas verbales sólidas sobre el origen lícito y la total disponibilidad de los medios económicos presentados.",
          },
          {
            day: 70,
            title: "Revisión Logística de la Sede Diplomática",
            description:
              "Constatar el itinerario, la ubicación exacta, los controles de seguridad de acceso y las pautas corporales para el día de presentación.",
          },
          {
            day: 71,
            title: "Bloqueo de Trazabilidad de Reserva Aérea",
            description:
              "Efectuar reservas aéreas temporales que sirvan de soporte indicativo del plan de viaje sin realizar compras definitivas de riesgo.",
          },
          {
            day: 72,
            title: "Planificación del Iter de Aterrizaje Administrativo",
            description:
              "Establecer el cronograma de gestiones iniciales al arribo: número de identidad fiscal, empadronamiento municipal o alta laboral.",
          },
          {
            day: 73,
            title: "Notificación Internacional a Entidades Bancarias",
            description:
              "Emitir avisos de viaje a sus bancos locales para autorizar la operatividad plena de instrumentos de pago internacionales.",
          },
          {
            day: 74,
            title: "Organización del Equipaje Documental de Mano",
            description:
              "Resguardar pasaportes, pólizas originales y la hoja de cita en un portafolios seguro que permanezca en su custodia inmediata.",
          },
          {
            day: 75,
            title: "COMPARECENCIA Y RADICACIÓN FORMAL",
            description:
              "Presentarse ante la autoridad consular o subir el expediente al sistema. El caso queda formalmente subjudice (en manos del gobierno).",
          },
        ],
      },
      {
        id: "week11",
        title: "VIGILANCIA DEL TRÁMITE Y LOGÍSTICA OPERATIVA",
        days: [
          {
            day: 76,
            title: "Resguardo del Resguardo de Presentación",
            description:
              "Archivar el comprobante que contiene el número de expediente administrativo y el código de verificación del trámite.",
          },
          {
            day: 77,
            title: "Verificación del Estado de Tramitación Telemática",
            description:
              'Ingresar al sistema de seguimiento gubernamental para confirmar que el expediente figure con estatus de "En Tramitación".',
          },
          {
            day: 78,
            title: "Comunicación y Reporte Interno a la Firma",
            description:
              "Remitir copia del acta de presentación al asesor asignado para mantener el control preventivo integral ante incidencias.",
          },
          {
            day: 79,
            title: "Compilación del Historial Médico y de Inoculaciones Familiar",
            description:
              "Reunir cartillas de vacunación internacionales y expedientes de salud valiosos para su validación en los centros de salud de destino.",
          },
          {
            day: 80,
            title: "Rescisión Preventiva de Contratos de Servicios Locales",
            description:
              "Gestionar la baja formal de servicios de arrendamiento, internet, telefonía y suscripciones residenciales domésticas.",
          },
          {
            day: 81,
            title: "Inventario e Instrumentación de Liquidación de Bienes",
            description:
              "Coordinar la venta, donación o almacenamiento legal de bienes muebles remanentes no incluidos en el equipaje de traslado.",
          },
        ],
      },
      {
        id: "week12",
        title: "EMISIÓN DEL VISADO Y DESPLIEGUE TERRITORIAL",
        days: [
          {
            day: 82,
            title: "Control Métrico y de Seguridad de Equipaje",
            description:
              "Adecuar el equipaje a los estándares y normativas aeroportuarias de transporte para evitar retrasos logísticos en aduana.",
          },
          {
            day: 83,
            title: "Adquisición Definitiva de Títulos de Transporte Internacional",
            description:
              "Comprar formalmente los pasajes aéreos o terrestres ajustados estrictamente a las fechas autorizadas de vigencia del visado.",
          },
          {
            day: 84,
            title: "Ratificación Contractual de Enlaces en Destino",
            description:
              "Confirmar de forma fehaciente las horas de llegada con los administradores del alojamiento inicial y transportes terrestres locales.",
          },
          {
            day: 85,
            title: "Monitoreo de Alertas e Instrucciones Consulares de Último Minuto",
            description:
              "Revisar avisos oficiales de fronteras o directrices de seguridad emitidas por el país receptor previo al despegue.",
          },
          {
            day: 86,
            title: "OBTENCIÓN DE LA RESOLUCIÓN ADMINISTRATIVA FAVORABLE",
            description:
              "Recibir la resolución formal aprobatoria o retirar el pasaporte con el visado debidamente estampado por la delegación soberana.",
          },
          {
            day: 87,
            title: "Auditoría Técnica del Visado o Título Estampado",
            description:
              "Corroborar que no existan errores materiales en la tipografía de nombres, números de identidad o plazos vigentes de permanencia.",
          },
          {
            day: 88,
            title: "Resguardo de Seguridad del Instrumento Migratorio Aprobado",
            description:
              "Tomar imágenes de alta fidelidad del visado y remitirlas a correos personales para mantener plena disponibilidad digital.",
          },
          {
            day: 89,
            title: "Cierre del Círculo Social y Familiar de Origen",
            description:
              "Culminar los encuentros de despedida y formalizar poderes notariales remanentes en favor de familiares si fuese necesario.",
          },
          {
            day: 90,
            title: "EJECUCIÓN DEL VIAJE Y DESPLIEGUE SEGURO",
            description:
              "Abordar el medio de transporte e ingresar formal y legítimamente al Estado de destino. ¡Su proceso culmina con éxito rotundo!",
          },
        ],
      },
    ],
  },
];
