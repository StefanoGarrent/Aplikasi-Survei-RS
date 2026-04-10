export default class Model {
    constructor() {
        this.scriptUrl = 'https://script.google.com/macros/s/AKfycbzFa1TEIZfNmcN-KtBbVFXVVBJSe7pUNYskhONQ3O2Qeriki6IlyJWZ7h0g5OtDq9ueKg/exec'; // GANTI DENGAN URL ANDA
        this.currentUser = '';
    }

    setCurrentUser(name) {
        this.currentUser = name;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    async sendSurveyData(kepuasan) {
        const payload = {
            nama: this.currentUser,
            kepuasan: kepuasan
        };

        try {
            await fetch(this.scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            return true; 
        } catch (error) {
            console.error('Error pengiriman data:', error);
            throw error;
        }
    }

    async fetchDashboardStats() {
        try {
            const response = await fetch(this.scriptUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error mengambil data:', error);
            throw error;
        }
    }
}