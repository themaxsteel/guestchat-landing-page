// Site-wide config — mirrors the editable props from the original design.
export const site = {
  name: 'GuestChat',
  // Raw WhatsApp number (digits only, international format without +).
  whatsappNumber: '6281200000000',
  email: 'halo@guestchat.id',
  phoneDisplay: '+62 812-0000-0000',
  location: 'Jakarta, Indonesia',
  // Toggle optional sections.
  showLogoBar: true,
  // Disabled until real customer quotes are available — see Testimonials.astro.
  showTestimonials: false,
};

// Derived helpers.
export const waHref = `https://wa.me/${site.whatsappNumber.replace(/[^0-9]/g, '')}`;
export const year = new Date().getFullYear();
