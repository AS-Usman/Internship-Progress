const navLinks = document.getElementById('navLinks');
const menuBtn = document.getElementById('menuBtn');
const themeToggle = document.getElementById('themeToggle');
const heroGreeting = document.getElementById('heroGreeting');
const contactForm = document.getElementById('contactForm');
const dashboardTabsContainer = document.getElementById('dashboardTabs');
let dashboardTabs = document.querySelectorAll('.dashboard-tab');
const dashboardTitle = document.getElementById('dashboardTitle');
const dashboardValue = document.getElementById('dashboardValue');
const dashboardChange = document.getElementById('dashboardChange');
const secondaryLabel = document.getElementById('secondaryLabel');
const dashboardSecondary = document.getElementById('dashboardSecondary');
const dashboardSecondaryChange = document.getElementById('dashboardSecondaryChange');
const tertiaryLabel = document.getElementById('tertiaryLabel');
const dashboardTertiary = document.getElementById('dashboardTertiary');
const dashboardTertiaryChange = document.getElementById('dashboardTertiaryChange');
const chartTitle = document.getElementById('chartTitle');
const chartBars = document.getElementById('chartBars');
const revealElements = document.querySelectorAll('.reveal');
const scrollTopBtn = document.createElement('button');

const dashboardData = {
    operations: {
        title: 'Total Deliveries',
        value: '1,200',
        change: '+8% vs last week',
        secondary: { label: 'On-time Score', value: '94%', change: '+4% quality gain' },
        tertiary: { label: 'Active Routes', value: '300', change: '+12 routes' },
        chartTitle: 'Weekly route throughput',
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [62, 70, 84, 76, 90, 105, 95],
    },
    risk: {
        title: 'Risk Exposure',
        value: '27%',
        change: '-12% high-risk routes',
        secondary: { label: 'Critical Alerts', value: '12', change: '-3 alerts' },
        tertiary: { label: 'Safe Corridors', value: '82%', change: '+6% improvement' },
        chartTitle: 'Risk signal frequency',
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [18, 16, 22, 11, 14, 9, 7],
    },
    fleet: {
        title: 'Fleet Readiness',
        value: '88%',
        change: '+5% availability',
        secondary: { label: 'Fuel Efficiency', value: '17.8 km/l', change: '+0.8 km/l' },
        tertiary: { label: 'Active Vehicles', value: '42', change: '+3 vehicles' },
        chartTitle: 'Fleet utilization trend',
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [75, 82, 88, 90, 86, 84, 80],
    },
    weather: {
        title: 'Weather Impact',
        value: '14%',
        change: 'Light delay risk',
        secondary: { label: 'Storm Alerts', value: '3', change: '-1 alert' },
        tertiary: { label: 'Clear Windows', value: '63%', change: '+10% smooth travel' },
        chartTitle: 'Weather-related route alerts',
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [8, 12, 9, 14, 7, 10, 6],
    },
};

const renderDashboard = (key) => {
    const data = dashboardData[key];
    if (!data) return;

    dashboardTitle.textContent = data.title;
    dashboardValue.textContent = data.value;
    dashboardChange.textContent = data.change;
    secondaryLabel.textContent = data.secondary.label;
    dashboardSecondary.textContent = data.secondary.value;
    dashboardSecondaryChange.textContent = data.secondary.change;
    tertiaryLabel.textContent = data.tertiary.label;
    dashboardTertiary.textContent = data.tertiary.value;
    dashboardTertiaryChange.textContent = data.tertiary.change;
    chartTitle.textContent = data.chartTitle;

    chartBars.innerHTML = data.values
        .map((value, index) => `
            <div class="chart-bar">
                <div class="bar-fill" style="height:${value}%;"></div>
                <span class="bar-value">${value}</span>
                <span class="bar-label">${data.labels[index]}</span>
            </div>
        `)
        .join('');
};

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.querySelector('i').classList.toggle('fa-times');
});

const setTheme = (theme) => {
    document.body.dataset.theme = theme;
    localStorage.setItem('preferredTheme', theme);
    themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
};

const preferredTheme = localStorage.getItem('preferredTheme') || 'light';
setTheme(preferredTheme);

themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
});

let greetings = ['Hello There', 'Track smarter routes', 'Predict with confidence'];
let greetingIndex = 0;
setInterval(() => {
    greetingIndex = (greetingIndex + 1) % greetings.length;
    heroGreeting.textContent = greetings[greetingIndex];
}, 4500);

