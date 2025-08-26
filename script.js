// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if(id.length > 1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth'});
    }
  });
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    }
  })
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Parallax on hero art
const heroArt = document.querySelector('.hero__art');
if(heroArt){
  document.addEventListener('mousemove', (e)=>{
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    heroArt.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// Quote form validation (simple client-side)
const form = document.getElementById('quoteForm');
const statusEl = document.getElementById('formStatus');

function setError(field, msg){
  field.parentElement.querySelector('.error').textContent = msg || '';
}
function clearErrors(){
  form.querySelectorAll('.error').forEach(e => e.textContent = '');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  const data = Object.fromEntries(new FormData(form).entries());
  let valid = true;

  if(!data.name || data.name.trim().length < 2){ setError(form.elements.name, 'Please enter your name.'); valid=false; }
  if(!data.phone || data.phone.replace(/\D/g,'').length < 10){ setError(form.elements.phone, 'Enter a valid phone number.'); valid=false; }
  if(!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){ setError(form.elements.email, 'Enter a valid email.'); valid=false; }
  ['type','date','time','message'].forEach(key=>{
    if(!data[key] || !String(data[key]).trim()){ setError(form.elements[key], 'Required.'); valid=false; }
  });

  if(!valid){
    statusEl.className = 'form-status is-error';
    statusEl.textContent = 'Please fix the highlighted fields and try again.';
    return;
  }

  statusEl.className = 'form-status is-success';
  statusEl.textContent = 'Thanks! Your request was received. We will contact you shortly.';
  form.reset();
});

// Before/After slider
const range = document.querySelector('.ba__range');
const overlay = document.querySelector('.ba__overlay');
if(range && overlay){
  range.addEventListener('input', () => {
    overlay.style.width = range.value + '%';
  });
}
