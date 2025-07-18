import { useEffect, useState, useRef } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Index() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const projects: Project[] = [
    {
      id: 1,
      title: "Xiaomi",
      description:
        "Создание динамичной анимации для презентации нового продукта Xiaomi с использованием 3D-симуляций и физики частиц.",
    },
    {
      id: 2,
      title: "Rabbit",
      description:
        "Разработка анимационного ролика для бренда Rabbit с акцентом на плавные переходы и органические формы.",
    },
    {
      id: 3,
      title: "Tesori d'Oriente",
      description:
        "Премиальная анимация для парфюмерного бренда с использованием симуляции жидкостей и золотых частиц.",
    },
    {
      id: 4,
      title: "Nebula",
      description:
        "Космическая анимация с симуляцией туманностей и звездных систем для технологического стартапа.",
    },
    {
      id: 5,
      title: "Xbox",
      description:
        "Игровая анимация для Xbox с динамичными переходами и энергичными эффектами.",
    },
  ];

  useEffect(() => {
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);

    // Apply dark mode class to document
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }

    // Scroll handler
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Update active section
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Initialize particles
    initParticles();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Update document class when dark mode changes
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const initParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 42, 109, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  };

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Спасибо за сообщение! Я свяжусь с вами в ближайшее время.");
    setFormData({ name: "", email: "", message: "" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen w-full font-montserrat transition-all duration-700 ${
        darkMode ? "bg-dark-bg text-white" : "bg-light-bg text-black"
      }`}
    >
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-brand-pink z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header */}
      <div
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 backdrop-blur-md ${
          darkMode ? "bg-dark-bg/90" : "bg-light-bg/90"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold font-oswald">DA</div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="cursor-pointer transition-colors duration-300 hover:text-brand-pink"
            >
              Обо мне
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="cursor-pointer transition-colors duration-300 hover:text-brand-pink"
            >
              Портфолио
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="cursor-pointer transition-colors duration-300 hover:text-brand-pink"
            >
              Процесс
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="cursor-pointer transition-colors duration-300 hover:text-brand-pink"
            >
              Ц��ны
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="cursor-pointer transition-colors duration-300 hover:text-brand-pink"
            >
              Контакты
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-all duration-300 hover:bg-brand-pink hover:text-white"
            >
              <span className="text-xl">{darkMode ? "☀️" : "🌙"}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2"
            >
              <div className="space-y-1">
                <div
                  className={`w-6 h-0.5 transition-all duration-300 ${
                    darkMode ? "bg-white" : "bg-black"
                  }`}
                />
                <div
                  className={`w-6 h-0.5 transition-all duration-300 ${
                    darkMode ? "bg-white" : "bg-black"
                  }`}
                />
                <div
                  className={`w-6 h-0.5 transition-all duration-300 ${
                    darkMode ? "bg-white" : "bg-black"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className={`lg:hidden absolute top-full left-0 w-full backdrop-blur-md transition-all duration-300 ${
              darkMode ? "bg-dark-bg/95" : "bg-light-bg/95"
            }`}
          >
            <nav className="flex flex-col p-6 gap-4">
              <button
                onClick={() => scrollToSection("about")}
                className="cursor-pointer py-2 transition-colors duration-300 hover:text-brand-pink text-left"
              >
                Обо мне
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="cursor-pointer py-2 transition-colors duration-300 hover:text-brand-pink text-left"
              >
                Портфолио
              </button>
              <button
                onClick={() => scrollToSection("process")}
                className="cursor-pointer py-2 transition-colors duration-300 hover:text-brand-pink text-left"
              >
                Процесс
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="cursor-pointer py-2 transition-colors duration-300 hover:text-brand-pink text-left"
              >
                Цены
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="cursor-pointer py-2 transition-colors duration-300 hover:text-brand-pink text-left"
              >
                Контакты
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl sm:text-4xl font-bold font-oswald mb-6 leading-tight">
            <span>ДВИЖЕНИЕ, КОТОРОЕ</span>
            <br />
            <span className="text-brand-pink">РАБОТАЕТ</span>
          </h1>
          <p className="text-xl sm:text-lg mb-12 opacity-80">
            Аним��ция с фокусом на результат!
          </p>
          <div className="animate-bounce">
            <svg
              className="w-8 h-8 mx-auto text-brand-pink"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="w-80 h-80 sm:w-60 sm:h-60 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl transform transition-transform duration-700 hover:scale-105">
                <img
                  src="https://placehold.co/400x400/FF2A6D/FFFFFF?text=DA"
                  alt="Андреев Даниил"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-5xl sm:text-3xl font-bold font-oswald mb-4">
                АНДРЕЕВ ДАНИИЛ
              </h2>
              <p className="text-xl text-brand-pink mb-2">
                3D&2D motion-design
              </p>
              <p className="text-lg opacity-80 mb-6">ОПЫТ: 2,5 года</p>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>Привет!</p>
                <p>
                  Я создаю движение, которое работает. Мои проекты не пр��сто
                  удивляют физикой (жидкости, ткани, частицы), но и решают
                  задачи: удерживают внимание, повышают конверсию, привлекают
                  новую аудиторию.
                </p>
                <p>
                  Готов вникнуть в вашу задачу и превратить её в анимационный
                  дизайн, который запомнится.
                </p>
                <p className="font-semibold">
                  Давайте заставим ваш бренд двигаться в нужном нап��авлении.
                </p>
              </div>
              <button
                onClick={() => scrollToSection("contact")}
                className="mt-8 px-8 py-4 bg-brand-pink text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                Связаться
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className={`py-20 px-6 ${darkMode ? "bg-dark-section" : "bg-light-section"}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl sm:text-3xl font-bold font-oswald text-center mb-16">
            Избранные проекты
          </h2>

          {/* Main Video */}
          <div className="mb-16">
            <div className="aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://player.vimeo.com/video/1087096327?h=d67282878d&autoplay=0&loop=1&title=0&byline=0&portrait=0"
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => openModal(project)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${
                  darkMode
                    ? "bg-dark-bg border border-dark-border"
                    : "bg-white border border-light-border"
                }`}
              >
                <div className="w-full h-48 rounded-lg bg-gradient-to-br from-brand-pink/20 to-brand-pink/5 mb-4 flex items-center justify-center">
                  <span className="text-brand-pink font-bold text-2xl font-oswald">
                    {project.title}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-oswald mb-2">
                  {project.title}
                </h3>
                <p className="text-sm opacity-80">{project.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-block px-6 py-3 rounded-full border-2 border-brand-pink text-brand-pink font-semibold">
              Ещё 12+ проектов доступны по запросу
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl sm:text-3xl font-bold font-oswald text-center mb-16">
            От идеи до реализации
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {[
              {
                icon: "📝",
                title: "БРИФИНГ",
                items: [
                  "Обсуждение целей",
                  "Анализ це��евой аудитории",
                  "Определение KPI",
                ],
              },
              {
                icon: "💡",
                title: "КОНЦЕПЦИЯ",
                items: [
                  "Разработка сценария",
                  "Раскадровка",
                  "Стилистические referencer",
                ],
              },
              {
                icon: "✨",
                title: "ПРОИЗВОДСТВО",
                items: [
                  "3D-моделирование",
                  "Анимация физики (жидкости/ткани)",
                  "Симуляция частиц",
                ],
              },
              {
                icon: "🎬",
                title: "ПОСТ-ПРОДАКШН",
                items: ["Цветокоррекция", "Композитинг", "Звуковое оформление"],
              },
              {
                icon: "🚀",
                title: "РЕЛИЗ",
                items: [
                  "Адаптация под платформы",
                  "Техническая аналитика",
                  "О��тимизация",
                ],
              },
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-pink flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-110">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold font-oswald mb-4">
                  {step.title}
                </h3>
                <ul className="space-y-2 text-sm opacity-80">
                  {step.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className={`py-20 px-6 ${darkMode ? "bg-dark-section" : "bg-light-section"}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl sm:text-4xl font-bold font-oswald mb-6">
              <span>ПРОЕКТЫ ОЦЕНИВАЮТСЯ</span>
              <br />
              <span>ИНДИВИДУАЛЬНО</span>
            </h2>
            <p className="text-2xl sm:text-xl text-brand-pink font-semibold">
              СТАРТОВАЯ СТОИМОСТЬ: ОТ 3000 ₽/СЕК
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Базовый",
                features: ["До 15 сек", "1 концепция", "3 правки"],
                popular: false,
              },
              {
                title: "Про",
                features: ["До 60 сек", "Физика симуляций", "2 концепции"],
                popular: true,
              },
              {
                title: "Премиум",
                features: [
                  "Full production",
                  "Кастомные симуляции",
                  "Приоритетный срок",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:border-brand-pink hover:shadow-xl relative ${
                  plan.popular
                    ? "border-brand-pink"
                    : darkMode
                      ? "border-dark-border bg-dark-bg"
                      : "border-light-border bg-white"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-brand-pink text-white px-4 py-1 text-sm font-semibold">
                    Популярный
                  </div>
                )}
                <h3 className="text-2xl font-bold font-oswald mb-6">
                  {plan.title}
                </h3>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-brand-pink rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl sm:text-3xl font-bold font-oswald text-center mb-16">
            Контакты
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <form onSubmit={submitForm} className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Ваше имя"
                    required
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 focus:border-brand-pink focus:outline-none ${
                      darkMode
                        ? "bg-dark-bg border-dark-border text-white"
                        : "bg-white border-light-border text-black"
                    }`}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Email"
                    required
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 focus:border-brand-pink focus:outline-none ${
                      darkMode
                        ? "bg-dark-bg border-dark-border text-white"
                        : "bg-white border-light-border text-black"
                    }`}
                  />
                </div>
                <div>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Сообщение"
                    rows={6}
                    required
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 focus:border-brand-pink focus:outline-none resize-none ${
                      darkMode
                        ? "bg-dark-bg border-dark-border text-white"
                        : "bg-white border-light-border text-black"
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-brand-pink text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                >
                  Отправить сообщение
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold font-oswald mb-4">
                  СВЯЖИТЕСЬ СО МНОЙ:
                </h3>
                <div className="space-y-3">
                  <p>
                    <span className="font-semibold">Telegram:</span>{" "}
                    <a
                      href="https://t.me/washington_pip"
                      className="text-brand-pink hover:underline"
                    >
                      @washington_pip
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    <a
                      href="mailto:dastudiomotiondesign@gmail.com"
                      className="text-brand-pink hover:underline"
                    >
                      dastudiomotiondesign@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-oswald mb-4">
                  МОИ РАБОТЫ:
                </h3>
                <div className="space-y-3">
                  <p>
                    <span className="font-semibold">Behance:</span>{" "}
                    <a
                      href="https://www.behance.net/daniilandreev7"
                      className="text-brand-pink hover:underline"
                    >
                      daniilandreev7
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Telegram-канал:</span>{" "}
                    <a
                      href="https://t.me/andreevmotion"
                      className="text-brand-pink hover:underline"
                    >
                      @andreevmotion
                    </a>
                  </p>
                </div>
              </div>

              <div
                className={`mt-8 p-6 rounded-lg ${
                  darkMode ? "bg-dark-bg" : "bg-light-section"
                }`}
              >
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <img
                    src="https://placehold.co/600x300/FF2A6D/FFFFFF?text=World+Map"
                    alt="Карта клиентов"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 px-6 border-t ${
          darkMode
            ? "border-dark-border bg-dark-section"
            : "border-light-border bg-light-section"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between sm:flex-col sm:gap-6">
            <div className="flex items-center gap-4 sm:flex-col sm:text-center">
              <div className="text-3xl font-bold font-oswald">DA</div>
              <p className="opacity-60">© 2023 Andreev Motion Design</p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://vimeo.com/user123456789"
                className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z" />
                </svg>
              </a>
              <a
                href="https://www.behance.net/daniilandreev7"
                className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                </svg>
              </a>
              <a
                href="https://t.me/washington_pip"
                className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {scrollProgress > 20 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-brand-pink text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-30"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      {/* Modal */}
      {showModal && selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6"
          onClick={closeModal}
        >
          <div
            className={`rounded-2xl max-w-2xl w-full p-8 relative ${
              darkMode ? "bg-dark-bg text-white" : "bg-white text-black"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-brand-pink text-white flex items-center justify-center"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-2xl font-bold font-oswald mb-4">
              {selectedProject.title}
            </h3>
            <p className="text-lg leading-relaxed">
              {selectedProject.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
