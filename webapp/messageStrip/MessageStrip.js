sap.ui.define([
    'sap/ui/base/Object',
    'sap/m/MessageStrip'
], function(Object, MessageStrip) {
    'use strict';
    
    return Object.extend("zmmo071303.messageStrip.MessageStrip", {
        _messageStripArea   :   {},

        constructor : function(oArea){
            this._messageStripArea = oArea;
        },

        showMessageStrip : function(sMessage, sType){
            var oMessageStrip = this.getMessageStrip(sMessage, sType);

            this.clearMessageStrip();
            this._messageStripArea.insertContent(oMessageStrip);
        },

        getMessageStrip : function(sMessage, sType){
            return new MessageStrip({
                text:               sMessage,
                type:               sType,
                showCloseButton:    true,
                showIcon:           true
            });
        },

        clearMessageStrip: function() {
            this._messageStripArea.removeAllContent();
        }
    });
});