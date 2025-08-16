// Navigation logic
function showSection(id) {
document.getElementById('calculator').style.display = (id === 'calculator') ? 'block' : 'none';
document.getElementById('about').style.display = (id === 'about') ? 'block' : 'none';
window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Initially show calculator
showSection('calculator');

// Theme logic
let currentTheme = 'light';
function setTheme(theme) {
currentTheme = theme;
// Remove all theme classes
document.body.classList.remove('dark', 'cyberpunk-bg', 'text-gray-100', 'text-gray-900');
document.body.classList.add('transition-colors');
document.getElementById('calc-card').classList.remove('cyberpunk-bg', 'cyberpunk-border');
document.getElementById('calc-display').classList.remove('cyberpunk-bg', 'cyberpunk-border', 'cyberpunk-text');
document.getElementById('brand').classList.remove('cyberpunk-text');
document.querySelector('nav').classList.remove('cyberpunk-bg');
document.querySelector('footer').classList.remove('cyberpunk-bg', 'cyberpunk-text');
// Button theme classes
document.querySelectorAll('.calc-btn').forEach(btn => {
btn.classList.remove('cyberpunk-btn');
});
document.querySelectorAll('.cyberpunk-text').forEach(el => el.classList.remove('cyberpunk-text'));
// Light Mode
if (theme === 'light') {
document.body.classList.add('bg-gray-100', 'text-gray-900');
document.getElementById('calc-card').classList.add('bg-white');
document.getElementById('calc-display').classList.add('bg-gray-100', 'text-gray-900');
document.querySelector('nav').classList.add('bg-white');
document.querySelector('footer').classList.add('bg-gray-50');
}
// Dark Mode
else if (theme === 'dark') {
document.body.classList.add('dark', 'bg-gray-900', 'text-gray-100');
document.getElementById('calc-card').classList.add('dark:bg-gray-800');
document.getElementById('calc-display').classList.add('dark:bg-gray-900', 'dark:text-gray-100');
document.querySelector('nav').classList.add('dark:bg-gray-900');
document.querySelector('footer').classList.add('dark:bg-gray-900');
}
// Cyberpunk Mode
else if (theme === 'cyberpunk') {
document.body.classList.add('cyberpunk-bg', 'text-gray-100');
document.getElementById('calc-card').classList.add('cyberpunk-bg', 'cyberpunk-border');
document.getElementById('calc-display').classList.add('cyberpunk-bg', 'cyberpunk-border', 'cyberpunk-text');
document.getElementById('brand').classList.add('cyberpunk-text');
document.querySelector('nav').classList.add('cyberpunk-bg');
document.querySelector('footer').classList.add('cyberpunk-bg', 'cyberpunk-text');
document.querySelectorAll('.calc-btn').forEach(btn => {
btn.classList.add('cyberpunk-btn');
});
document.querySelectorAll('.bg-white, .dark\\:bg-gray-800, .bg-gray-100, .dark\\:bg-gray-900').forEach(el => {
el.classList.remove('bg-white', 'dark:bg-gray-800', 'bg-gray-100', 'dark:bg-gray-900');
});
}
closeThemeDropdown();
}
// Theme Dropdown logic
function toggleThemeDropdown() {
const dropdown = document.getElementById('themeDropdown');
dropdown.classList.toggle('scale-100');
dropdown.classList.toggle('scale-0');
}
function closeThemeDropdown() {
const dropdown = document.getElementById('themeDropdown');
dropdown.classList.remove('scale-100');
dropdown.classList.add('scale-0');
}
// Close dropdown on outside click
document.addEventListener('click', function(e) {
if (!document.getElementById('themeBtn').contains(e.target) && !document.getElementById('themeDropdown').contains(e.target)) {
closeThemeDropdown();
}
});

// Calculator logic
let expression = '';
const display = document.getElementById('calc-display');

function inputFunc(val) {
// For pi and e, insert their values
if (val === 'pi') val = 'π';
if (val === 'e') val = 'e';
// If display shows error, clear before entering new input
if (display.value === 'Error' || display.value === 'Infinity' || display.value === '-Infinity') {
expression = '';
display.value = '';
}
// Prevent multiple dots in a number
if (val === '.' && /\.\d*$/.test(expression)) return;
expression += val;
display.value = expression;
animateDisplay();
}
function clearDisplay() {
expression = '';
display.value = '0';
animateDisplay();
}
function backspace() {
expression = expression.slice(0, -1);
display.value = expression || '0';
animateDisplay();
}
function calculate() {
try {
let expr = expression
.replace(/π/g, 'Math.PI')
.replace(/e/g, 'Math.E')
.replace(/sqrt\(/g, 'Math.sqrt(')
.replace(/sin\(/g, 'Math.sin(')
.replace(/cos\(/g, 'Math.cos(')
.replace(/tan\(/g, 'Math.tan(')
.replace(/log\(/g, 'Math.log10(')
.replace(/ln\(/g, 'Math.log(')
.replace(/exp\(/g, 'Math.exp(')
.replace(/(\d+|\))\^(\d+|\()/g, 'Math.pow($1,$2)');
// For safe eval, only allow Math, numbers, and operators
// eslint-disable-next-line no-eval
let result = eval(expr);
// Fix floating point
if (typeof result === 'number' && !Number.isInteger(result)) {
result = +result.toFixed(10);
}
display.value = result;
expression = result.toString();
} catch (e) {
display.value = 'Error';
expression = '';
}
animateDisplay();
}
// Animation for display
function animateDisplay() {
display.classList.add('ring-2', 'ring-indigo-400');
setTimeout(() => {
display.classList.remove('ring-2', 'ring-indigo-400');
}, 200);
}

// Keyboard support
document.addEventListener('keydown', function(e) {
if (document.activeElement === display) return;
if (e.key >= '0' && e.key <= '9') inputFunc(e.key);
else if (['+', '-', '*', '/','.'].includes(e.key)) inputFunc(e.key);
else if (e.key === 'Enter' || e.key === '=') calculate();
else if (e.key === 'Backspace') backspace();
else if (e.key === 'Escape') clearDisplay();
else if (e.key === '(') inputFunc('(');
else if (e.key === ')') inputFunc(')');
else if (e.key === '^') inputFunc('^');
});

// Default theme
setTheme('light');
