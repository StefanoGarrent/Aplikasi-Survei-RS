export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.bindEvents();
        // Load data dashboard saat pertama kali dibuka
        this.loadDashboardData();
    }

    bindEvents() {
        // Navigasi Atas
        this.view.navDashboard.addEventListener('click', () => {
            this.view.showPage(this.view.pageDashboard, this.view.navDashboard);
            this.loadDashboardData();
        });
        this.view.navSurvei.addEventListener('click', () => {
            this.view.showPage(this.view.pageInput, this.view.navSurvei);
        });
        this.view.navAbout.addEventListener('click', () => {
            this.view.showPage(this.view.pageAbout, this.view.navAbout);
        });

        // Tombol Refresh di Dashboard
        this.view.btnRefreshDashboard.addEventListener('click', () => this.loadDashboardData());

        // Alur Survei
        this.view.btnLanjutSurvei.addEventListener('click', () => this.handleProceedToSurvey());
        this.view.btnPuas.addEventListener('click', () => this.handleSurveySubmit('Puas'));
        this.view.btnTidakPuas.addEventListener('click', () => this.handleSurveySubmit('Tidak Puas'));
    }

    async loadDashboardData() {
        try {
            const data = await this.model.fetchDashboardStats();
            this.view.updateDashboardStats(data);
            this.view.renderChart(data.puas, data.tidakPuas);
        } catch (error) {
            console.error('Gagal memuat data dashboard', error);
        }
    }

    handleProceedToSurvey() {
        const nama = this.view.inputNameValue;
        if (nama === '') {
            alert('Kasir: Mohon input nama pasien terlebih dahulu.');
            return;
        }
        
        this.model.setCurrentUser(nama);
        this.view.updateUserNameDisplay(nama);
        
        // Sembunyikan navbar saat layar dihadapkan ke pasien agar fokus
        document.querySelector('nav').style.display = 'none';
        
        this.view.showPage(this.view.pageSurvey);
    }

    async handleSurveySubmit(kepuasan) {
        this.view.toggleLoading(true);
        
        try {
            await this.model.sendSurveyData(kepuasan);
            this.view.toggleLoading(false);
            
            // Pindah ke Halaman Terima Kasih
            this.view.showPage(this.view.pageThankYou);
            
            // Logika Otomatis Kembali (3 detik)
            setTimeout(() => {
                this.view.clearInput();
                // Munculkan kembali navbar untuk kasir
                document.querySelector('nav').style.display = 'block';
                // Kembali ke halaman input kasir
                this.view.showPage(this.view.pageInput, this.view.navSurvei);
            }, 3000);

        } catch (error) {
            this.view.toggleLoading(false);
            alert('Sistem gagal mengirim data. Mohon infokan ke kasir.');
            document.querySelector('nav').style.display = 'block';
            this.view.showPage(this.view.pageInput, this.view.navSurvei);
        }
    }
}