const bindDashboardTabs = () => {
    dashboardTabs = document.querySelectorAll('.dashboard-tab');
    dashboardTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            dashboardTabs.forEach((btn) => btn.classList.remove('active'));
            tab.classList.add('active');
            renderDashboard(tab.dataset.key);
        });
    });
};

if (dashboardTabsContainer) {
    bindDashboardTabs();
    renderDashboard('operations');
}

const toast = (message, type = 'success') => {
    const toastBox = document.createElement('div');
    toastBox.className = `toast ${type}`;
    toastBox.textContent = message;
    document.body.appendChild(toastBox);
    setTimeout(() => toastBox.classList.add('visible'), 100);
    setTimeout(() => toastBox.classList.remove('visible'), 3400);
    setTimeout(() => toastBox.remove(), 4000);
};

// ---------- Form Validation ----------

const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const messageInput = document.getElementById('messageInput');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

const validators = {
    name: {
        input: nameInput,
        errorEl: nameError,
        // Letters, spaces, hyphens, apostrophes only, 2-50 chars
        regex: /^[A-Za-z\u00C0-\u024F' -]{2,50}$/,
        messages: {
            empty: 'Please enter your name.',
            invalid: 'Name must be 2-50 letters (no numbers or symbols).',
        },
    },
    email: {
        input: emailInput,
        errorEl: emailError,
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        messages: {
            empty: 'Please enter your email.',
            invalid: 'Please enter a valid email address (e.g. name@example.com).',
        },
    },
    message: {
        input: messageInput,
        errorEl: messageError,
        regex: /^.{10,500}$/s,
        messages: {
            empty: 'Please enter a message.',
            invalid: 'Message should be between 10 and 500 characters.',
        },
    },
};

const showError = (field, message) => {
    field.input.classList.remove('valid');
    field.input.classList.add('invalid');
    field.errorEl.textContent = message;
    field.errorEl.classList.add('show');
};

const showValid = (field) => {
    field.input.classList.remove('invalid');
    field.input.classList.add('valid');
    field.errorEl.textContent = '';
    field.errorEl.classList.remove('show');
};

const validateField = (key) => {
    const field = validators[key];
    const value = field.input.value.trim();

    if (!value) {
        showError(field, field.messages.empty);
        return false;
    }

    if (!field.regex.test(value)) {
        showError(field, field.messages.invalid);
        return false;
    }

    showValid(field);
    return true;
};

// Real-time validation as the user types / leaves a field
Object.keys(validators).forEach((key) => {
    const field = validators[key];
    field.input.addEventListener('blur', () => validateField(key));
    field.input.addEventListener('input', () => {
        // Only re-validate live once a field has already been marked invalid,
        // so we don't nag the user before they've finished typing.
        if (field.input.classList.contains('invalid')) {
            validateField(key);
        }
    });
});

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const isNameValid = validateField('name');
    const isEmailValid = validateField('email');
    const isMessageValid = validateField('message');

    if (!isNameValid || !isEmailValid || !isMessageValid) {
        toast('Please fix the highlighted fields.', 'error');
        return;
    }

    toast('Message sent successfully!', 'success');
    contactForm.reset();

    Object.keys(validators).forEach((key) => {
        const field = validators[key];
        field.input.classList.remove('valid', 'invalid');
        field.errorEl.classList.remove('show');
    });
});

// ---------- Registration Form Validation ----------

const registerForm = document.getElementById('registerForm');

