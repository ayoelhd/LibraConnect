// ==============================
// تطبيق ثيم LIMU (Light Blue)
// ==============================
document.body.style.backgroundColor = "#f2f6ff";   // خلفية أبيض مزرق
document.body.style.color = "#003399";             // نصوص أزرق كحلي

const container = document.querySelector(".register-container");
if (container) {
    container.style.backgroundColor = "#ffffff";
    container.style.borderTop = "6px solid #003399";
    container.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
    container.style.borderRadius = "10px";
}

const labels = document.querySelectorAll("label");
labels.forEach(label => {
    label.style.color = "#003399";
    label.style.fontWeight = "500";
});

const inputs = document.querySelectorAll("input");
inputs.forEach(input => {
    input.style.border = "1px solid #b8c8ff";
    input.style.background = "#ffffff";
    input.style.color = "#333";
    input.style.padding = "10px 12px";
    input.style.borderRadius = "6px";
});

const button = document.querySelector("button");
if (button) {
    button.style.backgroundColor = "#0055cc";
    button.style.color = "#ffffff";
    button.style.fontWeight = "bold";
    button.style.padding = "12px";
    button.style.borderRadius = "6px";

    button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#003ea6";
    });

    button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "#0055cc";
    });
}


// ==============================
// كود التسجيل
// ==============================
const form = document.getElementById('registerForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    messageDiv.textContent = '';
    messageDiv.className = '';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    // شرط ان يكون ايميل LIMU
    const limuEmailPattern = /^[a-zA-Z0-9._%+-]+@limu\.edu\.ly$/;

    if (!limuEmailPattern.test(email)) {
        messageDiv.textContent = 'Email must be a LIMU email (example@limu.edu.ly)';
        messageDiv.className = 'error';
        return;
    }

    // تخزين بيانات المستخدم
    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem('libraUser', JSON.stringify(user));
    localStorage.setItem('libraIsLoggedIn', 'true');

    messageDiv.textContent = 'Registered successfully! Redirecting...';
    messageDiv.className = 'success';

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
});


// ==============================
// حماية كل الصفحات
// ==============================
if (!localStorage.getItem('libraIsLoggedIn')) {
    if (!window.location.pathname.includes('register.html')) {
        window.location.href = 'register.html';
    }
}
