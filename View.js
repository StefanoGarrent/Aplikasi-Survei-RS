export default class View {
    constructor() {
        // Halaman (Sections)
        this.pageDashboard = document.getElementById('page-dashboard');
        this.pageInput = document.getElementById('page-input');
        this.pageSurvey = document.getElementById('page-survey');
        this.pageThankYou = document.getElementById('page-thankyou');
        this.pageAbout = document.getElementById('page-about');
        
        // Navigasi
        this.navDashboard = document.getElementById('nav-dashboard');
        this.navSurvei = document.getElementById('nav-survei');
        this.navAbout = document.getElementById('nav-about');
        this.navItems = [this.navDashboard, this.navSurvei, this.navAbout];
        
        // Elemen Input & Text
        this.inputNama = document.getElementById('namaPasien');
        this.displayNama = document.getElementById('displayNama');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        
        // Statistik & Tombol
        this.statTotal = document.getElementById('statTotal');
        this.statPuas = document.getElementById('statPuas');
        this.statTidakPuas = document.getElementById('statTidakPuas');
        this.btnLanjutSurvei = document.getElementById('btn-lanjut-survei');
        this.btnRefreshDashboard = document.getElementById('btn-refresh-dashboard');
        this.btnPuas = document.getElementById('btn-puas');
        this.btnTidakPuas = document.getElementById('btn-tidak-puas');

        this.chartInstance = null;
    }

    get inputNameValue() {
        return this.inputNama.value.trim();
    }

    clearInput() {
        this.inputNama.value = '';
    }

    showPage(pageElement, activeNavElement = null) {
        // Sembunyikan semua halaman
        const pages = [this.pageDashboard, this.pageInput, this.pageSurvey, this.pageThankYou, this.pageAbout];
        pages.forEach(page => page.classList.add('hidden-section'));
        
        // Tampilkan halaman target
        pageElement.classList.remove('hidden-section');

        // Update styling navigasi jika ada nav element yang aktif
        if (activeNavElement) {
            this.navItems.forEach(nav => {
                nav.classList.remove('text-blue-600', 'font-semibold');
                nav.classList.add('text-slate-500', 'font-medium');
            });
            activeNavElement.classList.remove('text-slate-500', 'font-medium');
            activeNavElement.classList.add('text-blue-600', 'font-semibold');
        }
    }

    updateUserNameDisplay(name) {
        this.displayNama.innerText = name;
    }

    toggleLoading(show) {
        if (show) {
            this.loadingIndicator.classList.remove('hidden');
        } else {
            this.loadingIndicator.classList.add('hidden');
        }
    }

    updateDashboardStats(data) {
        this.statTotal.innerText = data.total;
        this.statPuas.innerText = data.puas;
        this.statTidakPuas.innerText = data.tidakPuas;
    }

    renderChart(puas, tidakPuas) {
        const ctx = document.getElementById('kepuasanChart').getContext('2d');
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }
        this.chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Puas', 'Tidak Puas'],
                datasets: [{
                    data: [puas, tidakPuas],
                    backgroundColor: ['#10b981', '#f43f5e'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } },
                cutout: '75%'
            }
        });
    }
}