if (registerForm) {
    const regName = document.getElementById('regName');
    const regEmail = document.getElementById('regEmail');
    const regPhone = document.getElementById('regPhone');
    const regPassword = document.getElementById('regPassword');
    const regConfirmPassword = document.getElementById('regConfirmPassword');

    const regNameError = document.getElementById('regNameError');
    const regEmailError = document.getElementById('regEmailError');
    const regPhoneError = document.getElementById('regPhoneError');
    const regPasswordError = document.getElementById('regPasswordError');
    const regConfirmPasswordError = document.getElementById('regConfirmPasswordError');

    const strengthBar = document.getElementById('strengthBar');
    const strengthLabel = document.getElementById('strengthLabel');

    const regValidators = {
        fullname: {
            input: regName,
            errorEl: regNameError,
            regex: /^[A-Za-z\u00C0-\u024F' -]{2,50}$/,
            messages: {
                empty: 'Please enter your full name.',
                invalid: 'Name must be 2-50 letters (no numbers or symbols).',
            },
        },
        email: {
            input: regEmail,
            errorEl: regEmailError,
            regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            messages: {
                empty: 'Please enter your email.',
                invalid: 'Please enter a valid email address (e.g. name@example.com).',
            },
        },
        phone: {
            input: regPhone,
            errorEl: regPhoneError,
            // Validated after stripping spaces/hyphens/parentheses - see validateRegField
            regex: /^\+?\d{7,15}$/,
            messages: {
                empty: 'Please enter your phone number.',
                invalid: 'Enter a valid phone number (7-15 digits, optional + country code).',
            },
        },
        password: {
            input: regPassword,
            errorEl: regPasswordError,
            // At least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special character
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
            messages: {
                empty: 'Please create a password.',
                invalid: 'Min 8 characters, with upper & lower case, a number, and a symbol.',
            },
        },
    };

    const showRegError = (field, message) => {
        field.input.classList.remove('valid');
        field.input.classList.add('invalid');
        field.errorEl.textContent = message;
        field.errorEl.classList.add('show');
    };

    const showRegValid = (field) => {
        field.input.classList.remove('invalid');
        field.input.classList.add('valid');
        field.errorEl.textContent = '';
        field.errorEl.classList.remove('show');
    };

    const validateRegField = (key) => {
        const field = regValidators[key];
        const rawValue = field.input.value.trim();

        if (!rawValue) {
            showRegError(field, field.messages.empty);
            return false;
        }

        // Phone gets its digits/plus stripped of formatting characters before testing
        const value = key === 'phone' ? rawValue.replace(/[\s\-()]/g, '') : rawValue;

        if (!field.regex.test(value)) {
            showRegError(field, field.messages.invalid);
            return false;
        }

        showRegValid(field);
        return true;
    };

    const validateConfirmPassword = () => {
        const confirmField = { input: regConfirmPassword, errorEl: regConfirmPasswordError };
        const value = regConfirmPassword.value.trim();

        if (!value) {
            showRegError(confirmField, 'Please confirm your password.');
            return false;
        }

        if (value !== regPassword.value.trim()) {
            showRegError(confirmField, 'Passwords do not match.');
            return false;
        }

        showRegValid(confirmField);
        return true;
    };

    const updateStrengthMeter = () => {
        const value = regPassword.value;
        let score = 0;
        if (value.length >= 8) score++;
        if (/[a-z]/.test(value)) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/\d/.test(value)) score++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) score++;

        const levels = [
            { width: '0%', color: '#ef4444', label: '' },
            { width: '20%', color: '#ef4444', label: 'Very weak' },
            { width: '40%', color: '#f97316', label: 'Weak' },
            { width: '60%', color: '#f59e0b', label: 'Fair' },
            { width: '80%', color: '#22c55e', label: 'Good' },
            { width: '100%', color: '#16a34a', label: 'Strong' },
        ];

        const level = levels[value ? score : 0];
        strengthBar.style.width = level.width;
        strengthBar.style.background = level.color;
        strengthLabel.textContent = level.label;
    };

    // Real-time validation
    Object.keys(regValidators).forEach((key) => {
        const field = regValidators[key];
        field.input.addEventListener('blur', () => validateRegField(key));
        field.input.addEventListener('input', () => {
            if (field.input.classList.contains('invalid')) {
                validateRegField(key);
            }
        });
    });

    regPassword.addEventListener('input', updateStrengthMeter);

    regConfirmPassword.addEventListener('blur', validateConfirmPassword);
    regConfirmPassword.addEventListener('input', () => {
        if (regConfirmPassword.classList.contains('invalid')) {
            validateConfirmPassword();
        }
    });

    // Show/hide password toggles
    document.querySelectorAll('.toggle-password').forEach((btn) => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.target);
            const icon = btn.querySelector('i');
            const isHidden = target.type === 'password';
            target.type = isHidden ? 'text' : 'password';
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const isNameValid = validateRegField('fullname');
        const isEmailValid = validateRegField('email');
        const isPhoneValid = validateRegField('phone');
        const isPasswordValid = validateRegField('password');
        const isConfirmValid = validateConfirmPassword();

        if (!isNameValid || !isEmailValid || !isPhoneValid || !isPasswordValid || !isConfirmValid) {
            toast('Please fix the highlighted fields.', 'error');
            return;
        }

        const newUser = {
            fullname: regName.value.trim(),
            email: regEmail.value.trim(),
            phone: regPhone.value.trim(),
            password: regPassword.value,
        };
        saveUser(newUser);
        setCurrentUser(newUser);
        const newFirstName = newUser.fullname.split(' ')[0];
        heroGreeting.textContent = `Welcome, ${newFirstName}`;
        greetings = [`Welcome, ${newFirstName}`, `Hello, ${newFirstName}`, 'Track smarter routes', 'Predict with confidence'];

        toast('Account created successfully!', 'success');
        registerForm.reset();
        updateStrengthMeter();
        openOnboarding();

        [...Object.keys(regValidators), 'confirmPassword'].forEach((key) => {
            const field = key === 'confirmPassword'
                ? { input: regConfirmPassword, errorEl: regConfirmPasswordError }
                : regValidators[key];
            field.input.classList.remove('valid', 'invalid');
            field.errorEl.classList.remove('show');
        });
    });
}

