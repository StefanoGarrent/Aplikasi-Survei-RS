export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.bindEvents();
    }

    bindEvents() {
        this.view.btnLogin.addEventListener('click', () => this.handleLogin());
        this.view.btnToDashboard.addEventListener('click', () => this.handleToDashboard());
        this.view.btnBack.addEventListener('click', () => this.handleBackToLogin());
        this.view.btnPuas.addEventListener('click', () => this.handleSurveySubmit('Puas'));
        this.view.btnTidakPuas.addEventListener('click', () => this.handleSurveySubmit('Tidak Puas'));
    }

    handleLogin() {
        const nama = this.view.inputNameValue;
        if (nama === '') {
            alert('Mohon masukkan nama pasien terlebih dahulu.');
            return;
        }
        
        this.model.setCurrentUser(nama);
        this.view.updateUserNameDisplay(nama);
        this.view.showPage(this.view.pageSurvey);
    }

    async handleSurveySubmit(kepuasan) {
        this.view.toggleLoading(true);
        
        try {
            await this.model.sendSurveyData(kepuasan);
            this.view.toggleLoading(false);
            alert('Terima kasih! Survei berhasil dikirim.');
            this.view.clearInput();
            this.view.showPage(this.view.pageLogin);
        } catch (error) {
            this.view.toggleLoading(false);
            alert('Gagal mengirim data. Silakan coba lagi.');
        }
    }

    async handleToDashboard() {
        this.view.showPage(this.view.pageDashboard);
        
        try {
            const data = await this.model.fetchDashboardStats();
            this.view.updateDashboardStats(data);
            this.view.renderChart(data.puas, data.tidakPuas);
        } catch (error) {
            alert('Gagal mengambil data dashboard.');
        }
    }

    handleBackToLogin() {
        this.view.showPage(this.view.pageLogin);
    }
}