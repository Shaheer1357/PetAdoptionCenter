/**
 * Petofy – Your New Best Friend
 * JavaScript Functionality (Multi-page, Modals, Search, Theme, Form)
 */

// Pet Dataset
const petsData = [
    {
        id: 1,
        name: "Coco",
        type: "Cat",
        category: "cat",
        age: "20 Days",
        breed: "Persian Cat",
        fee: "$50",
        image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80",
        description: "Coco is a tiny, super fluffy Persian kitten with a sweet temperament. She loves lap naps and gentle pets!"
    },
    {
        id: 2,
        name: "Rex",
        type: "Dog",
        category: "dog",
        age: "2 Years",
        breed: "Golden Retriever",
        fee: "$150",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
        description: "Rex is an energetic and friendly Golden Retriever who loves long outdoor walks, playing fetch, and cuddling."
    },
    {
        id: 3,
        name: "Icy",
        type: "Donkey",
        category: "other",
        age: "1 Year",
        breed: "Mammoth",
        fee: "$100",
        image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=800&q=80",
        description: "Icy is a gentle 1-year-old Mammoth donkey with soft fur and a calm demeanor. Great with families!"
    },
    {
        id: 4,
        name: "Frost",
        type: "Horse",
        category: "horse",
        age: "1.5 Years",
        breed: "Green Monkey",
        fee: "$250",
        image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80",
        description: "Frost is a magnificent horse lineaged from the Green Monkey breed, possessing grace, intelligence, and agility."
    },
    {
        id: 5,
        name: "Bella",
        type: "Rabbit",
        category: "other",
        age: "6 Months",
        breed: "Holland Lop",
        fee: "$30",
        image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80",
        description: "Bella is a curious lop-eared bunny who enjoys munching on fresh carrots and soft grass."
    },
    {
        id: 6,
        name: "Milo",
        type: "Cat",
        category: "cat",
        age: "1 Year",
        breed: "Siamese",
        fee: "$60",
        image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=800&q=80",
        description: "Milo is a vocal, inquisitive Siamese cat with striking blue eyes who loves interactive toys."
    },
    {
        id: 7,
        name: "Luna",
        type: "Dog",
        category: "dog",
        age: "8 Months",
        breed: "French Bulldog",
        fee: "$120",
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
        description: "Luna is a playful puppy with endless enthusiasm and cute bat-like ears."
    },
    {
        id: 8,
        name: "Barnaby",
        type: "Goat",
        category: "other",
        age: "2 Years",
        breed: "Pygmy Goat",
        fee: "$80",
        image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80",
        description: "Barnaby is an adventurous pygmy goat who loves running around open pastures and meeting friendly people."
    }
];

let selectedPet = null;

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initThemeToggle();
    initBackButton();

    // Check features depending on page
    if (document.getElementById('sliderWrapper')) initImageSlider();
    if (document.getElementById('petGrid')) initPetsGallery();
    if (document.getElementById('adoptionForm')) initAdoptionForm();
    if (document.querySelectorAll('.accordion-header').length > 0) initAccordions();
    if (document.getElementById('faqSearchInput')) initFAQSearch();
});

/* Navigation & Mobile Hamburger */
function initNavigation() {
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }
}

/* Theme Toggle (Dark / Light) */
function initThemeToggle() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem('petofyTheme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeBtn) themeBtn.innerText = '☀️';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeBtn.innerText = isDark ? '☀️' : '🌙';
            localStorage.setItem('petofyTheme', isDark ? 'dark' : 'light');
        });
    }
}

/* Back Button Integration */
function initBackButton() {
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (document.referrer && document.referrer.includes(window.location.host)) {
                window.history.back();
            } else {
                window.location.href = 'index.html';
            }
        });
    }
}

/* Landing Page Slider */
function initImageSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoSlideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (index + slideCount) % slideCount;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    function startAutoSlide() { autoSlideInterval = setInterval(nextSlide, 4000); }
    function resetAutoSlide() { clearInterval(autoSlideInterval); startAutoSlide(); }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => { showSlide(index); resetAutoSlide(); });
    });

    startAutoSlide();
}

