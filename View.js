export default class View {
    constructor() {
        this.pageLogin = document.getElementById('page-login');
        this.pageSurvey = document.getElementById('page-survey');
        this.pageDashboard = document.getElementById('page-dashboard');
        
        this.inputNama = document.getElementById('namaPasien');
        this.displayNama = document.getElementById('displayNama');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        
        this.statTotal = document.getElementById('statTotal');
        this.statPuas = document.getElementById('statPuas');
        this.statTidakPuas = document.getElementById('statTidakPuas');
        
        this.btnLogin = document.getElementById('btn-login');
        this.btnToDashboard = document.getElementById('btn-to-dashboard');
        this.btnPuas = document.getElementById('btn-puas');
        this.btnTidakPuas = document.getElementById('btn-tidak-puas');
        this.btnBack = document.getElementById('btn-back');

        this.chartInstance = null;
    }

    get inputNameValue() {
        return this.inputNama.value.trim();
    }

    clearInput() {
        this.inputNama.value = '';
    }

    showPage(pageElement) {
        this.pageLogin.classList.add('hidden-section');
        this.pageSurvey.classList.add('hidden-section');
        this.pageDashboard.classList.add('hidden-section');
        pageElement.classList.remove('hidden-section');
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
                cutout: '70%'
            }
        });
    }
}