/**
 * CLÍNICA EQUILIBREME - JAVASCRIPT PRINCIPAL
 * Interatividade, sliders, formulários e integração WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configurações da Clínica
  const CLINIC_WHATSAPP = '5584999042632'; // (84) 99904-2632

  // =========================================================================
  // 1. DADOS DAS ESPECIALIDADES / PROCEDIMENTOS (Split-card Showcase)
  // =========================================================================
  const proceduresData = [
    {
      id: 'fisioterapia',
      tabName: 'Fisioterapia Especializada',
      tag: 'Reabilitação & Alívio da Dor',
      title: 'Fisioterapia Traumato-Ortopédica',
      description: 'Tratamento individualizado e focado na raiz da sua dor. Atuamos com base em evidências científicas para tratar hérnias de disco, lombalgias, tendinopatias, pré e pós-operatórios, restaurando sua mobilidade articular e função motora plena com segurança e conforto.',
      benefits: ['Avaliação biomecânica 360°', 'Planos 100% personalizados', 'Alívio duradouro de dores crônicas', 'Recuperação funcional ágil'],
      imageOnline: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80',
      imageFallback: 'assets/images/proc-fisioterapia.svg'
    },
    {
      id: 'pilates',
      tabName: 'Studio de Pilates Clínico',
      tag: 'Movimento Consciente & Postura',
      title: 'Pilates Clínico Personalizado',
      description: 'Nosso Studio de Pilates em Natal combina aparelhos modernos e turmas exclusivas de até 2 ou 3 alunos por fisioterapeuta especializado. Desenvolva tônus muscular, alinhamento postural, flexibilidade e estabilidade do core sem sobrecarga articular.',
      benefits: ['Acompanhamento de fisioterapeuta', 'Aparelhos ergonômicos de ponta', 'Aceitamos Wellhub (Plano Silver+)', 'Máximo de 2 a 3 alunos por horário'],
      imageOnline: 'assets/images/proc-pilates-equilibreme-hd.jpg',
      imageFallback: 'assets/images/proc-pilates-equilibreme.jpg'
    },
    {
      id: 'lpf',
      tabName: 'LPF & Ginástica Hipopressiva',
      tag: 'Reprogramação Postural & Core',
      title: 'Low Pressure Fitness (LPF)',
      description: 'Conhecido como a técnica da "barriga negativa", o LPF é um método neuro-mio-fascial avançado que normaliza a pressão intra-abdominal, reabilita diástase, fortalece o assoalho pélvico e melhora a postura e capacidade respiratória de forma profunda.',
      benefits: ['Redução da circunferência abdominal', 'Tratamento e prevenção de diástase', 'Fortalecimento do assoalho pélvico', 'Alívio de dores nas costas'],
      imageOnline: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
      imageFallback: 'assets/images/proc-lpf.svg'
    },
    {
      id: 'terapia-manual',
      tabName: 'Terapia Manual & Liberação',
      tag: 'Relaxamento & Desativação de Gatilhos',
      title: 'Terapia Manual & Liberação Miofascial',
      description: 'Combinação de técnicas manuais precisas, osteopatia e manipulação articular para dissolver nós de tensão, aliviar contraturas imediatas no pescoço e coluna, e restaurar a oxigenação muscular com sensação imediata de leveza.',
      benefits: ['Alívio imediato da rigidez', 'Melhora da circulação e drenagem', 'Devolução da amplitude articular', 'Relaxamento profundo do sistema nervoso'],
      imageOnline: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80',
      imageFallback: 'assets/images/proc-terapia-manual.svg'
    },
    {
      id: 'otorrino',
      tabName: 'Otorrinolaringologia',
      tag: 'Medicina Especializada',
      title: 'Otorrinolaringologia Clínica',
      description: 'Atendimento médico especializado na investigação e tratamento de queixas do ouvido, nariz e garganta. Foco em rinites, sinusites, respiração bucal, perda auditiva, zumbido e distúrbios vestibulares do equilíbrio e labirintite.',
      benefits: ['Consulta médica aprofundada', 'Diagnóstico preciso e seguro', 'Tratamento de vertigem e equilíbrio', 'Manejo de alergias respiratórias'],
      imageOnline: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
      imageFallback: 'assets/images/proc-otorrino.svg'
    },
    {
      id: 'cirurgia-facial',
      tabName: 'Cirurgia Facial & Estética',
      tag: 'Harmonia & Função',
      title: 'Cirurgia Facial e Estética Funcional',
      description: 'Procedimentos médicos faciais realizados com excelência anatômica e refinamento estético. Unimos a melhoria respiratória à harmonia dos traços faciais, preservando sempre a sua naturalidade e identidade.',
      benefits: ['Procedimentos com rigor médico', 'Foco em harmonia natural', 'Recuperação assistida e atenciosa', 'Planejamento individualizado'],
      imageOnline: 'https://images.unsplash.com/photo-1512290900672-1f02e1b12b58?auto=format&fit=crop&w=1000&q=80',
      imageFallback: 'assets/images/proc-cirurgia-facial.svg'
    }
  ];

  let currentProcIndex = 0;

  // Renderizar Tabs de Procedimento
  const tabsContainer = document.getElementById('procedureTabsContainer');
  if (tabsContainer) {
    tabsContainer.innerHTML = proceduresData.map((item, idx) => `
      <button type="button" class="proc-tab-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        ${item.tabName}
      </button>
    `).join('');

    tabsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.proc-tab-btn');
      if (btn) {
        const index = parseInt(btn.dataset.index, 10);
        showProcedure(index);
      }
    });
  }

  // Elementos do Split Card
  const procImgEl = document.getElementById('procCardImage');
  const procTagEl = document.getElementById('procCardTag');
  const procTitleEl = document.getElementById('procCardTitle');
  const procDescEl = document.getElementById('procCardDesc');
  const procBenefitsEl = document.getElementById('procCardBenefits');
  const procCtaBtn = document.getElementById('procCardCta');

  function showProcedure(index) {
    if (index < 0) index = proceduresData.length - 1;
    if (index >= proceduresData.length) index = 0;
    currentProcIndex = index;

    const data = proceduresData[currentProcIndex];

    // Atualizar Tabs
    document.querySelectorAll('.proc-tab-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx === currentProcIndex);
    });

    // Atualizar Split Card com animação suave
    const cardEl = document.getElementById('procedureSplitCard');
    if (cardEl) cardEl.style.opacity = '0.5';

    setTimeout(() => {
      if (procImgEl) {
        procImgEl.src = data.imageOnline;
        procImgEl.onerror = () => { procImgEl.src = data.imageFallback; };
        procImgEl.alt = data.title;
      }
      if (procTagEl) procTagEl.textContent = data.tag;
      if (procTitleEl) procTitleEl.textContent = data.title;
      if (procDescEl) procDescEl.textContent = data.description;
      if (procBenefitsEl) {
        procBenefitsEl.innerHTML = data.benefits.map(b => `<span class="proc-benefit-pill">${b}</span>`).join('');
      }
      if (procCtaBtn) {
        procCtaBtn.dataset.specialty = data.title;
      }
      if (cardEl) cardEl.style.opacity = '1';
    }, 150);
  }

  // Botões de navegação Próximo / Anterior
  const prevBtn = document.getElementById('procPrevBtn');
  const nextBtn = document.getElementById('procNextBtn');

  if (prevBtn) prevBtn.addEventListener('click', () => showProcedure(currentProcIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showProcedure(currentProcIndex + 1));

  // Inicializar primeiro item
  showProcedure(0);

  // =========================================================================
  // 2. MODAL DE AGENDAMENTO RÁPIDO
  // =========================================================================
  const bookingModal = document.getElementById('bookingModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const bookingForm = document.getElementById('bookingForm');
  const modalSpecialtySelect = document.getElementById('modalSpecialty');

  function openBookingModal(preselectedSpecialty = '') {
    if (bookingModal) {
      if (modalSpecialtySelect && preselectedSpecialty) {
        let matched = false;
        for (let i = 0; i < modalSpecialtySelect.options.length; i++) {
          if (modalSpecialtySelect.options[i].value === preselectedSpecialty) {
            modalSpecialtySelect.selectedIndex = i;
            matched = true;
            break;
          }
        }
        if (!matched) {
          const opt = new Option(preselectedSpecialty, preselectedSpecialty, true, true);
          modalSpecialtySelect.add(opt);
          modalSpecialtySelect.value = preselectedSpecialty;
        }
      }
      bookingModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeBookingModal() {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeBookingModal);

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeBookingModal();
    });
  }

  // Delegar cliques em botões de agendamento no site inteiro
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-modal="booking"]');
    if (trigger) {
      e.preventDefault();
      const spec = trigger.dataset.specialty || '';
      openBookingModal(spec);
    }
  });

  // Envio do formulário do Modal direcionando para WhatsApp
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName')?.value.trim() || 'Paciente';
      const phone = document.getElementById('modalPhone')?.value.trim() || '';
      const specialty = modalSpecialtySelect?.value || 'Consulta Geral';
      const shift = document.getElementById('modalShift')?.value || 'Qualquer horário';
      const notes = document.getElementById('modalNotes')?.value.trim() || '';

      const msg = `Olá, Equipe Clínica Equilibreme! Meu nome é *${name}*.\n\n` +
                  `Gostaria de agendar uma consulta/avaliação:\n` +
                  `• *Especialidade:* ${specialty}\n` +
                  `• *Turno de preferência:* ${shift}\n` +
                  (phone ? `• *Telefone/WhatsApp:* ${phone}\n` : '') +
                  (notes ? `• *Observações:* ${notes}\n\n` : '\n') +
                  `Poderiam me informar os horários disponíveis? Obrigado(a)!`;

      const waUrl = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
      closeBookingModal();
      showToast('Redirecionando para o WhatsApp da Clínica...');
    });
  }

  // =========================================================================
  // 3. FORMULÁRIO "FALE CONOSCO" (Seção de Contato)
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value.trim() || 'Paciente';
      const email = document.getElementById('contactEmail')?.value.trim() || '';
      const phone = document.getElementById('contactPhone')?.value.trim() || '';
      const specialty = document.getElementById('contactSpecialty')?.value || 'Atendimento Geral';
      const message = document.getElementById('contactMessage')?.value.trim() || '';

      const msg = `Olá, Clínica Equilibreme!\n\n` +
                  `Contato recebido pelo site:\n` +
                  `• *Nome:* ${name}\n` +
                  (email ? `• *E-mail:* ${email}\n` : '') +
                  (phone ? `• *Telefone:* ${phone}\n` : '') +
                  `• *Interesse:* ${specialty}\n` +
                  (message ? `• *Mensagem:* ${message}\n` : '');

      const waUrl = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
      contactForm.reset();
      showToast('Mensagem enviada com sucesso! Abrindo WhatsApp...');
    });
  }

  // =========================================================================
  // 4. FLOATING WHATSAPP & POPOVER
  // =========================================================================
  const waFloatBtn = document.getElementById('whatsappFloatingBtn');
  const waPopover = document.getElementById('whatsappPopover');
  const waPopoverClose = document.getElementById('whatsappPopoverClose');
  const waQuickSend = document.getElementById('whatsappQuickSend');

  if (waFloatBtn && waPopover) {
    waFloatBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      waPopover.classList.toggle('active');
    });

    if (waPopoverClose) {
      waPopoverClose.addEventListener('click', (e) => {
        e.stopPropagation();
        waPopover.classList.remove('active');
      });
    }

    if (waQuickSend) {
      waQuickSend.addEventListener('click', () => {
        const defaultMsg = 'Olá! Gostaria de tirar dúvidas sobre os atendimentos e valores na Clínica Equilibreme.';
        const url = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(defaultMsg)}`;
        window.open(url, '_blank');
        waPopover.classList.remove('active');
      });
    }

    // Fechar popover ao clicar fora
    document.addEventListener('click', (e) => {
      if (!waPopover.contains(e.target) && e.target !== waFloatBtn) {
        waPopover.classList.remove('active');
      }
    });

    // Exibir sutilmente o popover após 6 segundos na página pela primeira vez
    setTimeout(() => {
      if (!sessionStorage.getItem('waPopoverShown')) {
        waPopover.classList.add('active');
        sessionStorage.setItem('waPopoverShown', 'true');
      }
    }, 6000);
  }

  // =========================================================================
  // 5. MENU MOBILE DRAWER
  // =========================================================================
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileOverlay = document.getElementById('mobileDrawerOverlay');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');

  function openMobileNav() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.add('active');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileNav() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileNav);
  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileNav);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileNav);

  // Fechar drawer ao clicar em um link interno
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // =========================================================================
  // 6. ACCORDION FAQ
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });

  // =========================================================================
  // 7. SCROLL SPY & EFEITO SCROLLED PARA HEADER CLEAN
  // =========================================================================
  const siteHeaderEl = document.getElementById('siteHeader');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header-nav-menu .nav-link, .mobile-nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Adicionar classe scrolled no header após 20px de rolagem
    if (siteHeaderEl) {
      if (scrollY > 20) {
        siteHeaderEl.classList.add('scrolled');
      } else {
        siteHeaderEl.classList.remove('scrolled');
      }
    }

    let currentId = '';
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // =========================================================================
  // 8. CARROSSEL DE PROFISSIONAIS (Equipe Oficial)
  // =========================================================================
  const teamTrack = document.getElementById('teamCarouselTrack');
  const teamPrev = document.getElementById('teamPrevBtn');
  const teamNext = document.getElementById('teamNextBtn');
  const teamDotsWrap = document.getElementById('teamDotsContainer');
  const teamSlides = document.querySelectorAll('.team-carousel-slide');

  if (teamTrack && teamSlides.length > 0) {
    let currentTeamIndex = 0;

    function getVisibleCardsCount() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function getMaxIndex() {
      const visible = getVisibleCardsCount();
      return Math.max(0, teamSlides.length - visible);
    }

    function updateTeamCarousel() {
      const maxIdx = getMaxIndex();
      if (currentTeamIndex > maxIdx) currentTeamIndex = maxIdx;
      if (currentTeamIndex < 0) currentTeamIndex = 0;

      const slide = teamSlides[0];
      const slideWidth = slide.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(teamTrack).gap) || 24;
      const offset = currentTeamIndex * (slideWidth + gap);

      teamTrack.style.transform = `translateX(-${offset}px)`;

      // Atualizar Dots
      if (teamDotsWrap) {
        const dots = teamDotsWrap.querySelectorAll('.team-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentTeamIndex);
        });
      }
    }

    function renderDots() {
      if (!teamDotsWrap) return;
      const maxIdx = getMaxIndex();
      const numDots = maxIdx + 1;
      teamDotsWrap.innerHTML = '';
      for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `team-dot ${i === currentTeamIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
        dot.addEventListener('click', () => {
          currentTeamIndex = i;
          updateTeamCarousel();
        });
        teamDotsWrap.appendChild(dot);
      }
    }

    if (teamPrev) {
      teamPrev.addEventListener('click', () => {
        const maxIdx = getMaxIndex();
        currentTeamIndex = (currentTeamIndex > 0) ? currentTeamIndex - 1 : maxIdx;
        updateTeamCarousel();
      });
    }

    if (teamNext) {
      teamNext.addEventListener('click', () => {
        const maxIdx = getMaxIndex();
        currentTeamIndex = (currentTeamIndex < maxIdx) ? currentTeamIndex + 1 : 0;
        updateTeamCarousel();
      });
    }

    // Suporte a deslize por toque (Swipe touch)
    let startX = 0;
    let isSwiping = false;

    teamTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
    }, { passive: true });

    teamTrack.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        const maxIdx = getMaxIndex();
        if (diff > 0) {
          currentTeamIndex = (currentTeamIndex < maxIdx) ? currentTeamIndex + 1 : 0;
        } else {
          currentTeamIndex = (currentTeamIndex > 0) ? currentTeamIndex - 1 : maxIdx;
        }
        updateTeamCarousel();
      }
      isSwiping = false;
    });

    window.addEventListener('resize', () => {
      renderDots();
      updateTeamCarousel();
    });

    renderDots();
    updateTeamCarousel();
  }

  // =========================================================================
  // 9. UTILITÁRIO DE TOAST
  // =========================================================================
  function showToast(message) {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
});

