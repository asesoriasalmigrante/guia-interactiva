# Guía Interactiva - Asesorías al Migrante

Aplicación web interactiva para la "Guía de Supervivencia Migratoria" de Daniela Harrington. Incluye eBook interactivo, comparador de 100+ países, calculadora de presupuesto, checklist de migración, test de preparación, guía de empleo/CV, recursos oficiales, kit de emergencia, plan de 90 días y asesora virtual con IA.

## Requisitos

- Node.js v20 o superior
- npm
- Supabase (base de datos + autenticación)
- Google Gemini API Key

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/asesoriasalmigrante/guia-interactiva.git
cd guia-interactiva

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env.local
```

## Variables de Entorno

Edita `.env.local` con tus credenciales:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu_clave_publica
SUPABASE_SERVICE_ROLE_KEY=tu_clave_service_role

# Google Gemini (para IA y traducciones)
GEMINI_API_KEY=tu_clave_gemini
```

## Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Build de Producción

```bash
# Compilar para producción
npm run build

# Iniciar servidor de producción
npm run start
```

## Despliegue en Vercel

1. Sube el proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com) e importa el repositorio
3. Configura las variables de entorno en el dashboard de Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GEMINI_API_KEY`
4. Despliega

La aplicación se desplegará automáticamente en `https://tu-proyecto.vercel.app`

## Dominio Personalizado

1. En el dashboard de Vercel, ve a **Settings > Domains**
2. Agrega tu dominio personalizado
3. Configura los registros DNS en tu proveedor de dominio
4. Vercel configurará SSL automáticamente

## Estructura del Proyecto

```
guia-interactiva/
├── app/                    # App Router (Next.js 15)
│   ├── api/               # API routes (chat, translate, admin, devices)
│   ├── admin/             # Panel de administración
│   ├── auth/              # Callbacks de autenticación
│   ├── login/             # Página de login
│   └── payment/           # Página de pagos
├── src/
│   ├── components/        # Componentes React
│   ├── contexts/          # React Context (Language)
│   ├── translations/      # Archivos de traducción (15 idiomas)
│   ├── data/              # Datos del eBook
│   └── types/             # TypeScript types
├── lib/
│   └── supabase/          # Clientes de Supabase
├── supabase/
│   └── migrations/        # Migraciones de base de datos
└── public/                # Archivos estáticos (imágenes, PDFs)
```

## Funcionalidades

- **eBook interactivo** con 12 capítulos traducidos a 15 idiomas
- **Comparador de países** con información de 100+ países
- **Calculadora de presupuesto** migratorio
- **Checklist** pre-viaje con exportación PDF
- **Test de preparación** migratoria
- **Guía de empleo** y CV
- **Recursos oficiales** por país
- **Kit de emergencia** (Manual PDF descargable)
- **Plan de 90 días** (Plan maestro PDF descargable)
- **Asesora virtual con IA** (Gemini)
- **Panel de administración** con gestión de usuarios
- **15 idiomas** disponibles
- **Modo oscuro/claro**
- **Diseño responsivo** (mobile-first)

## Tecnologías

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase (Auth + Database)
- Google Gemini API
- Vercel (deploy)

## Licencia

© 2025 Asesorías al Migrante - Daniela Harrington. Todos los derechos reservados.
