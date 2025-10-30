export type Lang = 'en' | 'es';

type Dict = Record<string, string>;

const en: Dict = {
  // Header / Nav
  'nav.services': 'Services',
  'nav.why': 'Why Us',
  'nav.testimonials': 'Testimonials',
  'nav.about': 'About',
  'nav.findus': 'Find Us',
  'nav.quote': 'Pricing & Quote',
  'nav.instagram': 'Instagram',
  'cta.book': 'Book Now',

  // Hero
  'hero.title.pre': 'Professional Cleaning Services for',
  'hero.title.hl': 'Homes & Offices',
  'hero.sub': 'Reliable, eco-friendly, and affordable cleaning you can trust.',
  'hero.cta.quote': 'Get a Free Quote',
  'hero.cta.call': 'Call (801) 860-6299',
  'hero.d1': '24/7 Emergency or scheduled',
  'hero.d2': 'Bilingual support (English & Español)',
  'hero.d3': 'One-time, weekly, bi-weekly, or monthly!',

  // Sections titles
  'services.title': 'Our Services',
  'why.title': 'Why Choose Latin Cleaning?',
  'testimonials.title': 'What Our Customers Say',
  'about.title': 'About Us',
  'findus.title': 'Find Us',
  'quote.title': 'Pricing & Free Quote',

  // Services cards
  'svc.res.title': 'Residential Cleaning',
  'svc.res.desc': 'Regular or deep cleans to keep your home fresh and healthy.',
  'svc.com.title': 'Commercial Cleaning',
  'svc.com.desc': 'Reliable service for offices, shops, and shared workspaces.',
  'svc.deep.title': 'Deep Cleaning',
  'svc.deep.desc': 'Top-to-bottom detailing for kitchens, bathrooms, and more.',
  'svc.move.title': 'Move-in/Move-out',
  'svc.move.desc': 'Perfect finish for new tenants or smooth move-outs.',
  'svc.carpet.title': 'Carpet & Upholstery',
  'svc.carpet.desc': 'Refresh fabrics and remove stubborn stains and odors.',

  // Why features
  'why.f1.t': 'Background-Checked Staff',
  'why.f1.d': 'Trained professionals you can trust in your space.',
  'why.f2.t': 'Eco-friendly Products',
  'why.f2.d': 'We use safe, effective products for your family and pets.',
  'why.f3.t': 'Flexible Scheduling',
  'why.f3.d': 'Book one-time or recurring plans to fit your lifestyle.',
  'why.f4.t': 'Satisfaction Guarantee',
  'why.f4.d': "If something's not perfect, we'll make it right.",

  // Find Us
  'findus.serviceArea': 'Service Area',
  'findus.more': '…and more nearby areas too!',
  'findus.address': 'Address',
  'findus.phone': 'Phone',
  'findus.email': 'Email',
  'findus.call': 'Call Us',
  'findus.mail': 'Email Us',
  'findus.maps': 'Open in Google Maps',

  // Footer
  'footer.contact': 'Contact',
  'footer.quick': 'Quick Links',
  'footer.privacy': 'Privacy Policy',

  // Quote form
  'quote.name': 'Name',
  'quote.email': 'Email',
  'quote.phone': 'Phone',
  'quote.type': 'Service Type',
  'quote.date': 'Preferred Date',
  'quote.time': 'Preferred Time',
  'quote.details': 'Details',
  'quote.select': 'Select…',
  'quote.submit': 'Request Quote',
  'quote.residential': 'Residential',
  'quote.commercial': 'Commercial',
  'quote.deep': 'Deep Cleaning',
  'quote.move': 'Move-in/Move-out',
  'quote.carpet': 'Carpet & Upholstery',
};

const es: Dict = {
  'nav.services': 'Servicios',
  'nav.why': '¿Por qué nosotros?',
  'nav.testimonials': 'Testimonios',
  'nav.about': 'Acerca de',
  'nav.findus': 'Encuéntranos',
  'nav.quote': 'Precios y Cotización',
  'nav.instagram': 'Instagram',
  'cta.book': 'Reservar Ahora',

  'hero.title.pre': 'Servicios de limpieza profesional para',
  'hero.title.hl': 'Hogares y Oficinas',
  'hero.sub': 'Limpieza confiable, ecológica y asequible en la que puedes confiar.',
  'hero.cta.quote': 'Obtener cotización gratis',
  'hero.cta.call': 'Llamar (801) 860-6299',
  'hero.d1': 'Emergencia 24/7 o programada',
  'hero.d2': 'Soporte bilingüe (Inglés y Español)',
  'hero.d3': '¡Única, semanal, quincenal o mensual!',

  'services.title': 'Nuestros Servicios',
  'why.title': '¿Por qué elegir Latin Cleaning?',
  'testimonials.title': 'Lo que dicen nuestros clientes',
  'about.title': 'Sobre nosotros',
  'findus.title': 'Encuéntranos',
  'quote.title': 'Precios y Cotización Gratis',

  'svc.res.title': 'Limpieza Residencial',
  'svc.res.desc': 'Limpiezas regulares o profundas para un hogar fresco y saludable.',
  'svc.com.title': 'Limpieza Comercial',
  'svc.com.desc': 'Servicio confiable para oficinas, tiendas y espacios compartidos.',
  'svc.deep.title': 'Limpieza Profunda',
  'svc.deep.desc': 'Detalle total para cocinas, baños y más.',
  'svc.move.title': 'Mudanza (Entrada/Salida)',
  'svc.move.desc': 'Acabado perfecto para nuevos inquilinos o entregas sin problemas.',
  'svc.carpet.title': 'Alfombras y Tapicería',
  'svc.carpet.desc': 'Refresca telas y elimina manchas y olores difíciles.',

  'why.f1.t': 'Personal verificado',
  'why.f1.d': 'Profesionales capacitados en quienes confiar tu espacio.',
  'why.f2.t': 'Productos ecológicos',
  'why.f2.d': 'Productos seguros y efectivos para tu familia y mascotas.',
  'why.f3.t': 'Horarios flexibles',
  'why.f3.d': 'Agenda única o recurrente, como mejor te convenga.',
  'why.f4.t': 'Garantía de satisfacción',
  'why.f4.d': 'Si algo no queda perfecto, lo corregimos.',

  'findus.serviceArea': 'Área de servicio',
  'findus.more': '…¡y más zonas cercanas!',
  'findus.address': 'Dirección',
  'findus.phone': 'Teléfono',
  'findus.email': 'Correo',
  'findus.call': 'Llamar',
  'findus.mail': 'Enviar correo',
  'findus.maps': 'Abrir en Google Maps',

  'footer.contact': 'Contacto',
  'footer.quick': 'Accesos rápidos',
  'footer.privacy': 'Política de Privacidad',

  'quote.name': 'Nombre',
  'quote.email': 'Correo electrónico',
  'quote.phone': 'Teléfono',
  'quote.type': 'Tipo de servicio',
  'quote.date': 'Fecha preferida',
  'quote.time': 'Hora preferida',
  'quote.details': 'Detalles',
  'quote.select': 'Seleccionar…',
  'quote.submit': 'Solicitar cotización',
  'quote.residential': 'Residencial',
  'quote.commercial': 'Comercial',
  'quote.deep': 'Limpieza profunda',
  'quote.move': 'Mudanza (Entrada/Salida)',
  'quote.carpet': 'Alfombras y tapicería',
};

export const dict: Record<Lang, Dict> = { en, es };

export function translate(lang: Lang, key: string): string {
  const d = dict[lang] || dict.en;
  return d[key] ?? dict.en[key] ?? key;
}

