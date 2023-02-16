class PageManager {
    constructor() {
    }
    static get getInstance() {
        return this.m_instance || (this.m_instance = new this());
    }
    init() {
        document.body.appendChild(this.panel);
        document.body.appendChild(this.leftMenu);
        document.body.appendChild(this.mainContext);
    }
}
//# sourceMappingURL=PageManager.js.map