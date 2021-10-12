sap.ui.define([
    'sap/ui/base/Object',
    'sap/ui/model/json/JSONModel'
], function(Object, JSONModel) {
    'use strict';
    
    return Object.extend("zmmo071303.model.ScannedDataModel", {
        _ScannedModel   :   {},
        constructor     :   function(oView, sModelName) {
            this._ScannedModel  =   new JSONModel(this.getInitialData())
            oView.setModel(this._ScannedModel, sModelName);
        },
        
        getInitialData      :   function() {
            return {
                OrderCount      :   0,
                ScannedData     :   []
            };
        },

        clearData   :   function(){
            this._ScannedModel.setData(this.getInitialData());
        },

        getData :   function(){
            return this._ScannedModel.getData();
        },

        appendScannedData   :   function(oInputData) {
            var oScannedData    =   this._ScannedModel.getData();

            var oToBeAppendData =   {
                TransactionId       :   "1",
                ItemNo              :   oScannedData.ScannedData.length + 1,
                Reject              :   ( oInputData.Reject ? true : false ),
                Material            :   oInputData.Material,
                Plant               :   oInputData.Plant,
                StorageLocation     :   oInputData.StorageLocation,
                Vendor              :   oInputData.Vendor,
                Count               :   oInputData.Count,
                OrderNo             :   oInputData.ProductionOrder,
                Barcode             :   oInputData.Barcode
            }

            oScannedData.ScannedData.push(oToBeAppendData);
            oScannedData.OrderCount =   oScannedData.ScannedData.length;
            this._ScannedModel.setData(oScannedData);
        }
    });
});