/* Pets Gallery & Filters */
function initPetsGallery() {
    const petGrid = document.getElementById('petGrid');
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const noResults = document.getElementById('noResults');

    let currentCategory = 'all';
    let searchQuery = '';

    function renderPets() {
        petGrid.innerHTML = '';
        const filtered = petsData.filter(pet => {
            const matchesCategory = currentCategory === 'all' || pet.category === currentCategory;
            const matchesSearch = pet.name.toLowerCase().includes(searchQuery) ||
                                  pet.type.toLowerCase().includes(searchQuery) ||
                                  pet.breed.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
            filtered.forEach(pet => {
                const card = createPetCard(pet);
                petGrid.appendChild(card);
            });
        }
    }

    function createPetCard(pet) {
        const card = document.createElement('div');
        card.className = 'pet-card';
        card.innerHTML = `
            <img class="pet-card-img" src="${pet.image}" alt="${pet.name}">
            <div class="pet-card-body">
                <div class="pet-card-header">
                    <h3 class="pet-name">${pet.name}</h3>
                    <span class="badge">${pet.type}</span>
                </div>
                <div class="pet-info">
                    <p><strong>Age:</strong> ${pet.age}</p>
                    <p><strong>Breed:</strong> ${pet.breed}</p>
                    <p><strong>Fee:</strong> <span class="fee-badge">${pet.fee}</span></p>
                </div>
                <button class="btn btn-primary btn-block view-details-btn" data-id="${pet.id}">
                    View Details
                </button>
            </div>
        `;

        card.querySelector('.view-details-btn').addEventListener('click', () => {
            openPetModal(pet);
        });

        return card;
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            renderPets();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderPets();
        });
    }

    renderPets();
    initModalEvents();
}

/* Modals & Adoption Logic */
function openPetModal(pet) {
    selectedPet = pet;
    
    document.getElementById('modalImg').src = pet.image;
    document.getElementById('modalName').innerText = pet.name;
    document.getElementById('modalTypeBadge').innerText = pet.type;
    document.getElementById('modalAge').innerText = pet.age;
    document.getElementById('modalBreed').innerText = pet.breed;
    document.getElementById('modalFee').innerText = pet.fee;
    document.getElementById('modalDesc').innerText = pet.description;

    document.getElementById('petModal').classList.remove('hidden');
}

function closePetModal() {
    document.getElementById('petModal').classList.add('hidden');
}

function openAdoptionSuccessModal() {
    closePetModal();
    const successMsg = document.getElementById('successMessage');
    const refCode = document.getElementById('modalRefCode');
    const randomCode = '#PET-2026-' + Math.floor(1000 + Math.random() * 9000);

    if (selectedPet) {
        successMsg.innerText = `Congratulations! Your new best friend ${selectedPet.name} is waiting for you!`;
    }
    if (refCode) refCode.innerText = randomCode;

    document.getElementById('adoptionModal').classList.remove('hidden');
}

function closeAdoptionSuccessModal() {
    document.getElementById('adoptionModal').classList.add('hidden');
}

function initModalEvents() {
    const closePetModalBtn = document.getElementById('closePetModalBtn');
    const adoptPetBtn = document.getElementById('adoptPetBtn');
    const applyPetBtn = document.getElementById('applyPetBtn');
    const closeSuccessModalBtn = document.getElementById('closeSuccessModalBtn');
    const returnToGalleryBtn = document.getElementById('returnToGalleryBtn');
    const petModal = document.getElementById('petModal');
    const adoptionModal = document.getElementById('adoptionModal');

    if (closePetModalBtn) closePetModalBtn.addEventListener('click', closePetModal);
    if (adoptPetBtn) adoptPetBtn.addEventListener('click', openAdoptionSuccessModal);
    if (closeSuccessModalBtn) closeSuccessModalBtn.addEventListener('click', closeAdoptionSuccessModal);
    if (returnToGalleryBtn) returnToGalleryBtn.addEventListener('click', closeAdoptionSuccessModal);

    if (applyPetBtn) {
        applyPetBtn.addEventListener('click', () => {
            if (selectedPet) {
                localStorage.setItem('selectedPetName', selectedPet.name);
            }
            window.location.href = 'apply.html';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === petModal) closePetModal();
        if (e.target === adoptionModal) closeAdoptionSuccessModal();
    });
}

/* Form Submission */
function initAdoptionForm() {
    const form = document.getElementById('adoptionForm');
    const targetPetSelect = document.getElementById('targetPet');
    const alertSuccess = document.getElementById('appSuccessAlert');
    const alertText = document.getElementById('appSuccessText');
    const refCode = document.getElementById('appRefCode');

    // Pre-fill from localStorage if navigated from modal
    const savedPet = localStorage.getItem('selectedPetName');
    if (savedPet && targetPetSelect) {
        targetPetSelect.value = savedPet;
        localStorage.removeItem('selectedPetName');
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const petName = targetPetSelect.value;
            const randomCode = '#PET-2026-' + Math.floor(1000 + Math.random() * 9000);

            if (alertSuccess && alertText && refCode) {
                alertText.innerText = `Your application for ${petName || 'your pet'} has been submitted! Our adoption team will contact you shortly.`;
                refCode.innerText = randomCode;
                alertSuccess.classList.remove('hidden');
                alertSuccess.scrollIntoView({ behavior: 'smooth' });
            }
            form.reset();
        });
    }
}

/* Accordion Toggle */
function initAccordions() {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });
}

/* FAQ Search */
function initFAQSearch() {
    const faqInput = document.getElementById('faqSearchInput');
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqInput) {
        faqInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            faqItems.forEach(item => {
                const text = item.innerText.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}