// ---------- Accounts (local demo storage) ----------
// Note: this is a front-end only demo. Accounts and passwords are kept in
// localStorage on this device, not sent to any server.

const USERS_KEY = 'routesense_users';
const PROFILES_KEY = 'routesense_profiles';
const SESSION_KEY = 'routesense_current_user';

const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || '{}');

const saveUser = (user) => {
    const users = getUsers();
    users[user.email.toLowerCase()] = user;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const setCurrentUser = (user) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ fullname: user.fullname, email: user.email }));
};

const getCurrentUser = () => {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
};

const saveProfile = (email, profile) => {
    const profiles = JSON.parse(localStorage.getItem(PROFILES_KEY) || '{}');
    profiles[email.toLowerCase()] = profile;
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
};

const getProfile = (email) => {
    const profiles = JSON.parse(localStorage.getItem(PROFILES_KEY) || '{}');
    return profiles[email.toLowerCase()] || null;
};

// ---------- Sign In Modal ----------

const signInOverlay = document.getElementById('signInOverlay');
const openSignInBtn = document.getElementById('openSignIn');
const closeSignInBtn = document.getElementById('closeSignIn');
const signInForm = document.getElementById('signInForm');
const switchToRegister = document.getElementById('switchToRegister');

const openModal = (overlay) => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

const closeModal = (overlay) => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
};

if (openSignInBtn && signInOverlay) {
    openSignInBtn.addEventListener('click', () => openModal(signInOverlay));
    closeSignInBtn.addEventListener('click', () => closeModal(signInOverlay));
    signInOverlay.addEventListener('click', (e) => {
        if (e.target === signInOverlay) closeModal(signInOverlay);
    });

    if (switchToRegister) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(signInOverlay);
            document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
        });
    }

    const signInEmail = document.getElementById('signInEmail');
    const signInPassword = document.getElementById('signInPassword');
    const signInEmailError = document.getElementById('signInEmailError');
    const signInPasswordError = document.getElementById('signInPasswordError');

    signInForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = signInEmail.value.trim();
        const password = signInPassword.value;

        signInEmailError.textContent = '';
        signInPasswordError.textContent = '';
        signInEmailError.classList.remove('show');
        signInPasswordError.classList.remove('show');
        signInEmail.classList.remove('invalid');
        signInPassword.classList.remove('invalid');

        if (!email) {
            signInEmailError.textContent = 'Please enter your email.';
            signInEmailError.classList.add('show');
            signInEmail.classList.add('invalid');
            return;
        }

        const users = getUsers();
        const user = users[email.toLowerCase()];

        if (!user || user.password !== password) {
            signInPasswordError.textContent = 'Incorrect email or password.';
            signInPasswordError.classList.add('show');
            signInPassword.classList.add('invalid');
            toast('Sign in failed. Check your details or register first.', 'error');
            return;
        }

        setCurrentUser(user);
        closeModal(signInOverlay);
        signInForm.reset();
        const firstName = user.fullname.split(' ')[0];
        toast(`Welcome back, ${firstName}!`, 'success');
        heroGreeting.textContent = `Welcome Back, ${firstName}`;
        greetings = [`Welcome Back, ${firstName}`, `Hello, ${firstName}`, 'Track smarter routes', 'Predict with confidence'];

        const existingProfile = getProfile(user.email);
        if (existingProfile) {
            applyPersonalizedDashboard(user, existingProfile);
            document.getElementById('stats').scrollIntoView({ behavior: 'smooth' });
        } else {
            openOnboarding();
        }
    });
}

