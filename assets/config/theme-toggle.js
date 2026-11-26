/**
 * Theme Toggle Script
 * Default: Light Mode
 * Toggle: Switch to Dark Mode
 *
 * - Dark Mode = ใส่คลาส "dark" ที่ <html>
 * - โหลดไฟล์นี้ใน <head> ได้เลย (ไม่ต้องรอ <body>) หน้าเว็บจะได้ไม่กระพริบเป็นสีขาวก่อนเปลี่ยนธีม
 * - ถ้าในหน้ามี <button id="theme-toggle"> อยู่แล้ว จะใช้ปุ่มนั้น
 *   ถ้าไม่มี จะสร้างปุ่มลอยที่มุมขวาล่างให้เอง
 * - ไอคอนใช้ Font Awesome (fa-moon / fa-sun)
 */

(function () {
    'use strict';

    const THEME_KEY = 'site-theme';
    const DARK_CLASS = 'dark';
    const root = document.documentElement;

    // Get saved theme or default to light
    function getSavedTheme() {
        try {
            return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
        } catch (e) {
            return 'light';
        }
    }

    // Save theme preference
    function saveTheme(theme) {
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (e) {
            // บางเบราว์เซอร์ (เช่นโหมดส่วนตัว) ไม่ให้บันทึก ก็แค่ไม่จำค่า
        }
    }

    // Read the theme currently shown on the page
    function getCurrentTheme() {
        return root.classList.contains(DARK_CLASS) ? 'dark' : 'light';
    }

    // Apply theme to <html>
    function applyTheme(theme) {
        root.classList.toggle(DARK_CLASS, theme === 'dark');
        updateToggleButton(theme);
    }

    // Update toggle button icon and label
    function updateToggleButton(theme) {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;

        const label = theme === 'dark' ? 'เปลี่ยนเป็น Light Mode' : 'เปลี่ยนเป็น Dark Mode';

        // Light: show moon (click to go dark) / Dark: show sun (click to go light)
        btn.innerHTML = theme === 'dark'
            ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
        btn.title = label;
        btn.setAttribute('aria-label', label);
    }

    // Toggle theme
    function toggleTheme() {
        const newTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
        saveTheme(newTheme);
        applyTheme(newTheme);
    }

    // Use the button already on the page, or create a floating one
    function setupToggleButton() {
        let btn = document.getElementById('theme-toggle');

        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'theme-toggle';
            btn.className = 'btn-theme-toggle btn-theme-toggle--floating';
            document.body.appendChild(btn);
        }

        btn.type = 'button';
        btn.addEventListener('click', toggleTheme);
        updateToggleButton(getCurrentTheme());
    }

    // Initialize
    function init() {
        // Apply saved theme immediately (works even before <body> exists)
        applyTheme(getSavedTheme());

        // Wire up the button when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupToggleButton);
        } else {
            setupToggleButton();
        }
    }

    init();

})();
