import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { BarChart3, ChevronRight, Terminal, Users, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// --- COMPONENTE VISUAL: RED NEURONAL DE NEGOCIO ---
const NetworkBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-30 select-none"
    viewBox="0 0 800 600"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="flow-line" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ea580c" stopOpacity="0" />
        <stop offset="50%" stopColor="#ea580c" stopOpacity="1" />
        <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Líneas de conexión base */}
    <path
      d="M 100 300 H 700"
      stroke="#27272a"
      strokeWidth="1"
      strokeDasharray="4 4"
    />
    <path
      d="M 100 150 C 250 150, 250 300, 400 300"
      fill="none"
      stroke="#27272a"
      strokeWidth="1"
    />
    <path
      d="M 100 450 C 250 450, 250 300, 400 300"
      fill="none"
      stroke="#27272a"
      strokeWidth="1"
    />
    <path
      d="M 400 300 C 550 300, 550 150, 700 150"
      fill="none"
      stroke="#27272a"
      strokeWidth="1"
    />

    {/* Flujo de datos animado (Feedback -> Business Value) */}
    <path
      d="M 100 450 C 250 450, 250 300, 400 300 C 550 300, 550 150, 700 150"
      fill="none"
      stroke="url(#flow-line)"
      strokeWidth="2"
      strokeLinecap="round"
      className="animate-[dash_3s_linear_infinite]"
      strokeDasharray="100 1000"
    />

    {/* Nodos de Interacción */}
    <circle cx="100" cy="150" r="4" fill="#52525b" />
    <circle cx="100" cy="450" r="4" fill="#52525b" />

    {/* Nodo Central (Annya Core) */}
    <g className="animate-pulse">
      <circle cx="400" cy="300" r="6" fill="#ea580c" />
      <circle cx="400" cy="300" r="20" fill="#ea580c" fillOpacity="0.1" />
    </g>

    {/* Nodo Resultado (Éxito) */}
    <circle cx="700" cy="150" r="4" fill="#fff" />
  </svg>
);