// ---------- Onboarding / Delivery Situation Survey ----------

const onboardingOverlay = document.getElementById('onboardingOverlay');
const closeOnboardingBtn = document.getElementById('closeOnboarding');
const onboardingForm = document.getElementById('onboardingForm');
const onboardingHeading = document.getElementById('onboardingHeading');
const startOnboardingBtn = document.getElementById('startOnboardingBtn');
const personalizeBanner = document.getElementById('personalizeBanner');

const openOnboarding = () => {
    const user = getCurrentUser();
    if (onboardingHeading) {
        onboardingHeading.textContent = user
            ? `Tell Us About ${user.fullname.split(' ')[0]}'s Delivery Situation`
            : 'Tell Us About Your Delivery Situation';
    }
    if (onboardingOverlay) openModal(onboardingOverlay);
};

if (closeOnboardingBtn && onboardingOverlay) {
    closeOnboardingBtn.addEventListener('click', () => closeModal(onboardingOverlay));
    onboardingOverlay.addEventListener('click', (e) => {
        if (e.target === onboardingOverlay) closeModal(onboardingOverlay);
    });
}

if (startOnboardingBtn) {
    startOnboardingBtn.addEventListener('click', () => {
        const user = getCurrentUser();
        if (!user) {
            toast('Please sign in or create an account first.', 'error');
            openModal(signInOverlay);
            return;
        }
        openOnboarding();
    });
}

const challengeCopy = {
    weather: { title: 'Weather Impact', tertiaryLabel: 'Weather Focus' },
    risk: { title: 'Risk Exposure', tertiaryLabel: 'Risk Focus' },
    fleet: { title: 'Fleet Readiness', tertiaryLabel: 'Fleet Focus' },
    volume: { title: 'Delivery Volume', tertiaryLabel: 'Volume Focus' },
};

const challengeLabelText = {
    weather: 'Weather-related delays',
    risk: 'Route safety / risk',
    fleet: 'Fleet breakdowns & maintenance',
    volume: 'High delivery volume',
};

const buildPersonalizedData = (fullname, profile) => {
    const firstName = fullname.split(' ')[0];
    const weekly = Number(profile.weeklyDeliveries) || 0;
    const perDayBase = weekly / 7;
    // Deterministic day-to-day variance so the chart looks realistic without changing on every render
    const variancePattern = [0.88, 0.95, 1.05, 1.0, 1.12, 1.2, 0.8];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const values = variancePattern.map((factor) => Math.max(1, Math.round(perDayBase * factor)));

    const onTimeByChallenge = { weather: 87, risk: 90, fleet: 89, volume: 84 };
    const regionsCount = profile.regions.split(',').map((r) => r.trim()).filter(Boolean).length || 1;

    return {
        title: `${firstName}'s Weekly Deliveries`,
        value: weekly.toLocaleString(),
        change: `Across ${regionsCount} region${regionsCount > 1 ? 's' : ''}`,
        secondary: {
            label: 'On-time Score',
            value: `${onTimeByChallenge[profile.challenge] || 90}%`,
            change: 'Estimated from your profile',
        },
        tertiary: {
            label: 'Fleet Size',
            value: profile.fleetSize,
            change: challengeLabelText[profile.challenge] || 'General operations',
        },
        chartTitle: `${firstName}'s weekly delivery volume`,
        labels,
        values,
    };
};

const applyPersonalizedDashboard = (user, profile) => {
    dashboardData.personalized = buildPersonalizedData(user.fullname, profile);

    let personalizedTab = document.querySelector('.dashboard-tab[data-key="personalized"]');
    if (!personalizedTab && dashboardTabsContainer) {
        personalizedTab = document.createElement('button');
        personalizedTab.className = 'dashboard-tab personalized-tab';
        personalizedTab.dataset.key = 'personalized';
        personalizedTab.innerHTML = '<i class="fas fa-user-check"></i> My Dashboard';
        dashboardTabsContainer.prepend(personalizedTab);
        bindDashboardTabs();
    }

    dashboardTabs.forEach((btn) => btn.classList.remove('active'));
    personalizedTab.classList.add('active');
    renderDashboard('personalized');

    if (personalizeBanner) personalizeBanner.classList.add('hidden');
};

