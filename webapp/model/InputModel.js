sap.ui.define([
    'sap/ui/base/Object',
    'sap/ui/model/json/JSONModel'
], function(Object, JSONModel) {
    'use strict';
    return Object.extend("zmmo071303.model.InputModel",{
        _oModel : {},

        constructor :   function(){

            this._oModel = new JSONModel(this.getInitialData());
            this._oModel.setDefaultBindingMode("TwoWay");
        },

        getInitialData : function(){
            return {
                ProductionOrder         :   "",
                Material                :   "",
                Plant                   :   "",
                WBS                     :   "",
                MaterialName            :   "",
                ProductionVersion       :   "",
                RackID                  :   "",
                Count                   :   0,
                StorageLocation         :   "",
                Reject                  :   "",
                Vendor                  :   ""
            }
        },

        setModel    :   function(oView, sModelName){
            oView.setModel(this._oModel, sModelName);
        },

        getData     :   function(){
            return this._oModel.getData();
        },
        
        setData     :   function(oInputdata){
            var oData = this.getInitialData();

            oData.ProductionOrder       =   oInputdata.ProductionOrder;
            oData.Material              =   oInputdata.Material;
            oData.Plant                 =   oInputdata.Plant;
            oData.WBS                   =   oInputdata.WBS;
            oData.MaterialName          =   oInputdata.MaterialName;
            oData.ProductionVersion     =   oInputdata.ProductionVersion;
            oData.RackID                =   oInputdata.RackID;
            oData.Count                 =   oInputdata.Count;
            oData.StorageLocation       =   oInputdata.StorageLocation;
            oData.Reject                =   oInputdata.Reject;
            oData.Vendor                =   oInputdata.Vendor;

            this._oModel.setData(oData);
        },

        clearData : function(){
            this._oModel.setData(this.getInitialData());
        },

        setResultFromBarcode : function(oResult) {
            var oInputData	=	this.getInitialData();

            oInputData.ProductionOrder		=   oResult.ProductionOrder;
            this.setData(oInputData);
        },

        refresh :   function(bForceUpdate){
            this._oModel.refresh(bForceUpdate);
        }
        
    });
});