const PLANS_DISPLAY = [
  {
    key: "free",
    name: "Inicial",
    price: "$0",
    description: "Para validar tu idea de negocio",
    features: [
      "1 Proyecto Activo",
      "50 Feedbacks/mes",
      "Retención de Datos Básica",
      "Marca Estándar",
    ],
  },
  {
    key: "pro",
    name: "Crecimiento",
    price: "$9",
    description: "Para startups en expansión agresiva",
    features: [
      "5 Proyectos Comerciales",
      "500 Feedbacks/mes",
      "Captura de Pantalla (Evidencia)",
      "Exportación de Datos CRM",
      "Prioridad en Soporte",
    ],
    highlight: true,
  },
  {
    key: "max",
    name: "Imperio",
    price: "$29",
    description: "Infraestructura de nivel empresarial",
    features: [
      "Proyectos Ilimitados",
      "Feedbacks Ilimitados",
      "Marca Blanca Total",
      "API de Acceso Directo",
      "SLA Garantizado",
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30 selection:text-orange-200 font-sans overflow-x-hidden">
      {/* Navbar de Alto Nivel */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-2xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="h-8 w-8 bg-orange-600 rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(234,88,12,0.4)] group-hover:shadow-[0_0_25px_rgba(234,88,12,0.6)] transition-all duration-500">
              <Terminal className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold tracking-tighter text-xl font-sans text-white">
              ANNYA
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-12 text-xs font-mono text-zinc-400 uppercase tracking-[0.2em] font-medium">
            <a
              href="#soluciones"
              className="hover:text-orange-500 transition-colors duration-300"
            >
              Soluciones
            </a>
            <a
              href="#infraestructura"
              className="hover:text-orange-500 transition-colors duration-300"
            >
              Infraestructura
            </a>
            <a
              href="#planes"
              className="hover:text-orange-500 transition-colors duration-300"
            >
              Inversión
            </a>
          </nav>

          <div className="flex items-center gap-6">
            <SignedOut>
              <SignInButton>
                <button className="text-xs font-mono text-zinc-400 hover:text-white uppercase tracking-widest transition-colors">
                  Acceso Cliente
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-white text-black px-6 py-3 text-xs font-mono font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-300 rounded-sm shadow-lg">
                  Comenzar Ahora
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/projects">
                <button className="bg-zinc-900 border border-zinc-800 text-white px-6 py-3 text-xs font-mono font-bold uppercase tracking-widest hover:bg-zinc-800 hover:border-orange-500/50 transition-all rounded-sm flex items-center gap-2 group">
                  Panel de Control{" "}
                  <ChevronRight className="h-3 w-3 text-orange-500 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="pt-32">
        {/* --- HERO SECTION: DOMINIO DE MERCADO --- */}
        <section className="container mx-auto px-6 md:px-12 mb-32 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[700px]">
            {/* Izquierda: Propuesta de Valor Agresiva */}
            <div className="relative z-10 space-y-10">
              <div className="inline-flex items-center gap-3 border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 rounded-full">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                </span>
                <span className="text-[11px] font-mono text-orange-400 uppercase tracking-widest font-bold">
                  Inteligencia de Negocio en Tiempo Real
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-white">
                Escuchar es <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-200">
                  Rentabilizar.
                </span>
              </h1>

              <p className="text-lg text-zinc-400 max-w-lg leading-relaxed border-l-2 border-orange-600 pl-6 font-light">
                Las empresas que ignoran a sus usuarios mueren. <br />
                <strong className="text-white">Annya</strong> te da la
                infraestructura para convertir quejas en oportunidades y
                sugerencias en ingresos. Sin intermediarios.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <SignUpButton>
                  <Button className="h-14 px-10 bg-orange-600 hover:bg-orange-500 text-white rounded-sm font-mono text-sm uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(234,88,12,0.3)] border border-orange-400/50 transition-all hover:scale-105">
                    Potenciar mi Negocio
                  </Button>
                </SignUpButton>
                <Button
                  variant="outline"
                  className="h-14 px-10 bg-transparent border-zinc-700 text-zinc-300 hover:text-white hover:bg-white/5 hover:border-white rounded-sm font-mono text-sm uppercase tracking-widest transition-all"
                >
                  Ver Demostración
                </Button>
              </div>
            </div>

            {/* Derecha: Visualización de Flujo de Valor */}
            <div className="relative h-[600px] w-full border border-zinc-900 bg-zinc-950/50 rounded-sm overflow-hidden group shadow-2xl shadow-orange-900/10">
              {/* Fondo Técnico */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

              {/* Componente SVG Personalizado */}
              <NetworkBackground />

              {/* Tarjeta Flotante: "Insight Detectado" */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 bg-zinc-900/90 backdrop-blur border border-orange-500/30 p-4 rounded-sm shadow-xl animate-[float_4s_ease-in-out_infinite]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-orange-400 uppercase tracking-wider">
                    Oportunidad Crítica
                  </span>
                </div>
                <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                  "El proceso de pago es confuso en móviles..."
                </p>
                <div className="mt-3 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-3/4 animate-[loading_2s_ease-out_forwards]" />
                </div>
              </div>

              {/* Tarjeta Flotante: "Valor Generado" */}
              <div className="absolute bottom-1/4 right-10 w-56 bg-zinc-900/90 backdrop-blur border border-green-500/30 p-4 rounded-sm shadow-xl animate-[float_5s_ease-in-out_infinite_1s]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[10px] font-mono text-green-400 uppercase tracking-wider">
                    Retención Mejorada
                  </span>
                </div>
                <div className="text-2xl font-bold text-white font-mono">
                  +24%
                </div>
                <p className="text-[10px] text-zinc-500 uppercase mt-1">
                  Conversión Mensual
                </p>
              </div>

              {/* Decoración HUD */}
              <div className="absolute bottom-6 left-6 font-mono text-[10px] text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-ping" />
                Monitoreando Experiencia de Usuario
              </div>
            </div>
          </div>
        </section>

        {/* METRICS / SOCIAL PROOF */}
        <section className="border-y border-zinc-900 bg-[#050505] py-16">
          <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Procesados Diarios", value: "1.2M+" },
              { label: "Empresas Activas", value: "850+" },
              { label: "Retención Aumentada", value: "35%" },
              { label: "ROI Promedio", value: "12x" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SOLUCIONES (FEATURES) */}
        <section
          id="soluciones"
          className="py-32 container mx-auto px-6 md:px-12 bg-black relative overflow-hidden"
        >
          {/* Fondo sutil */}
          <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[800px] h-[800px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="mb-24 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
              Infraestructura diseñada para <br />
              <span className="text-orange-500">Decisiones Informadas.</span>
            </h2>
            <p className="text-xl text-zinc-400 font-light leading-relaxed">
              Deje de adivinar qué quieren sus clientes. Annya le proporciona
              los datos crudos y procesables para iterar su producto con
              precisión quirúrgica.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Implementación Instantánea",
                desc: "Sin configuraciones complejas. Copie, pegue y comience a recibir datos en segundos. Su equipo de ingeniería se lo agradecerá.",
              },
              {
                icon: <BarChart3 className="h-6 w-6" />,
                title: "Analítica de Impacto",
                desc: "Distinga entre ruido y señales. Filtre feedback por relevancia, tipo de usuario y contexto técnico automáticamente.",
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Fidelización Automática",
                desc: "Cuando un usuario se siente escuchado, se queda. Cierre el ciclo de feedback y convierta detractores en embajadores.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-8 border border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 transition-all duration-500 hover:border-orange-500/30 rounded-sm"
              >
                <div className="h-12 w-12 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA INTERMEDIO */}
        <section
          id="infraestructura"
          className="border-t border-zinc-900 bg-zinc-950 py-32 relative overflow-hidden"
        >
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8 text-white">
              ¿Su negocio puede permitirse <br />
              <span className="text-zinc-500">ignorar la realidad?</span>
            </h2>
            <div className="flex justify-center">
              <SignUpButton>
                <button className="bg-white text-black px-12 py-4 text-sm font-mono font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-300 rounded-sm shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                  Obtener Acceso Ahora
                </button>
              </SignUpButton>
            </div>
          </div>

          {/* Elementos decorativos de fondo */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
        </section>

        {/* PRICING SECTION */}
        <section
          id="planes"
          className="py-32 container mx-auto px-6 md:px-12 bg-black"
        >
          <div className="flex items-center gap-3 mb-16 justify-center">
            <div className="h-1.5 w-1.5 bg-orange-500 rounded-full" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
              Matriz de Inversión
            </span>
            <div className="h-1.5 w-1.5 bg-orange-500 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {PLANS_DISPLAY.map((plan) => (
              <div
                key={plan.key}
                className={`
                    relative p-10 border flex flex-col min-h-[500px]
                    ${
                      plan.highlight
                        ? "border-orange-500/50 bg-gradient-to-b from-orange-950/10 to-black z-10 scale-105 shadow-2xl shadow-orange-900/20"
                        : "border-zinc-800 bg-zinc-950 hover:border-zinc-600"
                    }
                    transition-all duration-500 group
                  `}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-600 text-white px-4 py-1 text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm shadow-lg">
                    Más Elegido
                  </div>
                )}

                <div className="mb-10 text-center">
                  <h3
                    className={`font-mono text-xs uppercase tracking-[0.2em] mb-4 ${plan.highlight ? "text-orange-400" : "text-zinc-500"}`}
                  >
                    Plan {plan.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-6xl font-bold text-white tracking-tighter">
                      {plan.price}
                    </span>
                    <span className="text-zinc-600 font-mono text-xs self-end mb-2">
                      /MES
                    </span>
                  </div>
                  <p className="text-zinc-500 text-xs mt-6 font-mono uppercase tracking-wide px-4 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div
                  className={`w-full h-px mb-10 ${plan.highlight ? "bg-orange-500/20" : "bg-zinc-800"}`}
                />

                <ul className="space-y-5 mb-12 flex-1 px-2">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-sm font-medium text-zinc-300"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${plan.highlight ? "bg-orange-500" : "bg-zinc-600"}`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <SignUpButton>
                  <button
                    className={`
                        w-full py-4 font-mono text-xs uppercase tracking-[0.15em] font-bold transition-all border rounded-sm
                        ${
                          plan.highlight
                            ? "bg-orange-600 text-white border-orange-600 hover:bg-orange-500 hover:shadow-[0_0_20px_rgba(234,88,12,0.4)]"
                            : "bg-transparent text-white border-zinc-700 hover:border-white hover:bg-white hover:text-black"
                        }
                    `}
                  >
                    Seleccionar
                  </button>
                </SignUpButton>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-zinc-950 border-t border-zinc-900 py-16 text-zinc-500 font-mono text-xs">
          <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-4 w-4 bg-orange-600 rounded-sm" />
                <span className="text-white font-bold tracking-widest text-sm">
                  ANNYA CORP
                </span>
              </div>
              <p className="max-w-xs leading-relaxed">
                Infraestructura de inteligencia de cliente para la próxima
                generación de empresas digitales.
              </p>
            </div>

            <div className="flex gap-12 text-[10px] uppercase tracking-widest">
              <div className="flex flex-col gap-4">
                <span className="text-white font-bold">Plataforma</span>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Tecnología
                </a>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Seguridad
                </a>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Status
                </a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-white font-bold">Empresa</span>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Nosotros
                </a>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Carreras
                </a>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Legal
                </a>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-zinc-900 text-center md:text-left flex flex-col md:flex-row justify-between items-center opacity-40">
            <span>© 2024 ANNYA INC. TODOS LOS DERECHOS RESERVADOS.</span>
            <span>SISTEMA OPERATIVO v1.0.4</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
