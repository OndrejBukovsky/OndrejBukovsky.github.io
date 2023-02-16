declare class PageManager {
    private static m_instance;
    private mainContext;
    private leftMenu;
    private panel;
    private constructor();
    static readonly getInstance: PageManager;
    init(): void;
}
