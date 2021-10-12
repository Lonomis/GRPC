sap.ui.define([
    "sap/ui/base/Object",
    "sap/m/MessagePopover",
    "sap/m/MessageItem",
    "sap/ui/core/Core",
    "sap/ui/core/message/Message"
], function(Object, MessagePopover, MessageItem, Core, Message) {
    'use strict';
    
    return Object.extend("zmmo071303.messagePopover.MessagePopover", {
        _MessageManager     :   {},
        _MessagePopover     :   null,
        _MessageModelName   :   "messages",

        constructor : function(oPage){
            this._MessageManager    =   Core.getMessageManager();
            this._MessageManager.registerObject(oPage, true);
        },

        setMessageModel : function(oView){
            oView.setModel(this._MessageManager.getMessageModel(), this._MessageModelName);
        },

        openMessagePopover : function(oPopoverButton, oEvent){
            if (!this._MessagePopover){
                this._MessagePopover = this.buildMessagePopover(oPopoverButton);
            }
            
            this._MessagePopover.toggle(oEvent.getSource());
        },

        buildMessagePopover : function(oPopoverButton){
            var oMessagePopover = new MessagePopover({
                items: {
                    path:       this._MessageModelName + ">/",
                    template:   new MessageItem({
                        title:          "{" + this._MessageModelName + ">message}",
                        type:           "{" + this._MessageModelName + ">type}",
                    })
                }
            });

            oPopoverButton.addDependent(oMessagePopover);
            return oMessagePopover;
        },

        removeAllMessages: function(){
            this._MessageManager.removeAllMessages();
        },

        addMessage: function(sMessage, sMessageType, sDescription, sAdditionalText) {
            var oMessage = new Message({
                message         :   sMessage,
                type            :   sMessageType,
                description     :   sDescription,
                additionalText  :   sAdditionalText
            });

            this._MessageManager.addMessages(oMessage);
        }
    });
});