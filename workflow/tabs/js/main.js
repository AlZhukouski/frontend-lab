class Tabs {
    defaultOptions = {
        buttonClass: undefined,
        panelClass: undefined
    };

    constructor(options = this.defaultOptions) {
        this.arrayButtons = Array.from(document.querySelectorAll(options.buttonClass));
        this.arrayPannels = Array.from(document.querySelectorAll(options.panelClass));
        this.init()
    }

    init() {
        function handleTabClick(event, tabPanels, tabButtons) {
            tabPanels.forEach(panel => {
                panel.hidden = true;
            });
            tabButtons.forEach(tab => {
                // tab.ariaSelected = false;
                tab.setAttribute('aria-selected', false);
            });
            event.currentTarget.setAttribute('aria-selected', true);
            const { id } = event.currentTarget;
            const tabPanel = tabPanels.find(
                panel => panel.getAttribute('aria-labelledby') === id
            );
            tabPanel.hidden = false;
        }
        this.arrayButtons.forEach(button => button.addEventListener('click', (event) => handleTabClick(event, this.arrayPannels, this.arrayButtons)));
    }

}

const streamTabs = new Tabs({
    buttonClass: '.tabs__tab',
    panelClass:'.tabs__tab-panel',
})