if (onboardingForm) {
    const onbFleetSize = document.getElementById('onbFleetSize');
    const onbWeeklyDeliveries = document.getElementById('onbWeeklyDeliveries');
    const onbChallenge = document.getElementById('onbChallenge');
    const onbRegions = document.getElementById('onbRegions');

    const onbFleetSizeError = document.getElementById('onbFleetSizeError');
    const onbWeeklyDeliveriesError = document.getElementById('onbWeeklyDeliveriesError');
    const onbChallengeError = document.getElementById('onbChallengeError');
    const onbRegionsError = document.getElementById('onbRegionsError');

    const markError = (input, errorEl, message) => {
        input.classList.remove('valid');
        input.classList.add('invalid');
        errorEl.textContent = message;
        errorEl.classList.add('show');
    };

    const markValid = (input, errorEl) => {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorEl.textContent = '';
        errorEl.classList.remove('show');
    };

    onboardingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let valid = true;

        if (!onbFleetSize.value) {
            markError(onbFleetSize, onbFleetSizeError, 'Please select your fleet size.');
            valid = false;
        } else {
            markValid(onbFleetSize, onbFleetSizeError);
        }

        const weekly = Number(onbWeeklyDeliveries.value);
        if (!onbWeeklyDeliveries.value || weekly <= 0) {
            markError(onbWeeklyDeliveries, onbWeeklyDeliveriesError, 'Please enter your average weekly deliveries.');
            valid = false;
        } else {
            markValid(onbWeeklyDeliveries, onbWeeklyDeliveriesError);
        }

        if (!onbChallenge.value) {
            markError(onbChallenge, onbChallengeError, 'Please select your biggest challenge.');
            valid = false;
        } else {
            markValid(onbChallenge, onbChallengeError);
        }

        if (!onbRegions.value.trim()) {
            markError(onbRegions, onbRegionsError, 'Please list at least one region or city.');
            valid = false;
        } else {
            markValid(onbRegions, onbRegionsError);
        }

        if (!valid) {
            toast('Please fix the highlighted fields.', 'error');
            return;
        }

        const user = getCurrentUser();
        if (!user) {
            toast('Please sign in or register first.', 'error');
            closeModal(onboardingOverlay);
            openModal(signInOverlay);
            return;
        }

        const profile = {
            fleetSize: onbFleetSize.value,
            weeklyDeliveries: onbWeeklyDeliveries.value,
            challenge: onbChallenge.value,
            regions: onbRegions.value.trim(),
        };

        saveProfile(user.email, profile);
        applyPersonalizedDashboard(user, profile);

        closeModal(onboardingOverlay);
        toast('Your personalized dashboard is ready!', 'success');
        document.getElementById('stats').scrollIntoView({ behavior: 'smooth' });

        onboardingForm.reset();
        [onbFleetSize, onbWeeklyDeliveries, onbChallenge, onbRegions].forEach((el) => {
            el.classList.remove('valid', 'invalid');
        });
    });
}

// If a signed-in user with a saved profile returns to the page, greet them
// and surface their personalized dashboard automatically.
(() => {
    const user = getCurrentUser();
    if (!user) return;
    const firstName = user.fullname.split(' ')[0];
    heroGreeting.textContent = `Welcome Back, ${firstName}`;
    greetings = [`Welcome Back, ${firstName}`, `Hello, ${firstName}`, 'Track smarter routes', 'Predict with confidence'];
    const profile = getProfile(user.email);
    if (profile) applyPersonalizedDashboard(user, profile);
})();

const animateNumbers = () => {
    revealElements.forEach((el) => {
        const num = el.querySelector('h3');
        if (!num || num.dataset.animated) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            const target = Number(num.dataset.target || 0);
            const suffix = num.dataset.suffix || '';
            let current = 0;
            const step = Math.max(1, Math.floor(target / 50));
            const interval = setInterval(() => {
                current += step;
                if (current >= target) {
                    num.textContent = `${target}${suffix}`;
                    clearInterval(interval);
                } else {
                    num.textContent = `${current}${suffix}`;
                }
            }, 20);
            num.dataset.animated = 'true';
        }
    });
};

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
    animateNumbers();
});

scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.body.appendChild(scrollTopBtn);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

revealElements.forEach((el) => observer.observe(el));

window.addEventListener('load', animateNumbers);
