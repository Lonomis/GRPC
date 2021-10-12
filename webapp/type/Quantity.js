sap.ui.define([
    'sap/ui/model/type/Float',
    'sap/ui/model/ValidateException',
    'sap/ui/model/resource/ResourceModel'
], function(Float, ValidationException, ResourceModel) {
    'use strict';
    
    return Float.extend("zmmo071_303.type.Quantity", {
        _ResourceBundle :   new ResourceModel({
            bundleName          :   "zmmo071_303.i18n.i18n",
            supportedLocales    :   [""],
            fallbackLocale      :   ""
        }).getResourceBundle(),

        formatValue : function(vValue){
            return vValue;
        },

        validateValue : function(oValue){
            var aMessages               =   [];
            var aViolatedConstraints    =   [];

            Float.prototype.validateValue(oValue);

            //Validate value
            this.validateSign(oValue, aMessages, aViolatedConstraints);
            this.validateInteger(oValue, aMessages, aViolatedConstraints);
            this.validateDecimal(oValue, aMessages, aViolatedConstraints);

            //Raise exception
            if (aViolatedConstraints.length){
                throw new ValidationException(this.combineMessages(aMessages), aViolatedConstraints);
            }
        },
        
        validateSign : function(oValue, aMessages, aViolatedConstraints){
            var sValue              =   "";
            
            if (oValue) {
                sValue      =   oValue.toString();
                if (sValue.charAt(0) === '-') {
                    aMessages.push(this._ResourceBundle.getText("quantity.Sign"));
                    aViolatedConstraints.push("sign");
                }
            }
        },

        validateInteger : function(oValue, aMessages, aViolatedConstraints){
            var sValue              =   "";
            var sInteger            =   "";
            var iDotPosition        =   0;

            if (oValue) {
                sValue          =   oValue.toString();
                iDotPosition    =   sValue.indexOf(".");
                sInteger        =   this.getInteger(sValue, iDotPosition);
                
                if (sInteger.length > 13) {
                    aMessages.push(this._ResourceBundle.getText("quantity.Integer"));
                    aViolatedConstraints.push("integer");
                }
            }
        },

        validateDecimal : function(oValue, aMessages, aViolatedConstraints){
            var sValue              =   "";
            var sDecimal            =   "";
            var iDotPosition        =   0;

            if (oValue) {
                sValue          =   oValue.toString();
                iDotPosition    =   sValue.indexOf(".");
                sDecimal        =   this.getDecimal(sValue, iDotPosition);
                
                if (sDecimal.length > 3) {
                    aMessages.push(this._ResourceBundle.getText("quantity.Decimal"));
                    aViolatedConstraints.push("decimal");
                }
            }
        },

        formatQuantity : function(sQuantity) {
            var iDotPosition    =   sQuantity.indexOf(".");
            var sInteger        =   "";
            var sDecimal        =   "";

            sInteger        =   this.getInteger(sQuantity, iDotPosition);
            sDecimal        =   this.getDecimal(sQuantity, iDotPosition);
            return this.formatInteger(sInteger) + "." + this.formatDecimal(sDecimal);
        },

        getInteger : function(sQuantity, iDotPosition){
            var sInteger    =   "";

            if (iDotPosition < 0){
                //No Dot Found
                return sQuantity;
            } else {
                sInteger    =   sQuantity.slice(0, iDotPosition);
                if (!sInteger) {
                    return "0";
                } else {
                    return sInteger;
                }
            }
        },

        getDecimal : function(sQuantity, iDotPosition){
            var sDecimal    =   "";

            if (iDotPosition < 0){
                //No Dot Found
                return "000";
            } else {
                sDecimal    =   sQuantity.slice(iDotPosition + 1);
                if (!sDecimal) {
                    return "000";
                } else {
                    return sDecimal;
                }
            }
        }
    });
});