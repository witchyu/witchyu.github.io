/* ============================================================================
   theme-loader.js
   สคริปต์กลาง ใช้ร่วมกันทั้ง 4 หน้า: admin.html, index.html, lindex.html, success.html
   หน้าที่: ไปอ่านค่า settings.active_theme จาก Supabase แล้วนำมาตั้งเป็น CSS Custom
   Properties บน <html> เพื่อเปลี่ยนโทนสีพื้นหลัง/ปุ่ม/ข้อความสีทองทั้งเว็บให้ตรงธีม

   ถ้าไม่มีธีม (active_theme = 'default' หรือคอลัมน์ยังไม่มี/ดึงไม่ได้) จะไม่ตั้งค่าตัวแปรใดๆ
   เลย ทุกไฟล์ CSS จึงยังคงใช้ค่าเริ่มต้น (ธีมเดิมสีม่วง-ทอง) เหมือนเดิมทุกประการ
   ============================================================================ */
(function () {
    var SUPABASE_URL = 'https://yttxybfektembafzxbdq.supabase.co';
    var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0dHh5YmZla3RlbWJhZnp4YmRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MDAzOTEsImV4cCI6MjEwNDA3NjM5MX0.51nc6Rd02p5pwPvQyTRDDnC1I0wOaQa9uMp7JKkaVMk';

    // ธีมทั้งหมดที่เลือกได้จากหน้า admin (key ต้องตรงกับค่าที่เก็บใน settings.active_theme)
    var THEMES = {
        loikrathong: {
            label: 'ลอยกระทง',
            bgImage: 'bg-loikrathong.svg',
            cardBg: '#0d2a2f',
            inputBg: '#0a1f23',
            deepBg: '#061719',
            borderBase: '#f0b429',
            accentText: '#ffe9b3',
            accentTextStrong: '#f6c453',
            altBg: '#123a41',
            altBgDeep: '#06181b',
            bgColor: '#0d1a1f',
            radial: 'radial-gradient(circle at 50% 20%, #163a3f 0%, #0d1a1f 70%, #050d10 100%)',
            overlay: 'rgba(6, 16, 18, 0.55)',
            goldGradient: 'linear-gradient(to right, #ffe9b3, #f6c453, #c98a2e)',
            buttonGradient: 'linear-gradient(to right, #c98a2e, #f0b429, #c98a2e)',
            buttonText: '#0d1a1f'
        },
        halloween: {
            label: 'ฮาโลวีน',
            bgImage: 'bg-halloween.svg',
            cardBg: '#2a1206',
            inputBg: '#1d0c04',
            deepBg: '#130802',
            borderBase: '#ff8c1a',
            accentText: '#ffb84d',
            accentTextStrong: '#ff9d33',
            altBg: '#3a1a08',
            altBgDeep: '#170a04',
            bgColor: '#170a05',
            radial: 'radial-gradient(circle at 50% 20%, #3a1503 0%, #170a05 70%, #0a0402 100%)',
            overlay: 'rgba(10, 4, 2, 0.55)',
            goldGradient: 'linear-gradient(to right, #ffb84d, #ff7a1a, #b34700)',
            buttonGradient: 'linear-gradient(to right, #b34700, #ff8c1a, #b34700)',
            buttonText: '#170a05'
        },
        christmas: {
            label: 'คริสต์มาส',
            bgImage: 'bg-christmas.svg',
            cardBg: '#2a0d14',
            inputBg: '#1d0910',
            deepBg: '#120609',
            borderBase: '#f6d34a',
            accentText: '#ffe6a1',
            accentTextStrong: '#ffd76a',
            altBg: '#3a141c',
            altBgDeep: '#1a080c',
            bgColor: '#051208',
            radial: 'radial-gradient(circle at 50% 20%, #0d3018 0%, #051208 70%, #020a04 100%)',
            overlay: 'rgba(3, 10, 5, 0.55)',
            goldGradient: 'linear-gradient(to right, #fff1b8, #e63946, #b3122a)',
            buttonGradient: 'linear-gradient(to right, #b3122a, #e63946, #2a9d5c)',
            buttonText: '#fff5e6'
        },
        newyear: {
            label: 'ปีใหม่',
            bgImage: 'bg-newyear.svg',
            cardBg: '#101a3d',
            inputBg: '#0a1230',
            deepBg: '#060a1f',
            borderBase: '#e0c46a',
            accentText: '#fef3c7',
            accentTextStrong: '#ffd700',
            altBg: '#182552',
            altBgDeep: '#080d24',
            bgColor: '#060a1a',
            radial: 'radial-gradient(circle at 50% 20%, #14224a 0%, #060a1a 70%, #02040d 100%)',
            overlay: 'rgba(3, 5, 14, 0.5)',
            goldGradient: 'linear-gradient(to right, #fef9e7, #ffd700, #c0c0c0)',
            buttonGradient: 'linear-gradient(to right, #c0c0c0, #ffd700, #c0c0c0)',
            buttonText: '#060a1a'
        },
        valentine: {
            label: 'วาเลนไทน์',
            bgImage: 'bg-valentine.svg',
            cardBg: '#3a1120',
            inputBg: '#280a16',
            deepBg: '#1a0510',
            borderBase: '#ff6b9d',
            accentText: '#ffd6e8',
            accentTextStrong: '#ff8fb3',
            altBg: '#4a1830',
            altBgDeep: '#200a14',
            bgColor: '#1a0510',
            radial: 'radial-gradient(circle at 50% 20%, #4a1030 0%, #1a0510 70%, #0d0208 100%)',
            overlay: 'rgba(12, 3, 8, 0.5)',
            goldGradient: 'linear-gradient(to right, #ffd6e8, #ff6b9d, #c9184a)',
            buttonGradient: 'linear-gradient(to right, #c9184a, #ff6b9d, #c9184a)',
            buttonText: '#fff0f5'
        },
        songkran: {
            label: 'สงกรานต์',
            bgImage: 'bg-songkran.svg',
            cardBg: '#0a2f47',
            inputBg: '#062032',
            deepBg: '#03141f',
            borderBase: '#4fc3f7',
            accentText: '#e0f7ff',
            accentTextStrong: '#7fd4f0',
            altBg: '#0d3a56',
            altBgDeep: '#041826',
            bgColor: '#041625',
            radial: 'radial-gradient(circle at 50% 20%, #0b4a6b 0%, #041625 70%, #020a10 100%)',
            overlay: 'rgba(2, 10, 16, 0.45)',
            goldGradient: 'linear-gradient(to right, #e0f7ff, #4fc3f7, #0288d1)',
            buttonGradient: 'linear-gradient(to right, #0288d1, #4fc3f7, #0288d1)',
            buttonText: '#04222f'
        }
    };
    // เผื่อไฟล์อื่นอยากอ่านรายชื่อธีม/สีไปสร้างปุ่มเลือกธีมเอง (ใช้ใน admin.html)
    window.WITCHYU_THEMES = THEMES;

    function applyThemeVars(theme) {
        var root = document.documentElement.style;
        root.setProperty('--theme-bg-color', theme.bgColor);
        root.setProperty('--theme-radial', theme.radial);
        root.setProperty('--theme-overlay', theme.overlay);
        root.setProperty('--theme-gold-gradient', theme.goldGradient);
        root.setProperty('--theme-button-gradient', theme.buttonGradient);
        root.setProperty('--theme-button-text', theme.buttonText);
        // ชั้นภาพประกอบธีม (กระทง/ฟักทอง/ต้นคริสต์มาส/พลุ/หัวใจ/ปืนฉีดน้ำ ฯลฯ)
        // เป็นไฟล์ SVG แยกต่างหากจาก bg-mystic.svg เดิมโดยสิ้นเชิง ไม่ใช้ภาพเดิมมาทาสีทับ
        root.setProperty('--theme-bg-layer',
            'linear-gradient(' + theme.overlay + ',' + theme.overlay + '), url(\'' + theme.bgImage + '\')');
        // สีกล่อง/นาว/เส้นขอบ/ตัวอักษรเน้น ให้ตัดกับธีมนั้นๆ ชัดเจน ไม่ใช่สีม่วงเดิมค้างอยู่
        root.setProperty('--theme-card-bg', theme.cardBg);
        root.setProperty('--theme-input-bg', theme.inputBg);
        root.setProperty('--theme-deep-bg', theme.deepBg);
        root.setProperty('--theme-border-base', theme.borderBase);
        root.setProperty('--theme-accent-text', theme.accentText);
        root.setProperty('--theme-accent-text-strong', theme.accentTextStrong);
        root.setProperty('--theme-alt-bg', theme.altBg);
        root.setProperty('--theme-alt-bg-deep', theme.altBgDeep);
    }

    var ALL_THEME_VARS = [
        '--theme-bg-color', '--theme-radial', '--theme-overlay', '--theme-gold-gradient',
        '--theme-button-gradient', '--theme-button-text', '--theme-bg-layer',
        '--theme-card-bg', '--theme-input-bg', '--theme-deep-bg', '--theme-border-base',
        '--theme-accent-text', '--theme-accent-text-strong', '--theme-alt-bg', '--theme-alt-bg-deep'
    ];

    // เรียกใช้ได้จากหน้า admin ทันทีหลังกดเลือกธีม โดยไม่ต้องรอโหลดหน้าใหม่
    window.applyWitchyuTheme = function (key) {
        if (key && THEMES[key]) {
            applyThemeVars(THEMES[key]);
        } else {
            // 'default' หรือ key ที่ไม่รู้จัก -> เอาตัวแปรออก กลับไปใช้ธีมเดิมในไฟล์ CSS
            var root = document.documentElement.style;
            ALL_THEME_VARS.forEach(function (p) { root.removeProperty(p); });
        }
    };

    async function loadActiveThemeFromServer() {
        try {
            if (typeof supabase === 'undefined') return;
            var client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            var res = await client.from('settings').select('active_theme').eq('id', 1).single();
            var key = res && res.data ? res.data.active_theme : null;
            window.applyWitchyuTheme(key);
        } catch (e) {
            // ดึงธีมไม่ได้ (เช่น ยังไม่ได้เพิ่มคอลัมน์ active_theme ใน Supabase) -> ปล่อยเป็นธีมเดิม เงียบๆ ไม่ทำให้หน้าเว็บพัง
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadActiveThemeFromServer);
    } else {
        loadActiveThemeFromServer();
    }

    // แก้ปัญหา: กดปุ่ม back/forward ของเบราว์เซอร์แล้วหน้าเดิม (home/success/lindex/admin)
    // ถูกดึงกลับมาจาก bfcache ของเบราว์เซอร์ (ไม่รันสคริปต์ใหม่) จึงยังค้างธีมเก่าอยู่
    // ทั้งที่แอดมินกดเปลี่ยนกลับเป็น "ธีมเดิม" ไปแล้ว -> ต้องดึงธีมจากเซิร์ฟเวอร์ซ้ำทุกครั้ง
    // ที่หน้าเว็บกลับมาแสดงผล (ทั้งกรณี bfcache restore และสลับกลับมาที่แท็บนี้)
    window.addEventListener('pageshow', function (event) {
        if (event.persisted) {
            loadActiveThemeFromServer();
        }
    });
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') {
            loadActiveThemeFromServer();
        }
    });
})();
