import Model from 'Model.js';
import View from 'View.js';
import Controller from 'Controller.js';

document.addEventListener('DOMContentLoaded', () => {
    const appModel = new Model();
    const appView = new View();
    const appController = new Controller(appModel, appView);
});