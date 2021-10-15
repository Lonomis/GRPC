sap.ui.define([
    'sap/ui/base/Object',
    'zmmo071303/control/BarcodeScannerControl'
], function(Object, BarcodeScannerControl) {
    'use strict';
    
    return Object.extend("zmmo071303.barcodeScanner.BarcodeScanner", {
        _sDialogTitle           :   "Enter Barcode Manually",
        SuccessStatus           :   "Success",
        ErrorStatus             :   "Error",
        CancelStatus            :   "Cancel",
        _StatusModelName        :   "barcode",

        constructor : function(){
            
        },

        setStatusModel : function(oView){
            oView.setModel(BarcodeScannerControl.getStatusModel(), this._StatusModelName);
        },
        
        scan : function(){
            var that  = this;

            return new Promise(function(resolve, reject){
                BarcodeScannerControl.scan(
                    //Scan Successfully
                    function(oResult) {
                        if (oResult.text){
                            resolve({
                                status  :   that.SuccessStatus,
                                details :   {
                                    ProductionOrder     :   (oResult.text.length >= 12 ? oResult.text.substring(4,16) : oResult.text)
                                }
                            });
                        } else {
                            resolve({
                                status  :   that.CancelStatus
                            })
                        }
                    }, 
                    //Scan Failure
                    function(sError) {
                        reject({
                            status  :   that.ErrorStatus,
                            details :   sError
                        });
                    }, 
                    //Live Update
                    function(oParams) {
                        //Do Nothing
                    },
                    that._sDialogTitle
                );
            });
        }
    });
});