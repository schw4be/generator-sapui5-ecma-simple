import UIComponent from "sap/ui/core/UIComponent";
import models from "<%= namespace %>/<%= name %>/model/models";

/**
 * @namespace <%= namespace %>.<%= name %>
 */
export default class Component extends UIComponent {
    static metadata = {
        manifest: "json",
    };

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
    init() {
        // call the base component's init function
        super.init();

        // enable routing
        this.getRouter().initialize();

        // set the device model
        this.setModel(models.createDeviceModel(), "device");
    }
}
